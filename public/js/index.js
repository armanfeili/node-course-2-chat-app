// for chat app:

const socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.on('newMessage', (message) => {
    console.log('Message: ', message);
  });

//   socket.emit('createMessage', {
//     from: 'jonas@example.com',
//     text: "yo man, I'll be right there."
//   })
});

socket.on('disconnect', function () {
  console.log('server disconnected');
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
