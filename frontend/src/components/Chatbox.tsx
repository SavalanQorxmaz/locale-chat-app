import React from 'react'

const Chatbox = () => {
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
          <input type="text" name="" id="" className='typing'/>
       
          <div className='sendTyping'>
          &#10548;
          </div>

        </div>

      </div>

      <div className='loginPage'>
        <form action="">
        <input type="text" placeholder='nickname' id='name'/>
        <input type="password" placeholder='password' id='password'/>
        <input type="submit" id='submit'/>
        </form>
      </div>


    </div>
  )
}

export default Chatbox