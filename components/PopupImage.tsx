"use client";

import { useEffect, useState } from "react";

export default function PopupImage() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isHomepage = window.location.pathname === "/";
    if (!isHomepage) return;
    // Only show if not shown before in this browser
    const hasSeenPopup = localStorage.getItem("popupImageShown");
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem("popupImageShown", "true");
    }
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-sm lg:max-w-sm">
        <button
          onClick={() => setShowPopup(false)}
          className="absolute -top-4 -right-4 bg-white rounded-full p-1.5 text-black shadow hover:bg-gray-100 transition"
          aria-label="Close Popup"
        >
          ✕
        </button>
        <img
          src="/popup-image.jpg"
          alt="Popup"
          className="rounded-lg shadow-lg w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
