const socket = io('http://localhost:9000') // this is the / namespace/endpoint
const socket2 = io('http://localhost:9000/admin') // this is the /admin namespace


socket.on('messageFromServer', dataFromServer => {
  console.log(dataFromServer)
  socket.emit('dataToServer', { data: 'Data from the Client!' })
})

// socket.on('ping', () => {
//   console.log('ping was received')
// })
//
// socket.on('pong', latency => {
//   console.log('latency: ', latency)
//   console.log('ping was sent to server')
// })

document.querySelector('#message-form').addEventListener('submit', event => {
  event.preventDefault()
  console.log('form submit')
  const newMessage = document.querySelector('#user-message').value
  socket.emit('newMessageToServer', { text: newMessage })
})
socket.on('messageToClient', msg => {
  console.log('%c msg', 'background: white; color: red', msg)
  document.querySelector('#messages').innerHTML += `
    <li class="list-group-item">
      ${msg.text}
    </li>`
})
