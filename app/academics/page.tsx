"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, Target, Calendar, Clock } from "lucide-react";
import Link from "next/link";

const academicPrograms = [
  {
    title: "Early Childhood Development",
    grades: "Nursery - UKG",
    ageGroup: "3-5 years",
    description:
      "Foundation program focusing on play-based learning, creativity, and social skills development.",
    subjects: [
      "Play-based Learning",
      "Basic Literacy",
      "Numeracy",
      "Art & Craft",
      "Music & Movement",
    ],
    color: "blue",
  },
  {
    title: "Primary Education",
    grades: "Grade 1-5",
    ageGroup: "6-10 years",
    description:
      "Comprehensive primary education building strong foundations in core subjects.",
    subjects: [
      "English",
      "Nepali",
      "Mathematics",
      "Science",
      "Social Studies",
      "Computer",
    ],
    color: "green",
  },
  {
    title: "Lower Secondary",
    grades: "Grade 6-8",
    ageGroup: "11-13 years",
    description:
      "Intermediate level education preparing students for higher secondary challenges.",
    subjects: [
      "English",
      "Nepali",
      "Mathematics",
      "Science",
      "Social Studies",
      "Computer",
      "Optional Math",
    ],
    color: "purple",
  },
  {
    title: "Secondary Education",
    grades: "Grade 9-10",
    ageGroup: "14-16 years",
    description:
      "SEE preparation program with comprehensive curriculum and exam-focused approach.",
    subjects: [
      "English",
      "Nepali",
      "Mathematics",
      "Science",
      "Social Studies",
      "Computer",
      "Optional Math",
      "Account",
    ],
    color: "orange",
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

export default function AcademicsPage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-poppins">
              Academic{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Programs
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive educational programs designed to nurture
              intellectual growth, critical thinking, and character development
              from early childhood through secondary education.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Academic Stats */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <motion.div whileHover={{ y: -5 }}>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4</h3>
              <p className="text-gray-600">Academic Programs</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">500+</h3>
              <p className="text-gray-600">Students Enrolled</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600">SEE Success Rate</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }}>
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1:20</h3>
              <p className="text-gray-600">Teacher-Student Ratio</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Academic Programs */}
      <motion.section variants={itemVariants} className="py-20 bg-gray-50">
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
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div
                        className={`w-12 h-12 bg-${program.color}-100 rounded-full flex items-center justify-center mr-4`}
                      >
                        <BookOpen
                          className={`w-6 h-6 text-${program.color}-600`}
                        />
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

                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Core Subjects:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {program.subjects.map((subject, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1 bg-${program.color}-50 text-${program.color}-700 text-sm rounded-full`}
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Academic Calendar */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
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
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Calendar className="w-8 h-8 text-blue-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Academic Year 2081
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Session Starts</span>
                    <span className="font-semibold">Baisakh 1, 2081</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">First Terminal Exam</span>
                    <span className="font-semibold">Ashar 15-30, 2081</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Second Terminal Exam</span>
                    <span className="font-semibold">Kartik 15-30, 2081</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Final Exam</span>
                    <span className="font-semibold">Falgun 1-15, 2081</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Session Ends</span>
                    <span className="font-semibold">Chaitra 30, 2081</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Clock className="w-8 h-8 text-green-600 mr-4" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Daily Schedule
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">School Starts</span>
                    <span className="font-semibold">9:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Morning Assembly</span>
                    <span className="font-semibold">9:00 - 9:15 AM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Classes</span>
                    <span className="font-semibold">9:15 AM - 3:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Lunch Break</span>
                    <span className="font-semibold">12:00 - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">School Ends</span>
                    <span className="font-semibold">3:30 PM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/see-results">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  SEE Results
                </h3>
                <p className="text-gray-600 text-sm">
                  View our outstanding examination results
                </p>
              </motion.div>
            </Link>

            <Link href="/academics/curriculum">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Curriculum
                </h3>
                <p className="text-gray-600 text-sm">
                  Detailed curriculum information
                </p>
              </motion.div>
            </Link>

            <Link href="/academics/extracurricular">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Extracurricular
                </h3>
                <p className="text-gray-600 text-sm">
                  Sports, arts, and club activities
                </p>
              </motion.div>
            </Link>

            <Link href="/academics/assessment">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Assessment
                </h3>
                <p className="text-gray-600 text-sm">
                  Evaluation and grading system
                </p>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
