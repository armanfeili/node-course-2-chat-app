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

  socket.on('newLocationMessage', function (message) {
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
  });

  const locationButton = jQuery('#send-location');
  locationButton.on('click', function () {
    if (!navigator.geolocation) {
      return alert('Your browser doesnt support geolocation');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log(position);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      alert('unable to fetch location');
    });
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
