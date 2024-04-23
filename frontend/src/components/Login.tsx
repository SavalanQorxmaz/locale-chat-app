import React, { useState } from 'react';
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { selectLoginInfo,loginInfo } from '../features/slices/loginInfoSlice';
import { checkReducer,selectLogin } from '../features/slices/isLoggedIn';

const Login = () => {

  const dataUrl = process.env.REACT_APP_BASE_URL
  const dispatch = useDispatch()
  const selectedLogin = useSelector(selectLoginInfo)
  const selectedCheckLogin = useSelector(selectLogin)
  const [newLogin,setNewLogin] = useState({
    user:selectedLogin.user,
    room:selectedLogin.room,
    new:false
  })

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
      case 0:  dispatch(checkReducer(true));
      break;
      case 1:  dispatch(checkReducer(false));
      break;
      case 2: dispatch(checkReducer(true));
      break;
      default:   dispatch(checkReducer(false));
    }
    // console.log(res)
  })

}

  return (
<div className={!selectedCheckLogin?'login-page-back':'hidden'}>
<div className='loginPage responsive-screen'>
      <h3>Söhbətə başla</h3>
    <form action="" onSubmit={submifF} >
      <div className='selectRoom'>
      <label htmlFor='new-room'> 
      <span>Yeni</span>
      <input onChange={()=>{setNewLogin(prev=>({...prev,['new']:!newLogin.new}))}} type="checkbox" name="new" id="new-room"  /></label>
    <input onChange={inputValueF} type="text" placeholder='create room' id='createRoom' name='room' defaultValue={selectedLogin.room}/>
      </div>
    <input onChange={inputValueF} type="text" placeholder='nickname' id='nickname' name='user' defaultValue={selectedLogin.user}/>
    <input type="submit" id='submit' disabled = {newLogin.room.length<3 || newLogin.user.length<3? true:false}/>
    </form>
  </div>
</div>
  )
}

export default Login