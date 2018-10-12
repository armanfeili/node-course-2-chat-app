// for chat app:

const socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.on('newMessage', function (message) {
    console.log('Message: ', message);
    const li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);

    jQuery('#messages').append(li);
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

jQuery('#messages-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {});
});
