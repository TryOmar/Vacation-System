# Scripts Documentation

This folder contains utility scripts for the Vacation System project. Each script serves a specific purpose and has its own dependencies and usage instructions.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Scripts Overview](#scripts-overview)
- [collect-usecases.ps1](#collect-usecasesps1)
- [batch-html-to-pdf.js](#batch-html-to-pdfjs)
- [generate-tree.js](#generate-treejs)
- [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before running any scripts, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **PowerShell** (Windows) or **Bash** (Linux/Mac)
- **Git** (for version control)

## 📦 Installation

1. **Navigate to the Scripts folder:**
   ```bash
   cd Scripts
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Verify installation:**
   ```bash
   npm list
   ```

## 🚀 Scripts Overview

| Script | Type | Purpose | Dependencies |
|--------|------|---------|--------------|
| `collect-usecases.ps1` | PowerShell | Collects and processes use case data from HTML files | PowerShell 5.1+ |
| `batch-html-to-pdf.js` | Node.js | Converts HTML files to PDF and PNG formats | Puppeteer, Sharp, PDF-Poppler |
| `generate-tree.js` | Node.js | Generates a file tree structure for the project | Node.js built-ins |

---

## 📝 collect-usecases.ps1

### Purpose
Automatically collects use case data from HTML files in UC-* folders and generates consolidated JSON files.

### What it does
1. Scans all UC-* folders for HTML files
2. Extracts `useCaseData` objects from each HTML file
3. Sorts use cases by UC number
4. Generates two JSON files:
   - `All-UseCases.json` (raw extracted data)
   - `All-UseCases-Fixed.json` (properly formatted JSON)

### Usage

#### Windows PowerShell
```powershell
# Navigate to Scripts folder
cd Scripts

# Run the script
.\collect-usecases.ps1
```

#### Linux/Mac (with PowerShell Core)
```bash
# Navigate to Scripts folder
cd Scripts

# Run the script
pwsh collect-usecases.ps1
```

### Output
- Creates `Use-Cases/Generated-UseCases-JSON/` folder
- Generates `All-UseCases.json` and `All-UseCases-Fixed.json`
- Creates a README.md file explaining the generated content

### Dependencies
- **PowerShell 5.1+** (Windows) or **PowerShell Core 6+** (cross-platform)
- No additional packages required

---

## 🖥️ batch-html-to-pdf.js

### Purpose
Converts HTML files to PDF and PNG formats using Puppeteer (headless Chrome) and image processing tools.

### What it does
1. Scans specified folders for HTML files
2. Converts HTML to PDF using Puppeteer
3. Converts PDF to high-quality PNG images
4. Applies cropping and optimization
5. Supports different configurations for different folder types

### Usage

#### Basic Usage
```bash
# Navigate to Scripts folder
cd Scripts

# Run the script
node batch-html-to-pdf.js
```

#### With Custom Configuration
```bash
# Run with specific folder
node batch-html-to-pdf.js --folder Use-Cases

# Run with verbose logging
node batch-html-to-pdf.js --verbose
```

### Configuration
The script automatically detects folder types and applies appropriate settings:

- **Use-Cases**: Letter format, 0.7 scale, 600 DPI PNG
- **Data-Dictionary**: Letter format, 0.8 scale, 600 DPI PNG  
- **Wireframes**: Letter format, 0.8 scale, 600 DPI PNG

### Dependencies
- **Puppeteer** - Headless Chrome for HTML to PDF conversion
- **Sharp** - Image processing and optimization
- **PDF-Poppler** - PDF to image conversion utilities

### Installation Notes
```bash
# Install dependencies
npm install

# If you encounter issues with Puppeteer on Linux
sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget
```

---

## 🌳 generate-tree.js

### Purpose
Generates a hierarchical file tree structure for the entire project and creates an HTML index.

### What it does
1. Scans the project directory recursively
2. Builds a tree structure of files and folders
3. Categorizes files by type and location
4. Generates an HTML index with navigation
5. Ignores system files and build artifacts

### Usage

#### Basic Usage
```bash
# Navigate to Scripts folder
cd Scripts

# Run the script
node generate-tree.js
```

#### Custom Output Location
```bash
# Generate tree to specific file
node generate-tree.js --output custom-tree.html
```

### Output
- Creates `tree.json` (raw tree data)
- Generates `index.html` (navigable HTML tree)
- Organizes files by category and type

### Dependencies
- **Node.js built-ins only** (fs, path)
- No additional packages required

---

## 🛠️ Troubleshooting

### Common Issues

#### PowerShell Execution Policy Error
```powershell
# Fix execution policy (run as Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or bypass for current session
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```

#### Puppeteer Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall Puppeteer
npm uninstall puppeteer
npm install puppeteer

# On Linux, install additional dependencies
sudo apt-get update
sudo apt-get install -y ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
```

#### Sharp Installation Issues
```bash
# Rebuild Sharp
npm rebuild sharp

# Or reinstall
npm uninstall sharp
npm install sharp
```

#### PDF-Poppler Issues
```bash
# On Ubuntu/Debian
sudo apt-get install poppler-utils

# On macOS
brew install poppler

# On Windows, download from: https://github.com/oschwartz10612/poppler-windows/releases/
```

### Performance Tips

1. **For large projects**: Run scripts during off-peak hours
2. **Memory usage**: Close other applications when running batch conversions
3. **Network drives**: Avoid running scripts on network-mounted folders
4. **Antivirus**: Add script folders to antivirus exclusions if needed

### Logging and Debugging

#### Enable Verbose Logging
```bash
# For Node.js scripts
node script.js --verbose

# For PowerShell
$VerbosePreference = "Continue"
.\collect-usecases.ps1
```

#### Check Script Output
```bash
# Redirect output to file
node batch-html-to-pdf.js > output.log 2>&1

# PowerShell output
.\collect-usecases.ps1 | Tee-Object -FilePath output.log
```

---

## 📚 Additional Resources

- [PowerShell Documentation](https://docs.microsoft.com/en-us/powershell/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Puppeteer API Reference](https://pptr.dev/api/)
- [Sharp Image Processing](https://sharp.pixelplumbing.com/)
- [PDF-Poppler Documentation](https://github.com/julianhille/MuhammaraJS)

## 🤝 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all dependencies are installed
3. Check the script output for error messages
4. Ensure you have proper permissions for the target folders
5. Verify the project structure matches expected patterns

---

*Last updated: $(Get-Date)*
