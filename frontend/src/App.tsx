import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import Chatbox from './components/Chatbox';

function App() {

  const connectSocketF = ()=>{
    socket.on('connect', function () {
      socket.emit('clientEmit', 'foo', 'bar', 'baz');
    });
  
    socket.on('serverEmit', function (data) {
      console.log(data);
    });
  }

  useEffect(()=>{
connectSocketF()


  },[])

  return (
    <div className="App">
     <button onClick={connectSocketF}>send</button>
     <Chatbox/>
    </div>
  );
}

export default App;
