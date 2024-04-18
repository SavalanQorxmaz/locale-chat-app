import React, { useState, useEffect } from 'react';
import { socket } from './socket';

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
    </div>
  );
}

export default App;
