"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Bell, Download } from "lucide-react"

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

export default function NoticesPage() {
  const notices = [
    {
      id: 1,
      title: "Annual Sports Day 2024",
      date: "2024-01-15",
      category: "Event",
      priority: "high",
      content:
        "Annual Sports Day will be held on February 20, 2024. All students are required to participate. Registration deadline is February 10, 2024.",
      attachment: true,
    },
    {
      id: 2,
      title: "Parent-Teacher Meeting",
      date: "2024-01-10",
      category: "Academic",
      priority: "medium",
      content:
        "Parent-Teacher meeting scheduled for January 25, 2024, from 9:00 AM to 4:00 PM. Please book your slots in advance.",
      attachment: false,
    },
    {
      id: 3,
      title: "Science Exhibition Registration",
      date: "2024-01-08",
      category: "Academic",
      priority: "medium",
      content:
        "Registration open for Inter-School Science Exhibition. Submit your project proposals by January 30, 2024.",
      attachment: true,
    },
    {
      id: 4,
      title: "Winter Vacation Notice",
      date: "2024-01-05",
      category: "Holiday",
      priority: "high",
      content: "Winter vacation from December 25, 2023 to January 5, 2024. School will reopen on January 8, 2024.",
      attachment: false,
    },
    {
      id: 5,
      title: "New Library Timings",
      date: "2024-01-03",
      category: "Facility",
      priority: "low",
      content:
        "Library timings have been extended. New timings: Monday to Friday 7:00 AM to 6:00 PM, Saturday 8:00 AM to 2:00 PM.",
      attachment: false,
    },
    {
      id: 6,
      title: "Cultural Program Auditions",
      date: "2024-01-01",
      category: "Event",
      priority: "medium",
      content:
        "Auditions for annual cultural program will be held on January 15-17, 2024. Students interested in participating should register with their class teachers.",
      attachment: true,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Event":
        return "bg-purple-100 text-purple-800"
      case "Academic":
        return "bg-blue-100 text-blue-800"
      case "Holiday":
        return "bg-orange-100 text-orange-800"
      case "Facility":
        return "bg-teal-100 text-teal-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <Bell className="inline-block mr-3 text-blue-600" size={48} />
            School Notices
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest announcements, events, and important information
          </p>
        </motion.div>

        {/* Notices Grid */}
        <motion.div variants={itemVariants} className="space-y-6">
          {notices.map((notice, index) => (
            <motion.div
              key={notice.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notice.priority)}`}
                    >
                      {notice.priority.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                      {notice.category}
                    </span>
                    {notice.attachment && (
                      <span className="flex items-center text-green-600 text-xs font-medium">
                        <Download size={12} className="mr-1" />
                        Attachment
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{notice.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{notice.content}</p>

                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(notice.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {Math.floor(Math.random() * 5) + 1} days ago
                    </div>
                  </div>
                </div>

                {notice.attachment && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <Download size={16} />
                    Download
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow font-medium border border-blue-200"
          >
            Load More Notices
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
