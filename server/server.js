const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {isRealString} = require('./utils/validation');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const {Users} = require('./utils/users');
const users = new Users();

// for chat app:

io.on('connection', (socket) => {
  console.log('New user connected.');

  // socket.emit('newMessage', {
  //   from: 'Andrew@example.com',
  //   text: 'Hey, I meet you at 6:00',
  //   createdAt: 123
  // })

  // socket.on('createMessage', (message) => {
  // console.log('Message:', message)

  socket.on('createMessage', (message, callback) => {
    const user = users.getUser(socket.id);
    if (user && isRealString(socket.id)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });

  socket.on('createLocationMessage', function (coords) {
    const user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });
  // socket.emit('newMessage', {
  //   from: 'admin',
  //   text: 'welcome...!',
  //   createdAt: new Date().getTime()
  // })

  // socket.broadcast.emit('newMessage', {
  //   from: 'admin',
  //   text: 'one user joined',
  //   createdAt: new Date().getTime()
  // })

  // io.emit('newMessage', {
  //   from: message.from,
  //   text: message.text,
  //   createdAt: new Date().getTime()
  // })
  // })
  socket.on('disconnect', () => {
    const user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});

// for email app:

// io.on('connection', (socket) => {
//   console.log('New user connected')

//   socket.emit('newEmail', {
//     from: 'mike@example.com',
//     text: 'hey, what is going on?',
//     createdAt: 123
//   })
//   socket.on('disconnect', () => {
//     console.log('User was disconnected')
//   })
// })

app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`server is up on ${port}`);
});

module.exports = {app};
