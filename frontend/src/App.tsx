import React, { useState, useEffect } from 'react';
import { socket } from './socket';

function App() {

  const [allMessage, setAllMessage] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(()=>{
   socket.connect();
   return ()=>{
    socket.disconnect()
   }
  },[])

  useEffect(()=>{
    function allMessgeF(value:any){
      setAllMessage(allMessage.concat(value))
      console.log(allMessage)
    }
    socket.on('message',allMessgeF)

    return ()=>{
      socket.off('message', allMessgeF)
    }

  },[setIsLoading])

const chatF = (e:any)=>{
  setIsLoading(true);
  socket.emit('message', 'test',()=>{
    setAllMessage(allMessage.concat('test'))
  })
 
 
}




  return (
    <div className="App">
     <button onClick={chatF}>send</button>
    </div>
  );
}

export default App;
