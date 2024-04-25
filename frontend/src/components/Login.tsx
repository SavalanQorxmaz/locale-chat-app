import React, { useState } from 'react';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { selectLoginInfo,loginInfo } from '../features/slices/loginInfoSlice';
import { checkReducer,selectLogin } from '../features/slices/isLoggedIn';
import {socket} from '../socket'

const Login = () => {

  const dataUrl = process.env.REACT_APP_BASE_URL
  const dispatch = useDispatch()
  const selectedLogin = useSelector(selectLoginInfo)
  const selectedCheckLogin = useSelector(selectLogin)
  const [newLogin,setNewLogin] = useState({
    user:selectedLogin.user,
    room:selectedLogin.room,
    isNew:false
  })
  const [responseCode, setResponseCode] = useState(-1)

// daxil edilen adlari saxlamaq ucun
  const inputValueF=(e: React.ChangeEvent<HTMLInputElement>)=>{
    setNewLogin(prev=>({...prev,[e.target.name]:e.target.value}))
    

  }
  // -----------------------------

  

const submifF = async (e:any)=>{
  e.preventDefault()
  await fetch(`${dataUrl}/login`,{
    method:'POST',
    body:JSON.stringify(newLogin),
    headers:{
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "*"
      
    },

  })
  .then(res=>res.json())
  .then(res=>{
    switch(res[0]){
      case 0:  {
        dispatch(checkReducer(false))
        setResponseCode(0)
      };
      break;
      case 1:  {
        dispatch(checkReducer(true))
        dispatch(loginInfo({...newLogin}))
        socket.emit('new-room',{...newLogin})

      };
      break;
      case 2: {
        dispatch(checkReducer(true))
        socket.emit('existing-room',{...newLogin})
        dispatch(loginInfo({['user']:newLogin.user,['room']:newLogin.room}))
      };
      break;
      case 3:  {
        dispatch(checkReducer(false))
        setResponseCode(3)
      };
      break;
      default:   dispatch(checkReducer(false));
    }
    console.log(res)
  })

}

  return (
<div className={!selectedCheckLogin?'login-page-back':'hidden'}>
<div className='loginPage responsive-screen'>
      <div className='loginHeader'>
      <h3>Söhbətə başla</h3>
      <label htmlFor='new-room'> 
      <span>Yeni</span>
      <input onChange={()=>{setNewLogin(prev=>({...prev,['isNew']:!newLogin.isNew}))}} type="checkbox" name="new" id="new-room"  />
      </label>
      </div>
    <form action="" onSubmit={submifF} >
 
<label htmlFor="">
  <span>room</span>
<input onChange={inputValueF} type="text" placeholder='create room' id='createRoom' name='room' defaultValue={selectedLogin.room}/>
  </label>     

<label htmlFor="">
  <span> nickname
    </span>
    <input onChange={inputValueF} type="text" placeholder='nickname' id='nickname' name='user' defaultValue={selectedLogin.user}/>
    </label>    
    <input type="submit" id='submit' disabled = {newLogin.room.length<3 || newLogin.user.length<3? true:false}/>
   {
    responseCode===0? <p>Otaq mövcuddu</p>:null
   }
   {
    responseCode===3? <p>Otaq mövcud deyil</p>:null
   }
    
    
    </form>
  </div>
</div>
  )
}

export default Login