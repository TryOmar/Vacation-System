const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const readline = require("readline");
const sharp = require("sharp");
const { exec } = require("child_process");

const folderConfigs = {
  "Use-Cases": {
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

function logStep(msg) { console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`); }
function logSuccess(msg) { console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`); }
function logWarning(msg) { console.log(`\x1b[33m[WARNING]\x1b[0m ${msg}`); }

async function waitForFile(filePath, retries = 10, delay = 200) {
  for (let i = 0; i < retries; i++) {
    if (fs.existsSync(filePath)) return true;
    await new Promise(r => setTimeout(r, delay));
  }
  throw new Error(`File not found after waiting: ${filePath}`);
}

function isFileReady(filePath) {
  try {
    if (!fs.existsSync(filePath)) return false;
    const stats = fs.statSync(filePath);
    return stats.size > 0 && stats.isFile();
  } catch (err) { return false; }
}

async function pdfToAllImages(pdfPath, baseImagePath, dpi = 300, crop = false) {
  return new Promise((resolve, reject) => {
    const outDir = path.dirname(path.resolve(baseImagePath));
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
            await new Promise(resolve => setTimeout(resolve, 1000));
            const files = fs.readdirSync(outDir).filter(f => f.startsWith(outPrefix) && f.endsWith(".png"));

            for (const file of files) {
              const filePath = path.join(outDir, file);
              if (!isFileReady(filePath)) { logWarning(`File not ready, skipping: ${filePath}`); continue; }

              try {
                const tempPath = filePath.replace('.png', `_temp_${Date.now()}.png`);
                await sharp(filePath).trim().toFile(tempPath);
                
                if (isFileReady(tempPath)) {
                  fs.unlinkSync(filePath);
                  fs.renameSync(tempPath, filePath);
                  logSuccess(`Cropped image: ${filePath}`);
                } else {
                  logWarning(`Temp file not created properly for: ${filePath}`);
                  try { if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath); } catch (cleanupErr) {}
                }
              } catch (cropError) {
                logWarning(`Failed to crop ${file}: ${cropError.message}`);
              }
            }
          } catch (cropError) {
            logWarning(`Cropping process failed: ${cropError.message}`);
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
    const files = fs.readdirSync(dir);
    const tempFiles = files.filter(f => f.startsWith(prefix) && (f.includes('_temp_') || f.endsWith('.tmp.png')));
    for (const tempFile of tempFiles) {
      const tempPath = path.join(dir, tempFile);
      try { fs.unlinkSync(tempPath); logStep(`Cleaned up temp file: ${tempFile}`); } catch (err) {}
    }
  } catch (err) {}
}

function getHtmlFilesRecursively(dir) {
  let htmlFiles = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) htmlFiles = htmlFiles.concat(getHtmlFilesRecursively(fullPath));
    else if (entry.isFile() && entry.name.endsWith(".html")) htmlFiles.push(fullPath);
  }
  return htmlFiles;
}

async function chooseFolder(folders) {
  console.log("Available folders:");
  folders.forEach((f, i) => console.log(`  [${i + 1}] ${f}`));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const choice = await new Promise(resolve => rl.question("Enter the number of the folder to process: ", answer => { rl.close(); resolve(answer); }));
  const index = parseInt(choice) - 1;
  if (index >= 0 && index < folders.length) return folders[index];
  logWarning("Invalid choice, exiting."); process.exit(1);
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
    try {
      const htmlFile = path.basename(htmlPath);
      const pdfPath = htmlPath.replace(".html", ".pdf");
      const baseImagePath = htmlPath.replace(".html", ".png");

      logStep(`HTML → ${htmlFile}`);
      const page = await browser.newPage();
      await page.goto("file://" + htmlPath, { waitUntil: "networkidle0" });

      // PDF generation: normal default Puppeteer quality
      logStep(`PDF → ${path.basename(pdfPath)}`);
      await page.pdf({ path: pdfPath, ...config.pdf });
      await page.close();

      await waitForFile(pdfPath);
      logSuccess(`HTML to PDF: ${htmlFile} → ${path.basename(pdfPath)}`);

      // PNG conversion: user-configured DPI only
      logStep(`PNG → ${path.basename(baseImagePath)} (crop: ${config.cropImages})`);
      await pdfToAllImages(pdfPath, baseImagePath, config.pngDpi, config.cropImages);
      
      if (config.cropImages) {
        const outDir = path.dirname(baseImagePath);
        const outPrefix = path.basename(baseImagePath, ".png");
        cleanupTempFiles(outDir, outPrefix);
      }
    } catch (error) {
      logWarning(`Failed to process ${htmlPath}: ${error.message}`);
      continue;
    }
  }

  await browser.close();
  logSuccess("✅ All conversions done!");
})();
