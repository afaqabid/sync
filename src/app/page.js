"use client"
import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    if(!user)
    {
      router.push('/login');
    }
    else
    {
      router.push('dashboard');
    }
  }, [user, router]);


  return (
    <>
    </>
  );
}
