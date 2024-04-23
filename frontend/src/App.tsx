import React, { useState, useEffect,useLayoutEffect } from 'react';
import { socket } from './socket';
import Home from './pages/Home';
import { useCookies } from 'react-cookie';
import Login from './components/Login';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { selectLoginInfo,userInfoType,loginInfo } from './features/slices/loginInfoSlice';

function App() {

  const dispatch = useDispatch()
  const selectedLogin = useSelector(selectLoginInfo)

  const [allMessage, setAllMessage] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(socket.connected)
  const [initialLoading,setInitialLoading] = useState(false)
  const [newMessage,setNewMessage] = useState('')

  const [cookies] = useCookies(['chat-room','chat-user'])

  // cookie de user-room info movcuddursa ilkin deyer olsun

  useLayoutEffect(()=>{
    if(cookies['chat-room']){
      dispatch(loginInfo((prev:userInfoType)=>({...prev,['room']:cookies['chat-room']})))
    }
    if(cookies['chat-user']){
      dispatch(loginInfo((prev:userInfoType)=>({...prev,['user']:cookies['chat-user']})))
    }

  },[])
  // ----------------------------------------------------
  
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
  <>
  <Login />
  </>
  );
}

export default App;
