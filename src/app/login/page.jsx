"use client"
import React, { useState } from 'react'
import './login.css'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import upload from '@/lib/upload';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../auth/authService';



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const user = useSelector((state)=>state.auth.user);
  


  const handleLogin = async () => {
    try {
      setLoading(true);

      let loginData = {
        email,
        password
      }
      const userData = await authService.login(loginData);

      sessionStorage.setItem("user", JSON.stringify(userData));


      if(userData)
      {
        toast.success('User Logged In!');
        router.push('/dashboard')
        setLoading(false);
      }



    } catch (error) {
      toast.error(error.message)
      setLoading(false);

    }
  }


  return (
    <>
      <ToastContainer />
      <div className="main-div">
        <nav className="nav-bar">
          <div className="logo">sync.</div>
        </nav>
        <div className="center-div">
          <h1>Login</h1>
          <hr />
          <form action="">
            <input type="email" name="email" id="email-input" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" id="password-input" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <button
              type='button'
              onClick={handleLogin}
              disabled={loading}
              style={{
                cursor: loading ? 'wait' : 'pointer',
                backgroundColor: loading ? 'grey' : 'rgb(19, 19, 90)',
              }}
            >
              login
            </button>        </form>
          <p>New User? <Link href="/register" className='register-now-btn'>Register Now</Link></p>
        </div>

      </div>
    </>
  )
}

export default Login;