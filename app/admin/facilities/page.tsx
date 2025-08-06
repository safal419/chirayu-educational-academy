"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, MapPin, Users, Clock, CheckCircle } from "lucide-react"

const mockFacilities = [
  {
    id: 1,
    name: "Science Laboratory",
    description: "Modern science lab equipped with latest instruments for physics, chemistry, and biology experiments",
    category: "Academic",
    capacity: 40,
    location: "Ground Floor, Block A",
    status: "operational",
    features: ["Microscopes", "Chemical Storage", "Safety Equipment", "Digital Projector"],
    image: "/facility-science-lab.png",
  },
  {
    id: 2,
    name: "Computer Laboratory",
    description: "State-of-the-art computer lab with high-speed internet and modern software",
    category: "Technology",
    capacity: 35,
    location: "First Floor, Block B",
    status: "operational",
    features: ["30 Computers", "High-Speed Internet", "Programming Software", "Interactive Whiteboard"],
    image: "/facility-computer-lab.png",
  },
  {
    id: 3,
    name: "Library",
    description: "Well-stocked library with books, journals, and digital resources",
    category: "Academic",
    capacity: 60,
    location: "Second Floor, Main Building",
    status: "operational",
    features: ["10,000+ Books", "Digital Resources", "Reading Area", "Study Rooms"],
    image: "/facility-library.png",
  },
  {
    id: 4,
    name: "Sports Ground",
    description: "Multi-purpose sports ground for various outdoor activities and sports",
    category: "Sports",
    capacity: 200,
    location: "Behind Main Building",
    status: "operational",
    features: ["Football Field", "Basketball Court", "Running Track", "Volleyball Court"],
    image: "/facility-sports-ground.png",
  },
  {
    id: 5,
    name: "Auditorium",
    description: "Modern auditorium for events, presentations, and cultural programs",
    category: "Events",
    capacity: 300,
    location: "Ground Floor, Block C",
    status: "maintenance",
    features: ["Sound System", "Projector", "Stage", "Air Conditioning"],
    image: "/facility-auditorium.png",
  },
]

export default function FacilitiesPage() {
  const [facilities, setFacilities] = useState(mockFacilities)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic":
        return "bg-blue-100 text-blue-800"
      case "Technology":
        return "bg-purple-100 text-purple-800"
      case "Sports":
        return "bg-green-100 text-green-800"
      case "Events":
        return "bg-orange-100 text-orange-800"
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">Facilities</h1>
          <p className="text-gray-600">Manage school facilities and infrastructure</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="flex items-center space-x-2 w-full md:w-auto">
          <Plus className="h-4 w-4" />
          <span>Add Facility</span>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Facilities</p>
                <p className="text-2xl font-bold">{facilities.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <MapPin className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Operational</p>
                <p className="text-2xl font-bold">{facilities.filter((f) => f.status === "operational").length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Capacity</p>
                <p className="text-2xl font-bold">{facilities.reduce((sum, f) => sum + f.capacity, 0)}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold">{facilities.filter((f) => f.status === "maintenance").length}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Facilities Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility, index) => (
          <motion.div key={facility.id} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <MapPin className="h-16 w-16 text-white" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(facility.category)}`}>
                    {facility.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(facility.status)}`}>
                    {facility.status.toUpperCase()}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{facility.name}</h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {facility.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    Capacity: {facility.capacity}
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{facility.description}</p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Features</h4>
                  <div className="flex flex-wrap gap-1">
                    {facility.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                    {facility.features.length > 3 && (
                      <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                        +{facility.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
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

      {/* Create Facility Modal */}
      {showCreateModal && <CreateFacilityModal onClose={() => setShowCreateModal(false)} />}
    </motion.div>
  )
}

function CreateFacilityModal({ onClose }: { onClose: () => void }) {
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
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">Add New Facility</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            ×
          </button>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Facility Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter facility name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Facility description..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="Academic">Academic</option>
                <option value="Technology">Technology</option>
                <option value="Sports">Sports</option>
                <option value="Events">Events</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Capacity</label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Maximum capacity"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Ground Floor, Block A"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
            <textarea
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter features separated by commas"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="operational">Operational</option>
              <option value="maintenance">Under Maintenance</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
            <Button variant="outline" onClick={onClose} className="w-full md:w-auto bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="w-full md:w-auto">
              Add Facility
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}
