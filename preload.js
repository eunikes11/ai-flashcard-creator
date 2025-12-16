const { contextBridge, ipcRenderer } = require("electron");

// Expose protected methods that allow the renderer process to use
// ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld("electronAPI", {
  getSets: () => ipcRenderer.invoke("get-sets"),
  saveSets: (sets) => ipcRenderer.invoke("save-sets", sets),
  getSubjects: () => ipcRenderer.invoke("get-subjects"),
  saveSubjects: (subjects) => ipcRenderer.invoke("save-subjects", subjects),
  getDataPath: () => ipcRenderer.invoke("get-data-path"),
});
