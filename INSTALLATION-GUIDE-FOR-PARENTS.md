# 🎓 FlashQ - Setup Guide for Parents

> **AI-Powered Flashcard Application for Students**  
> Help your child study smarter with AI-generated flashcards from their own notes!

---

## 📋 What You'll Need

Before you begin, make sure you have:

1. ✅ **Windows 10 or later** (This is a Windows-only application)
2. ✅ **Internet connection** (For downloading and AI features)
3. ✅ **30 minutes of time** for first-time setup
4. ✅ **OpenAI account** (We'll guide you through this - it's free to create)

---

## 🚀 Step-by-Step Installation Guide

### Step 1: Install Node.js (Required)

Node.js is free software that runs the application.

1. **Download Node.js:**

   - Go to: https://nodejs.org/
   - Click the **green button** that says "Download Node.js (LTS)"
   - The file will be named something like `node-v20.x.x-x64.msi`

2. **Install Node.js:**

   - Double-click the downloaded file
   - Click "Next" through all screens (use default settings)
   - Click "Finish" when done

3. **Verify Installation:**

   - Press `Windows Key + R`
   - Type: `cmd` and press Enter
   - In the black window, type: `node --version`
   - You should see something like `v20.10.0`
   - If you see a version number, you're good! Close the window.

4. **Restart your computer** (Important!)

---

### Step 2: Get Your OpenAI API Key

The AI needs an API key to generate flashcards. This is like a password for the AI service.

1. **Create OpenAI Account:**

   - Go to: https://platform.openai.com/signup
   - Sign up with your email
   - Verify your email address

2. **Add Payment Method:**

   - Go to: https://platform.openai.com/account/billing
   - Click "Add payment method"
   - Add a credit/debit card
   - **Cost:** Approximately $0.01-0.03 per flashcard set (very cheap!)
   - **Tip:** Set a monthly spending limit (e.g., $5) for safety

