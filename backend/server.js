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
    cors: corsOptions
  });

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors(corsOptions))


const rooms = []
const users = []

app.post('/login',(req,res)=>{
  console.log('body:  ',req.body)
  if(req.body.new){
    if(rooms.indexOf(req.body.room)===-1){
      rooms.push(req.body.room)
      res.send(JSON.stringify([1, 'yeni otaq yaradildi']))
    }
    else res.send(JSON.stringify([0,'otaq movcuddu']))
  }
  else {
    res.send(JSON.stringify([2,'movcud otaga qosulma']))
  }
  
  
  // res.send(JSON.stringify('salam'))
})



io.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on(`${rooms[0]}`, (data) => {
    console.log(data)
    io.emit(`${rooms[0]}`, data);
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