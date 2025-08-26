const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const pdf = require("pdf-poppler");
const readline = require("readline");
const sharp = require("sharp"); // <-- added

// ---------- CONFIGURATION ---------- //
const folderConfigs = {
  "Use-Cases": {
    pdf: { format: "letter", landscape: false, printBackground: true, displayHeaderFooter: false, scale: 0.7, margin: { top: "0.5in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 300,
    cropImages: false // <-- new option: true to trim whitespace
  },
  "Data-Dictionary": {
    pdf: { format: "letter", landscape: false, printBackground: true, displayHeaderFooter: false, scale: 1.0, margin: { top: "0.5in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 300,
    cropImages: true // crop images in this folder
  },
  "Wireframes": {
    pdf: { format: "letter", landscape: false, printBackground: true, displayHeaderFooter: false, scale: 0.8, margin: { top: "0.5in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 300,
    cropImages: true
  }
};
// ----------------------------------- //

function logStep(msg) { console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`); }
function logSuccess(msg) { console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`); }
function logWarning(msg) { console.log(`\x1b[33m[WARNING]\x1b[0m ${msg}`); }

// Convert PDF → PNG (all pages)
async function pdfToAllImages(pdfPath, baseImagePath, dpi = 300, crop = false) {
  const options = {
    format: "png",
    out_dir: path.dirname(path.resolve(baseImagePath)),
    out_prefix: path.basename(baseImagePath, ".png"),
    dpi
  };
  try {
    await pdf.convert(pdfPath, options);
    logSuccess(`Converted ${path.basename(pdfPath)} → all pages as PNG`);

    if (crop) {
      // Crop all generated PNGs safely
      const dir = options.out_dir;
      const prefix = options.out_prefix;
      const files = fs.readdirSync(dir).filter(f => f.startsWith(prefix) && f.endsWith(".png"));
    
      for (const file of files) {
        const filePath = path.join(dir, file);
        const tempPath = filePath + ".tmp.png"; // temporary file
        await sharp(filePath).trim().toFile(tempPath); // crop into temp file
        fs.renameSync(tempPath, filePath); // replace original
        logSuccess(`Cropped image in place: ${filePath}`);
      }
    }
    

  } catch (err) {
    console.error("❌ PDF to Image conversion failed:", err.message);
  }
}


// Recursive folder scan
function getHtmlFilesRecursively(dir) {
  let htmlFiles = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      htmlFiles = htmlFiles.concat(getHtmlFilesRecursively(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
  return htmlFiles;
}

// Ask user which folder to process
async function chooseFolder(folders) {
  console.log("Available folders:");
  folders.forEach((f, i) => console.log(`  [${i + 1}] ${f}`));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const choice = await new Promise(resolve => rl.question("Enter the number of the folder to process: ", answer => { rl.close(); resolve(answer); }));
  const index = parseInt(choice) - 1;
  if (index >= 0 && index < folders.length) return folders[index];
  logWarning("Invalid choice, exiting.");
  process.exit(1);
}

(async () => {
  const baseDir = __dirname;
  logStep(`Scanning base directory: ${baseDir}`);

  const folders = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && folderConfigs[d.name])
    .map(d => d.name);

  if (!folders.length) { logWarning("No configured folders found."); return; }

  const folder = await chooseFolder(folders);
  const folderPath = path.join(baseDir, folder);
  const config = folderConfigs[folder];

  logStep(`Processing folder: ${folder}`);
  const htmlFiles = getHtmlFilesRecursively(folderPath);
  if (!htmlFiles.length) { logWarning("No HTML files found."); return; }

  const browser = await puppeteer.launch();

  for (const htmlPath of htmlFiles) {
    const htmlFile = path.basename(htmlPath);
    const pdfPath = htmlPath.replace(".html", ".pdf");
    const baseImagePath = htmlPath.replace(".html", ".png");

    logStep(`HTML → ${htmlFile}`);

    // HTML → PDF
    const page = await browser.newPage();
    await page.goto("file://" + htmlPath, { waitUntil: "networkidle0" });
    logStep(`PDF → ${path.basename(pdfPath)}`);
    await page.pdf({ path: pdfPath, ...config.pdf });
    await page.close();
    logSuccess(`HTML to PDF: ${htmlFile} → ${path.basename(pdfPath)}`);

    // PDF → PNG (all pages automatically) + optional crop
    logStep(`PNG → ${path.basename(baseImagePath)} (crop: ${config.cropImages})`);
    await pdfToAllImages(pdfPath, baseImagePath, config.pngDpi, config.cropImages);
  }

  await browser.close();
  logSuccess("✅ All conversions done!");
})();
