"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Camera, Grid, List } from "lucide-react"
import { useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid")

  const categories = ["All", "Academic", "Sports", "Cultural", "Events", "Campus Life"]

  const photos = [
    {
      id: 1,
      src: "/modern-school-students.png",
      category: "Academic",
      title: "Modern Classroom Learning",
      description: "Students engaged in interactive learning",
    },
    {
      id: 2,
      src: "/school-sports-day.png",
      category: "Sports",
      title: "Annual Sports Day",
      description: "Athletic competitions and team spirit",
    },
    {
      id: 3,
      src: "/science-exhibition.png",
      category: "Academic",
      title: "Science Exhibition",
      description: "Students showcasing innovative projects",
    },
    {
      id: 4,
      src: "/cultural-program.png",
      category: "Cultural",
      title: "Cultural Performance",
      description: "Traditional dance and music performance",
    },
    {
      id: 5,
      src: "/school-classroom-students.png",
      category: "Academic",
      title: "Classroom Discussion",
      description: "Interactive learning environment",
    },
    {
      id: 6,
      src: "/school-science-laboratory.png",
      category: "Academic",
      title: "Science Laboratory",
      description: "Hands-on experiments and learning",
    },
    {
      id: 7,
      src: "/school-sports.png",
      category: "Sports",
      title: "Sports Activities",
      description: "Physical education and fitness",
    },
    {
      id: 8,
      src: "/school-library.png",
      category: "Campus Life",
      title: "Library Study",
      description: "Quiet study and research environment",
    },
    {
      id: 9,
      src: "/school-graduation.png",
      category: "Events",
      title: "Graduation Ceremony",
      description: "Celebrating academic achievements",
    },
    {
      id: 10,
      src: "/placeholder.svg?height=300&width=400",
      category: "Cultural",
      title: "School Festival",
      description: "Annual celebration with community",
    },
    {
      id: 11,
      src: "/placeholder.svg?height=250&width=400",
      category: "Academic",
      title: "Group Study Session",
      description: "Collaborative learning approach",
    },
    {
      id: 12,
      src: "/placeholder.svg?height=350&width=400",
      category: "Cultural",
      title: "Art Exhibition",
      description: "Student artwork and creativity showcase",
    },
  ]

  const filteredPhotos =
    selectedCategory === "All" ? photos : photos.filter((photo) => photo.category === selectedCategory)

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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <Camera className="inline-block mr-3 text-teal-600" size={48} />
            Photo Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Capturing memories and moments from our vibrant school community
          </p>
        </motion.div>

        {/* Filters and View Toggle */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
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
                    viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("masonry")}
                  className={`p-2 rounded transition-colors ${
                    viewMode === "masonry" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
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
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              variants={itemVariants}
              className={`group cursor-pointer ${viewMode === "masonry" && index % 3 === 1 ? "md:mt-8" : ""}`}
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative overflow-hidden">
                  <Image
                    src={photo.src || "/placeholder.svg"}
                    alt={photo.title}
                    width={400}
                    height={viewMode === "masonry" ? (index % 3 === 0 ? 300 : index % 3 === 1 ? 250 : 350) : 300}
                    className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={32} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-800">
                      {photo.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{photo.title}</h3>
                  <p className="text-gray-600 text-sm">{photo.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-teal-600 text-white px-8 py-3 rounded-lg hover:bg-teal-700 transition-colors font-medium"
          >
            Load More Photos
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
