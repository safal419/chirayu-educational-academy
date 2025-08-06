"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Microscope,
  Monitor,
  Dumbbell,
  Music,
  Palette,
  FlaskConical,
  Calculator,
  Globe,
  Heart,
  Shield,
  Wifi,
} from "lucide-react"

const academicFacilities = [
  {
    name: "Science Laboratories",
    description:
      "State-of-the-art physics, chemistry, and biology labs equipped with modern instruments and safety equipment for hands-on learning experiences.",
    icon: Microscope,
    color: "from-green-500 to-green-600",
    features: [
      "Physics Lab",
      "Chemistry Lab",
      "Biology Lab",
      "Safety Equipment",
      "Modern Instruments",
      "Experiment Kits",
    ],
    capacity: "40 students per session",
    image: "/school-science-laboratory.png",
  },
  {
    name: "Computer Laboratory",
    description:
      "Modern computer lab with high-speed internet, latest software, and programming tools for digital literacy and computer science education.",
    icon: Monitor,
    color: "from-blue-500 to-blue-600",
    features: [
      "30 Computers",
      "High-Speed Internet",
      "Programming Software",
      "Digital Learning Tools",
      "Interactive Whiteboards",
      "Multimedia Systems",
    ],
    capacity: "35 students per session",
    image: "/computer-lab-students.png",
  },
  {
    name: "Digital Library",
    description:
      "Comprehensive library with extensive collection of books, journals, digital resources, and quiet study areas for research and reading.",
    icon: BookOpen,
    color: "from-purple-500 to-purple-600",
    features: [
      "10,000+ Books",
      "Digital Resources",
      "Study Areas",
      "Research Facilities",
      "Online Catalog",
      "Reading Rooms",
    ],
    capacity: "100 students",
    image: "/school-library.png",
  },
  {
    name: "Mathematics Lab",
    description:
      "Specialized mathematics laboratory with mathematical models, instruments, and interactive tools for practical mathematics learning.",
    icon: Calculator,
    color: "from-orange-500 to-orange-600",
    features: [
      "Mathematical Models",
      "Geometric Instruments",
      "Interactive Tools",
      "Problem-solving Resources",
      "Visual Aids",
      "Practice Materials",
    ],
    capacity: "30 students per session",
    image: "/school-classroom-students.png",
  },
  {
    name: "Language Laboratory",
    description:
      "Advanced language lab with audio-visual equipment for English and Nepali language learning with pronunciation and communication skills development.",
    icon: Globe,
    color: "from-indigo-500 to-indigo-600",
    features: [
      "Audio-Visual Equipment",
      "Language Software",
      "Pronunciation Tools",
      "Communication Practice",
      "Listening Exercises",
      "Speaking Practice",
    ],
    capacity: "25 students per session",
    image: "/school-classroom-students.png",
  },
  {
    name: "Art & Craft Studio",
    description:
      "Creative studio space equipped with art supplies, tools, and exhibition areas for visual arts, crafts, and creative expression.",
    icon: Palette,
    color: "from-pink-500 to-pink-600",
    features: [
      "Art Supplies",
      "Craft Materials",
      "Exhibition Space",
      "Creative Tools",
      "Drawing Boards",
      "Pottery Wheel",
    ],
    capacity: "20 students per session",
    image: "/art-studio-students.png",
  },
  {
    name: "Music Room",
    description:
      "Dedicated music room with various musical instruments, sound system, and recording equipment for music education and cultural programs.",
    icon: Music,
    color: "from-red-500 to-red-600",
    features: [
      "Musical Instruments",
      "Sound System",
      "Recording Equipment",
      "Practice Rooms",
      "Performance Stage",
      "Music Library",
    ],
    capacity: "30 students per session",
    image: "/school-cultural-program.png",
  },
  {
    name: "Sports Facilities",
    description:
      "Comprehensive sports facilities including indoor and outdoor courts, gymnasium, and sports equipment for physical education and athletics.",
    icon: Dumbbell,
    color: "from-teal-500 to-teal-600",
    features: [
      "Basketball Court",
      "Football Ground",
      "Indoor Games",
      "Gymnasium",
      "Sports Equipment",
      "Athletic Track",
    ],
    capacity: "50+ students",
    image: "/school-sports.png",
  },
  {
    name: "Medical Room",
    description:
      "Well-equipped medical facility with qualified nurse and first aid equipment for student health and emergency care.",
    icon: Heart,
    color: "from-rose-500 to-rose-600",
    features: [
      "Qualified Nurse",
      "First Aid Equipment",
      "Medical Supplies",
      "Emergency Care",
      "Health Monitoring",
      "Consultation Room",
    ],
    capacity: "Individual care",
    image: "/professional-female-doctor.png",
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

export default function AcademicFacilitiesPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-blue-50 to-white"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20 relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">
              Academic{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Facilities
              </span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Modern infrastructure and specialized facilities designed to enhance learning experiences and support
              academic excellence across all subjects and grade levels.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </motion.section>

      {/* Facilities Overview */}
      <motion.section variants={itemVariants} className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">Our Learning Facilities</h2>
            <p className="text-xl text-gray-600">Specialized spaces designed for comprehensive education</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {academicFacilities.map((facility, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                className="group"
              >
                <Card className="h-full overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-0">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={facility.image || "/placeholder.svg"}
                      alt={facility.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${facility.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <facility.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-yellow-300 transition-colors duration-300">
                        {facility.name}
                      </h3>
                      <p className="text-blue-100 text-sm">{facility.capacity}</p>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-white">
                    <p className="text-gray-600 mb-4 leading-relaxed">{facility.description}</p>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 text-sm">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {facility.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-xs text-gray-600 bg-gray-50 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-300"
                          >
                            <div
                              className={`w-2 h-2 bg-gradient-to-r ${facility.color} rounded-full mr-2 shadow-sm`}
                            ></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </motion.section>

      {/* Infrastructure Stats */}
      <motion.section variants={itemVariants} className="py-20 bg-gray-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Infrastructure at a Glance
            </h2>
            <p className="text-xl text-gray-600">Numbers that showcase our commitment to quality education</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25</h3>
              <p className="text-gray-600">Classrooms</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FlaskConical className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">9</h3>
              <p className="text-gray-600">Specialized Labs</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Monitor className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">30</h3>
              <p className="text-gray-600">Computers</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Wifi className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">WiFi Coverage</p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </motion.section>

      {/* Safety & Technology */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">Safety & Technology</h2>
            <p className="text-xl text-gray-600">Ensuring a secure and technologically advanced learning environment</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Security</h3>
              <p className="text-gray-600">
                Round-the-clock security with trained personnel and CCTV surveillance throughout the campus for student
                safety.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Monitor className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Technology</h3>
              <p className="text-gray-600">
                Interactive whiteboards, digital learning tools, and high-speed internet in all classrooms for modern
                education.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              className="text-center bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Health & Wellness</h3>
              <p className="text-gray-600">
                On-campus medical room with qualified nurse and comprehensive health monitoring for student well-being.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}
