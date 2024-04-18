const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
      origin: "http://localhost:3000"
    }
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    socket.emit('serverEmit', 'foo', 'bar', 'baz');
  
    socket.on('clientEmit', function (data) {
      console.log(data);
    });
  });

server.listen(8000, () => {
  console.log('listening on *:8000');
});