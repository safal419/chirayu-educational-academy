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
      "A nurturing foundation program that emphasizes play, creativity, and curiosity. Children develop early literacy, numeracy, and social skills through interactive activities.",
    subjects: [
      "Play-based Learning",
      "Basic Literacy",
      "Numeracy",
      "Art & Craft",
      "Music & Movement",
      "Social Skills",
    ],
    color: "blue",
    capacity: 40,
    enrolled: 36,
    features: [
      "Safe and Caring Environment",
      "Experienced Kindergarten Teachers",
      "Interactive Learning Materials",
      "Parental Involvement Programs",
    ],
  },
  {
    title: "Primary Education",
    grades: "Grade 1-5",
    ageGroup: "6-10 years",
    description:
      "Focuses on building a strong foundation in core academic subjects while encouraging creativity, curiosity, and confidence through modern teaching methods.",
    subjects: [
      "English",
      "Nepali",
      "Mathematics",
      "Science",
      "Social Studies",
      "Computer",
      "Arts",
      "Physical Education",
    ],
    color: "green",
    capacity: 200,
    enrolled: 182,
    features: [
      "Interactive Smart Classes",
      "Regular Assessments",
      "Sports & Extracurricular Activities",
      "Student-Centered Learning",
    ],
  },
  {
    title: "Lower Secondary",
    grades: "Grade 6-8",
    ageGroup: "11-13 years",
    description:
      "Prepares students with advanced curriculum, critical thinking, and project-based learning. Encourages creativity, problem-solving, and teamwork.",
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
    capacity: 150,
    enrolled: 138,
    features: [
      "Practical Lab Work",
      "Project-Based Learning",
      "Leadership Opportunities",
      "Career Counseling Sessions",
    ],
  },
  {
    title: "Secondary Education",
    grades: "Grade 9-10",
    ageGroup: "14-16 years",
    description:
      "A comprehensive SEE preparation program with a focus on academic excellence, mock exams, and individual mentoring to ensure strong results.",
    subjects: [
      "English",
      "Nepali",
      "Mathematics",
      "Science",
      "Social Studies",
      "Computer",
      "Optional Math",
      "Account",
      "Health Education",
    ],
    color: "orange",
    capacity: 100,
    enrolled: 92,
    features: [
      "SEE Focused Curriculum",
      "Frequent Mock Exams",
      "Individual Mentorship",
      "Career Guidance for +2",
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
        className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-poppins">
              Academic{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Programs
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
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
              <h3 className="text-3xl font-bold text-gray-900 mb-2">450+</h3>
              <p className="text-gray-600">Students Enrolled</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.05 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">1:18</h3>
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
                    <div className="grid grid-cols-2 gap-4 mb-6">
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
    </motion.div>
  );
}
