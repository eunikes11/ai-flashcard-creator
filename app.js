// FlashQ - AI-Powered Flashcard Application
// Storage keys
const STORAGE_KEY = "flashq_sets";
const SUBJECTS_KEY = "flashq_subjects";

// Global state
let currentFlashcardSet = null;
let currentStudySet = null;
let currentCardIndex = 0;
let generatedFlashcards = [];
let isElectron = false;

// Check if running in Electron
if (typeof window !== "undefined" && window.electronAPI) {
  isElectron = true;
}

// Initialize app
document.addEventListener("DOMContentLoaded", () => {
  initializeTabs();
  initializeCreateForm();
  initializeStudyMode();
  initializeManageMode();
  initializeSubjects();
  loadSets();
  loadSubjectDropdown();
});

// ===== Tab Navigation =====
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetTab = btn.dataset.tab;

      // Remove active class from all buttons and contents
      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // Add active class to clicked button and corresponding content
      btn.classList.add("active");
      document.getElementById(`${targetTab}-tab`).classList.add("active");

      // Refresh lists when switching tabs
      if (targetTab === "study") {
        loadStudySets();
      } else if (targetTab === "manage") {
        loadManageSets();
      } else if (targetTab === "subjects") {
        loadSubjectsTab();
      }
    });
  });
}

// ===== Create Flashcards =====
function initializeCreateForm() {
  const form = document.getElementById("flashcard-form");
  const imageInput = document.getElementById("note-images");
  const imagePreview = document.getElementById("image-preview");

  // New Subject button
  document.getElementById("new-subject-btn").addEventListener("click", () => {
    document.getElementById("subject-modal").classList.remove("hidden");
  });

  // Image preview
  imageInput.addEventListener("change", (e) => {
    imagePreview.innerHTML = "";
    const files = Array.from(e.target.files);

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const previewItem = document.createElement("div");
        previewItem.className = "preview-item";
        previewItem.innerHTML = `
                    <img src="${event.target.result}" alt="Note ${index + 1}">
                `;
        imagePreview.appendChild(previewItem);
      };
      reader.readAsDataURL(file);
    });
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await generateFlashcards();
  });

  // Review buttons
  document
    .getElementById("save-flashcards-btn")
    .addEventListener("click", saveFlashcardSet);
  document
    .getElementById("cancel-review-btn")
    .addEventListener("click", cancelReview);
}

async function generateFlashcards() {
  const subject = document.getElementById("subject").value;
  const mainTopic = document.getElementById("main-topic").value;
  const subTopic = document.getElementById("sub-topic").value;
  const cardCount = parseInt(document.getElementById("card-count").value);
  const imageFiles = document.getElementById("note-images").files;

  if (!subject) {
    alert("Please select a subject.");
    return;
  }

  if (imageFiles.length === 0) {
    alert("Please upload at least one image of your notes.");
    return;
  }

  // Show progress
  showProgress("Extracting text from images...");

  try {
    // Extract text from all images using OCR
    const extractedTexts = [];
    for (let i = 0; i < imageFiles.length; i++) {
      updateProgress(
        `Processing image ${i + 1} of ${imageFiles.length}...`,
        (i / imageFiles.length) * 50
      );
      const text = await extractTextFromImage(imageFiles[i]);
      extractedTexts.push(text);
    }

    const combinedText = extractedTexts.join("\n\n");

    if (!combinedText.trim()) {
      throw new Error(
        "No text could be extracted from the images. Please ensure the images are clear and contain readable text."
      );
    }

    // Generate flashcards using ChatGPT
    updateProgress("Generating flashcards with AI...", 50);
    const flashcards = await generateWithChatGPT(
      combinedText,
      mainTopic,
      subTopic,
      cardCount
    );

    updateProgress("Complete!", 100);

    // Store generated flashcards
    generatedFlashcards = flashcards;
    currentFlashcardSet = {
      subject,
      mainTopic,
      subTopic,
      cardCount,
      extractedText: combinedText,
    };

    // Show review section
    setTimeout(() => {
      hideProgress();
      displayFlashcardsForReview(flashcards);
    }, 500);
  } catch (error) {
    hideProgress();
    alert("Error: " + error.message);
    console.error(error);
  }
}

