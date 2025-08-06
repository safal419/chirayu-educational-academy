"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  Award,
  Target,
  Calendar,
  Clock,
  Star,
  Trophy,
} from "lucide-react";
import Link from "next/link";

const academicPrograms = [
  {
    title: "Early Childhood Development",
    grades: "Nursery - UKG",
    ageGroup: "3-5 years",
    description:
      "Foundation program focusing on play-based learning, creativity, and social skills development through interactive activities and structured play.",
    subjects: [
      "Play-based Learning",
      "Basic Literacy",
      "Numeracy",
      "Art & Craft",
      "Music & Movement",
      "Social Skills",
    ],
    color: "blue",
    capacity: 30,
    enrolled: 28,
    fees: "NPR 5,000/month",
    features: [
      "Small Class Size",
      "Qualified Teachers",
      "Safe Environment",
      "Parent Engagement",
    ],
  },
  {
    title: "Primary Education",
    grades: "Grade 1-5",
    ageGroup: "6-10 years",
    description:
      "Comprehensive primary education building strong foundations in core subjects with emphasis on critical thinking and creativity.",
    subjects: [
      "English",
      "Nepali",
      "Mathematics",
      "Science",
      "Social Studies",
      "Computer",
      "Art",
      "Physical Education",
    ],
    color: "green",
    capacity: 150,
    enrolled: 142,
    fees: "NPR 6,000/month",
    features: [
      "Interactive Learning",
      "Digital Resources",
      "Regular Assessment",
      "Extracurricular Activities",
    ],
  },
  {
    title: "Lower Secondary",
    grades: "Grade 6-8",
    ageGroup: "11-13 years",
    description:
      "Intermediate level education preparing students for higher secondary challenges with advanced curriculum and skill development.",
    subjects: [
      "English",
      "Nepali",
      "Mathematics",
      "Science",
      "Social Studies",
      "Computer",
      "Optional Math",
      "Health Education",
    ],
    color: "purple",
    capacity: 120,
    enrolled: 115,
    fees: "NPR 7,000/month",
    features: [
      "Advanced Curriculum",
      "Laboratory Work",
      "Project-Based Learning",
      "Career Guidance",
    ],
  },
  {
    title: "Secondary Education",
    grades: "Grade 9-10",
    ageGroup: "14-16 years",
    description:
      "SEE preparation program with comprehensive curriculum and exam-focused approach to ensure excellent results.",
    subjects: [
      "English",
      "Nepali",
      "Mathematics",
      "Science",
      "Social Studies",
      "Computer",
      "Optional Math",
      "Account",
      "Health",
    ],
    color: "orange",
    capacity: 80,
    enrolled: 75,
    fees: "NPR 8,000/month",
    features: [
      "SEE Preparation",
      "Mock Exams",
      "Individual Attention",
      "College Counseling",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function ProgramsOverviewPage() {
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
                Programs
              </span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              Comprehensive educational programs designed to nurture
              intellectual growth, critical thinking, and character development
              from early childhood through Grade 10.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      </motion.section>

      {/* Academic Stats */}
      <motion.section
        variants={itemVariants}
        className="py-20 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4</h3>
              <p className="text-gray-600">Academic Programs</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">360+</h3>
              <p className="text-gray-600">Students Enrolled</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">SEE Pass Rate</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1:15</h3>
              <p className="text-gray-600">Teacher-Student Ratio</p>
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </motion.section>

      {/* Academic Programs */}
      <motion.section
        variants={itemVariants}
        className="py-20 bg-gray-50 relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Our Programs
            </h2>
            <p className="text-xl text-gray-600">
              Structured learning pathways for every stage of development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {academicPrograms.map((program, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full bg-white">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${
                          program.color === "blue"
                            ? "from-blue-500 to-blue-600"
                            : program.color === "green"
                            ? "from-green-500 to-green-600"
                            : program.color === "purple"
                            ? "from-purple-500 to-purple-600"
                            : "from-orange-500 to-orange-600"
                        } rounded-full flex items-center justify-center mr-4 shadow-lg`}
                      >
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {program.title}
                        </h3>
                        <p className="text-blue-600 font-semibold">
                          {program.grades} • {program.ageGroup}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Program Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center bg-gray-50 rounded-lg p-3 shadow-sm">
                        <div className="text-lg font-bold text-gray-900">
                          {program.enrolled}
                        </div>
                        <div className="text-xs text-gray-600">Enrolled</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3 shadow-sm">
                        <div className="text-lg font-bold text-gray-900">
                          {program.capacity}
                        </div>
                        <div className="text-xs text-gray-600">Capacity</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3 shadow-sm">
                        <div className="text-lg font-bold text-green-600">
                          {program.fees}
                        </div>
                        <div className="text-xs text-gray-600">Monthly Fee</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Core Subjects:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {program.subjects.map((subject, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 ${
                              program.color === "blue"
                                ? "bg-blue-50 text-blue-700"
                                : program.color === "green"
                                ? "bg-green-50 text-green-700"
                                : program.color === "purple"
                                ? "bg-purple-50 text-purple-700"
                                : "bg-orange-50 text-orange-700"
                            } text-sm rounded-full shadow-sm`}
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Key Features:
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {program.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <Star className="w-3 h-3 text-yellow-500 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </motion.section>

      {/* Academic Calendar */}
      <motion.section
        variants={itemVariants}
        className="py-20 bg-white relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Academic Calendar
            </h2>
            <p className="text-xl text-gray-600">
              Important dates and academic schedule
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Calendar className="w-8 h-8 text-blue-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Academic Year 2081
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">
                      Session Starts
                    </span>
                    <span className="font-semibold text-blue-600">
                      Baisakh 1, 2081
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">
                      First Terminal Exam
                    </span>
                    <span className="font-semibold text-green-600">
                      Ashar 15-30, 2081
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">
                      Second Terminal Exam
                    </span>
                    <span className="font-semibold text-purple-600">
                      Kartik 15-30, 2081
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">
                      Final Exam
                    </span>
                    <span className="font-semibold text-orange-600">
                      Falgun 1-15, 2081
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">
                      Session Ends
                    </span>
                    <span className="font-semibold text-red-600">
                      Chaitra 30, 2081
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Clock className="w-8 h-8 text-green-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Daily Schedule
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">
                      School Starts
                    </span>
                    <span className="font-semibold text-blue-600">9:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">
                      Morning Assembly
                    </span>
                    <span className="font-semibold text-green-600">
                      9:00 - 9:15 AM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">Classes</span>
                    <span className="font-semibold text-purple-600">
                      9:15 AM - 3:30 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">
                      Lunch Break
                    </span>
                    <span className="font-semibold text-orange-600">
                      12:00 - 1:00 PM
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                    <span className="text-gray-600 font-medium">
                      School Ends
                    </span>
                    <span className="font-semibold text-red-600">3:30 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
      </motion.section>

      {/* Quick Links */}
      <motion.section variants={itemVariants} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Explore More
            </h2>
            <p className="text-xl text-gray-600">
              Discover our academic offerings and achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/see-results">
              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Trophy className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  SEE Results
                </h3>
                <p className="text-gray-600 text-sm">
                  View our outstanding examination results
                </p>
              </motion.div>
            </Link>

            <Link href="/academics/facilities">
              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Academic Facilities
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore our modern learning facilities
                </p>
              </motion.div>
            </Link>

            <Link href="/contact">
              <motion.div
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-xl text-center shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Admissions
                </h3>
                <p className="text-gray-600 text-sm">
                  Apply for admission to our programs
                </p>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
