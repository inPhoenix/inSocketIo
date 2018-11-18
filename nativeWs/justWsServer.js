const http = require('http')
const chalk = require('chalk')

const websocket = require('ws')


const server = http.createServer((req, res) => {
  res.end("Im connected")
})

const wss = new websocket.Server({server})

wss.on('headers', (headers, msg) => {
  //console.log(headers)
})


wss.on('connection', (ws, req) => {
  ws.send('Welcome to websocketIo')
  ws.on('message', (msg) => {
    console.log(chalk.red(msg));
  })
})



server.listen(8000)
console.log(chalk.cyan('listening: 8000'));
