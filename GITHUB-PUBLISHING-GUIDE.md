# 🚀 Publishing FlashQ to GitHub - Quick Guide

## ⚠️ IMPORTANT: Before You Push to GitHub

Follow these steps carefully to ensure NO personal information is uploaded!

---

## Step 1: Verify Your API Key is Protected

1. **Open File Explorer**
2. **Navigate to your FlashQ folder**
3. **Look for these files:**

   - ✅ `config.example.js` - This is SAFE to push (template only)
   - ❌ `config.js` - This should NOT be pushed (contains your API key)

4. **Check `.gitignore`:**
   - Open `.gitignore` file
   - Make sure it contains: `config.js`
   - This prevents your API key from being uploaded

---

## Step 2: Initialize Git Repository

Open PowerShell in the FlashQ folder and run:

```powershell
# Initialize git repository
git init

# Set your git username (use your GitHub username)
git config user.name "YourGitHubUsername"

# Set your git email (use your GitHub email)
git config user.email "your.email@example.com"
```

---

## Step 3: Safety Check - What Will Be Pushed?

Before adding files, let's check what git sees:

```powershell
# See all files
git status

# Check what's ignored
Get-Content .gitignore
```

**Make sure you DO NOT see:**

- ❌ `config.js` in the list
- ❌ `node_modules/` folder
- ❌ `flashq-data/` folder
- ❌ Any `.log` files

**You SHOULD see:**

- ✅ `config.example.js`
- ✅ `package.json`
- ✅ `index.html`
- ✅ All `.md` files
- ✅ Source code files

---

## Step 4: Add Files to Git

```powershell
# Add all safe files
git add .

# Verify what will be committed
git status

# Check specifically that config.js is NOT added
git status | Select-String "config.js"
```

**If you see `config.js` in the output:**

1. STOP! Don't continue!
2. Run: `git reset`
3. Check your `.gitignore` file
4. Make sure `config.js` is listed
5. Try again

---

## Step 5: Commit Your Code

```powershell
# Create your first commit
git commit -m "Initial commit - FlashQ AI-Powered Flashcard Application"
```

---

## Step 6: Create GitHub Repository

1. **Go to GitHub:** https://github.com
2. **Click the "+" icon** (top right)
3. **Select "New repository"**
4. **Fill in details:**
   - Repository name: `flashq` (or your choice)
   - Description: `AI-Powered Flashcard Application for Students`
   - Public or Private: **Your choice**
     - **Public** = Anyone can see and use it
     - **Private** = Only you and people you invite
   - ❌ **DO NOT** check "Initialize with README" (we already have one)
5. **Click "Create repository"**

---

## Step 7: Push to GitHub

GitHub will show you commands. Use these:

```powershell
# Add GitHub as remote (replace USERNAME and REPO-NAME)
git remote add origin https://github.com/USERNAME/REPO-NAME.git

# Push your code
git branch -M main
git push -u origin main
```

**Example:**

```powershell
git remote add origin https://github.com/john-doe/flashq.git
git branch -M main
git push -u origin main
```

You'll be asked to login to GitHub - enter your credentials.

---

## Step 8: Final Verification

After pushing, check your GitHub repository:

1. **Go to your repository on GitHub**
2. **Verify these files ARE there:**

   - ✅ `README.md`
   - ✅ `package.json`
   - ✅ `config.example.js`
   - ✅ `.gitignore`
   - ✅ All source code files

3. **Verify these files are NOT there:**

   - ❌ `config.js` (YOUR API KEY!)
   - ❌ `node_modules/` folder
   - ❌ `flashq-data/` folder

4. **Click on `config.example.js`:**
   - Should say `'your-openai-api-key-here'`
   - Should NOT have your real API key

---

## Step 9: Add Repository Information

1. **Edit `INSTALLATION-GUIDE-FOR-PARENTS.md`:**

   - Find `[YOUR GITHUB REPOSITORY URL]`
   - Replace with your actual GitHub URL
   - Example: `https://github.com/john-doe/flashq`

2. **Commit and push the change:**
   ```powershell
   git add INSTALLATION-GUIDE-FOR-PARENTS.md
   git commit -m "Add GitHub repository URL"
   git push
   ```

---

## Step 10: Share with Other Parents!

Your repository is now ready to share!

**Share this URL with other parents:**

```
https://github.com/YOUR-USERNAME/flashq
```

**Tell them to:**

1. Click the green "Code" button
2. Download ZIP
3. Follow the `INSTALLATION-GUIDE-FOR-PARENTS.md`

---

## 🔒 Security Checklist

Before sharing, verify:

- [ ] `config.js` is NOT in the repository
- [ ] `.gitignore` includes `config.js`
- [ ] `config.example.js` only has placeholder text
- [ ] No personal data in commit history
- [ ] No API keys anywhere in the code
- [ ] `INSTALLATION-GUIDE-FOR-PARENTS.md` is complete

---

## 🔄 Updating Your Repository

When you make changes:

```powershell
# See what changed
git status

# Add changes
git add .

# Commit
git commit -m "Description of what you changed"

# Push to GitHub
git push
```

---

## 🆘 Emergency: I Accidentally Pushed My API Key!

If you accidentally pushed `config.js` with your real API key:

1. **IMMEDIATELY revoke the API key:**

   - Go to: https://platform.openai.com/api-keys
   - Delete the exposed key
   - Create a new one

2. **Remove the file from Git:**

   ```powershell
   git rm --cached config.js
   git commit -m "Remove config.js from repository"
   git push
   ```

3. **Note:** The key might still be in git history. For complete removal:
   - Consider making the repository private
   - Or create a new repository and migrate (more complex)

---

## 💡 Best Practices

1. **Never commit `config.js`** - Always use `config.example.js` as template
2. **Check git status** before every commit
3. **Review changes** before pushing
4. **Keep API keys in environment variables** for extra safety
5. **Regularly update** `.gitignore` if you add new sensitive files

---

## 🎉 You're Done!

Your FlashQ repository is now safely published and ready to help other parents!

**Next steps:**

- Add a description to your GitHub repository
- Consider adding topics/tags (education, ai, flashcards, electron)
- Watch for issues from users
- Share the link with parent communities

---

**Questions?** Check `CONTRIBUTING.md` or open an issue on GitHub!
