"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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

export default function VisionPage() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" variants={itemVariants}>
            Our <span className="text-purple-600">Vision</span>
          </motion.h1>
          <motion.p className="text-xl text-gray-600 max-w-3xl mx-auto" variants={itemVariants}>
            Creating a future where every student thrives and contributes meaningfully to society
          </motion.p>
        </div>
      </motion.section>

      {/* Vision Statement */}
      <motion.section variants={itemVariants} className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <Image
                  src="/modern-school-students.png"
                  alt="Vision of modern education"
                  width={600}
                  height={400}
                  className="rounded-xl shadow-lg"
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision Statement</h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  To be a leading educational institution that transforms lives through innovative teaching, character
                  development, and academic excellence, creating confident and capable individuals who make positive
                  contributions to their communities and the world.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We envision a future where our graduates are well-equipped with 21st-century skills, strong moral
                  values, and the passion to pursue lifelong learning and make a meaningful difference in society.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Future Goals */}
      <motion.section variants={itemVariants} className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2 className="text-4xl font-bold text-gray-900 text-center mb-12" variants={itemVariants}>
            Our Vision for 2030
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Academic Excellence",
                description: "100% SEE pass rate with 80% distinction holders",
                target: "Academic Achievement",
              },
              {
                title: "Technology Integration",
                description: "Fully digital classrooms with AI-powered learning",
                target: "Digital Transformation",
              },
              {
                title: "Global Recognition",
                description: "International accreditation and partnerships",
                target: "International Standards",
              },
              {
                title: "Sustainable Campus",
                description: "Carbon-neutral campus with renewable energy",
                target: "Environmental Responsibility",
              },
            ].map((goal, index) => (
              <motion.div
                key={goal.title}
                variants={itemVariants}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-md"
              >
                <span className="text-sm font-medium text-purple-600 uppercase tracking-wide">{goal.target}</span>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4 mt-2">{goal.title}</h3>
                <p className="text-gray-600 text-lg">{goal.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}
