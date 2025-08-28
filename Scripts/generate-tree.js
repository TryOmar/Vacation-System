const fs = require("fs");
const path = require("path");

// --- CONFIG ---
const SCRIPT_DIR = __dirname;                  // folder of this script
const ROOT_DIR = path.resolve(SCRIPT_DIR, ".."); // parent folder as project root
const OUTPUT_FILE = path.join(ROOT_DIR, "index.html");
const IGNORE = [
  "node_modules",
  ".git",
  ".gitignore",
  "package-lock.json",
  "tree.json",
  "index.html",
  ".DS_Store"
];

// --- HELPERS ---
function shouldIgnore(name) {
  return IGNORE.includes(name) || name.startsWith('.');
}

// Recursively build tree
function buildTree(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  const tree = {};

  for (const entry of entries) {
    if (shouldIgnore(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const subTree = buildTree(fullPath);
      if (subTree && (Object.keys(subTree).length > 0 || Array.isArray(subTree))) {
        tree[entry.name] = subTree;
      }
    } else {
      files.push(entry.name);
    }
  }

  if (files.length > 0) {
    files.sort((a, b) => a.localeCompare(b));
    if (Object.keys(tree).length === 0) return files;
    tree["_files"] = files;
  }

  return tree;
}

// Flatten tree into categories with elements
function flattenCategories(node, parentPath = '', parentName = '') {
  const categories = [];
  const elements = [];

  Object.keys(node).sort().forEach(key => {
    if (key === "_files") return;
    const subNode = node[key];
    if (Array.isArray(subNode)) {
      elements.push({ name: key, files: subNode, path: path.join(parentPath, key), type: 'normal' });
    }
  });

  if (node._files && node._files.length > 0) {
    node._files.sort().forEach(f => {
      elements.push({ name: f, files: [f], path: parentPath, type: 'view' });
    });
  }

  if (elements.length > 0) {
    const title = parentName || parentPath || "Root";
    categories.push({ title: title.replace(/\\/g, '/'), elements });
  }

  Object.keys(node).sort().forEach(key => {
    if (key === "_files") return;
    const subNode = node[key];
    if (!Array.isArray(subNode)) {
      const newParentName = parentName ? parentName + '/' + key : key;
      const innerCategories = flattenCategories(subNode, path.join(parentPath, key), newParentName);
      categories.push(...innerCategories);
    }
  });

  return categories;
}

// Render files
function renderFiles(files, basePath) {
  const counts = {};
  let html = '';
  files.forEach(f => {
    const ext = f.split('.').pop().toUpperCase();
    counts[ext] = (counts[ext] || 0) + 1;
    const label = counts[ext] === 1 ? ext : ext + counts[ext];
    html += `<a class="btn" href="${path.join(basePath, f).replace(/\\/g,'/')}" target="_blank">${label}</a>`;
  });
  return html;
}

// Generate HTML
function generateHTML(tree) {
  let html = '';
  html += '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<title>Project Dashboard</title>\n<style>\n';
  html += 'body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 20px; }\n';
  html += '.card { background: #fff; border: 2px solid #333; border-radius: 8px; padding: 10px 15px; box-shadow: 2px 2px 6px rgba(0,0,0,0.1); }\n';
  html += '.card h2 { margin:0 0 10px; text-align:center; font-size:1.2rem; border-bottom:1px solid #ccc; padding-bottom:5px; }\n';
  html += '.item { display:flex; justify-content:space-between; align-items:center; margin:4px 0; padding:4px 6px; background:#f9f9f9; border-radius:4px; flex-wrap:wrap; }\n';
  html += '.item span { flex:1; min-width:0; word-break:break-word; }\n';
  html += '.buttons { flex-shrink:0; display:flex; gap:5px; margin-left:10px; }\n';
  html += '.btn { background:#000; color:#fff; border:none; padding:3px 8px; border-radius:4px; font-size:0.8rem; cursor:pointer; text-decoration:none; white-space:nowrap; }\n';
  html += '.btn:hover { opacity:0.8; }\n';
  html += '</style>\n</head>\n<body>\n';
  

  let allCategories = flattenCategories(tree);

  // Root category first
  let rootIndex = allCategories.findIndex(c => c.title === "Root");
  if (rootIndex >= 0) {
    html += renderCategoryHTML(allCategories.splice(rootIndex, 1)[0]);
  }

  // Sort remaining by elements count descending
  allCategories.sort((a, b) => b.elements.length - a.elements.length);
  allCategories.forEach(cat => html += renderCategoryHTML(cat));

  html += '\n</body>\n</html>';
  return html;
}

function renderCategoryHTML(cat) {
  let html = `<div class="card"><h2>${cat.title.replace(/[-_]/g,' ')}</h2>`;
  cat.elements.forEach(el => {
    html += `<div class="item"><span>${el.name.replace(/[-_]/g,' ')}</span>`;
    if (el.type === 'view') {
      html += `<div class="buttons"><a class="btn" href="${path.join(el.path, el.files[0]).replace(/\\/g,'/')}" target="_blank">View</a></div>`;
    } else {
      html += `<div class="buttons">${renderFiles(el.files, el.path)}</div>`;
    }
    html += '</div>';
  });
  html += '</div>';
  return html;
}

// Save file
function saveFile(filename, content) {
  try {
    fs.writeFileSync(filename, content, "utf8");
    console.log("✅ Generated: " + filename);
  } catch (err) {
    console.error("❌ Error saving " + filename + ": " + err.message);
  }
}

// --- MAIN ---
function main() {
  console.log("Starting tree generation...");
  const tree = buildTree(ROOT_DIR);
  if (!tree || Object.keys(tree).length === 0) {
    console.warn("No files or directories found!");
    return;
  }
  const html = generateHTML(tree);
  saveFile(OUTPUT_FILE, html);
  console.log("Open " + OUTPUT_FILE + " in your browser");
}

if (require.main === module) main();