async function extractTextFromImage(imageFile) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      try {
        const result = await Tesseract.recognize(e.target.result, "eng", {
          logger: (info) => {
            if (info.status === "recognizing text") {
              console.log(`OCR Progress: ${Math.round(info.progress * 100)}%`);
            }
          },
        });
        resolve(result.data.text);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => reject(new Error("Failed to read image file"));
    reader.readAsDataURL(imageFile);
  });
}

async function generateWithChatGPT(
  extractedText,
  mainTopic,
  subTopic,
  cardCount
) {
  if (
    !CONFIG ||
    !CONFIG.OPENAI_API_KEY ||
    CONFIG.OPENAI_API_KEY === "your-openai-api-key-here"
  ) {
    throw new Error("Please configure your OpenAI API key in config.js file");
  }

  const prompt = `You are an educational assistant helping to create flashcards for a 5th-grade student.

Based ONLY on the following study notes, create ${cardCount} flashcards.

Main Topic: ${mainTopic}
${subTopic ? `Sub Topic: ${subTopic}` : ""}

Study Notes:
${extractedText}

Rules:
1. Use ONLY information from the provided notes - do not add external facts
2. Use simple, age-appropriate language for a 5th grader
3. Keep questions clear and concise
4. Keep answers short and easy to understand
5. Focus on one concept per card
6. If the notes don't contain enough information for ${cardCount} cards, create as many as possible with the available content

Return the flashcards in the following JSON format:
{
  "flashcards": [
    {
      "question": "The question text",
      "answer": "The answer text",
      "source_reference": "Brief reference to which part of notes this came from"
    }
  ]
}`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CONFIG.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful educational assistant that creates flashcards for 5th-grade students based strictly on provided study notes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: "json_object" },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `API Error: ${error.error?.message || "Failed to generate flashcards"}`
    );
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  const result = JSON.parse(content);

  return result.flashcards;
}

function displayFlashcardsForReview(flashcards) {
  const reviewSection = document.getElementById("review-section");
  const reviewContainer = document.getElementById("flashcards-review");

  reviewContainer.innerHTML = "";

  flashcards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.className = "flashcard-item";
    cardElement.innerHTML = `
            <div class="flashcard-item-header">
                <h4>Card ${index + 1}</h4>
            </div>
            <div class="edit-group">
                <label>Question:</label>
                <textarea class="question-input" data-index="${index}">${
      card.question
    }</textarea>
            </div>
            <div class="edit-group">
                <label>Answer:</label>
                <textarea class="answer-input" data-index="${index}">${
      card.answer
    }</textarea>
            </div>
            ${
              card.source_reference
                ? `<p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 10px;"><em>Source: ${card.source_reference}</em></p>`
                : ""
            }
        `;
    reviewContainer.appendChild(cardElement);
  });

  reviewSection.classList.remove("hidden");
  reviewSection.scrollIntoView({ behavior: "smooth" });
}

async function saveFlashcardSet() {
  // Collect edited flashcards
  const questions = document.querySelectorAll(".question-input");
  const answers = document.querySelectorAll(".answer-input");

  const flashcards = [];
  questions.forEach((q, index) => {
    flashcards.push({
      question: q.value,
      answer: answers[index].value,
      source_reference: generatedFlashcards[index]?.source_reference || "",
    });
  });

  // Create flashcard set
  const set = {
    id: Date.now(),
    subject: currentFlashcardSet.subject,
    mainTopic: currentFlashcardSet.mainTopic,
    subTopic: currentFlashcardSet.subTopic,
    cardCount: flashcards.length,
    flashcards: flashcards,
    createdAt: new Date().toISOString(),
  };

  // Save to storage
  const sets = await getSets();
  sets.push(set);
  await saveSets(sets);

  alert(`Flashcard set "${set.mainTopic}" saved successfully!`);

  // Reset form
  document.getElementById("flashcard-form").reset();
  document.getElementById("image-preview").innerHTML = "";
  document.getElementById("review-section").classList.add("hidden");
  generatedFlashcards = [];
  currentFlashcardSet = null;
}

function cancelReview() {
  if (confirm("Are you sure? This will discard all generated flashcards.")) {
    document.getElementById("review-section").classList.add("hidden");
    generatedFlashcards = [];
    currentFlashcardSet = null;
  }
}

// ===== Study Mode =====
function initializeStudyMode() {
  document.getElementById("flip-btn").addEventListener("click", flipCard);
  document.getElementById("prev-btn").addEventListener("click", previousCard);
  document.getElementById("next-btn").addEventListener("click", nextCard);
  document
    .getElementById("exit-study-btn")
    .addEventListener("click", exitStudy);
}

async function loadStudySets() {
  const sets = await getSets();
  const container = document.getElementById("study-sets-list");

  if (sets.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <p>No flashcard sets available.</p>
                <p>Create your first set in the "Create Flashcards" tab!</p>
            </div>
        `;
    return;
  }

  container.innerHTML = "";
  sets.forEach((set) => {
    const setItem = document.createElement("div");
    setItem.className = "set-item";
    setItem.innerHTML = `
            <h3>${set.mainTopic}</h3>
            ${set.subTopic ? `<p>${set.subTopic}</p>` : ""}
            <p>${set.flashcards.length} cards • Created ${formatDate(
      set.createdAt
    )}</p>
        `;
    setItem.addEventListener("click", () => startStudying(set));
    container.appendChild(setItem);
  });
}

