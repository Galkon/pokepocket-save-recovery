const { app, BrowserWindow, ipcMain, shell, dialog} = require('electron')
const path = require('path')
const http = require('http')
const fs = require('fs-extra')

const isDevelopment = process.env.NODE_ENV === 'development'

function pollServer(url) {
  return new Promise(resolve => {
    const request = http.get(url, (res) => {
      resolve(true);
      request.abort(); // We don't need to read the response, just knowing the server is up is enough
    });

    request.on('error', (err) => {
      setTimeout(() => {
        console.log(`Polling for dev server:`, url);
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
    show: false,
    width: 720,
    height: 420,
    minWidth: 720,
    minHeight: 420,
    backgroundColor: '#184a73',
    webPreferences: {
      contextIsolation: true,
      sandbox: false,
      preload: isDevelopment
        ? path.join(__dirname, 'src', 'main', 'preload.js')
        : path.join(__dirname, 'preload.js')
    }
  })

  const startUrl =
    isDevelopment
      ? `http://127.0.0.1:3000`
      : `file://${path.join(__dirname, 'index.html')}`

  win.removeMenu()
  win.once('ready-to-show', () => {
    win.show()
  })

  if (isDevelopment) {
    await pollServer(startUrl)
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

  ipcMain.on('load-save', async (event, file) => {
    const inputFileExists = await fs.pathExists(file.path)
    if (!inputFileExists) {
      event.reply('convert-error', `Input file does not exist: ${file.path}`)
      return
    }
    try {
      // support loading .sav or extracting save from .sta
      const saveBlock = file.name.endsWith('.sta')
        ? await exportSaveBlock(file.path)
        : await fs.readFile(file.path)

      try {
        const {Gen3Save} = (await import('./src/main/pkmn/gen3/Gen3Save.mjs'))
        const gen3Save = new Gen3Save({buffer: saveBlock})
        event.reply('loaded-save', gen3Save)

        // @todo remove this eventually
        if (process.env.NODE_ENV === 'development') {
          await fs.writeJson('save.json', gen3Save)
        }
      } catch (err) {
        event.reply('error', `Failed to decode save`)
      }
    } catch (err) {
      event.reply('error', `Error loading save: ${err.message}`)
      console.error(err)
    }
  })

  ipcMain.on('export-save', async (event, inputFile) => {
    const {filePath} = await dialog.showSaveDialog({
      title: 'Export Pokemon .sav file',
      defaultPath: inputFile.path.replace('.sta', '.sav')
    })
    if (!filePath) {
      console.log('Canceled file save')
      return
    }
    try {
      const inputFileExists = await fs.pathExists(inputFile.path)
      if (!inputFileExists) {
        event.reply('error', `Input file does not exist: ${inputFile.path}`)
        return
      }
      const outputFile = filePath
      try {
        await exportSaveBlock(inputFile.path, {outputFile})
        shell.showItemInFolder(outputFile)
        event.reply('convert-success', outputFile)
      } catch (err) {
        event.reply('error', `Error exporting save block: ${err.message}`)
        console.error(err)
      }
    } catch (err) {
      event.reply('error', `Unknown error: ${err.message}`)
      console.error('Error converting:', err)
    }
  })
}

// run the start func
start()
