import React from 'react'

const Login = () => {
  return (
    <div className='loginPage'>
      <h3>Söhbətə başla</h3>
    <form action="">
      <div className='selectRoom'>
      <input type="text" placeholder='room' id='room'/>
      <input type="radio" id='radio'/>
    <input type="text" placeholder='create room' id='createRoom'/>
      </div>
    <input type="text" placeholder='nickname' id='nickname'/>
    <input type="submit" id='submit'/>
    </form>
  </div>
  )
}

export default Login