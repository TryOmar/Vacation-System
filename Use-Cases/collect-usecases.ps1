# collect-and-fix-usecases.ps1
$root = Get-Location
$outputRaw = Join-Path $root "All-UseCases.json"
$outputFixed = Join-Path $root "All-UseCases-Fixed.json"

# ------------------------------
# STEP 1: Collect raw blocks
# ------------------------------

# Clear old output
"" | Out-File $outputRaw -Encoding UTF8

# Collect all UC-* folders with .html files
$files = Get-ChildItem -Path $root -Recurse -Filter "*.html" | Where-Object { $_.Directory.Name -like "UC-*" }

# Sort files by UC number
$files = $files | Sort-Object { 
    if ($_ -match "UC-(\d+)") { [int]$matches[1] } else { 9999 } 
}

# Start JSON array
"[" | Out-File $outputRaw -Encoding UTF8 -Append

$first = $true
foreach ($file in $files) {
    $lines = Get-Content $file.FullName

    # Get first occurrence of start
    $startMatch = $lines | Select-String -Pattern "const useCaseData = {" | Select-Object -First 1
    if ($startMatch) {
        $start = $startMatch.LineNumber

        # Find first closing "};" after that
        $endMatch = $lines[$start..($lines.Length-1)] | Select-String -Pattern "};" | Select-Object -First 1
        if ($endMatch) {
            $end = $endMatch.LineNumber + $start - 1

            # Extract block safely
            $block = $lines[($start-1)..($end)]

            if (-not $first) {
                "," | Out-File $outputRaw -Encoding UTF8 -Append
            }

            $block -replace "^const useCaseData\s*=\s*", "" -replace ";\s*$","" | Out-File $outputRaw -Encoding UTF8 -Append
            $first = $false
        }
    }
}

# End JSON array
"]" | Out-File $outputRaw -Encoding UTF8 -Append
Write-Host "✅ Raw use cases collected in sorted order into $outputRaw"

# ------------------------------
# STEP 2: Fix JSON keys
# ------------------------------

# Regex: match a key followed by colon
$regex = '^\s*([A-Za-z0-9\-\s\(\)]+):'

Get-Content $outputRaw | ForEach-Object {
    $line = $_
    if ($line -match $regex) {
        $key = $matches[1].Trim()
        $line = $line -replace $regex, ('"' + $key + '":')
    }
    $line
} | Out-File $outputFixed -Encoding UTF8

Write-Host "✅ Fixed JSON saved as $outputFixed"
