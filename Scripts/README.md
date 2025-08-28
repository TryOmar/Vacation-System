# Scripts Documentation

Utility scripts for the Vacation System project. Each script has specific dependencies and configuration options.

## 📦 Dependencies

Install all dependencies:
```bash
cd Scripts
npm install
```

**Required packages:**
- `puppeteer` (v24.17.0) - HTML to PDF conversion
- `sharp` (v0.34.3) - Image processing
- `pdf-poppler` (v0.2.1) - PDF to image conversion

## 🚀 Scripts

### 1. collect-usecases.ps1
**Purpose:** Extracts use case data from HTML files in UC-* folders

**Dependencies:** PowerShell 5.1+ (Windows) or PowerShell Core 6+ (cross-platform)

**Configuration:**
- Output folder: `Use-Cases/Generated-UseCases-JSON/`
- Output files: `All-UseCases.json`, `All-UseCases-Fixed.json`
- Automatically sorts by UC number

**Usage:**
```powershell
.\collect-usecases.ps1
```

### 2. batch-html-to-pdf.js
**Purpose:** Converts HTML files to PDF and PNG formats

**Dependencies:** Node.js + npm packages (puppeteer, sharp, pdf-poppler)

**Configuration Options:**
```javascript
// Folder-specific settings in the script:
const folderConfigs = {
  "Use-Cases": {
    pdf: { format: "letter", scale: 0.7, margin: { top: "0in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 600, cropImages: true
  },
  "Data-Dictionary": {
    pdf: { format: "letter", scale: 0.8, margin: { top: "0.5in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 600, cropImages: true
  },
  "Wireframes": {
    pdf: { format: "letter", scale: 0.8, margin: { top: "0.5in", bottom: "0in", left: "0.5in", right: "0.5in" } },
    pngDpi: 600, cropImages: true
  }
};

// Ignored folders:
const IGNORE = [
  "node_modules", ".git", ".gitignore", ".DS_Store",
  "package-lock.json", "tree.json", "tree.html", "index.html", "Scripts"
];
```

**Usage:**
```bash
node batch-html-to-pdf.js
node batch-html-to-pdf.js --folder Use-Cases
node batch-html-to-pdf.js --verbose
```

### 3. generate-tree.js
**Purpose:** Generates project file tree structure and HTML index

**Dependencies:** Node.js built-ins only (fs, path)

**Configuration Options:**
```javascript
// Output settings:
const OUTPUT_FILE = path.join(ROOT_DIR, "index.html");

// Ignored items:
const IGNORE = [
  "node_modules", ".git", ".gitignore", "package-lock.json", 
  "tree.json", "index.html", ".DS_Store"
];
```

**Usage:**
```bash
node generate-tree.js
node generate-tree.js --output custom-tree.html
```

## ⚙️ Customization

### Modify PDF Settings
Edit `batch-html-to-pdf.js` lines 8-20 to change:
- Page format (letter, A4, etc.)
- Scale factor
- Margins
- PNG DPI resolution
- Image cropping

### Change Output Locations
- **collect-usecases.ps1:** Lines 12-15
- **generate-tree.js:** Line 6
- **batch-html-to-pdf.js:** Output paths in conversion functions

### Adjust Ignored Items
Modify the `IGNORE` arrays in each script to exclude different files/folders.

## 🔧 Troubleshooting

**PowerShell Execution Policy:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Puppeteer Issues:**
```bash
npm rebuild puppeteer
# On Linux: sudo apt-get install -y ca-certificates fonts-liberation libappindicator3-1
```

**Sharp Issues:**
```bash
npm rebuild sharp
```

**PDF-Poppler Issues:**
- Ubuntu/Debian: `sudo apt-get install poppler-utils`
- macOS: `brew install poppler`
- Windows: Download from GitHub releases

## 🔗 Git Integration

### Auto-generate Tree on Commit
You can automatically run `generate-tree.js` after each commit to keep the project tree updated:

**Sample post-commit hook** (`.git/hooks/post-commit`):
```bash
#!/bin/bash
cd "$(git rev-parse --show-toplevel)/Scripts"
node generate-tree.js
git add ../index.html
git commit -m "Update project tree structure" --no-verify
```

**Windows post-commit hook** (`.git/hooks/post-commit`):
```batch
@echo off
cd /d "%~dp0..\Scripts"
node generate-tree.js
git add ..\index.html
git commit -m "Update project tree structure" --no-verify
```

**Note:** Make sure the hook file is executable (`chmod +x .git/hooks/post-commit` on Linux/Mac).

