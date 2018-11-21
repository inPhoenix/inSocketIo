const express = require('express')
const app = express()
const chalk = require('chalk')
const socketio = require('socket.io')

app.use(express.static(__dirname + '/public'))

const expressServer = app.listen(9000)
const io = socketio(expressServer)
// io.of('/)
io.on('connection', socket => {
  socket.emit('messageFromServer', { data: 'welcome to socketio server' })
  socket.on('messageToServer', dataFromClient => {
    console.log(dataFromClient)
  })
  socket.on('newMessageToServer', (msg)=> {
    // console.log(chalk.blue(msg.text));
    //io.emit('messageToClient', {text: msg.text}) // same
    io.of('/').emit('messageToClient', {text: msg.text})
  })
})

console.log(chalk.cyan('listening 9000'))
