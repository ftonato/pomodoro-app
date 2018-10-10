'use strict';

const { app, BrowserWindow } = require('electron');

// Module to set app icon
const path = require('path');
const _ICON = 'pomodoro-app-icon.png';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({ width: 500, height: 352, icon: path.join(__dirname, _ICON), resizable: false });
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  mainWindow.setMenu(null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('browser-window-created', function(e, window) {
  window.setMenu(null);
  // Open the DevTools.
  // window.openDevTools();
});
