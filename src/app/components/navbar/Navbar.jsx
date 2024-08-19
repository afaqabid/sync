"use client"
import { authService } from '@/app/auth/authService';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import "./navbar.css";
import { useSelector } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

function Navbar() {

    const [avatar, setAvatar] = useState(null);

    const router = useRouter();

    const user = useSelector((state) => state.auth.user);
    

    const getDataFromDB = async () => {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const res = docSnap.data();
                if(res.avatar != null || res.avatar != "")
                {
                    setAvatar(res.avatar);
                }
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(()=>{
        getDataFromDB();
    }, [user]);



    const handleLogout = async() => {
        await authService.logout();
        sessionStorage.setItem("user", null);
        router.push('/login');


    }


    return (
        <>
            <nav className="nav-bar">
                <div className="logo">sync.</div>
                <div className="right">
                    <img className='avatar' src={avatar ? avatar : "/avatar.png"} alt="" />
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar