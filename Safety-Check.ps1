# Pre-Push Safety Check Script
# Run this BEFORE pushing to GitHub to verify no sensitive data will be uploaded

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "   FlashQ - GitHub Push Safety Check" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$errors = 0
$warnings = 0

# Check 1: Verify .gitignore exists
Write-Host "[1/6] Checking .gitignore file..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    Write-Host "  OK: .gitignore exists" -ForegroundColor Green
    
    $gitignore = Get-Content ".gitignore"
    if ($gitignore -match "config\.js") {
        Write-Host "  OK: config.js is ignored" -ForegroundColor Green
    } else {
        Write-Host "  ERROR: config.js is NOT in .gitignore!" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "  ERROR: .gitignore not found!" -ForegroundColor Red
    $errors++
}

# Check 2: Verify config.js exists (for local use)
Write-Host "`n[2/6] Checking config.js..." -ForegroundColor Yellow
if (Test-Path "config.js") {
    Write-Host "  OK: config.js exists (for local use)" -ForegroundColor Green
    
    # Check if it contains a real API key
    $configContent = Get-Content "config.js" -Raw
    if ($configContent -match "sk-[a-zA-Z0-9]{20,}") {
        Write-Host "  OK: Contains an API key (will be excluded from git)" -ForegroundColor Green
    } else {
        Write-Host "  WARNING: config.js might not have a valid API key" -ForegroundColor Yellow
        $warnings++
    }
} else {
    Write-Host "  WARNING: config.js not found (create it from config.example.js)" -ForegroundColor Yellow
    $warnings++
}

# Check 3: Verify config.example.js is safe
Write-Host "`n[3/6] Checking config.example.js..." -ForegroundColor Yellow
if (Test-Path "config.example.js") {
    $exampleContent = Get-Content "config.example.js" -Raw
    if ($exampleContent -match "your-openai-api-key-here") {
        Write-Host "  OK: config.example.js contains placeholder only" -ForegroundColor Green
    } elseif ($exampleContent -match "sk-[a-zA-Z0-9]{20,}") {
        Write-Host "  ERROR: config.example.js contains a REAL API KEY!" -ForegroundColor Red
        Write-Host "         Replace it with 'your-openai-api-key-here'" -ForegroundColor Red
        $errors++
    }
} else {
    Write-Host "  ERROR: config.example.js not found!" -ForegroundColor Red
    $errors++
}

# Check 4: Check for node_modules
Write-Host "`n[4/6] Checking node_modules..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "  OK: node_modules exists (should be ignored by git)" -ForegroundColor Green
} else {
    Write-Host "  INFO: node_modules not found (run 'npm install' first)" -ForegroundColor Cyan
}

# Check 5: Check for user data
Write-Host "`n[5/6] Checking for personal data..." -ForegroundColor Yellow
$personalFiles = @("flashq-data", "*.log", ".env")
$foundPersonal = $false
foreach ($pattern in $personalFiles) {
    if (Test-Path $pattern) {
        Write-Host "  INFO: Found $pattern (should be ignored by git)" -ForegroundColor Cyan
        $foundPersonal = $true
    }
}
if (-not $foundPersonal) {
    Write-Host "  OK: No personal data files found" -ForegroundColor Green
}

# Check 6: Git status check (if git is initialized)
Write-Host "`n[6/6] Checking git status..." -ForegroundColor Yellow
try {
    $gitStatus = git status --porcelain 2>&1
    if ($LASTEXITCODE -eq 0) {
        if ($gitStatus -match "config\.js") {
            Write-Host "  ERROR: config.js is staged for commit!" -ForegroundColor Red
            Write-Host "         Run: git reset config.js" -ForegroundColor Red
            $errors++
        } else {
            Write-Host "  OK: config.js is not staged" -ForegroundColor Green
        }
    } else {
        Write-Host "  INFO: Git not initialized (run 'git init' to start)" -ForegroundColor Cyan
    }
} catch {
    Write-Host "  INFO: Git not available or not initialized" -ForegroundColor Cyan
}

# Summary
Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host "   Safety Check Results" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

if ($errors -eq 0 -and $warnings -eq 0) {
    Write-Host "`nSUCCESS: All checks passed!" -ForegroundColor Green
    Write-Host "Your repository is safe to push to GitHub." -ForegroundColor Green
} elseif ($errors -eq 0) {
    Write-Host "`nWARNING: $warnings warning(s) found." -ForegroundColor Yellow
    Write-Host "Review the warnings above, but you can proceed if intended." -ForegroundColor Yellow
} else {
    Write-Host "`nERROR: $errors error(s) found!" -ForegroundColor Red
    Write-Host "FIX THESE ISSUES before pushing to GitHub!" -ForegroundColor Red
    Write-Host "You could expose your API key or personal data!" -ForegroundColor Red
}

Write-Host "`nWhat to do next:" -ForegroundColor Cyan
if ($errors -eq 0) {
    Write-Host "1. Fix any warnings if needed" -ForegroundColor White
    Write-Host "2. Review: GITHUB-PUBLISHING-GUIDE.md" -ForegroundColor White
    Write-Host "3. Run: git add ." -ForegroundColor White
    Write-Host "4. Run: git commit -m 'Your message'" -ForegroundColor White
    Write-Host "5. Run: git push" -ForegroundColor White
} else {
    Write-Host "1. Fix the errors listed above" -ForegroundColor White
    Write-Host "2. Run this script again" -ForegroundColor White
    Write-Host "3. Only proceed when all checks pass" -ForegroundColor White
}

Write-Host "`n==================================================" -ForegroundColor Cyan
Write-Host ""
Read-Host "Press Enter to close"
