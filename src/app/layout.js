"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./store";
// import { store } from "./store";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "sync. | Task Management",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Provider store={store}>
          {children}
          </Provider>
          </body>
      </html>
    </>
  );
}