function startStudying(set) {
  currentStudySet = set;
  currentCardIndex = 0;

  document
    .getElementById("study-sets-list")
    .parentElement.classList.add("hidden");
  document.getElementById("study-mode").classList.remove("hidden");
  document.getElementById("study-set-title").textContent = set.subTopic
    ? `${set.mainTopic} - ${set.subTopic}`
    : set.mainTopic;

  displayCard();
}

function displayCard() {
  const card = currentStudySet.flashcards[currentCardIndex];
  document.getElementById("current-card-num").textContent =
    currentCardIndex + 1;
  document.getElementById("total-cards").textContent =
    currentStudySet.flashcards.length;
  document.getElementById("question-text").textContent = card.question;
  document.getElementById("answer-text").textContent = card.answer;

  // Reset flip
  document.getElementById("flashcard").classList.remove("flipped");

  // Update button states
  document.getElementById("prev-btn").disabled = currentCardIndex === 0;
  document.getElementById("next-btn").disabled =
    currentCardIndex === currentStudySet.flashcards.length - 1;
}

function flipCard() {
  document.getElementById("flashcard").classList.toggle("flipped");
}

function previousCard() {
  if (currentCardIndex > 0) {
    currentCardIndex--;
    displayCard();
  }
}

function nextCard() {
  if (currentCardIndex < currentStudySet.flashcards.length - 1) {
    currentCardIndex++;
    displayCard();
  }
}

function exitStudy() {
  document.getElementById("study-mode").classList.add("hidden");
  document
    .getElementById("study-sets-list")
    .parentElement.classList.remove("hidden");
  currentStudySet = null;
  currentCardIndex = 0;
}

// ===== Manage Mode =====
function initializeManageMode() {
  // Initialized when tab is clicked
}

async function loadManageSets() {
  const sets = await getSets();
  const container = document.getElementById("manage-sets-list");

  if (sets.length === 0) {
    container.innerHTML = `
            <div class="empty-state">
                <p>No flashcard sets to manage.</p>
            </div>
        `;
    return;
  }

  container.innerHTML = "";
  sets.forEach((set) => {
    const setItem = document.createElement("div");
    setItem.className = "set-item";
    setItem.innerHTML = `
            <div class="set-item-header">
                <div>
                    <h3>${set.mainTopic}</h3>
                    ${set.subTopic ? `<p>${set.subTopic}</p>` : ""}
                    <p>${set.flashcards.length} cards • Created ${formatDate(
      set.createdAt
    )}</p>
                </div>
                <div class="set-item-actions">
                    <button class="btn btn-secondary btn-sm view-btn" data-id="${
                      set.id
                    }">View</button>
                    <button class="btn btn-danger btn-sm delete-btn" data-id="${
                      set.id
                    }">Delete</button>
                </div>
            </div>
        `;

    setItem.querySelector(".view-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      viewSetDetails(set);
    });

    setItem.querySelector(".delete-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      deleteSet(set.id);
    });

    container.appendChild(setItem);
  });
}

