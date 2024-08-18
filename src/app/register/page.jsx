"use client"
import React, { useState } from 'react'
import './register.css'
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import upload from '@/lib/upload';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {

    const [avatar, setAvatar] = useState({
        file: null,
        url: ''
    });
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setAvatar({
                file: event.target.files[0],
                url: URL.createObjectURL(file)
            })
        }
    };

    const handleRegisterUser = async () => {
        const userData = {
            image: image,
            name: name,
            email: email,
            password: password
        }

        try {
            setLoading(true);

            const res = await createUserWithEmailAndPassword(auth, email, password);

            const imgUrl = await upload(avatar.file);
            await setDoc(doc(db, 'users', res.user.uid), {
                username: name,
                email: email,
                avatar: imgUrl,
                userId: res.user.uid
            });
            await setDoc(doc(db, 'userTasks', res.user.uid), {
                tasks:[]
            });

            toast.success("User Registered Successfully!");
            setLoading(false);


        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

        // const sigin = await signInWithEmailAndPassword(auth, email, password);
        // console.log(sigin);

        router.push('/login');
    }

    return (
        <>
            <ToastContainer />
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
                        <input type="text" name="name" id="name-input" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="email" name="email" id="email-input" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" name="password" id="password-input" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button
                            type='button'
                            onClick={handleRegisterUser}
                            disabled={loading}
                            style={{
                                cursor: loading ? 'wait' : 'pointer',
                                backgroundColor: loading ? 'grey' : 'rgb(19, 19, 90)',
                            }}
                        >
                            Register
                        </button>
                    </form>
                    <p>Already Registered? <Link href="/login" className='register-now-btn'>Sign In</Link></p>
                </div>

            </div>
        </>

    )
}

export default Register;