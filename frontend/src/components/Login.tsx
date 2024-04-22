import React from 'react'

const Login = () => {
  return (
    <div className='loginPage'>
    <form action="">
    <input type="text" placeholder='nickname' id='name'/>
    <input type="password" placeholder='password' id='password'/>
    <input type="submit" id='submit'/>
    </form>
  </div>
  )
}

export default Login