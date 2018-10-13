// for chat app:

const socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  socket.on('newMessage', function (message) {
    const formatedTime = moment(message.createdAt).format('h:mm a');
    console.log('Message: ', message);
    const li = jQuery('<li></li>');
    li.text(`${message.from} ${formatedTime}:${message.text}`);

    jQuery('#messages').append(li);
  });

  socket.on('newLocationMessage', function (message) {
    const formatedTime = moment(message.createdAt).format('h:mm a');
    const li = jQuery('<li></li>');
    const a = jQuery('<a target="_blank">My current location</a>');
    li.text(`${message.from}: ${formatedTime}`);
    a.attr('href', message.url);

    li.append(a);
    jQuery('#messages').append(li);
  });

  jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    const messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
      from: 'User',
      text: messageTextBox.val()
    }, function () {
      messageTextBox.val('');
    });
  });

  const locationButton = jQuery('#send-location');
  locationButton.on('click', function () {
    if (!navigator.geolocation) {
      return alert('Your browser doesnt support geolocation');
    }
    locationButton.attr('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition(function (position) {
      locationButton.removeAttr('disabled');

      console.log(position);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function () {
      locationButton.removeAttr('disabled');
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
