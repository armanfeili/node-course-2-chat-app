// for chat app:

const socket = io();

socket.on('newMessage', (message) => {
  console.log('Message: ', message);
});
socket.on('connect', function () {
  socket.emit('createMessage', {
    from: 'jonas@example.com',
    text: "yo man, I'll be right there."
  });
});

// for email app:

// const socket = io()

// socket.on('connect', () => {
//   console.log('connected to server')
// })

// socket.on('disconnect', () => {
//   console.log('Disconnected form server')
// })

// socket.on('newEmail', function (email) {
//   console.log(`New Email: `, email)
// })