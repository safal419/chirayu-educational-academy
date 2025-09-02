"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isAdminAuth, setIsAdminAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    setIsAdminAuth(auth === "true");
  }, []);

  return (
    <>
      {!isAdminAuth && <Navbar />}
      {children}
      {!isAdminAuth && <Footer />}
    </>
  );
}