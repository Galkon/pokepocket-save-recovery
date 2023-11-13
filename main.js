const { app, BrowserWindow, ipcMain, shell, nativeImage} = require('electron')
const path = require('path')
const http = require('http')
const fs = require('fs-extra')

function pollServer(url) {
  return new Promise(resolve => {
    const request = http.get(url, () => {
      resolve(true);
      request.abort(); // We don't need to read the response, just knowing the server is up is enough
    });

    request.on('error', () => {
      setTimeout(() => {
        console.log(`Polling for dev server...`);
        resolve(pollServer(url)); // Retry after a delay
      }, 1000);
    });
  });
}

/**
 * Create and return the {@link BrowserWindow} instance.
 * @returns {Promise<Electron.CrossProcessExports.BrowserWindow>}
 */
const createWindow = async () => {
  const win = new BrowserWindow({
    width: 520,
    height: 420,
    backgroundColor: '#2A5167',
    icon: path.resolve(path.join(__dirname, 'build', 'icon.png')),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  const startUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080' // URL where webpack-dev-server runs
      : `file://${path.join(__dirname, 'dist/index.html')}`;

  if (process.env.NODE_ENV === 'development') {
    await pollServer(startUrl); // Wait for server to be ready
  }

  await win.loadURL(startUrl)
  return win
}

/**
 * Wait for app ready and initialize the window.
 * @returns {Promise<void>}
 */
const start = async () => {
  await app.whenReady()
  let window = await createWindow()
  let activating = false

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', async () => {
    if (!activating && window.isDestroyed()) {
      activating = true
      window = await createWindow()
      activating = false
    }
  })

  const {exportSaveBlock} = (await import('./src/main/utils/export.mjs'))

  ipcMain.on('convert-to-sav', async (event, file) => {
    try {
      const inputFileExists = await fs.pathExists(file.path)
      if (!inputFileExists) {
        event.reply('convert-error', `Input file does not exist: ${file.path}`)
        return
      }
      const outputFile = path.resolve(file.path.replace('.sta', '.sav'))
      const outputFileExists = await fs.pathExists(outputFile)
      if (outputFileExists) {
        event.reply('convert-error', `Output file already exists:`, outputFile)
        return
      }
      try {
        await exportSaveBlock(file.path, outputFile)
        event.reply('convert-success', outputFile)
        shell.showItemInFolder(outputFile)
      } catch (err) {
        event.reply('convert-error', `Error exporting save block: ${err.message}`)
        console.error(err)
      }
    } catch (err) {
      event.reply('convert-error', `Unknown error: ${err.message}`)
      console.error('Error converting:', err)
    }
  })
}

// run the start func
start()
