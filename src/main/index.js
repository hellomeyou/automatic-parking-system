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
    // fullscreen: true,
    center: true,
    title: 'automatic parking',
    vibrancy: 'ultra-dark',
    // transparent: true,
    // titleBarStyle: 'hidden',
    darkTheme: true
    // resizable: false
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
    let type = ''
    let obj = {}

    if (data.match(/Err/)) {
      obj.success = false
      obj.message = data
    } else {
      try {
        type = data.match(/ANS:(.*?)=/)[1]
        obj.data = JSON.parse(data.replace(data.match(/ANS:(.*?)=/)[0], ''))
        obj.success = true
      } catch (e) {
        obj.success = false
        obj.message = e
        console.log(e)
      }

      switch (type) {
        case 'is_initialize':
          mainWindow.webContents.send('is_initialize-reply', obj)
          break
        case 'runtime_para':
          mainWindow.webContents.send('runtime_para-reply', obj)
          break
        case 'runtime_mode':
          mainWindow.webContents.send('runtime_mode-reply', obj)
          break
        case 'parking_side':
          mainWindow.webContents.send('parking_side-reply', obj)
          break
        case 'height_from_the_ground':
          mainWindow.webContents.send('height_from_the_ground-reply', obj)
          break
        case 'view_layer2':
          mainWindow.webContents.send('view_layer2-reply', obj)
          break
        case 'vehicle_attitude':
          mainWindow.webContents.send('vehicle_attitude-reply', obj)
          break
        case 'finish_initialize':
          mainWindow.webContents.send('finish_initialize-reply', obj)
          break
      }
    }
  })

  server.bind(PORT, HOST)
}

Server()

ipcMain.once('is_initialize', async (event, file) => {
  Promise.all([client.isInitialize(), client.runtimePara()]).catch(res => {
    console.log(res)
  })
})

ipcMain.on('runtime_mode', (event, file) => {
  client.runtimeMode(file)
})

ipcMain.on('parking_side', (event, file) => {
  client.parkingSide(file)
})

ipcMain.on('height_from_the_ground', (event, file) => {
  client.heightFromTheGround(file)
})

ipcMain.on('view_layer2', (event, file) => {
  client.viewLayer().catch(e => {
    console.log(e)
  })
})
ipcMain.on('vehicle_attitude', (event, file) => {
  client.vehicleAttitude().catch(e => {
    console.log(e)
  })
})
ipcMain.on('finish_initialize', (event, file) => {
  client.finishInitialize().catch(e => {
    console.log(e)
  })
})
ipcMain.on('runtime_para', (event, file) => {
  client.runtimePara().catch(e => {
    console.log(e)
  })
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