function viewSetDetails(set) {
  const details = set.flashcards
    .map((card, i) => `Card ${i + 1}:\nQ: ${card.question}\nA: ${card.answer}`)
    .join("\n\n");

  alert(
    `${set.mainTopic}${set.subTopic ? " - " + set.subTopic : ""}\n\n${details}`
  );
}

async function deleteSet(id) {
  if (
    confirm(
      "Are you sure you want to delete this flashcard set? This cannot be undone."
    )
  ) {
    const sets = await getSets();
    const remainingSets = sets.filter((set) => set.id !== id);
    await saveSets(remainingSets);
    await loadManageSets();
    alert("Flashcard set deleted.");
  }
}

// ===== Local Storage =====
async function getSets() {
  if (isElectron) {
    return await window.electronAPI.getSets();
  }
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

async function saveSets(sets) {
  if (isElectron) {
    await window.electronAPI.saveSets(sets);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
  }
}

async function loadSets() {
  // Initial load - can be used for any startup data loading
  const sets = await getSets();
  console.log(`Loaded ${sets.length} flashcard sets`);
}

// ===== Progress UI =====
function showProgress(message) {
  document.getElementById("progress-container").classList.remove("hidden");
  document.getElementById("progress-text").textContent = message;
  document.getElementById("progress-bar-fill").style.width = "0%";
  document.getElementById("generate-btn").disabled = true;
}

function updateProgress(message, percentage) {
  document.getElementById("progress-text").textContent = message;
  document.getElementById("progress-bar-fill").style.width = percentage + "%";
}

function hideProgress() {
  document.getElementById("progress-container").classList.add("hidden");
  document.getElementById("generate-btn").disabled = false;
}

// ===== Utilities =====
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "today";
  if (diffDays === 2) return "yesterday";
  if (diffDays < 7) return `${diffDays - 1} days ago`;

  return date.toLocaleDateString();
}

// ===== Subject Management =====
async function initializeSubjects() {
  // Initialize default subjects if none exist
  const subjects = await getSubjects();
  if (subjects.length === 0) {
    const defaultSubjects = [
      {
        id: 1,
        name: "Math",
        description: "Mathematics and Arithmetic",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Science",
        description: "Natural Sciences",
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        name: "English",
        description: "Reading and Language Arts",
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        name: "Social Studies",
        description: "History and Geography",
        createdAt: new Date().toISOString(),
      },
    ];
    await saveSubjects(defaultSubjects);
  }

  // Modal event listeners
  document
    .getElementById("save-subject-btn")
    .addEventListener("click", createNewSubject);
  document
    .getElementById("cancel-subject-btn")
    .addEventListener("click", () => {
      document.getElementById("subject-modal").classList.add("hidden");
      document.getElementById("new-subject-name").value = "";
      document.getElementById("subject-description").value = "";
    });
}

function getSubjects() {
  if (isElectron) {
    // Return a promise for Electron
    return window.electronAPI.getSubjects();
  }
  const data = localStorage.getItem(SUBJECTS_KEY);
  return Promise.resolve(data ? JSON.parse(data) : []);
}

function saveSubjects(subjects) {
  if (isElectron) {
    return window.electronAPI.saveSubjects(subjects);
  }
  localStorage.setItem(SUBJECTS_KEY, JSON.stringify(subjects));
  return Promise.resolve();
}

async function loadSubjectDropdown() {
  const subjects = await getSubjects();
  const select = document.getElementById("subject");

  // Clear existing options except the first
  select.innerHTML = '<option value="">-- Select Subject --</option>';

  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject.name;
    option.textContent = subject.name;
    select.appendChild(option);
  });
}

