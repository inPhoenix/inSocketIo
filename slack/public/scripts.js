const socket = io('http://localhost:9000') // the / namespace/endpoint
const socket2 = io('http://localhost:9000/mozilla') //the /admin namespace
const socket3 = io('http://localhost:9000/wiki') //the /admin namespace
// const socket2 = io('http://localhost:9000/wiki')

socket.on('connect', () => {
  //console.log(socket.id)
})

socket.on('nsLint', nsData => {
  let namespaceDiv = document.querySelector('.namespaces')
  namespaceDiv.innerHTML= ""
  nsData.forEach((ns) => {
    namespaceDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"/></div>`
  })
  Array.from(document.getElementsByClassName('namespace')).forEach((elem) => {
    elem.addEventListener('click', (e) => {
        const nsEndpoint = elem.getAttribute('ns')
        console.log('%c endpoint', 'background: white; color: red', nsEndpoint )
    })
  })
})


socket.on('messageFromServer', dataFromServer => {
  console.log(dataFromServer)
  socket.emit('dataToServer', { data: 'Data from the Client!' })
})

// document.querySelector('#message-form').addEventListener('submit', event => {
//   event.preventDefault()
//   const newMessage = document.querySelector('#user-message').value
//   socket.emit('newMessageToServer', { text: newMessage })
// })

socket.on('messageToClients', msg => {
  console.log(msg)
  document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`
})
