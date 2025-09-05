"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminHeader from "@/components/admin/admin-header";
import AdminSidebar from "@/components/admin/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Check if we're on the client side
        if (typeof window === "undefined") {
          console.log("Server side, skipping auth check");
          return;
        }

        // Use legacy adminAuth flag only
        const adminAuth = localStorage.getItem("adminAuth");
        if (adminAuth === "true") {
          setIsAuthenticated(true);
          setRefreshKey((prev) => prev + 1);
          console.log("Auth check - adminAuth: true, pathname:", pathname);
          setIsLoading(false);
          setHasCheckedAuth(true);
          return;
        } else {
          console.log("Auth check - adminAuth: false, pathname:", pathname);
          if (pathname !== "/admin/login" && hasCheckedAuth) {
            router.push("/admin/login");
          }
          setIsLoading(false);
          setHasCheckedAuth(true);
          return;
        }

        // Skipping JWT/user checks in simplified auth mode
      } catch (error) {
        console.error("Auth check failed:", error);
        // clearAuthData(); // Removed clearAuthData
        if (pathname !== "/admin/login") {
          router.push("/admin/login");
        }
      } finally {
        setIsLoading(false);
        setHasCheckedAuth(true);
      }
    };

    // Check auth immediately
    checkAuth();

    // Also check after a short delay to catch any race conditions
    const timeoutId = setTimeout(checkAuth, 500);

    // Listen for storage changes (when data is updated from another tab)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "adminAuth") {
        console.log("adminAuth changed, rechecking auth");
        checkAuth();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [pathname, router, isLoading, hasCheckedAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
          <p className="text-xs text-gray-500 mt-2">
            Auth: {isAuthenticated ? "Yes" : "No"} | Path: {pathname}
          </p>
        </div>
      </div>
    );
  }

  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {children}
      </div>
    );
  }

  // Debug: Show current state
  console.log("Rendering admin layout:", {
    isAuthenticated,
    pathname,
    isLoading,
    hasCheckedAuth,
  });

  // User-based auth removed in hardcoded mode

  if (!isAuthenticated && hasCheckedAuth) {
    // No user role checks in hardcoded auth mode

    console.log("Not authenticated and checked auth, should redirect");
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-red-600">Redirecting to login...</p>
          <p className="text-xs text-gray-500 mt-2">
            Auth: {isAuthenticated ? "Yes" : "No"} | Path: {pathname} | Checked:{" "}
            {hasCheckedAuth ? "Yes" : "No"}
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
          <p className="text-xs text-gray-500 mt-2">
            Auth: {isAuthenticated ? "Yes" : "No"} | Path: {pathname} | Checked:{" "}
            {hasCheckedAuth ? "Yes" : "No"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar isOpen={true} onClose={() => setSidebarOpen(false)} />
      </div>
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content */}
      <div key={refreshKey} className="flex-1 flex flex-col ml-0 lg:ml-64">
        {/* Header */}
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>

      {/* Debug components removed for simplified auth */}

      {/* Simple debug info */}
      <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
        <div>Auth: {isAuthenticated ? "✓" : "✗"}</div>
        <div>Path: {pathname}</div>
        <div>Loading: {isLoading ? "✓" : "✗"}</div>
        <div>Checked: {hasCheckedAuth ? "✓" : "✗"}</div>
      </div>
    </div>
  );
}
