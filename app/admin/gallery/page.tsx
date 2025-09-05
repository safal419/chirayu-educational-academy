"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Upload, Calendar, Tag } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { apiConfig } from "@/lib/config";

interface GalleryItem {
  _id?: string;
  title: string;
  description: string;
  category: string;
  date: string;
  src: string[];
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [viewItem, setViewItem] = useState<GalleryItem | null>(null);

  const fetchGallery = async () => {
    try {
      const res = await axios.get(apiConfig.endpoints.gallery);
      setGallery(res.data);
    } catch (err) {
      toast.error("Failed to fetch gallery");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const deleteAlbum = async (id: string) => {
    if (!confirm("Are you sure you want to delete this album?")) return;
    try {
      await axios.delete(`${apiConfig.endpoints.gallery}/${id}`);
      toast.success("Album deleted successfully");
      fetchGallery();
    } catch (err) {
      toast.error("Failed to delete album");
      console.error(err);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sports":
        return "bg-green-100 text-green-800";
      case "Academic":
        return "bg-blue-100 text-blue-800";
      case "Cultural":
        return "bg-purple-100 text-purple-800";
      case "Ceremony":
        return "bg-yellow-100 text-yellow-800";
      case "Educational":
        return "bg-indigo-100 text-indigo-800";
      case "Competition":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <Toaster position="top-right" />
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            Photo Gallery
          </h1>
          <p className="text-gray-600">Manage school photo albums and events</p>
        </div>
        <Button
          onClick={() => {
            setEditingItem(null);
            setShowCreateModal(true);
          }}
          className="flex items-center space-x-2 w-full md:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Create Album</span>
        </Button>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {gallery.map((album) => (
          <motion.div
            key={album._id}
            variants={itemVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              {/* Thumbnail */}
              <div
                className="h-48 bg-gray-100 flex items-center justify-center relative cursor-pointer"
                onClick={() => setViewItem(album)}
              >
                {album.src[0] ? (
                  <img
                    src={album.src[0]}
                    alt={album.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Upload className="h-16 w-16 text-gray-400" />
                )}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      album.category
                    )}`}
                  >
                    {album.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {album.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(album.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{album.src.length} photos</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {album.description}
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-transparent"
                    onClick={() => setViewItem(album)}
                  >
                    <Eye className="h-4 w-4 mr-1" /> View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingItem(album);
                      setShowCreateModal(true);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => deleteAlbum(album._id!)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Create/Edit Modal */}
      {showCreateModal && (
        <CreateAlbumModal
          onClose={() => setShowCreateModal(false)}
          onSave={fetchGallery}
          editingItem={editingItem}
        />
      )}

      {/* View All Modal */}
      {viewItem && (
        <ViewAlbumModal album={viewItem} onClose={() => setViewItem(null)} />
      )}
    </motion.div>
  );
}

function CreateAlbumModal({
  onClose,
  onSave,
  editingItem,
}: {
  onClose: () => void;
  onSave: () => void;
  editingItem: GalleryItem | null;
}) {
  const [title, setTitle] = useState(editingItem?.title || "");
  const [description, setDescription] = useState(
    editingItem?.description || ""
  );
  const [category, setCategory] = useState(editingItem?.category || "Sports");
  const [date, setDate] = useState(
    editingItem?.date
      ? new Date(editingItem.date).toISOString().slice(0, 10)
      : ""
  );
  const [files, setFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    editingItem?.src || []
  );

  // Handle new file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles((prev) => [...prev, ...Array.from(e.target.files)]);
  };

  // Remove selected file before upload
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove existing image (already uploaded)
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!files.length && !existingImages.length) {
      alert("Please upload at least one image!");
      return;
    }

    try {
      let uploadedUrls: string[] = [...existingImages];

      if (files.length > 0) {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        const res = await axios.post(apiConfig.endpoints.upload, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        uploadedUrls = [...uploadedUrls, ...res.data.paths];
      }

      const payload = {
        title,
        description,
        category,
        date: new Date(date),
        src: uploadedUrls,
      };

      if (editingItem?._id) {
        await axios.patch(
          `${apiConfig.endpoints.gallery}/${editingItem._id}`,
          payload
        );
      } else {
        await axios.post(apiConfig.endpoints.gallery, payload);
      }

      onClose();
      onSave();
    } catch (err) {
      console.error(err);
    }
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
        className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">
            {editingItem ? "Edit Album" : "Create New Album"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title & Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Album Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter album title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Album description..."
            />
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Sports">Sports</option>
                <option value="Academic">Academic</option>
                <option value="Cultural">Cultural</option>
                <option value="Ceremony">Ceremony</option>
                <option value="Educational">Educational</option>
                <option value="Competition">Competition</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Event Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Photos
            </label>

            {/* Preview existing images */}
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {existingImages.map((url, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 rounded overflow-hidden border"
                  >
                    <img
                      src={url}
                      alt={`img-${i}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Preview newly selected files */}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {files.map((file, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 rounded overflow-hidden border"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File input */}
            <label
              htmlFor="file-upload"
              className="block w-full p-6 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-500 transition"
            >
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
              <p className="text-gray-600">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">JPG, PNG up to 10MB each</p>
              <input
                type="file"
                id="file-upload"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="w-full md:w-auto bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              {editingItem ? "Update Album" : "Create Album"}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// View Album Modal
function ViewAlbumModal({
  album,
  onClose,
}: {
  album: GalleryItem;
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50 p-4"
    >
      <button
        className="text-white text-3xl absolute top-4 right-4"
        onClick={onClose}
      >
        ×
      </button>
      {album.src.length > 0 && (
        <img
          src={album.src[currentIndex]}
          alt="album"
          className="max-h-[70vh] max-w-full object-contain rounded-lg"
        />
      )}
      {/* Carousel */}
      {album.src.length > 1 && (
        <div className="flex space-x-2 mt-4">
          <Button
            onClick={() =>
              setCurrentIndex(
                (currentIndex - 1 + album.src.length) % album.src.length
              )
            }
          >
            Prev
          </Button>
          <Button
            onClick={() =>
              setCurrentIndex((currentIndex + 1) % album.src.length)
            }
          >
            Next
          </Button>
        </div>
      )}
    </motion.div>
  );
}
