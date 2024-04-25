import React from 'react'
import {socket} from '../socket'
// import { io ,Socket} from 'socket.io-client';
import { useEffect , useState,useRef} from 'react'
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { selectLoginInfo,loginInfo } from '../features/slices/loginInfoSlice';
import { checkReducer,selectLogin } from '../features/slices/isLoggedIn';

const OldMessageList = (props:any)=>{
  const {oldData} = props
  return (
    
      <ul>
      {
        
      oldData?
      oldData.map((value:{user:string,room:string, newMessage: string}, index:number)=>(
      <li key={index}>
     <span>{value.user}</span>
     <span>{value.room}</span>
     <span>{value.newMessage}</span>
      </li>
      ))
      :
      null
      
    }
      </ul>
    
  )
}

const Chatbox = () => {
  
  const dispatch = useDispatch()
  const selectedLogin = useSelector(selectLoginInfo)
  const selectedCheckLogin = useSelector(selectLogin)
  
  const [newMessage,setNewMessage] = useState('')
  const [oldMessages, setOldMessages] = useState<object[]>([{}])
  const [receivedMessage,setReceivedMessage] = useState<{}|''>('')
 




    useEffect(()=>{

     
      socket.on('server-message',(value)=>{
        setOldMessages(prev=>[...prev,value])
      })
     
      socket.on('received-message',(value)=>{
        setOldMessages(prev=>[...prev,value])
        
       
      })
      return ()=>{
        socket.off('server-message');
        socket.off('received-message');
      }
      },[socket])

      useEffect(()=>{
        
        setOldMessages([...oldMessages,receivedMessage])
      },[receivedMessage])
       
        
         function onSubmitF(event:any) {
            event.preventDefault();
        
            socket.emit('new-message', {...selectedLogin,newMessage});
            setNewMessage('')
           
              
          }
      
    //       const userTyping = ()=>{
    //         // console.log(value)
    //         socket.emit('typing','user')
    //       }
      
  return (
    <div className='container'>
      <div className='generalBox'>
        <div className='nameLine'>
          <p>
            {selectedLogin.room}
          </p>

        </div>
        <div className='conversationBox'>
<OldMessageList oldData = {oldMessages}/>
        </div>
          <form className='typingLine' action="" onSubmit={onSubmitF}>
          <input value={newMessage}  onChange={(e:any)=>{setNewMessage(e.target.value)}} type="text" name="" id="" className='typing'/>
         
          <input className='sendTyping' type="submit" value='&#10548;' />
          </form>
       
         


      </div>

   


    </div>
  )
}

export default Chatbox