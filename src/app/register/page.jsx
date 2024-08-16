"use client"
import React, { useState } from 'react'
import './register.css'
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

function Register() {

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file)); // Convert the file to a URL for preview
        }
    };

    const handleRegisterUser = () => {
        const userData = {
            image: image,
            name: name,
            email: email,
            password: password
        }
        console.log(userData);

        router.push('/dashboard');
    }

    return (
        <>
            <div className="main-div">
                <nav className="nav-bar">
                    <div className="logo">sync.</div>
                </nav>
                <div className="center-div">
                    <h1>Register</h1>
                    <hr />
                    <form action="">
                        <div className="img-data">
                            <img src={image || "/avatar.png"} alt="" />
                            <label htmlFor="profile-img" style={{ cursor: 'pointer' }}>| Upload Image
                                <input type="file" name="profile-img" id="profile-img" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                            </label>
                        </div>
                        <input type="text" name="name" id="name-input" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} />
                        <input type="email" name="email" id="email-input" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="password" name="password" id="password-input" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <button type='button' onClick={handleRegisterUser}>Register</button>
                    </form>
                    <p>Already Registered? <Link href="/login" className='register-now-btn'>Sign In</Link></p>
                </div>

            </div>
        </>

    )
}

export default Register;