"use client";

import { useRouter } from "next/navigation";
import {
  Menu,
  User,
  LogOut,
  Settings,
  Home,
  Key,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    // Clear all auth data
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("adminAuth");

    // Show logout message
    toast.success("Logged out successfully");

    // Redirect to login
    window.location.replace("/");
  };

  const goToMainSite = () => {
    window.open("/", "_blank");
  };

  const goToChangePassword = () => {
    router.push("/admin/change-password");
  };

  const goToCreateUser = () => {
    router.push("/admin/create-user");
  };

  return (
    <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        {/* Visit Main Site Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={goToMainSite}
          className="flex items-center space-x-2 bg-blue-300 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Home className="h-4 w-4" />
          <span>Visit Site</span>
        </Button>

        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Admin</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>User Management</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={goToChangePassword}>
              <Key className="h-4 w-4 mr-2" />
              Change Password
            </DropdownMenuItem>
            <DropdownMenuItem onClick={goToCreateUser}>
              <UserPlus className="h-4 w-4 mr-2" />
              Create User
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-600">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
