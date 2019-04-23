'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
// import '../utils/server'
import client from '../utils/client'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 880,
    fullscreen: true,
    center: true,
    title: 'automatic parking',
    vibrancy: 'ultra-dark',
    // transparent: true,
    // titleBarStyle: 'hidden',
    darkTheme: true,
    resizable: false
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

const Server = () => {
  const PORT = 2222
  const HOST = '127.0.0.1'

  const dgram = require('dgram')
  const server = dgram.createSocket('udp4')

  server.on('listening', function () {
    const address = server.address()
    console.log('UDP Server listening on ' + address.address + ':' + address.port)
  })

  server.on('message', function (message, remote) {
    const data = message.toString('utf8')

    const type = data.match(/ANS:(.*?)=/)[1]
    const obj = JSON.parse(data.replace(data.match(/ANS:(.*?)=/)[0], ''))
    switch (type) {
      case 'is_initialize':
        mainWindow.webContents.send('is_initialize-reply', obj)
        break
      case 'runtime_para':
        mainWindow.webContents.send('runtime_para-reply', obj)
        break
    }
  })

  server.bind(PORT, HOST)
}

Server()

ipcMain.once('is_initialize', async (event, file) => {
  console.log(1)
  await client.isInitialize()
  console.log(2)
  await client.runtimePara().catch(res => {
    console.log(res)
  })
  console.log(3)
})

// ipcMain.on('sendMessage', (event, file) => {
//   require('../utils/client')
// })
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
