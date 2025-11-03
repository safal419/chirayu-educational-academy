"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
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
  Palette,
  Globe,
} from "lucide-react";

const facilities = [
  {
    name: "Library",
    description:
      "A focused collection of textbooks, reference books, and reading materials for varied grade levels.",
    icon: BookOpen,
    color: "blue",
    features: ["Textbooks & Reference", "Reading Corner", "Quiet Study Area"],
    image: "/school-library.png",
  },
  {
    name: "Science Laboratory",
    description:
      "Shared lab facilities for physics, chemistry, and biology, supporting hands-on learning.",
    icon: Microscope,
    color: "green",
    features: [
      "Basic Lab Instruments",
      "Demonstration Area",
      "Safety Guidelines",
    ],
    image: "/school-science-laboratory.png",
  },
  {
    name: "Computer Lab",
    description:
      "A small computer lab providing basic ICT exposure and digital literacy opportunities.",
    icon: Monitor,
    color: "purple",
    features: ["Desktop Computers", "ICT Classes", "Internet Access"],
    image: "/school-classroom-students.png",
  },
  {
    name: "Playground & Sports",
    description:
      "An open ground for sports activities like football, volleyball, and morning assemblies.",
    icon: Dumbbell,
    color: "orange",
    features: [
      "Football/Volleyball Space",
      "Morning Exercise",
      "Basic Sports Gear",
    ],
    image: "/school-sports.png",
  },
  {
    name: "Arts & Cultural Space",
    description:
      "A space to engage in arts, music, dance, and cultural programs that develop creative skills.",
    icon: Palette,
    color: "pink",
    features: ["Art Supplies", "Cultural Events", "Music & Drama Practice"],
    image: "/school-cultural-program.png",
  },
  {
    name: "Parent-School App",
    description:
      "A communication platform (mobile app) for parents to track attendance, assignments, and notices.",
    icon: Globe,
    color: "teal",
    features: ["Attendance Alerts", "Homework & Notices", "Teacher Messaging"],
    image: "/school-classroom-students.png", // reused path
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
};

export default function FacilitiesPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen px-4"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-poppins">
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Facilities
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Modern infrastructure and world-class facilities designed to
              provide the best learning environment for our students' academic
              and personal growth.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Facilities Overview */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div
                        className={`w-16 h-16 bg-${facility.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <facility.icon
                          className={`w-8 h-8 text-${facility.color}-600`}
                        />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {facility.name}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {facility.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">
                        Key Features:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {facility.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-xs text-gray-600"
                          >
                            <div
                              className={`w-2 h-2 bg-${facility.color}-500 rounded-full mr-2`}
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
      </motion.section>

      {/* Infrastructure Stats */}
      <motion.section variants={itemVariants} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Infrastructure at a Glance
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that showcase our commitment to quality education
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Classrooms</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Microscope className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">2</h3>
              <p className="text-gray-600">Laboratories</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1,000+</h3>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Safety & Security
            </h2>
            <p className="text-xl text-gray-600">
              Your child's safety is our top priority
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                24/7 Security
              </h3>
              <p className="text-gray-600">
                Round-the-clock security with trained personnel and CCTV
                surveillance throughout the campus.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                CCTV Monitoring
              </h3>
              <p className="text-gray-600">
                Comprehensive CCTV coverage in all common areas, classrooms, and
                entry/exit points for enhanced security.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Medical Support
              </h3>
              <p className="text-gray-600">
                On-school medical room for immediate healthcare and emergency
                response.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
