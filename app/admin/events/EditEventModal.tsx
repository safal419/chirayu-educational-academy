// filepath: d:\projects\Chirayu academy\chirayu-school-website\app\admin\events\EditEventModal.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import EventForm, { EventType } from "./EventForm";

export default function EditEventModal({
  event,
  onClose,
  onUpdate,
}: {
  event: EventType;
  onClose: () => void;
  onUpdate: (payload: any) => Promise<void>;
}) {
  const handleUpdate = async (payload: any) => {
    await onUpdate({ ...payload, _id: event._id });
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Event</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <EventForm
          initialValues={event}
          onSubmit={handleUpdate}
          onCancel={onClose}
          submitLabel="Update Event"
        />
      </motion.div>
    </motion.div>
  );
}
