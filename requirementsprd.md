# Product Requirements Document (PRD)

## AI-Powered Flash Card Desktop Application

**Target Users:** Students of all ages  
**Primary User:** Parents, Students, Teachers  
**Development Tooling:** VS Code + GitHub Copilot  
**Platform:** Windows Desktop Application (Electron-based)  
**Version:** 2.0 (Desktop with Subject Organization)

---

## 1. Problem Statement

Students and parents need a simple and private way to create **high-quality flashcards** using their **own study notes** (handwritten or printed).

Most existing flashcard apps:

- Generate generic content not aligned with personal study materials
- Require accounts, subscriptions, or cloud storage
- Do not respect privacy of student materials
- Lack subject organization for multiple courses

This application allows users to upload **note images**, extract the content locally, and use AI to generate **highly relevant flashcards** strictly based on those notes. All data is stored privately on the user's computer with subject-based organization.

---

## 2. Goals & Objectives

### Primary Goals

- Generate flashcards strictly from uploaded note images
- Ensure appropriate language for the student's level
- Allow users to control topic, sub-topic, and card count
- Run as a **desktop application** with persistent storage
- Organize flashcard sets by subject
- Provide easy one-click desktop launch

### Implemented Features (v2.0)

- ✅ Desktop application (Electron-based)
- ✅ Subject organization and management
- ✅ File-based persistent storage (AppData)
- ✅ Desktop shortcut for easy launch
- ✅ Study mode with flashcard viewer
- ✅ Set management (view, edit, delete)
- ✅ Statistics dashboard

### Non-Goals

- No cloud synchronization
- No mobile or tablet version
- No spaced repetition algorithms
- No collaborative features

---

## 3. User Personas

### Parent (Primary Creator)

- Creates flashcard sets for their children
- Uploads images of study notes
- Reviews and edits AI-generated flashcards
- Manages subjects and organization

### Student (Primary User)

- Studies using flashcard sets
- Can create their own flashcard sets
- Organizes study materials by subject
- Uses study mode for practice

### Teacher (Extended User)

- Creates practice materials for students
- Generates flashcards from lesson content
- Shares study sets with students

---

## 4. User Flow

1. User launches FlashQ from desktop icon
2. Selects existing subject or creates a new subject
3. Clicks "Create Flashcards" tab
4. Enters:
   - Subject (dropdown with create new option)
   - Main Topic (required)
   - Sub Topic (optional)
   - Number of Flashcards (1-50)
5. Uploads multiple note images
6. Application extracts text using Tesseract.js OCR
7. Extracted text is sent to OpenAI GPT-4o-mini API
8. AI generates flashcards strictly based on extracted notes
9. User reviews and edits flashcards in preview
10. Flashcards are saved to selected subject
11. User can study flashcards immediately or later
12. All data persisted to local file system (AppData)

---

## 5. Functional Requirements

### 5.1 Subject Management

- Create new subjects with custom names
- Default subjects: Math, Science, English, Social Studies
- View all subjects with statistics (set count, card count)
- Delete subjects (with confirmation and cascade delete of sets)
- Subject dropdown in flashcard creation

---

### 5.2 Flashcard Set Creation

- Inputs:
  - Subject (required, dropdown with create new option)
  - Main Topic (required)
  - Sub Topic (optional)
  - Number of Flashcards (1-50, required)
- Support multiple images per flashcard set
- Image preview before OCR processing
- Progress indicator during generation

---

### 5.3 Image Text Extraction (OCR)

- Extract text from uploaded images using **Tesseract.js**
- Support:
  - Handwritten notes (best effort)
  - Printed notes (high accuracy)
- Display extracted text for review
- Handle multiple images per set

---

### 5.4 AI Flashcard Generation

#### Implementation

- **AI Model:** OpenAI GPT-4o-mini
- **API Integration:** Direct REST API calls
- **Temperature:** 0.7 (balanced creativity)
- **Response Format:** JSON mode

#### Inputs to AI

