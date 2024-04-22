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

io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('client', (data) => {
    console.log(data)
    io.emit('server', data);
  });

socket.on('typing',(data)=>{

  console.log(data)
  socket.broadcast.emit('typingRes', `${data}`)
})

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});
 

server.listen(8000, () => {
  console.log('listening on *:8000');
});