const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const bodyParser = require("body-parser");
const server = http.createServer(app);
const { Server } = require("socket.io");
const corsOptions = {
  origin: "*"
}
const io = new Server(server,{
    cors: {
      origin: "*"
    }
  });

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors(corsOptions))


const rooms = []
const users = []

app.post('/login',(req,res)=>{
  console.log('body:  ',req.body)
  if(req.body.isNew){
    if(rooms.indexOf(req.body.room)===-1){
      rooms.push(req.body.room)
      res.send(JSON.stringify([1, 'yeni otaq yaradildi']))
    }
    else res.send(JSON.stringify([0,'otaq movcuddu']))
  }
  else {
    if(rooms.indexOf(req.body.room)>-1){
      res.send(JSON.stringify([2,'movcud otaga qosulma']))
    }
    else res.send(JSON.stringify([3,'otaq movcud deyil']))
  }
  
  
  
  // res.send(JSON.stringify('salam'))
})



io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('new-room', (data) => {
    const {user,room,isNew} = data
    console.log('new room  ',data)
    socket.join(room)
    socket.emit(`server-message`, {user:"BOT",room,newMessage:`${room} created`});
  });
  socket.on('existing-room', (data) => {
    const {user,room,isNew} = data
    console.log(data)
    socket.join(room)
    socket.to(room).emit(`server-message`, {user:"BOT",room,newMessage:`${user} joined`})
    socket.emit(`server-message`, {user:"BOT",room,newMessage:`${user} welcome`});
  });
  socket.on('new-message', (data) => {
    const {user,room, newMessage} = data
    console.log('data:  ',data)
    socket.to(room).emit(`received-message`, data);
    socket.emit(`received-message`, data);
  });

// socket.on('typing',(data)=>{

//   console.log(data)
//   socket.broadcast.emit('typingRes', `${data}`)
// })

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});
 

server.listen(8000, () => {
  console.log('listening on *:8000');
});