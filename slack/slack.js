const express = require('express')
const app = express()
const socketio = require('socket.io')
app.use(express.static(__dirname + '/public'))
const expressServer = app.listen(9000)
const io = socketio(expressServer)
const chalk = require('chalk')

let namespaces = require('./data/namespaces')

// io.on = io.of('/').on
io.on('connection', socket => {
  let nsData = namespaces.map(ns => {
    return {
      img: ns.img,
      endpoint: ns.endpoint
    }
  })
  // send it to the client
  socket.emit('nsLint', nsData)
})

namespaces.forEach(namespace => {
  console.log(namespace.endpoint)
  io.of(namespace.endpoint).on('connection', socket => {
    console.log(`${socket.id} has join ${namespace.endpoint}`)
    // a socket has connected to one of our chat group
    // send it back
    socket.emit('nsRoomLoad', namespaces[0].rooms)
  })
})
