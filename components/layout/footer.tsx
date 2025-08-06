"use client";

import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      section: "About",
      links: [
        { name: "Our History", href: "/about/history" },
        { name: "Mission & Vision", href: "/about/mission" },
        { name: "Leadership Team", href: "/about/leadership" },
        { name: "Principal's Message", href: "/about/principal" },
        { name: "Facilities", href: "/about/facilities" },
      ],
    },
    {
      section: "Academics",
      links: [
        { name: "Programs Overview", href: "/academics/programs" },
        { name: "Academic Facilities", href: "/academics/facilities" },
        { name: "SEE Results", href: "/see-results" },
      ],
    },
    {
      section: "Community",
      links: [
        { name: "Alumni", href: "/alumni" },
        { name: "Gallery", href: "/gallery" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      section: "Support",
      links: [
        { name: "Contact Us", href: "/contact" },
        { name: "Notices", href: "/notices" },
        { name: "Events", href: "/events" },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800 ">
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <img
                src="/chiryau-logo.jpg"
                alt="Chirayu School Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <span className="font-semibold text-lg text-white">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              {siteConfig.description
                ? siteConfig.description
                : `Excellence in education since ${siteConfig.established}.`}
            </p>
            <div className="flex flex-col gap-1 text-gray-400 text-sm">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {siteConfig.contact.address}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> {siteConfig.contact.phone}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> {siteConfig.contact.email}
              </span>
            </div>
          </div>
          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
            {footerLinks.map(({ section, links }) => (
              <div key={section}>
                <h4 className="font-semibold text-gray-200 mb-2 text-sm">
                  {section}
                </h4>
                <ul className="space-y-1">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        {/* Social & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-800 pt-6">
          <div className="flex gap-4">
            <Link
              href={siteConfig.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              <Facebook className="w-5 h-5" />
            </Link>
            <Link
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-400 transition"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-400 transition"
            >
              <Youtube className="w-5 h-5" />
            </Link>
          </div>
          <div className="text-gray-400 text-xs">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
