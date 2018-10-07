const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

app.use(express.static(publicPath));
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`server is up on ${port}`);
});

module.exports = {app};
