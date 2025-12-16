# FlashQ - AI-Powered Flashcards for Students

An AI-powered flashcard **Windows desktop application** that generates study materials from your own study notes. Perfect for students of all ages with subject organization and persistent file storage.

> **📌 New User? Parents, start here:** [INSTALLATION-GUIDE-FOR-PARENTS.md](INSTALLATION-GUIDE-FOR-PARENTS.md)  
> **🚀 Want to share on GitHub?** [GITHUB-PUBLISHING-GUIDE.md](GITHUB-PUBLISHING-GUIDE.md)  
> **👨‍👩‍👧 Quick Start:** [QUICK-START-GUIDE.md](QUICK-START-GUIDE.md)

---

## 🎯 Perfect For

- ✅ **Students of all ages** studying any subject
- ✅ **Parents** who want to help their kids study
- ✅ **Homeschool families** creating custom study materials
- ✅ **Teachers** generating practice materials
- ✅ **College students** preparing for exams
- ✅ **Anyone** who learns better with flashcards

## 🆕 New Features (v2.0)

✨ **Subject Organization** - Create subjects and organize flashcard sets under each subject  
💾 **Persistent Storage** - All data saved to files, never lose your flashcards  
🖥️ **Desktop Application** - One-click launch, no browser needed  
📊 **Statistics Dashboard** - Track subjects, sets, and total flashcards  
🔄 **Quick Study** - Start studying any set directly from the Subjects tab

## ✨ Features

✨ **AI-Generated Flashcards** - Uses ChatGPT to create flashcards strictly from uploaded notes  
📸 **Image OCR** - Extracts text from handwritten or printed notes  
🎯 **Smart Content** - Language adapted to your study materials  
🔒 **100% Private** - All data stored on your computer, no cloud storage  
✏️ **Editable** - Review and edit AI-generated flashcards before saving  
📚 **Study Mode** - Interactive flashcard viewer with flip animation  
📁 **Subject Management** - Organize flashcards by subject (Math, Science, etc.)  
🚀 **Easy Launch** - Desktop shortcut for one-click access

---

## 📋 Requirements

- Windows 10 or later
- Node.js 18+ installed ([Download here](https://nodejs.org/))
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

---

## 🚀 Quick Installation

1. **Navigate to the project folder**

   ```powershell
   cd <path-to-flashq-folder>
   ```

2. **Install dependencies**

   ```powershell
   npm install
   ```

3. **Configure your OpenAI API key**

   - Copy `config.example.js` to `config.js`:
     ```powershell
     copy config.example.js config.js
     ```
   - Open `config.js` in a text editor
   - Replace `'your-openai-api-key-here'` with your actual OpenAI API key
   - Save the file

4. **Create Desktop Shortcut (One-time setup)**

   ```powershell
   .\Create-Desktop-Shortcut.ps1
   ```

   A FlashQ icon will appear on your desktop!

5. **Launch the application**
   - **Easy way**: Double-click the FlashQ icon on your desktop
   - **Or via terminal**: `npm start`

## For Kids & Parents - Quick Launch

After setup, launching FlashQ is super easy:

1. **Desktop Icon**: Double-click the FlashQ shortcut on your desktop
2. **Start Menu**: Search for "FlashQ" in Windows Start Menu
3. **Taskbar**: Drag the desktop icon to your taskbar for one-click access

**No need to open terminal or run commands!** Just click the icon and start studying! 🎓

## Building for Distribution

To create a Windows installer (.exe):

```powershell
npm run build
```

The installer will be created in the `dist` folder.

## Data Storage

### Desktop App (Electron)

- **Location**: `C:\Users\[YourName]\AppData\Roaming\flashq\flashq-data\`
- **Files**:
  - `flashcard-sets.json` - All your flashcard sets
  - `subjects.json` - All your subjects
- **Backup**: Simply copy these JSON files to back up your data

### Web Version (Browser)

- Data stored in browser's Local Storage
- Clear browser data = lose flashcards
- Each browser has separate storage

## Usage

### Managing Subjects

1. Click the **"Subjects"** tab to view all subjects
2. Click **"+ New Subject"** in the Create tab to add a new subject
3. Default subjects: Math, Science, English, Social Studies
4. View statistics: total subjects, sets, and flashcards
5. Click any flashcard set in the Subjects tab to start studying
6. Delete subjects (warning: deletes all associated flashcard sets)

### Creating Flashcards

1. Click the **"Create Flashcards"** tab
2. Select a **Subject** (or create a new one)
3. Fill in:
   - **Main Topic**: Required (e.g., "The Water Cycle")
   - **Sub Topic**: Optional (e.g., "Evaporation Process")
   - **Number of Flashcards**: How many cards to generate (1-50)
4. Upload images of your child's notes (handwritten or printed)
5. Click **"Generate Flashcards"**
6. Review and edit the generated flashcards
7. Click **"Save Flashcard Set"**

### Studying

1. Click the **"Study"** tab
2. Select a flashcard set from the list
3. Click **"Flip Card"** to reveal the answer
4. Use **Previous** and **Next** buttons to navigate
5. Click **"Exit"** when done

### Managing Sets

1. Click the **"Manage Sets"** tab
2. View all saved flashcard sets
3. Click **"View"** to see all cards in a set
4. Click **"Delete"** to remove a set

## Technology Stack

- **Desktop**: Electron (Windows app)
- **Frontend**: HTML, CSS, JavaScript
- **OCR**: Tesseract.js (browser-based OCR)
- **AI**: OpenAI GPT-4o-mini API
- **Storage**: JSON files (persistent file system storage)

## Troubleshooting

### "Please configure your OpenAI API key"

- Make sure you've created `config.js` from `config.example.js`
- Verify your API key is correct in `config.js`

### OCR not extracting text properly

- Ensure images are clear and well-lit
- Handwriting should be legible
- Printed text works better than handwriting
- Try uploading higher quality images

### Flashcards not saving

- Check the data folder: `%AppData%\flashq\flashq-data\`
- Ensure you have write permissions
- Check for disk space

### App won't start

- Make sure Node.js is installed: `node --version`
- Run `npm install` again
- Delete `node_modules` folder and run `npm install` again

### Where is my data?

Run in PowerShell to find your data folder:

```powershell
explorer $env:APPDATA\flashq\flashq-data
```

## API Costs

This application uses the OpenAI API which has costs:

- Model: GPT-4o-mini
- Approximate cost: $0.01-0.03 per flashcard set (depends on note length)
- [Check current pricing](https://openai.com/api/pricing/)

## Development

### Web Version (Development/Testing)

```powershell
npm run dev
```

Opens in browser at http://localhost:8081

### Desktop Version

```powershell
npm start
```

## License

MIT License - Feel free to modify and use for personal purposes

## Support

For issues or questions:

- Check the Troubleshooting section above
- Check console for error messages (Ctrl+Shift+I in Electron)
- Ensure all requirements are met
- Verify data files exist in `%AppData%\flashq\flashq-data\`

---

Made with ❤️ for parents helping their students study smarter
