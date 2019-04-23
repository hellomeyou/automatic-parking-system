const PORT = 2222
const HOST = '127.0.0.1'

const dgram = require('dgram')

const client = dgram.createSocket('udp4')

const isInitialize = () => {
  return new Promise(resolve => {
    // const message = Buffer.from('GET:is_initialize')
    const message = Buffer.from('ANS:is_initialize={"is_initialize": "no"}')
    client.send(message, PORT, HOST, function (err, bytes) {
      if (err) throw err
      console.log('UDP message sent to ' + HOST + ':' + PORT)
      resolve()
      // client.close()
    })
  })
}

const runtimePara = () => {
  return new Promise(resolve => {
    const message = Buffer.from('ANS:runtime_para={"wheel_angle": "5","car_angle": "5","parking_x": "7000","parking_y": "4000","car_x_offset": "100","car_y_offset": "100","calibration_abs_error": "10","calibration_rel_error": "50","target_x": "5600","target_y": "2600"}')
    // const message = Buffer.from('GET:runtime_para')
    client.send(message, PORT, HOST, function (err, bytes) {
      if (err) throw err
      console.log('UDP message sent to ' + HOST + ':' + PORT)
      resolve()
      // client.close()
    })
  })
}

export default {
  isInitialize,
  runtimePara
}
