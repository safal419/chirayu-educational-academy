"use client";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import TopBar from "@/components/layout/top-bar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  // Hide navbar and footer if it's an admin route
  const shouldHideLayout = isAdminRoute;

  return (
    <>
      {!shouldHideLayout && (
        <>
          <TopBar />
          <Navbar />
        </>
      )}
      {children}
      {!shouldHideLayout && <Footer />}
    </>
  );
}
