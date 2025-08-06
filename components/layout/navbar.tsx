"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, navigationConfig } from "@/lib/config";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + School Name */}
          <Link href="/" className="flex items-center space-x-2">
            <img
              src="/chiryau-logo.jpg"
              alt="Chirayu School Logo"
              className="w-12 h-12 rounded-lg object-cover"
            />
            {/* Smaller font on mobile with max width and truncate */}
            <span className="font-bold text-gray-900 text-base sm:text-xl truncate max-w-[120px] sm:max-w-none">
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>

            {navigationConfig.map((item) => (
              <div key={item.title} className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2">
                  <span>{item.title}</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                  <div className="py-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Link href="/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-auto max-h-[calc(100vh-5rem)]"
          >
            <div className="px-6 py-6 space-y-1">
              <Link
                href="/"
                className="block text-gray-700 hover:text-blue-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>

              {navigationConfig.map((item) => (
                <div key={item.title} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 py-2">
                      {item.title}
                    </h3>
                    {item.items && item.items.length > 0 && (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        aria-label={`Toggle ${item.title} submenu`}
                        className="p-1 rounded hover:bg-gray-100"
                      >
                        {openSubmenus.includes(item.title) ? (
                          <ChevronUp className="w-5 h-5 text-gray-700" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-700" />
                        )}
                      </button>
                    )}
                  </div>

                  {openSubmenus.includes(item.title) && (
                    <div className="pl-4 space-y-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block text-sm text-gray-600 hover:text-blue-600 transition-colors py-0.5"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link href="/contact" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
