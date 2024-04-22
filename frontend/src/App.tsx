import React, { useState, useEffect } from 'react';
import { socket } from './socket';
import Chatbox from './components/Chatbox';
import Login from './components/Login';

function App() {

  const [allMessage, setAllMessage] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(socket.connected)
  const [initialLoading,setInitialLoading] = useState(false)
  const [newMessage,setNewMessage] = useState('')
  
  const [value, setValue] = useState('');
  useEffect(()=>{
  socket.connect();

  return ()=>{
    socket.disconnect()
  }
  },[])

//   useEffect(()=>{
//     function allMessageF(value:any){
// setAllMessage(prev=>[...prev, value])
//     }

//     socket.on('server',allMessageF)
//     return ()=>{
//       socket.off('server', allMessageF)
//     }

//   },[isLoading])

useEffect(()=>{
socket.on('typingRes',()=>{
})
socket.on('server',(value:any)=>{
  setAllMessage(prev=>[...prev, value])
 
})
},[socket])
 
  
   function onSubmit(event:any) {
      event.preventDefault();
  
      socket.emit('client', value);
     
        
     console.log(allMessage)
    }

    const userTyping = ()=>{
      // console.log(value)
      socket.emit('typing','user')
    }


  return (
    <div className="App">
      <form onSubmit={ onSubmit }>
      <input onChange={ e => {setValue(e.target.value)}} onKeyDown={userTyping} />

      <button type="submit" disabled={ isLoading }>Submit</button>
    </form>
     <Chatbox/>
     <Login/>
    </div>
  );
}

export default App;
