// filepath: app/admin/events/CreateEventModal.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import EventForm, { EventType } from "./EventForm";
import axios from "axios";
import toast from "react-hot-toast";
import { apiConfig } from "@/lib/config";

function extractImageUrl(data: any): string {
  if (!data) return "";

  // Handle Cloudinary upload shape
  if (Array.isArray(data?.urls) && data.urls[0]) return data.urls[0];

  if (Array.isArray(data) && data[0])
    return data[0].secure_url || data[0].url || data[0].path || "";
  if (data?.files && data.files[0])
    return (
      data.files[0].secure_url || data.files[0].url || data.files[0].path || ""
    );
  if (data?.paths && data.paths[0]) return data.paths[0];
  if (data?.secure_url) return data.secure_url;
  if (data?.url) return data.url;
  if (data?.path) return data.path;
  if (typeof data === "string") return data;

  return "";
}

export default function CreateEventModal({
  event,
  onClose,
  onCreate,
  onUpdate,
}: {
  event: EventType | null;
  onClose: () => void;
  onCreate: (payload: any) => Promise<void>;
  onUpdate: (payload: any) => Promise<void>;
}) {
  const submitLabel = event ? "Update Event" : "Create Event";
  const [loading, setLoading] = useState(false);

  // ✅ Stable default object to avoid infinite re-renders
  const defaultValues = useMemo<Partial<EventType>>(
    () => ({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      status: "upcoming",
      attendees: 0,
      image: undefined,
    }),
    []
  );

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("files", file);

    const res = await axios.post(apiConfig.endpoints.upload, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return extractImageUrl(res.data);
  };

  const handleSubmit = async (payload: any) => {
    setLoading(true);
    try {
      let imageUrl = payload.image || "";

      if (payload.image instanceof File) {
        imageUrl = await uploadFile(payload.image);
      } else if (payload.image === null) {
        imageUrl = ""; // removed
      }

      const eventData = { ...payload, image: imageUrl };
      eventData.attendees = Math.max(0, Number(eventData.attendees) || 0);

      if (event) {
        await onUpdate({ ...eventData, _id: event._id });
        toast.success("Event updated successfully");
      } else {
        await onCreate(eventData);
        toast.success("Event created successfully");
      }

      onClose();
    } catch (err) {
      console.error("Modal submit error:", err);
      toast.error("Error saving event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {event ? "Edit Event" : "Create New Event"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <EventForm
          initialValues={event ?? defaultValues} // ✅ always stable
          onSubmit={handleSubmit}
          onCancel={onClose}
          submitLabel={submitLabel}
          isSubmitting={loading}
        />
      </motion.div>
    </motion.div>
  );
}
