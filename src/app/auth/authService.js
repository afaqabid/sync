"use client"

// authService.js
import { signInWithEmailAndPassword } from 'firebase/auth';
import { loginSuccess, logoutSuccess } from './authSlice';
// import axios from 'axios' 
import { auth } from '@/lib/firebase';
import { store } from '../store';



export const authService = {
  async login(userData) {
    // Replace this with your actual login logic (e.g., API call)
    console.log('User Data ', userData);
    const res = await signInWithEmailAndPassword(auth, userData.email, userData.password)
    const user = res.user;

    sessionStorage.setItem('session', JSON.stringify({savedSession: true, user: user}));
    
    
    // Dispatch the loginSuccess action with the user data
    store.dispatch(loginSuccess(user));
    
    return user;
  },

  async logout() {
    // Replace this with your actual logout logic (e.g., clearing tokens)
    // await yourLogoutFunction();
    sessionStorage.removeItem('session');

    // Dispatch the logoutSuccess action
    store.dispatch(logoutSuccess());
  },

  async checkSavedSession() {

    const session = JSON.parse(sessionStorage.getItem('session'));


    if(session)
    {
        if(session.savedSession == true)
        {
            store.dispatch(loginSuccess(session.user));
        }
    }

  }
};