'use client';
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import UserNavbar from "@/components/UserNavbar";
import Footer from "@/components/Footer";
import { GetActiveUser } from "@/components/GetActiveUser";
import Cookies from "js-cookie";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loggedInUser = Cookies.get("loggedInUser");
    if (loggedInUser) {
      GetActiveUser(loggedInUser).then((userData) => {
        setUser(userData);
      });
    }
  }, []);
  
  return (
    <html lang="en">
      <body className={inter.className}>
          {user?.username ? <UserNavbar /> : <Navbar />}
          {children}
          <Footer />
      </body>
    </html>
  );
}