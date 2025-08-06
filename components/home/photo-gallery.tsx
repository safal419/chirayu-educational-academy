"use client";

import { motion } from "framer-motion";
import { Camera, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PhotoGallery() {
  const photos = [
    {
      src: "/school-classroom-students.png",
      alt: "Students in classroom",
      category: "Academic",
    },
    {
      src: "/science-exhibition.png",
      alt: "Science exhibition",
      category: "Events",
    },
    {
      src: "/cultural-program.png",
      alt: "Cultural program",
      category: "Activities",
    },
    { src: "/school-sports-day.png", alt: "Sports day", category: "Sports" },
    { src: "/school-library.png", alt: "Library", category: "Facilities" },
    {
      src: "/school-graduation.png",
      alt: "Graduation ceremony",
      category: "Achievements",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Photo Gallery
          </h2>
          <p className="text-xl text-gray-600">
            Capturing moments of learning, growth, and achievement
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            View Full Gallery
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent z-10"></div>
    </section>
  );
}
