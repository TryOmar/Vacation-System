const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const readline = require("readline");
const sharp = require("sharp");
const { exec } = require("child_process");

// --- CONFIG ---
const folderConfigs = {
  "Use-Cases": {
    pdf: { format: "letter", landscape: false, printBackground: true, displayHeaderFooter: false, scale: 0.7, margin: { top: "0in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 600, cropImages: true
  },
  "User-Stories": {
    pdf: { format: "letter", landscape: false, printBackground: true, displayHeaderFooter: false, scale: 0.7, margin: { top: "0in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 600, cropImages: true
  },
  "Data-Dictionary": {
    pdf: { format: "letter", landscape: false, printBackground: true, displayHeaderFooter: false, scale: 0.8, margin: { top: "0.5in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 600, cropImages: true
  },
  "Wireframes": {
    pdf: { format: "letter", landscape: false, printBackground: true, displayHeaderFooter: false, scale: 0.8, margin: { top: "0.5in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 600, cropImages: true
  }
};

// --- IGNORE FILES/FOLDERS ---
const IGNORE = [
  "node_modules",
  ".git",
  ".gitignore",
  ".DS_Store",
  "package-lock.json",
  "tree.json",
  "tree.html",
  "index.html",
  "Scripts"
];

// --- LOGGING HELPERS ---
function logStep(msg) { console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`); }
function logSuccess(msg) { console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`); }
function logWarning(msg) { console.log(`\x1b[33m[WARNING]\x1b[0m ${msg}`); }

// --- UTILITIES ---
function shouldIgnore(name) {
  return IGNORE.includes(name) || name.startsWith('.');
}

async function waitForFile(filePath, retries = 10, delay = 200) {
  for (let i = 0; i < retries; i++) {
    if (fs.existsSync(filePath)) return true;
    await new Promise(r => setTimeout(r, delay));
  }
  throw new Error(`File not found after waiting: ${filePath}`);
}

function isFileReady(filePath) {
  try { return fs.existsSync(filePath) && fs.statSync(filePath).size > 0; } 
  catch { return false; }
}

// --- PDF TO PNG ---
async function pdfToAllImages(pdfPath, baseImagePath, dpi = 300, crop = false) {
  return new Promise((resolve, reject) => {
    const outDir = path.dirname(baseImagePath);
    const outPrefix = path.basename(baseImagePath, ".png");

    const attemptConversion = (retryCount = 0) => {
      const cmd = `pdftocairo -png -r ${dpi} "${pdfPath}" "${path.join(outDir, outPrefix)}"`;
      exec(cmd, async (err, stdout, stderr) => {
        if (err) {
          if (retryCount < 2 && (stderr.includes("Error opening") || stderr.includes("unknown error"))) {
            logWarning(`Retry ${retryCount + 1}/3 for ${path.basename(pdfPath)}`);
            setTimeout(() => attemptConversion(retryCount + 1), 1000 * (retryCount + 1));
            return;
          }
          console.error("❌ PDF to Image conversion failed:", stderr || err.message);
          return reject(err);
        }

        logSuccess(`Converted ${path.basename(pdfPath)} → PNG(s) at ${dpi} DPI`);

        if (crop) {
          try {
            await new Promise(r => setTimeout(r, 1000));
            const files = fs.readdirSync(outDir)
              .filter(f => f.startsWith(outPrefix) && f.endsWith(".png"));
            for (const file of files) {
              const filePath = path.join(outDir, file);
              if (!isFileReady(filePath)) { logWarning(`File not ready, skipping: ${filePath}`); continue; }
              const tempPath = filePath.replace('.png', `_temp_${Date.now()}.png`);
              await sharp(filePath).trim().toFile(tempPath);
              if (isFileReady(tempPath)) {
                fs.unlinkSync(filePath);
                fs.renameSync(tempPath, filePath);
                logSuccess(`Cropped image: ${filePath}`);
              }
            }
          } catch (cropError) {
            logWarning(`Cropping failed: ${cropError.message}`);
          }
        }

        resolve();
      });
    };
    attemptConversion();
  });
}

function cleanupTempFiles(dir, prefix) {
  try {
    fs.readdirSync(dir)
      .filter(f => f.startsWith(prefix) && (f.includes('_temp_') || f.endsWith('.tmp.png')))
      .forEach(f => { fs.unlinkSync(path.join(dir, f)); logStep(`Cleaned temp file: ${f}`); });
  } catch {}
}

function getHtmlFilesRecursively(dir) {
  let htmlFiles = [];
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!shouldIgnore(entry.name)) htmlFiles = htmlFiles.concat(getHtmlFilesRecursively(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html") && !shouldIgnore(entry.name)) htmlFiles.push(fullPath);
  });
  return htmlFiles;
}

// --- FOLDER SELECTION ---
async function chooseFolder(folders) {
  console.log("Available folders:");
  folders.forEach((f, i) => console.log(`  [${i + 1}] ${f}`));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const choice = await new Promise(resolve => rl.question("Enter folder number: ", ans => { rl.close(); resolve(ans); }));
  const index = parseInt(choice) - 1;
  if (index >= 0 && index < folders.length) return folders[index];
  logWarning("Invalid choice"); process.exit(1);
}

// --- MAIN ---
(async () => {
  const repoRoot = path.resolve(__dirname, ".."); // parent folder
  logStep(`Repo root: ${repoRoot}`);

  const folders = fs.readdirSync(repoRoot, { withFileTypes: true })
    .filter(d => d.isDirectory() && folderConfigs[d.name] && !shouldIgnore(d.name))
    .map(d => d.name);

  if (!folders.length) { logWarning("No configured folders found."); return; }

  const folder = await chooseFolder(folders);
  const folderPath = path.join(repoRoot, folder);
  const config = folderConfigs[folder];

  logStep(`Processing folder: ${folder}`);
  const htmlFiles = getHtmlFilesRecursively(folderPath);
  if (!htmlFiles.length) { logWarning("No HTML files found."); return; }

  const browser = await puppeteer.launch();

  for (const htmlPath of htmlFiles) {
    try {
      const htmlFile = path.basename(htmlPath);
      const pdfPath = htmlPath.replace(".html", ".pdf");
      const baseImagePath = pdfPath.replace(".pdf", ".png");

      logStep(`HTML → ${htmlFile}`);
      const page = await browser.newPage();
      await page.goto("file://" + htmlPath, { waitUntil: "networkidle0" });

      logStep(`PDF → ${path.basename(pdfPath)}`);
      await page.pdf({ path: pdfPath, ...config.pdf });
      await page.close();

      await waitForFile(pdfPath);
      logSuccess(`HTML to PDF: ${htmlFile} → ${path.basename(pdfPath)}`);

      logStep(`PNG → ${path.basename(baseImagePath)} (crop: ${config.cropImages})`);
      await pdfToAllImages(pdfPath, baseImagePath, config.pngDpi, config.cropImages);

      if (config.cropImages) {
        cleanupTempFiles(path.dirname(baseImagePath), path.basename(baseImagePath, ".png"));
      }
    } catch (err) {
      logWarning(`Failed to process ${htmlPath}: ${err.message}`);
    }
  }

  await browser.close();
  logSuccess("✅ All conversions done!");
})();
