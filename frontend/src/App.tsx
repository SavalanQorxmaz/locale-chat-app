import React, { useState, useEffect,useLayoutEffect } from 'react';
import { socket } from './socket';
import Home from './pages/Home';
import { useCookies } from 'react-cookie';
import Login from './components/Login';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { selectLoginInfo,userInfoType,loginInfo } from './features/slices/loginInfoSlice';
import { checkReducer,selectLogin } from './features/slices/isLoggedIn';
import Chatbox from './components/Chatbox';

function App() {

  const dispatch = useDispatch()
  const selectedLogin = useSelector(selectLoginInfo)
  const selectedCheckLogin = useSelector(selectLogin)

  const [allMessage, setAllMessage] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(socket.connected)
  const [initialLoading,setInitialLoading] = useState(false)

  const [cookies,setCookie] = useCookies(['chat-room','chat-user'])

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

  useEffect(()=>{

    if(selectedCheckLogin){
      setCookie('chat-room',selectedLogin.room,)
    setCookie('chat-user',selectedLogin.user)
    }


  },[selectedCheckLogin])
  
  const [value, setValue] = useState('');
 





  return (
  <>
  <Login />
  {selectedCheckLogin?<Chatbox/>:null}
  </>
  );
}

export default App;
