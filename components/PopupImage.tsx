"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { apiConfig } from "@/lib/config";

export default function PopupImage() {
  const [showPopup, setShowPopup] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isHomepage = window.location.pathname === "/";
    if (!isHomepage) return;

    const fetchPopup = async () => {
      setLoading(true);
      try {
        const res = await axios.get(apiConfig.endpoints.popup);
        const data = res?.data;
        let popup: any = null;

        if (Array.isArray(data)) {
          popup = data.find((p: any) => p.isActive) || data[0] || null;
        } else if (data && typeof data === "object") {
          if (
            Array.isArray((data as any).items) &&
            (data as any).items.length
          ) {
            const items = (data as any).items;
            popup = items.find((p: any) => p.isActive) || items[0];
          } else {
            popup = data;
          }
        }

        if (popup && (popup.isActive || popup.is_active || popup.active)) {
          // try common field names for url
          const url =
            popup.imageUrl ||
            popup.image_url ||
            popup.url ||
            popup.path ||
            null;
          if (url) {
            setImageUrl(url);
            setShowPopup(true);
          }
        }
      } catch (err) {
        // silent fail, don't block page
        // console.error("Popup fetch error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopup();
  }, []);

  if (loading) return null; // don't render until we know whether to show
  if (!showPopup || !imageUrl) return null;

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
          src={imageUrl}
          alt="Popup"
          className="rounded-lg shadow-lg w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
