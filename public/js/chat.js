// for chat app:

const socket = io();

socket.on('connect', function () {
  console.log('Connected to server');

  function scrollToBottom () {
    // Selectors
    const messages = jQuery('#messages');
    const newMessage = messages.children('li:last-child');
    // Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }

  const params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No error');
    }
  });

  socket.on('disconnect', function () {
    console.log('Disconnected from server');
  });

  socket.on('updateUserList', function (users) {
    const ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
      ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
  });

  socket.on('newMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  });

  socket.on('newLocationMessage', function (message) {
    const formattedTime = moment(message.createdAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
  });
  // socket.on('newMessage', function (message) {
  //   const formatedTime = moment(message.createdAt).format('h:mm a')
  //   const template = jQuery('#message-template').html()
  //   // Had to change the render call to template, view - in our case
  //   // we still don't have the view data, so I passed in an empty object.
  //   // const html = Mustache.render(template, {})

  //   const html = Mustache.render(template, {
  //     text: message.text,
  //     from: message.from,
  //     createdAt: formatedTime
  //   })

  //   jQuery('#messages').append(html)

  //   // console.log('Message: ', message)
  //   // const li = jQuery('<li></li>')
  //   // li.text(`${message.from} ${formatedTime}:${message.text}`)

  // // jQuery('#messages').append(li)
  // })

  // socket.on('newLocationMessage', function (message) {
  //   const formatedTime = moment(message.createdAt).format('h:mm a')
  //   const li = jQuery('<li></li>')
  //   const a = jQuery('<a target="_blank">My current location</a>')
  //   li.text(`${message.from}: ${formatedTime}`)
  //   a.attr('href', message.url)

  //   li.append(a)
  //   jQuery('#messages').append(li)
  // })

  jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    const messageTextBox = jQuery('[name=message]');

    socket.emit('createMessage', {
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
