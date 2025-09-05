"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Captions from "yet-another-react-lightbox/plugins/captions";
import axios from "axios";
import { apiConfig } from "@/lib/config";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function PhotoGallery() {
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<
    { src: string; title?: string }[]
  >([]);

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

  const handleOpenLightbox = (
    images: string[],
    index: number,
    title?: string
  ) => {
    const mappedImages = images.map((src) => ({ src, title }));
    setLightboxImages(mappedImages);
    setPhotoIndex(index);
    setIsOpen(true);
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-700">Loading gallery...</p>
    );
  if (!galleryData.length)
    return (
      <p className="text-center mt-20 text-gray-700 text-xl">
        No photos available.
      </p>
    );

  const placeholderImage = "/placeholder.svg";

  return (
    <motion.div
      className="min-h-screen bg-gray-50 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600">
            Capturing moments of learning, growth, and achievement
          </p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          variants={containerVariants}
        >
          {galleryData.map((item) => (
            <motion.div
              key={item._id}
              variants={itemVariants}
              className="group cursor-pointer"
              onClick={() => handleOpenLightbox(item.src, 0, item.title)}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={item.src[0] || placeholderImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            open={isOpen}
            close={() => setIsOpen(false)}
            slides={lightboxImages}
            index={photoIndex}
            plugins={[Captions]}
          />
        )}

        <motion.div variants={itemVariants} className="text-center mt-12">
          <Link href={"/gallery"}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View Full Gallery
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
