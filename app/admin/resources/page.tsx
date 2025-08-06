"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Download, FileText, Video, ImageIcon, BookOpen } from "lucide-react"

const mockResources = [
  {
    id: 1,
    title: "Grade 10 Mathematics Notes",
    description: "Comprehensive mathematics notes covering all SEE syllabus topics",
    type: "document",
    category: "Study Material",
    grade: "Grade 10",
    subject: "Mathematics",
    fileSize: "2.5 MB",
    downloads: 245,
    uploadDate: "2024-01-15",
    status: "active",
  },
  {
    id: 2,
    title: "Science Experiment Videos",
    description: "Collection of physics and chemistry experiment demonstration videos",
    type: "video",
    category: "Multimedia",
    grade: "Grade 8-10",
    subject: "Science",
    fileSize: "150 MB",
    downloads: 189,
    uploadDate: "2024-01-12",
    status: "active",
  },
  {
    id: 3,
    title: "English Grammar Worksheets",
    description: "Practice worksheets for English grammar and composition",
    type: "document",
    category: "Worksheet",
    grade: "Grade 6-8",
    subject: "English",
    fileSize: "1.8 MB",
    downloads: 312,
    uploadDate: "2024-01-10",
    status: "active",
  },
  {
    id: 4,
    title: "Historical Timeline Charts",
    description: "Visual timeline charts for Nepali and world history",
    type: "image",
    category: "Visual Aid",
    grade: "Grade 9-10",
    subject: "Social Studies",
    fileSize: "5.2 MB",
    downloads: 156,
    uploadDate: "2024-01-08",
    status: "active",
  },
]

export default function ResourcesPage() {
  const [resources, setResources] = useState(mockResources)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document":
        return FileText
      case "video":
        return Video
      case "image":
        return ImageIcon
      default:
        return BookOpen
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document":
        return "bg-blue-100 text-blue-800"
      case "video":
        return "bg-red-100 text-red-800"
      case "image":
        return "bg-green-100 text-green-800"
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">Study Resources</h1>
          <p className="text-gray-600">Manage educational resources and materials</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center space-x-2 w-full md:w-auto">
          <Plus className="h-4 w-4" />
          <span>Add Resource</span>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Resources</p>
                <p className="text-2xl font-bold">{resources.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Documents</p>
                <p className="text-2xl font-bold">{resources.filter((r) => r.type === "document").length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Videos</p>
                <p className="text-2xl font-bold">{resources.filter((r) => r.type === "video").length}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-full">
                <Video className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Downloads</p>
                <p className="text-2xl font-bold">{resources.reduce((sum, r) => sum + r.downloads, 0)}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Download className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resources Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => {
          const TypeIcon = getTypeIcon(resource.type)
          return (
            <motion.div key={resource.id} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <TypeIcon className="h-12 w-12 text-white" />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                      {resource.type.toUpperCase()}
                    </span>
                    <div className="text-sm text-gray-500">{resource.fileSize}</div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{resource.title}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Grade:</span>
                      <span className="font-medium">{resource.grade}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Subject:</span>
                      <span className="font-medium">{resource.subject}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Downloads:</span>
                      <span className="font-medium">{resource.downloads}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.description}</p>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Download className="h-4 w-4 mr-1" />
                      Download
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
          )
        })}
      </motion.div>

      {/* Create Resource Modal */}
      {showCreateModal && <CreateResourceModal onClose={() => setShowCreateModal(false)} />}
    </motion.div>
  )
}

function CreateResourceModal({ onClose }: { onClose: () => void }) {
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
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">Add New Resource</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Resource Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter resource title"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Resource description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="document">Document</option>
                <option value="video">Video</option>
                <option value="image">Image</option>
                <option value="audio">Audio</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Study Material">Study Material</option>
                <option value="Worksheet">Worksheet</option>
                <option value="Multimedia">Multimedia</option>
                <option value="Visual Aid">Visual Aid</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Grade</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="All Grades">All Grades</option>
                <option value="Grade 1-5">Grade 1-5</option>
                <option value="Grade 6-8">Grade 6-8</option>
                <option value="Grade 9-10">Grade 9-10</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="Nepali">Nepali</option>
                <option value="Social Studies">Social Studies</option>
                <option value="Computer">Computer</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Upload File</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input type="file" className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="text-gray-400 mb-2">
                  <FileText className="h-12 w-12 mx-auto" />
                </div>
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PDF, DOC, MP4, JPG up to 50MB</p>
              </label>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
            <Button variant="outline" onClick={onClose} className="w-full md:w-auto bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              Add Resource
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
