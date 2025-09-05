"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Camera, Grid, List } from "lucide-react";
import axios from "axios";
import { apiConfig } from "@/lib/config";
import "react-image-lightbox/style.css";
import Lightbox from "react-image-lightbox";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [autoPlayInterval, setAutoPlayInterval] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await axios.get(apiConfig.endpoints.gallery);
        setGalleryData(res.data);
      } catch (err) {
        console.error("Failed to fetch gallery data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isOpen && isAutoPlay && lightboxImages.length > 1) {
      const interval = setInterval(() => {
        setPhotoIndex((prevIndex) => (prevIndex + 1) % lightboxImages.length);
      }, 3000); // Change image every 3 seconds

      setAutoPlayInterval(interval);
    } else if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      setAutoPlayInterval(null);
    }

    return () => {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
      }
    };
  }, [isOpen, isAutoPlay, lightboxImages.length, autoPlayInterval]);

  const filteredPhotos =
    selectedCategory === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  const placeholderImage = "/placeholder.svg";

  // Preload adjacent images
  const preloadAdjacentImages = (images: string[], currentIndex: number) => {
    if (typeof window !== "undefined" && images.length > 1) {
      const prevIndex = (currentIndex + images.length - 1) % images.length;
      const nextIndex = (currentIndex + 1) % images.length;

      // Preload previous image
      if (prevIndex !== currentIndex) {
        const prevImg = new window.Image();
        prevImg.src = images[prevIndex];
      }

      // Preload next image
      if (nextIndex !== currentIndex) {
        const nextImg = new window.Image();
        nextImg.src = images[nextIndex];
      }
    }
  };

  // Toggle auto-play
  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  // Manual navigation that stops auto-play
  const handleManualNavigation = (newIndex: number) => {
    setPhotoIndex(newIndex);
    preloadAdjacentImages(lightboxImages, newIndex);
    setIsAutoPlay(false); // Stop auto-play when user manually navigates
  };

  // Open Lightbox
  const handleOpenLightbox = (images: string[], index: number) => {
    setIsLoading(true);
    setLightboxImages(images);
    setPhotoIndex(index);

    // Preload the main image first
    if (typeof window !== "undefined" && images.length > 0) {
      const img = new window.Image();
      img.onload = () => {
        preloadAdjacentImages(images, index);
        setIsLoading(false);
        setIsOpen(true);
      };
      img.onerror = () => {
        setIsLoading(false);
        setIsOpen(true);
      };
      img.src = images[index];
    } else {
      setIsLoading(false);
      setIsOpen(true);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-700 text-xl">
        Loading gallery...
      </p>
    );

  if (filteredPhotos.length === 0)
    return (
      <p className="text-center mt-20 text-gray-700 text-xl">
        No photos available in this category.
      </p>
    );

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Camera className="inline-block mr-3 text-teal-600" size={48} />
            Photo Gallery
          </h1>
          <p className="text-l text-gray-600 max-w-3xl mx-auto">
            Capturing memories and moments from our vibrant school community
          </p>
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {[
                "All",
                ...new Set(galleryData.map((item) => item.category)),
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-teal-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode("masonry")}
                className={`p-2 rounded transition-colors ${
                  viewMode === "masonry"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPhotos.map((item, index) => (
            <motion.div
              key={item._id ?? index}
              variants={itemVariants}
              className={`group cursor-pointer ${
                viewMode === "masonry" && index % 3 === 1 ? "md:mt-8" : ""
              }`}
              onClick={() => handleOpenLightbox(item.src, 0)}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.src[0] || placeholderImage}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <Camera
                      size={32}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-800">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading image...</p>
            </div>
          </div>
        )}

        {/* Lightbox */}
        {isOpen && !isLoading && (
          <>
            <Lightbox
              mainSrc={lightboxImages[photoIndex]}
              nextSrc={lightboxImages[(photoIndex + 1) % lightboxImages.length]}
              prevSrc={
                lightboxImages[
                  (photoIndex + lightboxImages.length - 1) %
                    lightboxImages.length
                ]
              }
              onCloseRequest={() => setIsOpen(false)}
              onMovePrevRequest={() => {
                const newIndex =
                  (photoIndex + lightboxImages.length - 1) %
                  lightboxImages.length;
                handleManualNavigation(newIndex);
              }}
              onMoveNextRequest={() => {
                const newIndex = (photoIndex + 1) % lightboxImages.length;
                handleManualNavigation(newIndex);
              }}
            />

            {/* Auto-play Controls */}
            {lightboxImages.length > 1 && (
              <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
                <div className="bg-black bg-opacity-70 rounded-full px-4 py-2 flex items-center gap-4">
                  <button
                    onClick={toggleAutoPlay}
                    className={`flex items-center gap-2 text-white text-sm px-3 py-1 rounded-full transition-colors ${
                      isAutoPlay
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                  >
                    {isAutoPlay ? "⏸️ Pause" : "▶️ Play"}
                  </button>

                  <div className="text-white text-sm">
                    {photoIndex + 1} / {lightboxImages.length}
                  </div>

                  <div className="flex gap-1">
                    {lightboxImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleManualNavigation(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === photoIndex
                            ? "bg-white"
                            : "bg-gray-400 hover:bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
