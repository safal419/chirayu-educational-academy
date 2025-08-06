"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Award, BookOpen, Users, GraduationCap } from "lucide-react"

const facultyMembers = [
  {
    name: "Dr. Ram Sharma",
    position: "Principal",
    department: "Administration",
    qualification: "Ph.D. in Educational Leadership",
    experience: "15 years",
    email: "principal@chirayuacademy.edu.np",
    specialization: "Educational Administration, Curriculum Development",
  },
  {
    name: "Ms. Sita Thapa",
    position: "Vice Principal",
    department: "Administration",
    qualification: "M.Ed. in Educational Leadership",
    experience: "12 years",
    email: "vice.principal@chirayuacademy.edu.np",
    specialization: "Student Affairs, Academic Coordination",
  },
  {
    name: "Mr. Hari Poudel",
    position: "Senior Mathematics Teacher",
    department: "Mathematics",
    qualification: "M.Sc. Mathematics, B.Ed.",
    experience: "10 years",
    email: "hari.poudel@chirayuacademy.edu.np",
    specialization: "Advanced Mathematics, SEE Preparation",
  },
  {
    name: "Ms. Gita Gurung",
    position: "Science Department Head",
    department: "Science",
    qualification: "M.Sc. Physics, B.Ed.",
    experience: "8 years",
    email: "gita.gurung@chirayuacademy.edu.np",
    specialization: "Physics, Laboratory Management",
  },
  {
    name: "Mr. Krishna Shrestha",
    position: "English Department Head",
    department: "English",
    qualification: "M.A. English Literature, B.Ed.",
    experience: "9 years",
    email: "krishna.shrestha@chirayuacademy.edu.np",
    specialization: "English Literature, Creative Writing",
  },
  {
    name: "Ms. Maya Rai",
    position: "Computer Science Teacher",
    department: "Computer Science",
    qualification: "B.E. Computer Engineering",
    experience: "6 years",
    email: "maya.rai@chirayuacademy.edu.np",
    specialization: "Programming, Digital Literacy",
  },
  {
    name: "Mr. Dipak Tamang",
    position: "Social Studies Teacher",
    department: "Social Studies",
    qualification: "M.A. History, B.Ed.",
    experience: "7 years",
    email: "dipak.tamang@chirayuacademy.edu.np",
    specialization: "Nepali History, Geography",
  },
  {
    name: "Ms. Sunita Karki",
    position: "Nepali Language Teacher",
    department: "Nepali",
    qualification: "M.A. Nepali Literature, B.Ed.",
    experience: "8 years",
    email: "sunita.karki@chirayuacademy.edu.np",
    specialization: "Nepali Literature, Grammar",
  },
  {
    name: "Mr. Rajesh Maharjan",
    position: "Art & Music Teacher",
    department: "Arts",
    qualification: "Bachelor in Fine Arts",
    experience: "5 years",
    email: "rajesh.maharjan@chirayuacademy.edu.np",
    specialization: "Visual Arts, Traditional Music",
  },
]

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

export default function FacultyPage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen">
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-poppins">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Faculty
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Meet our dedicated team of educators who are committed to nurturing young minds and inspiring excellence
              in every student.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Faculty Stats */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div whileHover={{ y: -5 }}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Faculty Members</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">90%</h3>
              <p className="text-gray-600">Masters Degree</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">8+</h3>
              <p className="text-gray-600">Avg. Experience</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">Qualified Teachers</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Faculty Members */}
      <motion.section variants={itemVariants} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">Meet Our Teachers</h2>
            <p className="text-xl text-gray-600">Dedicated professionals committed to educational excellence</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyMembers.map((member, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-blue-600 font-semibold">{member.position}</p>
                      <p className="text-sm text-gray-600">{member.department}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start">
                        <GraduationCap className="w-4 h-4 text-blue-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{member.qualification}</span>
                      </div>

                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{member.experience} experience</span>
                      </div>

                      <div className="flex items-start">
                        <BookOpen className="w-4 h-4 text-purple-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{member.specialization}</span>
                      </div>

                      <div className="flex items-center">
                        <Mail className="w-4 h-4 text-orange-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600 truncate">{member.email}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Teaching Philosophy */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">Our Teaching Philosophy</h2>
            <p className="text-xl text-gray-600">The principles that guide our educational approach</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Student-Centered Learning</h3>
              <p className="text-gray-600">
                We place students at the center of the learning process, adapting our teaching methods to meet
                individual needs and learning styles.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collaborative Environment</h3>
              <p className="text-gray-600">
                We foster a collaborative learning environment where students learn from each other and teachers act as
                facilitators and mentors.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Continuous Development</h3>
              <p className="text-gray-600">
                Our faculty regularly participates in professional development programs to stay updated with the latest
                educational methodologies.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}
