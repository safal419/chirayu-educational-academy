"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const sidebarOpen = true;

  useEffect(() => {
    setIsAdmin(localStorage.getItem("adminAuth") === "true");
  }, []);

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <div className="flex-1 flex flex-col ml-0 lg:ml-64 transition-all duration-300">
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
