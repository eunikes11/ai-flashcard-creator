# FlashQ Desktop Shortcut Creator
# Run this script once to create a desktop shortcut

$AppPath = $PSScriptRoot
$ShortcutPath = [System.IO.Path]::Combine([Environment]::GetFolderPath("Desktop"), "FlashQ.lnk")
$BatchFile = Join-Path $AppPath "FlashQ.bat"

# Create WScript Shell
$WScriptShell = New-Object -ComObject WScript.Shell

# Create shortcut
$Shortcut = $WScriptShell.CreateShortcut($ShortcutPath)
$Shortcut.TargetPath = $BatchFile
$Shortcut.WorkingDirectory = $AppPath
$Shortcut.Description = "FlashQ - AI-Powered Flashcards for 5th Graders"
$Shortcut.IconLocation = "shell32.dll,265"  # Book icon from Windows
$Shortcut.Save()

Write-Host "Desktop shortcut created successfully!" -ForegroundColor Green
Write-Host "Shortcut location: $ShortcutPath" -ForegroundColor Cyan
Write-Host ""
Write-Host "You can now double-click the FlashQ icon on your desktop to launch the app!" -ForegroundColor Yellow
Write-Host ""
Read-Host "Press Enter to close"
