"use client";

import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import BlogForm, { BlogPost } from "./BlogForm";

export default function EditBlogModal({
  blog,
  onClose,
  onUpdate,
}: {
  blog: BlogPost;
  onClose: () => void;
  onUpdate: (blog: any) => void;
}) {
  const handleUpdate = async (payload: any) => {
    // Ensure we send the correct id for the backend
    const id = payload._id || payload.id || blog._id || blog.id;
    if (!id) {
      toast.error("Blog ID is missing. Cannot update.");
      return;
    }

    // Call onUpdate with id included
    await onUpdate({ ...payload, id });
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
            Edit Blog Post
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <BlogForm
          initialValues={blog}
          onSubmit={handleUpdate}
          onCancel={onClose}
          submitLabel="Update Post"
        />
      </motion.div>
    </motion.div>
  );
}
