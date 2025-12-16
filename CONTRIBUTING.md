# Contributing to FlashQ

Thank you for your interest in contributing to FlashQ! This document will help you get started.

## How to Share This Project

### For Other Parents

If you want to share FlashQ with other parents:

1. **Share the GitHub repository URL**
2. **Direct them to:** `INSTALLATION-GUIDE-FOR-PARENTS.md`
3. That guide has everything they need!

### For Developers

If you want to contribute code:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Important: Protecting User Privacy

### NEVER Commit These Files:

- ❌ `config.js` (contains API keys)
- ❌ `flashq-data/` (user's personal flashcards)
- ❌ `node_modules/` (dependencies)
- ❌ `.env` files (environment variables)

These are already in `.gitignore` - don't remove them!

### Before Committing:

1. **Check your changes:**

   ```bash
   git status
   ```

2. **Make sure no sensitive data is included:**

   ```bash
   git diff
   ```

3. **Never commit:**
   - API keys
   - Personal data
   - User's flashcards
   - Configuration with real values

## Setting Up for Development

1. Clone the repository
2. Copy `config.example.js` to `config.js`
3. Add your own OpenAI API key to `config.js`
4. Install dependencies: `npm install`
5. Run: `npm start`

## Code Guidelines

- Keep code simple and readable
- Add comments for complex logic
- Test on Windows before submitting
- Follow existing code style
- Update documentation if needed

## Reporting Issues

Found a bug? Have a suggestion?

1. Check existing issues first
2. Create a new issue with:
   - Clear description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if helpful

## Feature Requests

Have an idea for improvement?

1. Open an issue with "Feature Request" in title
2. Describe the feature and why it would help
3. Share how you imagine it working

## Questions?

Open an issue with "Question" in the title and we'll help!

---

Thank you for helping make FlashQ better for students and parents! 🎓
