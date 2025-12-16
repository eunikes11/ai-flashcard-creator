# FlashQ v2.0 - Enhancement Summary

## What Was Enhanced

### 1. **Subject Organization System**

- Added a new "Subjects" tab
- Users can create custom subjects (Math, Science, English, etc.)
- Default subjects pre-configured
- Flashcard sets are now organized under subjects
- Each subject shows statistics (number of sets, total cards)

### 2. **Windows Desktop Application**

- Converted from web app to Electron desktop app
- Runs as standalone Windows application
- No browser required
- Professional desktop experience

### 3. **Persistent File Storage**

- Data saved to JSON files instead of browser storage
- Location: `%AppData%\flashq\flashq-data\`
- Files:
  - `flashcard-sets.json` - All flashcard sets
  - `subjects.json` - All subjects
- Easy backup: just copy the files
- Data persists across app restarts and computer restarts

### 4. **Enhanced User Interface**

- New subject selection dropdown in Create tab
- "+ New Subject" button with modal dialog
- Statistics dashboard showing:
  - Total subjects
  - Total flashcard sets
  - Total flashcards
- Subject cards showing associated flashcard sets
- Click any set in Subjects tab to start studying immediately

### 5. **Improved Data Organization**

**Before:**

```
Flashcard Set
├── Main Topic (e.g., "Science")
├── Sub Topic (e.g., "Water Cycle")
└── Flashcards
```

**After:**

```
Subject (e.g., "Science")
└── Flashcard Set
    ├── Main Topic (e.g., "Water Cycle")
    ├── Sub Topic (e.g., "Evaporation")
    └── Flashcards
```

## New Features

### Subject Management

- Create unlimited subjects
- Each subject has name and description
- Delete subjects (with warning about associated sets)
- View all sets per subject
- Quick study from subject view

### Desktop Application Features

- Persistent storage in AppData
- No dependency on browser
- Can be built into Windows installer (.exe)
- Auto-launch capability
- Professional window management

### Enhanced Workflow

1. **Create Subject** → Math, Science, History, etc.
2. **Create Flashcard Set** under a subject
3. **View by Subject** in the Subjects tab
4. **Quick Study** - Click any set to start studying

## Technical Improvements

### Architecture

- **main.js** - Electron main process (Node.js)
- **preload.js** - Secure bridge between main and renderer
- **app.js** - Enhanced with async file operations
- **Storage** - Dual mode (Electron files / Browser localStorage)

### Data Persistence

- File-based storage using Node.js fs module
- Automatic directory creation
- Error handling for file operations
- Backward compatible with browser mode

### Commands

- `npm start` - Launch desktop app
- `npm run dev` - Launch in browser (development)
- `npm run build` - Create Windows installer

## Files Modified

1. **package.json** - Updated for Electron
2. **index.html** - Added Subjects tab and subject selection
3. **styles.css** - New styles for subjects and modal
4. **app.js** - Subject management + async storage
5. **README.md** - Complete documentation update

## Files Created

1. **main.js** - Electron main process
2. **preload.js** - IPC bridge
3. **ICON-README.txt** - Icon instructions

## How to Use

### First Time Setup

```powershell
cd <your-flashq-folder>
npm install
copy config.example.js config.js
# Edit config.js with your OpenAI API key
npm start
```

### Daily Use

```powershell
npm start
```

### Data Location

Your flashcards are saved in:

```
%AppData%\flashq\flashq-data\
```

## Benefits

✅ **Never Lose Data** - Files persist forever  
✅ **Organized Learning** - Group by subjects  
✅ **Professional App** - Desktop application experience  
✅ **Easy Backup** - Copy JSON files  
✅ **Quick Access** - Study from any subject  
✅ **Statistics** - Track your progress  
✅ **Portable** - Can build installer for distribution

## Next Steps (Optional Enhancements)

- Add app icon (icon.ico)
- Build Windows installer for distribution
- Add import/export functionality
- Add search/filter for flashcard sets
- Add study statistics (cards studied, accuracy)
- Add spaced repetition algorithm
- Add multi-user support

---

**Version**: 2.0  
**Date**: December 15, 2025  
**Status**: Ready for Use ✅
