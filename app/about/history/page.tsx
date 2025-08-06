"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Award,
  Users,
  BookOpen,
  Building,
  Trophy,
} from "lucide-react";

const timelineEvents = [
  {
    year: "2055 B.S.",
    title: "Foundation",
    description:
      "Chirayu Educational Academy was established with a vision to provide quality education in Kathmandu.",
    icon: Building,
    color: "blue",
  },
  {
    year: "2058 B.S.",
    title: "First Graduation",
    description:
      "Our first batch of Grade 10 students graduated with outstanding SEE results.",
    icon: Trophy,
    color: "green",
  },
  {
    year: "2062 B.S.",
    title: "Infrastructure Expansion",
    description:
      "Added modern science laboratories, computer lab, and expanded library facilities.",
    icon: Building,
    color: "purple",
  },
  {
    year: "2065 B.S.",
    title: "Academic Excellence",
    description:
      "Achieved 100% pass rate in SEE examinations for three consecutive years.",
    icon: Award,
    color: "yellow",
  },
  {
    year: "2070 B.S.",
    title: "Technology Integration",
    description:
      "Introduced smart classrooms and digital learning platforms for enhanced education.",
    icon: BookOpen,
    color: "indigo",
  },
  {
    year: "2075 B.S.",
    title: "500+ Students",
    description:
      "Reached a milestone of 500+ students with 25+ dedicated faculty members.",
    icon: Users,
    color: "red",
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

export default function HistoryPage() {
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
              Our{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                History
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A journey of excellence spanning over two decades, from humble
              beginnings to becoming one of Kathmandu's most respected
              educational institutions.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Founding Story */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-poppins">
                The Beginning
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                In 2055 B.S., a group of visionary educators came together with
                a dream to create an educational institution that would nurture
                young minds and prepare them for the challenges of the modern
                world. Starting with just 50 students and 5 teachers, Chirayu
                Educational Academy was born.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                The name "Chirayu" means "long-lived" in Sanskrit, reflecting
                our commitment to creating lasting impact on our students' lives
                and contributing to society for generations to come.
              </p>
            </div>
            <div className="relative">
              <img
                src="/histoy-image.jpg"
                alt="Chirayu Educational Academy Founding"
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section variants={itemVariants} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600">
              Key milestones in our educational journey
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-indigo-500 hidden md:block"></div>

            <div className="space-y-12">
              {timelineEvents.map((event, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-full md:w-5/12 ${
                      index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                    }`}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <div
                            className={`w-12 h-12 bg-${event.color}-100 rounded-full flex items-center justify-center mr-4`}
                          >
                            <event.icon
                              className={`w-6 h-6 text-${event.color}-600`}
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {event.title}
                            </h3>
                            <p className="text-blue-600 font-semibold">
                              {event.year}
                            </p>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div
                      className={`w-4 h-4 bg-${event.color}-500 rounded-full border-4 border-white shadow-lg`}
                    ></div>
                  </div>

                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Achievements */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Recognition and milestones we're proud of
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
              <p className="text-gray-600"> SEE Success Rate</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">1000+</h3>
              <p className="text-gray-600">Alumni Worldwide</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
              <p className="text-gray-600">Academic Awards</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15+</h3>
              <p className="text-gray-600">Years of Excellence</p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
