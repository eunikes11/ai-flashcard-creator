const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

// Data directory
const userDataPath = app.getPath("userData");
const dataDir = path.join(userDataPath, "flashq-data");

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const setsFilePath = path.join(dataDir, "flashcard-sets.json");
const subjectsFilePath = path.join(dataDir, "subjects.json");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "icon.ico"),
  });

  mainWindow.loadFile("index.html");

  // Open DevTools in development
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// ===== IPC Handlers for File Storage =====

// Get flashcard sets
ipcMain.handle("get-sets", () => {
  try {
    if (fs.existsSync(setsFilePath)) {
      const data = fs.readFileSync(setsFilePath, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error reading sets:", error);
    return [];
  }
});

// Save flashcard sets
ipcMain.handle("save-sets", (event, sets) => {
  try {
    fs.writeFileSync(setsFilePath, JSON.stringify(sets, null, 2), "utf8");
    return { success: true };
  } catch (error) {
    console.error("Error saving sets:", error);
    return { success: false, error: error.message };
  }
});

// Get subjects
ipcMain.handle("get-subjects", () => {
  try {
    if (fs.existsSync(subjectsFilePath)) {
      const data = fs.readFileSync(subjectsFilePath, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("Error reading subjects:", error);
    return [];
  }
});

// Save subjects
ipcMain.handle("save-subjects", (event, subjects) => {
  try {
    fs.writeFileSync(
      subjectsFilePath,
      JSON.stringify(subjects, null, 2),
      "utf8"
    );
    return { success: true };
  } catch (error) {
    console.error("Error saving subjects:", error);
    return { success: false, error: error.message };
  }
});

// Get data directory path
ipcMain.handle("get-data-path", () => {
  return dataDir;
});
