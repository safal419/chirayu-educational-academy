"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  BookOpen,
  Microscope,
  Monitor,
  Dumbbell,
  Music,
  Bus,
  Utensils,
  Shield,
  Camera,
  Heart,
  Users,
} from "lucide-react"

const facilities = [
  {
    name: "Modern Library",
    description: "Well-stocked library with over 10,000 books, digital resources, and quiet study areas for students.",
    icon: BookOpen,
    color: "blue",
    features: ["10,000+ Books", "Digital Resources", "Reading Areas", "Study Rooms"],
  },
  {
    name: "Science Laboratories",
    description: "Fully equipped physics, chemistry, and biology labs with modern instruments and safety equipment.",
    icon: Microscope,
    color: "green",
    features: ["Physics Lab", "Chemistry Lab", "Biology Lab", "Safety Equipment"],
  },
  {
    name: "Computer Laboratory",
    description: "State-of-the-art computer lab with high-speed internet and latest software for digital learning.",
    icon: Monitor,
    color: "purple",
    features: ["30 Computers", "High-Speed Internet", "Latest Software", "Programming Tools"],
  },
  {
    name: "Sports Facilities",
    description: "Multi-purpose sports ground, basketball court, and indoor games room for physical development.",
    icon: Dumbbell,
    color: "orange",
    features: ["Football Ground", "Basketball Court", "Indoor Games", "Sports Equipment"],
  },
  {
    name: "Music & Arts Room",
    description: "Dedicated spaces for music, dance, and visual arts with instruments and art supplies.",
    icon: Music,
    color: "pink",
    features: ["Musical Instruments", "Art Supplies", "Dance Floor", "Exhibition Space"],
  },
  {
    name: "Transportation",
    description: "Safe and reliable school bus service covering major areas of Kathmandu valley.",
    icon: Bus,
    color: "indigo",
    features: ["Multiple Routes", "Trained Drivers", "GPS Tracking", "Safety Measures"],
  },
  {
    name: "Cafeteria",
    description: "Hygienic cafeteria serving nutritious meals and snacks prepared with fresh ingredients.",
    icon: Utensils,
    color: "yellow",
    features: ["Nutritious Meals", "Fresh Ingredients", "Hygienic Preparation", "Variety of Options"],
  },
  {
    name: "Security System",
    description: "24/7 security with CCTV surveillance and trained security personnel for student safety.",
    icon: Shield,
    color: "red",
    features: ["24/7 Security", "CCTV Surveillance", "Trained Personnel", "Access Control"],
  },
  {
    name: "Smart Classrooms",
    description: "Technology-enabled classrooms with projectors, smart boards, and audio-visual equipment.",
    icon: Monitor,
    color: "teal",
    features: ["Smart Boards", "Projectors", "Audio System", "Interactive Learning"],
  },
  {
    name: "Medical Room",
    description: "Well-equipped medical room with qualified nurse for immediate healthcare needs.",
    icon: Heart,
    color: "rose",
    features: ["Qualified Nurse", "First Aid", "Medical Equipment", "Emergency Care"],
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

export default function FacilitiesPage() {
  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen">
      {/* Hero Section */}
      <motion.section variants={itemVariants} className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-poppins">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Facilities
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Modern infrastructure and world-class facilities designed to provide the best learning environment for our
              students' academic and personal growth.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Facilities Overview */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div key={index} variants={itemVariants} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div
                        className={`w-16 h-16 bg-${facility.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <facility.icon className={`w-8 h-8 text-${facility.color}-600`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{facility.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{facility.description}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {facility.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-xs text-gray-600">
                            <div className={`w-2 h-2 bg-${facility.color}-500 rounded-full mr-2`}></div>
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
      </motion.section>

      {/* Infrastructure Stats */}
      <motion.section variants={itemVariants} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Infrastructure at a Glance
            </h2>
            <p className="text-xl text-gray-600">Numbers that showcase our commitment to quality education</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">25</h3>
              <p className="text-gray-600">Classrooms</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">5</h3>
              <p className="text-gray-600">Laboratories</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">10,000+</h3>
              <p className="text-gray-600">Books</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">30</h3>
              <p className="text-gray-600">Computers</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Safety & Security */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">Safety & Security</h2>
            <p className="text-xl text-gray-600">Your child's safety is our top priority</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">24/7 Security</h3>
              <p className="text-gray-600">
                Round-the-clock security with trained personnel and CCTV surveillance throughout the campus.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">CCTV Monitoring</h3>
              <p className="text-gray-600">
                Comprehensive CCTV coverage in all common areas, classrooms, and entry/exit points for enhanced
                security.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Medical Support</h3>
              <p className="text-gray-600">
                On-campus medical room with qualified nurse for immediate healthcare and emergency response.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}
