"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Eye, Upload, Calendar, Tag } from "lucide-react"

const mockGallery = [
  {
    id: 1,
    title: "Annual Sports Day 2024",
    description: "Students participating in various sports activities",
    category: "Sports",
    date: "2024-01-20",
    images: 25,
    views: 450,
    thumbnail: "/gallery-sports-day.png",
  },
  {
    id: 2,
    title: "Science Exhibition",
    description: "Students showcasing their innovative science projects",
    category: "Academic",
    date: "2024-01-18",
    images: 18,
    views: 320,
    thumbnail: "/gallery-science-exhibition.png",
  },
  {
    id: 3,
    title: "Cultural Program",
    description: "Traditional dance and music performances",
    category: "Cultural",
    date: "2024-01-15",
    images: 32,
    views: 580,
    thumbnail: "/gallery-cultural-program.png",
  },
  {
    id: 4,
    title: "Graduation Ceremony",
    description: "Grade 10 students graduation celebration",
    category: "Ceremony",
    date: "2024-01-12",
    images: 40,
    views: 720,
    thumbnail: "/gallery-graduation.png",
  },
  {
    id: 5,
    title: "Field Trip to Museum",
    description: "Educational visit to National Museum",
    category: "Educational",
    date: "2024-01-10",
    images: 22,
    views: 280,
    thumbnail: "/gallery-field-trip.png",
  },
  {
    id: 6,
    title: "Art Competition",
    description: "Inter-class art and drawing competition",
    category: "Competition",
    date: "2024-01-08",
    images: 15,
    views: 195,
    thumbnail: "/gallery-art-competition.png",
  },
]

export default function GalleryPage() {
  const [gallery, setGallery] = useState(mockGallery)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sports":
        return "bg-green-100 text-green-800"
      case "Academic":
        return "bg-blue-100 text-blue-800"
      case "Cultural":
        return "bg-purple-100 text-purple-800"
      case "Ceremony":
        return "bg-yellow-100 text-yellow-800"
      case "Educational":
        return "bg-indigo-100 text-indigo-800"
      case "Competition":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">Photo Gallery</h1>
          <p className="text-gray-600">Manage school photo albums and events</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center space-x-2 w-full md:w-auto">
          <Plus className="h-4 w-4" />
          <span>Create Album</span>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Albums</p>
                <p className="text-2xl font-bold">{gallery.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Tag className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Photos</p>
                <p className="text-2xl font-bold">{gallery.reduce((sum, g) => sum + g.images, 0)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Upload className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Views</p>
                <p className="text-2xl font-bold">{gallery.reduce((sum, g) => sum + g.views, 0)}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Eye className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">4</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <Calendar className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gallery.map((album, index) => (
          <motion.div key={album.id} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center relative">
                <Upload className="h-16 w-16 text-white" />
                <div className="absolute top-4 right-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(album.category)}`}>
                    {album.category}
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{album.title}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(album.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{album.images} photos</span>
                    <span>{album.views} views</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{album.description}</p>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Create Album Modal */}
      {showCreateModal && <CreateAlbumModal onClose={() => setShowCreateModal(false)} />}
    </motion.div>
  )
}

function CreateAlbumModal({ onClose }: { onClose: () => void }) {
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
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">Create New Album</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Album Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter album title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Album description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Sports">Sports</option>
                <option value="Academic">Academic</option>
                <option value="Cultural">Cultural</option>
                <option value="Ceremony">Ceremony</option>
                <option value="Educational">Educational</option>
                <option value="Competition">Competition</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input type="file" multiple accept="image/*" className="hidden" id="photo-upload" />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <div className="text-gray-400 mb-2">
                  <Upload className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">JPG, PNG up to 10MB each</p>
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
            <Button variant="outline" onClick={onClose} className="w-full md:w-auto bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              Create Album
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
