"use client";

import { Phone, Mail, Facebook, Youtube, Instagram } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

export default function TopBar() {
  return (
    <div className="bg-blue-600 text-white text-xs sm:text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Contact Information */}
          <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6 flex-1 min-w-0">
            {siteConfig.contact.phone && (
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="flex items-center space-x-1 hover:text-blue-200 transition-colors flex-shrink-0"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{siteConfig.contact.phone}</span>
                <span className="sm:hidden">Call</span>
              </a>
            )}
            {siteConfig.contact.email && (
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="flex items-center space-x-1 hover:text-blue-200 transition-colors flex-shrink-0 hidden md:flex"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden lg:inline">{siteConfig.contact.email}</span>
                <span className="lg:hidden">Email</span>
              </a>
            )}
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
            {siteConfig.social.facebook && (
              <Link
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}
            {siteConfig.social.youtube && (
              <Link
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors p-1"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}
            {siteConfig.social.instagram && (
              <Link
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-200 transition-colors p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

