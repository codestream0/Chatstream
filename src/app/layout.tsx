"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { store,persistor } from "@/lib/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Chatstream",
  description: "A real-time chat platform designed for seamless conversations and collaboration.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor} >
            {children}
          </PersistGate>
        </Provider>
         <ToastContainer 
          position="top-right" 
          theme="colored"
          autoClose={3000} 
          hideProgressBar 
          toastClassName="custom-toast " 
        />
      </body>
    </html>
  );
}