- OCR-extracted text from all uploaded images
- Main Topic
- Sub Topic (if provided)
- Number of flashcards requested
- Student level context (adaptable to user's notes)

#### AI Prompt Instructions

- Use ONLY the provided notes content
- Generate exactly the requested number of flashcards
- No external facts or information
- Clear, concise language appropriate to the content
- Short, focused answers
- One concept per card
- Include source reference when possible

#### Output Format (JSON)

```json
{
  "flashcards": [
    {
      "question": "Clear, specific question based on notes",
      "answer": "Concise answer from the notes",
      "source_reference": "Context from which this was derived"
    }
  ]
}
```

---

### 5.5 Study Mode

- Display flashcards one at a time
- Click to flip and reveal answer
- Previous/Next navigation buttons
- Card counter (e.g., "Card 3 of 10")
- Exit to return to main menu
- Smooth flip animation

---

### 5.6 Data Persistence

#### Storage Location

- Windows: `%AppData%\flashq\flashq-data\`
- Files:
  - `flashcard-sets.json` - All flashcard sets
  - `subjects.json` - All subjects

#### Storage Implementation

- **Desktop Mode:** Node.js `fs` module via Electron IPC
- **Browser Mode:** LocalStorage (fallback)
- Automatic detection of environment
- Async operations with error handling

---

### 5.7 Application Tabs

1. **Create Flashcards** - Generation interface
2. **Study** - Flashcard viewer with flip animation
3. **Subjects** - Subject management and statistics
4. **Manage Sets** - View all sets, delete, view details

---

### 5.8 Desktop Integration

- **Electron Framework:** v28.0.0
- **Main Process:** Window management, file I/O
- **Renderer Process:** UI and application logic
- **Preload Script:** Secure IPC bridge
- **Desktop Shortcut:** One-click launch from desktop
- **App Icon:** Configurable (icon.ico)
- **Build System:** electron-builder for Windows installer

---

## 6. Technical Architecture

### Technology Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Desktop Framework:** Electron 28.0.0
- **OCR Engine:** Tesseract.js 5.0.4
- **AI API:** OpenAI GPT-4o-mini
- **Storage:** Node.js fs module (JSON files)
- **Build Tool:** electron-builder 24.9.1

### File Structure

```
flashq/
├── index.html          # Main UI
├── styles.css          # Complete styling
├── app.js              # Application logic
├── main.js             # Electron main process
├── preload.js          # IPC bridge
├── config.js           # API key (gitignored)
├── config.example.js   # Template
├── package.json        # Dependencies
├── .gitignore          # Security
└── Documentation/      # User guides
```

### Security Measures

- API keys in gitignored config.js
- config.example.js template for sharing
- Safety-Check.ps1 pre-commit verification
- No hardcoded credentials
- Local data storage only

---

## 7. Cost Considerations

- **Application:** Free and open source
- **Node.js:** Free
- **Electron:** Free
- **OpenAI API:** Pay-per-use
  - Model: GPT-4o-mini
  - Estimated: $0.01-0.03 per flashcard set
  - Recommended: Set monthly spending limit ($5)

---

## 8. Future Enhancements

### Potential v3.0 Features

- Export/import flashcard sets (JSON, CSV)
- Print flashcards to PDF
- Study statistics and progress tracking
- Spaced repetition algorithm
- Multi-language support
- Dark mode theme
- Custom app icon creator
- macOS and Linux support
- Multiple AI model options

---

## 9. Success Metrics

- **Usability:** Parents can install without technical help
- **Privacy:** 100% local data storage
- **Accuracy:** AI generates relevant flashcards from notes
- **Performance:** Flashcard generation under 60 seconds
- **Reliability:** Desktop app launches consistently
- **Adoption:** Open source sharing with other families

---

## 10. Appendix

### Installation Requirements

1. Windows 10 or later
2. Node.js 18+ installed
3. OpenAI API key
4. 500MB free disk space
5. Internet connection (for AI API calls)

### Documentation

- README.md - Technical overview
- INSTALLATION-GUIDE-FOR-PARENTS.md - Setup guide
- QUICK-START-GUIDE.md - Usage instructions
- DESKTOP-LAUNCHER-GUIDE.md - Shortcut creation
- GITHUB-PUBLISHING-GUIDE.md - Sharing instructions
- CONTRIBUTING.md - Developer guide

---

**Document Version:** 2.0  
**Last Updated:** December 15, 2025  
**Status:** Implemented and Deployed
