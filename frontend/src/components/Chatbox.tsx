import React from 'react'
import {socket} from '../socket'
import { useEffect , useState,useRef} from 'react'
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { selectLoginInfo,loginInfo } from '../features/slices/loginInfoSlice';
import { checkReducer,selectLogin } from '../features/slices/isLoggedIn';

const Chatbox = () => {
  
  const dispatch = useDispatch()
  const selectedLogin = useSelector(selectLoginInfo)
  const selectedCheckLogin = useSelector(selectLogin)
  
  const [newMessage,setNewMessage] = useState('')
  const messageRef = useRef(null)
 

  useEffect(()=>{
   if(selectedCheckLogin){
    // socket.connect();
  
    // return ()=>{
    //   socket.disconnect()
    // }
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
      socket.on('selected',()=>{
      })
      socket.on(`${selectedLogin.room}`,(value:any)=>{
        console.log(`${selectedLogin.room}`)
       
      })
      },[socket])
       
        
         function onSubmitF(event:any) {
            event.preventDefault();
        
            socket.emit(`${selectedLogin.room}`, newMessage);
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
            room
          </p>

        </div>
        <div className='conversationBox'>

        </div>
        <div className='typingLine'>
          <form action="" onSubmit={onSubmitF}>
          <input value={newMessage}  onChange={(e:any)=>{setNewMessage(e.target.value)}} type="text" name="" id="" className='typing'/>
          </form>
       
          <div className='sendTyping'>
          &#10548;
          </div>

        </div>

      </div>

   


    </div>
  )
}

export default Chatbox