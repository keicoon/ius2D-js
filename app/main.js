const electron = require('electron');
const url = require('url');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
// const ipcMain = electron.ipcMain;

let mainWindow;

app.on('Window-all-closed', () => {
    if (app.platform != 'darwin') {
        app.quit();
    }
})

app.on('will-quit', () => {
    //
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
})

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    mainWindow.loadURL(process.env.ELECTRON_START_URL || url.format({
        pathname: `${__dirname}/build/index.html`,
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
})