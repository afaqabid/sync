import { authService } from '@/app/auth/authService';
import { useRouter } from 'next/navigation';
import React from 'react'

function Navbar() {

    const router = useRouter();

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
                    <button className='logout-button' onClick={handleLogout}>Logout</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar