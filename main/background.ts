import path from 'path'
import { app, ipcMain, protocol } from 'electron'
import serve from 'electron-serve'
import { createWindow } from './helpers'
import fs from 'fs'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }

  // Create custom protocol for local media loading
  protocol.registerFileProtocol("media-loader", (request, callback) => {
    const url = request.url.replace("media-loader://", "");
    try {
      return callback(url);
    } catch (err) {
      console.error(err);
      return callback("error");
    }
  });
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.on('message', async (event, arg) => {
  event.reply('message', `${arg} World!`)
})

ipcMain.handle('getVideo', async (event, arg) => {
  fs.readFile(arg, (err, data) => {
    if (err) {
      console.log("Error reading file:", arg, err)
      return null
    } else {
      return data
    }
  })
})
