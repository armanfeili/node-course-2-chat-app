const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// for chat app:

io.on('connection', (socket) => {
  console.log('New user connected.');

  // socket.emit('newMessage', {
  //   from: 'Andrew@example.com',
  //   text: 'Hey, I meet you at 6:00',
  //   createdAt: 123
  // })

  socket.on('createMessage', (message) => {
    console.log('Message:', message);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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
