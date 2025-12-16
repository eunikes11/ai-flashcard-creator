# Quick Setup Guide for Desktop Launcher

## Option 1: Create Desktop Shortcut (Recommended for Kids/Parents)

### One-Time Setup:

1. Right-click on `Create-Desktop-Shortcut.ps1`
2. Select "Run with PowerShell"
3. A FlashQ icon will appear on your desktop
4. Done! Just double-click the desktop icon anytime to launch FlashQ

**If you get a security warning:**

- Right-click the file → Properties → Check "Unblock" → OK
- Then try again

---

## Option 2: Manual Desktop Shortcut

1. Right-click on your Desktop
2. Select "New" → "Shortcut"
3. For location, paste this (update YOUR_USERNAME):
   ```
   C:\Users\YOUR_USERNAME\OneDrive\Documents\Maximo\flashq\FlashQ.bat
   ```
4. Click "Next"
5. Name it: `FlashQ`
6. Click "Finish"
7. Right-click the new shortcut → Properties
8. Click "Change Icon" → Browse to `C:\Windows\System32\shell32.dll`
9. Choose a book or education icon
10. Click OK

---

## Option 3: Pin to Start Menu

1. Open File Explorer
2. Navigate to: `C:\Users\skeun\OneDrive\Documents\Maximo\flashq`
3. Right-click `FlashQ.bat`
4. Select "Pin to Start"
5. Now it's in your Start Menu!

---

## Option 4: Pin to Taskbar

1. Create desktop shortcut first (Option 1 or 2)
2. Right-click the desktop shortcut
3. Select "Pin to taskbar"
4. Now you can launch with one click from taskbar!

---

## For Kids - Extra Easy Access

After creating the desktop shortcut:

1. **Drag the FlashQ icon** to the taskbar
2. Now it's always visible at the bottom of the screen
3. Single click to launch - super easy!

---

## Troubleshooting

### "Windows cannot find npm"

- Make sure Node.js is installed
- Restart your computer after Node.js installation

### "Script execution disabled"

Run this in PowerShell as Administrator:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Shortcut doesn't work

- Make sure you ran `npm install` first
- Check that the path in the shortcut is correct
- Try running `FlashQ.bat` directly first

---

## What the Shortcut Does

When you double-click the FlashQ icon:

1. Opens a terminal window (you'll see it briefly)
2. Starts the FlashQ application
3. The FlashQ window appears
4. Ready to create and study flashcards!

**Note:** Keep the terminal window open while using the app. Closing it will close FlashQ.
