"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { GraduationCap, MapPin, Briefcase, Mail, ExternalLink } from "lucide-react"

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

export default function AlumniPage() {
  const featuredAlumni = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      graduationYear: "2018",
      currentPosition: "Medical Doctor",
      company: "Tribhuvan University Teaching Hospital",
      location: "Kathmandu, Nepal",
      achievement: "Graduated with distinction from MBBS program",
      image: "/professional-female-doctor.png",
      bio: "Dr. Priya exemplifies excellence in medical field and continues to inspire current students.",
    },
    {
      id: 2,
      name: "Rajesh Thapa",
      graduationYear: "2016",
      currentPosition: "Software Engineer",
      company: "Google",
      location: "California, USA",
      achievement: "Lead Engineer for major tech projects",
      image: "/male-software-engineer-professional.png",
      bio: "Rajesh's journey from our classrooms to Silicon Valley is truly inspiring.",
    },
    {
      id: 3,
      name: "Anita Gurung",
      graduationYear: "2019",
      currentPosition: "Civil Engineer",
      company: "Department of Roads",
      location: "Pokhara, Nepal",
      achievement: "Leading infrastructure development projects",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Anita is contributing to Nepal's infrastructure development and nation building.",
    },
    {
      id: 4,
      name: "Sandip Rai",
      graduationYear: "2017",
      currentPosition: "Teacher",
      company: "Chirayu Educational Academy",
      location: "Kathmandu, Nepal",
      achievement: "Returned as faculty member",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Sandip chose to give back to his alma mater and is now shaping young minds.",
    },
  ]

  const achievements = [
    {
      title: "Medical Professionals",
      count: "45+",
      description: "Alumni working in healthcare sector",
      icon: "🏥",
    },
    {
      title: "Engineers",
      count: "60+",
      description: "Alumni in engineering fields",
      icon: "⚙️",
    },
    {
      title: "Teachers",
      count: "35+",
      description: "Alumni in education sector",
      icon: "📚",
    },
    {
      title: "Entrepreneurs",
      count: "25+",
      description: "Alumni running their own businesses",
      icon: "💼",
    },
  ]

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <GraduationCap className="inline-block mr-3 text-green-600" size={48} />
            Our Alumni
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the success stories of our graduates who are making a difference in the world
          </p>
        </motion.div>

        {/* Alumni Statistics */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <div className="text-3xl font-bold text-green-600 mb-2">{achievement.count}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Alumni */}
        <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Featured Alumni</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredAlumni.map((alumni, index) => (
              <motion.div
                key={alumni.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <Image
                      src={alumni.image || "/placeholder.svg"}
                      alt={alumni.name}
                      width={100}
                      height={100}
                      className="rounded-full flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{alumni.name}</h3>
                      <p className="text-green-600 font-semibold mb-2">{alumni.currentPosition}</p>
                      <div className="space-y-1 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase size={16} className="mr-2" />
                          {alumni.company}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin size={16} className="mr-2" />
                          {alumni.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <GraduationCap size={16} className="mr-2" />
                          Class of {alumni.graduationYear}
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm mb-4">{alumni.bio}</p>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-green-800 text-sm font-medium">{alumni.achievement}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Alumni Network */}
        <motion.section variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Alumni Network</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected with your fellow graduates and continue to be part of the Chirayu family. Share your
              success stories and inspire current students.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2 font-medium"
            >
              <Mail size={20} />
              Contact Alumni Office
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center gap-2 font-medium"
            >
              <ExternalLink size={20} />
              Alumni Registration
            </motion.button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}
