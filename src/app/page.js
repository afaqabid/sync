"use client"
import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";



export default function Home() {
  return (
    <>
      <App />
    </>
  );
}
