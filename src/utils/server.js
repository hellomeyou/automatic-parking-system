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
      console.log(obj)
      break
    case 'runtime_para':
      console.log(obj)
      console.log(obj.wheel_angle)
      // ipcMain.on('is_initialize', (event, file) => {
      //   event.sender.send('is_initialize-reply', obj)
      // })

      mainWindow.webContents.send('is_initialize-reply', obj)
      break
  }
})

server.bind(PORT, HOST)
