const { app, BrowserWindow, ipcMain, shell, nativeImage} = require('electron')
const path = require('path')
const http = require('http')
const fs = require('fs-extra')

const isDevelopment = process.env.NODE_ENV === 'development'

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
    width: 700,
    height: 400,
    minWidth: 700,
    minHeight: 400,
    backgroundColor: '#000',
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      preload: isDevelopment
        ? path.resolve('src/main/preload.js')
        : path.join(__dirname, 'preload.js')
    }
  })
  const startUrl =
    isDevelopment
      ? 'http://localhost:8080' // URL where webpack-dev-server runs
      : `file://${path.join(__dirname, 'index.html')}`;

  if (isDevelopment) {
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
      if (outputFileExists && !file.overwrite) {
        event.reply('convert-error', `Output file already exists:`, outputFile)
        return
      }
      try {
        const saveBlock = await exportSaveBlock(file.path, outputFile)

        const {Gen3Save} = (await import('./src/main/pkmn/gen3/Gen3Save.mjs'))
        const gen3Save = new Gen3Save({buffer: saveBlock})

        event.reply('convert-success', outputFile, gen3Save)
        shell.showItemInFolder(outputFile)

        if (process.env.NODE_ENV === 'development') {
          // @todo remove
          await fs.writeJson('save.json', gen3Save)
        }
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
