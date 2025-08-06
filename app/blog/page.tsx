"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Calendar, User, ArrowRight, Search } from "lucide-react"

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

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Education: Embracing Digital Learning",
      excerpt:
        "Exploring how technology is transforming the classroom experience and preparing students for the digital age.",
      author: "Dr. Rajesh Sharma",
      date: "2024-01-20",
      category: "Education Technology",
      image: "/placeholder.svg?height=200&width=400",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Building Character Through Community Service",
      excerpt:
        "How our community service programs help students develop empathy, leadership skills, and social responsibility.",
      author: "Mrs. Sunita Patel",
      date: "2024-01-18",
      category: "Character Development",
      image: "/placeholder.svg?height=200&width=400",
      readTime: "4 min read",
    },
    {
      id: 3,
      title: "STEM Education: Inspiring the Next Generation of Innovators",
      excerpt:
        "Our approach to Science, Technology, Engineering, and Mathematics education that encourages creativity and problem-solving.",
      author: "Mr. Anil Kumar",
      date: "2024-01-15",
      category: "STEM Education",
      image: "/science-exhibition.png",
      readTime: "6 min read",
    },
    {
      id: 4,
      title: "The Importance of Extracurricular Activities",
      excerpt: "How sports, arts, and clubs contribute to holistic student development and college readiness.",
      author: "Ms. Priya Thapa",
      date: "2024-01-12",
      category: "Student Development",
      image: "/cultural-program.png",
      readTime: "4 min read",
    },
    {
      id: 5,
      title: "Parent-School Partnership: A Key to Student Success",
      excerpt: "The vital role of parent involvement in education and how we foster strong school-home connections.",
      author: "Mrs. Sunita Patel",
      date: "2024-01-10",
      category: "Parent Engagement",
      image: "/placeholder.svg?height=200&width=400",
      readTime: "5 min read",
    },
    {
      id: 6,
      title: "Preparing Students for Global Citizenship",
      excerpt: "Our international perspective on education and how we prepare students to be global citizens.",
      author: "Dr. Rajesh Sharma",
      date: "2024-01-08",
      category: "Global Education",
      image: "/placeholder.svg?height=200&width=400",
      readTime: "7 min read",
    },
  ]

  const categories = [
    "All",
    "Education Technology",
    "Character Development",
    "STEM Education",
    "Student Development",
    "Parent Engagement",
    "Global Education",
  ]

  const getCategoryColor = (category: string) => {
    const colors = {
      "Education Technology": "bg-blue-100 text-blue-800",
      "Character Development": "bg-green-100 text-green-800",
      "STEM Education": "bg-purple-100 text-purple-800",
      "Student Development": "bg-orange-100 text-orange-800",
      "Parent Engagement": "bg-pink-100 text-pink-800",
      "Global Education": "bg-teal-100 text-teal-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">School Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, updates, and educational perspectives from our faculty and community
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
            >
              <div className="relative h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <User size={16} className="mr-1" />
                    {post.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-orange-600 font-medium inline-flex items-center gap-2 hover:gap-3 transition-all"
                  >
                    Read More
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Load More Posts
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  )
}
