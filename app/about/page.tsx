"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, BookOpen, Target, Heart, Star } from "lucide-react";
import Link from "next/link";

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

export default function AboutPage() {
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
              About{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Chirayu Educational Academy
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Established in 2062 B.S., Chirayu Educational Academy has been a
              beacon of quality education in Kathmandu, nurturing young minds
              and shaping future leaders through excellence in academics and
              character development.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-poppins">
                    Our Mission
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To provide quality education that nurtures intellectual
                  curiosity, critical thinking, and moral values. We strive to
                  create a learning environment where every student can discover
                  their potential and develop into responsible global citizens.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 font-poppins">
                    Our Vision
                  </h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  To be recognized as a leading educational institution that
                  produces confident, creative, and compassionate individuals
                  who contribute positively to society and excel in their chosen
                  fields while maintaining strong ethical values.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section variants={itemVariants} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in all aspects of education, from
                academic achievement to character development.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Compassion
              </h3>
              <p className="text-gray-600">
                We foster empathy, kindness, and understanding in our students
                to create caring global citizens.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Integrity
              </h3>
              <p className="text-gray-600">
                We uphold the highest standards of honesty, ethics, and moral
                responsibility in all our actions.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Quick Links */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Learn More About Us
            </h2>
            <p className="text-xl text-gray-600">
              Discover our rich history and educational approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/about/history">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Our History
                </h3>
                <p className="text-gray-600 text-sm">
                  Learn about our journey since 2062 B.S.
                </p>
              </motion.div>
            </Link>

            <Link href="/about/principal">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Principal's Message
                </h3>
                <p className="text-gray-600 text-sm">
                  Words from our school leadership
                </p>
              </motion.div>
            </Link>

            <Link href="/about/faculty">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Our Faculty
                </h3>
                <p className="text-gray-600 text-sm">
                  Meet our dedicated teachers
                </p>
              </motion.div>
            </Link>

            <Link href="/about/facilities">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl text-center hover:shadow-lg transition-all duration-300"
              >
                <Star className="w-12 h-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Facilities
                </h3>
                <p className="text-gray-600 text-sm">
                  Explore our modern infrastructure
                </p>
              </motion.div>
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
