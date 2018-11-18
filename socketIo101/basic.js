const http = require('http')
const socketio = require('socket.io')
const chalk = require('chalk')


const server = http.createServer((req, res) => {
  res.end('hoi')
})
const io = socketio(server)

io.on('connection', (socket,req) => {
  socket.emit('welcome', 'welcome to websocket server ')
  socket.on('message', (msg)=> {
    console.log(msg)
  })
})

server.listen(8000)

console.log(chalk.blue('listening on 8000'));
