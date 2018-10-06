'use strict';

const { app, BrowserWindow } = require('electron');

//Module to set app icon
const path = require('path');

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({width: 500, height: 352, icon: path.join(__dirname, 'pomodoro-app-icon.png'), resizable: false});
  mainWindow.loadFile('index.html');

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.setMenu(null);
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
