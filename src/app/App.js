"use client";
import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider, useSelector } from "react-redux";
import { authService } from "./auth/authService";

export default function App() {
  const router = useRouter();

  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated);

  const checkSession = async () =>{ 
    await authService.checkSavedSession();
  }

  
  useEffect(() => {
    checkSession();
    if (!isAuthenticated) {
      router.push('/login');
    }
    else {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <>
    </>
  );
}
