import React from 'react'
import './login.css'
import Link from 'next/link';

function Login() {
  return (
    <div className="main-div">
        <nav className="nav-bar">
            <div className="logo">sync.</div>
        </nav>
        <div className="center-div">
            <h1>Login</h1>
            <hr />
            <form action="">
                <input type="email" name="email" id="email-input" placeholder='Enter Email'/>
                <input type="password" name="password" id="password-input" placeholder='Enter Password'/>
                <button> Sign In</button>
            </form>
                <p>New User? <Link href="/register" className='register-now-btn'>Register Now</Link></p>
        </div>

    </div>
  )
}

export default Login;