3. **Get Your API Key:**
   - Go to: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Give it a name like "FlashQ"
   - **IMPORTANT:** Copy the key that appears (starts with `sk-`)
   - Save it in a safe place (you'll need it in Step 4)
   - **Warning:** This key is like a password - don't share it with anyone!

---

### Step 3: Download FlashQ

1. **Download from GitHub:**

   - Go to: [YOUR GITHUB REPOSITORY URL]
   - Click the green "Code" button
   - Click "Download ZIP"

2. **Extract the Files:**

   - Find the downloaded ZIP file (usually in your Downloads folder)
   - Right-click the ZIP file
   - Select "Extract All..."
   - Choose a location like: `C:\FlashQ\` or your Documents folder
   - Click "Extract"

3. **Open the Folder:**
   - Navigate to where you extracted the files
   - You should see files like `package.json`, `index.html`, etc.

---

### Step 4: Configure FlashQ

1. **Open PowerShell in the FlashQ folder:**

   - Hold `Shift` and right-click inside the FlashQ folder
   - Select "Open PowerShell window here" or "Open in Terminal"
   - A blue window should open

2. **Install Dependencies:**

   - In the PowerShell window, type:
     ```powershell
     npm install
     ```
   - Press Enter
   - Wait 2-5 minutes while it downloads needed files
   - You'll see lots of text scrolling - this is normal!
   - When it's done, you'll see a command prompt again

3. **Add Your API Key:**
   - In the FlashQ folder, find the file: `config.example.js`
   - Make a copy of this file and name it: `config.js`
   - Open `config.js` with Notepad
   - You'll see:
     ```javascript
     const CONFIG = {
       OPENAI_API_KEY: "your-openai-api-key-here",
     };
     ```
   - Replace `'your-openai-api-key-here'` with your actual API key from Step 2
   - It should look like:
     ```javascript
     const CONFIG = {
       OPENAI_API_KEY: "sk-abc123...",
     };
     ```
   - **Save the file** and close Notepad

---

### Step 5: Create Desktop Shortcut

Make it easy for your child to launch FlashQ!

1. **In PowerShell** (from Step 4), type:

   ```powershell
   .\Create-Desktop-Shortcut.ps1
   ```

   Press Enter

2. **If you see a security warning:**

   - Type `Y` and press Enter
   - This is normal - Windows is just being careful

3. **Success!**
   - You should see "Desktop shortcut created successfully!"
   - Look on your desktop - there's now a FlashQ icon!

---

### Step 6: Launch FlashQ!

🎉 **You're ready to go!**

- **Double-click the FlashQ icon** on your desktop
- The application will open in a few seconds
- You're now ready to create flashcards!

---

## 📱 How to Use FlashQ

### For Parents: Creating Flashcards

1. **Launch FlashQ** (double-click desktop icon)
2. **Select or create a Subject** (Math, Science, etc.)
3. **Enter the topic** your child is studying
4. **Take photos** of your child's notes or textbook pages
   - Use your phone or scanner
   - Make sure the text is clear and readable
5. **Upload the photos** in FlashQ
6. **Click "Generate Flashcards"**
7. **Wait 30-60 seconds** while AI:
   - Reads the text from photos
   - Creates age-appropriate questions and answers
8. **Review and edit** if needed
9. **Save** the flashcard set

### For Kids: Studying

1. **Click the "Study" tab**
2. **Choose a flashcard set**
3. **Read the question**
4. **Think of your answer**
5. **Click "Flip Card"** to see the correct answer
6. **Use arrow buttons** to practice all cards

---

## 💡 Tips for Best Results

### Taking Good Photos of Notes:

- ✅ Good lighting (near a window or lamp)
- ✅ Clear, readable handwriting
- ✅ Flat page (no wrinkles or folds)
- ✅ Entire text visible in photo
- ✅ Multiple photos are fine - upload them all!

### Creating Effective Flashcards:

- Start with 5-10 cards per topic
- Focus on one subject at a time
- Use your child's actual study materials
- Review and edit AI-generated cards
- Make sure questions match grade level

### Study Tips:

- Practice daily (10-15 minutes)
- Review old sets regularly
- Celebrate progress!
- Make it fun, not stressful

---

## 🔒 Privacy & Safety

**Your data is 100% private:**

- ✅ All flashcards stored on YOUR computer only
- ✅ No data shared with anyone
- ✅ Photos are not saved (only the text extracted)
- ✅ No accounts or logins required
- ✅ Your API key stays on your computer

**Data Location:**

- Stored at: `C:\Users\[YourName]\AppData\Roaming\flashq\flashq-data\`

**To Backup:**

- Copy the `flashq-data` folder to a USB drive or cloud storage

---

## 💰 Costs

**One-time Setup:**

- Node.js: **FREE**
- FlashQ Application: **FREE**
- OpenAI Account: **FREE to create**

**Ongoing Usage:**

- Per flashcard set: **$0.01 - $0.03** (about 1-3 cents)
- Typical monthly cost: **$1 - $5** (depending on usage)
- **Tip:** Set a $5 monthly limit in OpenAI for safety

---

## ❓ Troubleshooting

### "Windows cannot find npm"

- **Solution:** Make sure you installed Node.js and restarted your computer

### "Please configure your OpenAI API key"

- **Solution:** Make sure you created `config.js` (not `config.example.js`)
- Check that your API key is correctly pasted
- Make sure the API key starts with `sk-`

### Photos not being read correctly

- **Solution:**
  - Use clearer photos with better lighting
  - Try printed text instead of handwriting
  - Make sure text is not too small
  - Upload one page at a time

### FlashQ won't open

- **Solution:**
  - Right-click the desktop shortcut → "Run as administrator"
  - Make sure Node.js is installed: Open Command Prompt, type `node --version`
  - Try running from PowerShell: `npm start`

### "Payment required" error

- **Solution:**
  - Go to OpenAI billing: https://platform.openai.com/account/billing
  - Add a payment method
  - Add $5 credit to start

---

## 🆘 Getting Help

If you get stuck:

1. **Check the troubleshooting section above**
2. **Read the error message carefully** - it often tells you what's wrong
3. **Ask in the GitHub Issues** - [YOUR GITHUB REPO]/issues
4. **Include in your help request:**
   - What step you're on
   - What error message you see
   - Your Windows version
   - Screenshots if possible

---

## 📊 What Parents Are Saying

> "My daughter loves using FlashQ! She can study independently now."

> "Setting it up was easier than I thought. The guide was very clear."

> "The AI generates perfect questions from her class notes!"

---

## 🎯 Next Steps

After setup:

1. ✅ Create your first flashcard set together
2. ✅ Let your child try the Study mode
3. ✅ Create subjects for all their classes
4. ✅ Make it part of the daily homework routine
5. ✅ Share with other parents if it helps!

---

## 📄 License & Sharing

FlashQ is **free and open source**. You can:

- ✅ Use it for your family
- ✅ Share it with other parents
- ✅ Modify it for your needs
- ✅ Help improve it on GitHub

**Please share the love!** If FlashQ helps your child, tell other parents about it!

---

## 🌟 Support the Project

If FlashQ helps your child:

- ⭐ Star the GitHub repository
- 📢 Share with other parents
- 💡 Suggest improvements
- 🐛 Report bugs you find

---

**Ready to help your child study smarter? Let's get started! 🚀**

Need help? Open an issue on GitHub and we'll help you out!
