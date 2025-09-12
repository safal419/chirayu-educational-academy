"use client";

import React from "react";
import { motion } from "framer-motion";
import BlogForm, { BlogPost } from "./BlogForm";

export default function CreateBlogModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (blog: any) => void;
}) {
  const handleCreate = async (payload: any) => {
    await onCreate(payload);
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
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">
            Create New Blog Post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <BlogForm
          onSubmit={handleCreate}
          onCancel={onClose}
          submitLabel="Create Post"
        />
      </motion.div>
    </motion.div>
  );
}