async function createNewSubject() {
  const name = document.getElementById("new-subject-name").value.trim();
  const description = document
    .getElementById("subject-description")
    .value.trim();

  if (!name) {
    alert("Please enter a subject name.");
    return;
  }

  const subjects = await getSubjects();

  // Check if subject already exists
  if (subjects.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
    alert("A subject with this name already exists.");
    return;
  }

  const newSubject = {
    id: Date.now(),
    name,
    description,
    createdAt: new Date().toISOString(),
  };

  subjects.push(newSubject);
  await saveSubjects(subjects);

  // Close modal and refresh dropdown
  document.getElementById("subject-modal").classList.add("hidden");
  document.getElementById("new-subject-name").value = "";
  document.getElementById("subject-description").value = "";

  await loadSubjectDropdown();

  // Select the newly created subject
  document.getElementById("subject").value = name;

  alert(`Subject "${name}" created successfully!`);
}

async function loadSubjectsTab() {
  const subjects = await getSubjects();
  const sets = await getSets();

  // Display statistics
  const statsContainer = document.getElementById("subject-stats");
  statsContainer.innerHTML = `
    <div class="stat-card">
      <h3>${subjects.length}</h3>
      <p>Total Subjects</p>
    </div>
    <div class="stat-card">
      <h3>${sets.length}</h3>
      <p>Total Flashcard Sets</p>
    </div>
    <div class="stat-card">
      <h3>${sets.reduce((sum, set) => sum + set.flashcards.length, 0)}</h3>
      <p>Total Flashcards</p>
    </div>
  `;

  // Display subjects
  const container = document.getElementById("subjects-list");

  if (subjects.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No subjects created yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = "";
  subjects.forEach((subject) => {
    const subjectSets = sets.filter((set) => set.subject === subject.name);

    const subjectItem = document.createElement("div");
    subjectItem.className = "subject-item";
    subjectItem.innerHTML = `
      <div class="subject-item-header">
        <div>
          <h3>${subject.name}</h3>
          ${subject.description ? `<p>${subject.description}</p>` : ""}
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 5px;">
            ${subjectSets.length} flashcard sets • ${subjectSets.reduce(
      (sum, set) => sum + set.flashcards.length,
      0
    )} cards
          </p>
        </div>
        <div class="subject-item-actions">
          <button class="btn btn-danger btn-sm delete-subject-btn" data-id="${
            subject.id
          }" data-name="${subject.name}">Delete</button>
        </div>
      </div>
      <div class="subject-sets" id="subject-sets-${subject.id}">
        ${
          subjectSets.length > 0
            ? "<h4>Flashcard Sets:</h4>"
            : '<p style="color: var(--text-secondary); font-style: italic;">No flashcard sets yet</p>'
        }
      </div>
    `;

    // Add flashcard sets for this subject
    if (subjectSets.length > 0) {
      const setsContainer = subjectItem.querySelector(
        `#subject-sets-${subject.id}`
      );
      subjectSets.forEach((set) => {
        const miniSet = document.createElement("div");
        miniSet.className = "mini-set";
        miniSet.innerHTML = `
          <div>
            <span>${set.mainTopic}</span>
            ${set.subTopic ? `<br><small>${set.subTopic}</small>` : ""}
          </div>
          <small>${set.flashcards.length} cards</small>
        `;
        miniSet.addEventListener("click", () => {
          // Switch to study tab and start studying this set
          document.querySelector('[data-tab="study"]').click();
          setTimeout(() => startStudying(set), 100);
        });
        setsContainer.appendChild(miniSet);
      });
    }

    subjectItem
      .querySelector(".delete-subject-btn")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        deleteSubject(subject.id, subject.name);
      });

    container.appendChild(subjectItem);
  });
}

async function deleteSubject(id, name) {
  const sets = await getSets();
  const subjectSets = sets.filter((set) => set.subject === name);

  if (subjectSets.length > 0) {
    if (
      !confirm(
        `This subject has ${subjectSets.length} flashcard set(s). Deleting the subject will also delete all associated flashcard sets. Continue?`
      )
    ) {
      return;
    }
    // Delete all sets for this subject
    const remainingSets = sets.filter((set) => set.subject !== name);
    await saveSets(remainingSets);
  }

  const subjects = await getSubjects();
  const remainingSubjects = subjects.filter((subject) => subject.id !== id);
  await saveSubjects(remainingSubjects);

  await loadSubjectsTab();
  await loadSubjectDropdown();
  alert(`Subject "${name}" deleted successfully.`);
}
