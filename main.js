const { app, BrowserWindow, Menu, dialog, globalShortcut } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join('C:\\', 'Users', 'zohan', 'Downloads', 'ut', 'TFI.ico'), // Set the app icon
    webPreferences: {
      nodeIntegration: true
    }
  });

  // Load the index.html
  win.loadFile('index.html');

  // Show the message box with the information when the app starts
  dialog.showMessageBox(win, {
    type: 'info',
    title: 'Tiny Fishing - Welcome!',
    message: `Tiny Fishing is a fun, casual game where you cast your fishing line and try to catch the biggest fish in the sea. The deeper you go, the rarer the fish you can catch! Dive in and test your fishing skills.\n\nTIPS:\nPRESS ALT 3 TO FULLSCREEN THE GAME AND PRESS ALT 2 TO UNFULLSCREEN\n\nIf you press alt 2 while it's not fullscreened, it gives you an error "Please fullscreen before using this key."`,
    buttons: ['OK']
  });

  // Register the Alt+3 global shortcut to toggle fullscreen
  globalShortcut.register('Alt+3', () => {
    if (win.isFullScreen()) {
      win.setFullScreen(false); // If already fullscreen, exit fullscreen
    } else {
      win.setFullScreen(true); // Otherwise, enter fullscreen
    }
  });

  // Register the Alt+2 global shortcut for unfullscreen with an error message
  globalShortcut.register('Alt+2', () => {
    if (!win.isFullScreen()) {
      dialog.showErrorBox('Error', 'Please fullscreen before using this key');
    } else {
      win.setFullScreen(false); // Exit fullscreen
    }
  });
}

// Disable the application menu
app.whenReady().then(() => {
  createWindow();
  Menu.setApplicationMenu(null); // This removes the default menu

  // Quit the app when all windows are closed
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
