"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Trophy,
  MessageSquare,
  Settings,
  Newspaper,
  ChevronDown,
  ChevronRight,
  Bell,
  BookOpen,
  Users,
  ImageIcon,
  X,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Content Management",
    icon: FileText,
    children: [
      { title: "Notices", href: "/admin/notices", icon: Bell },
      { title: "Events", href: "/admin/events", icon: Calendar },
      { title: "Blog", href: "/admin/blog", icon: Newspaper },
      { title: "Gallery", href: "/admin/gallery", icon: ImageIcon },
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
  },
  {
    title: "Academic",
    icon: GraduationCap,
    children: [
      { title: "SEE Results", href: "/admin/see-results", icon: Trophy },
      { title: "Academics", href: "/admin/academics", icon: BookOpen },
      { title: "Alumni", href: "/admin/alumni", icon: Users },
    ],
  },
];

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([
    "Content Management",
    "Academic",
  ]);

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const isParentActive = (children: any[]) => {
    return children.some((child) => pathname === child.href);
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
        }}
        className="fixed left-0 top-0 z-50 h-full w-64 bg-white shadow-xl lg:translate-x-0 lg:shadow-lg"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
                <p className="text-xs text-gray-500">
                  Chirayu Educational Academy
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.title}>
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.title)}
                        className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
                          isParentActive(item.children)
                            ? "bg-blue-50 text-blue-700 shadow-sm"
                            : "text-gray-700"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5" />
                          <span className="font-medium">{item.title}</span>
                        </div>
                        {expandedItems.includes(item.title) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                      <AnimatePresence>
                        {expandedItems.includes(item.title) && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="ml-6 mt-2 space-y-1 overflow-hidden"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={onClose}
                                  className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
                                    isActive(child.href)
                                      ? "bg-blue-100 text-blue-700 shadow-sm"
                                      : "text-gray-600 hover:text-gray-900"
                                  }`}
                                >
                                  <child.icon className="h-4 w-4" />
                                  <span className="text-sm font-medium">
                                    {child.title}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
                        isActive(item.href)
                          ? "bg-blue-100 text-blue-700 shadow-sm"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
        </div>
      </motion.aside>
    </>
  );
}
