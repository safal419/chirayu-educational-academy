"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, Target, Calendar, Clock } from "lucide-react";
import Link from "next/link";
// import axios from "axios";
import Loading from "@/components/Loading";
import { apiConfig } from "@/lib/config";

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
    },
  },
};

export default function AcademicsPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch(apiConfig.endpoints.academics);
        const data = await res.json();
        setPrograms(Array.isArray(data) ? data : []);
      } catch (err) {
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, []);

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
          {loading ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {[...Array(4)].map((_, idx) => (
                <Card key={idx} className="border-0 shadow-lg h-full">
                  <CardContent className="p-8">
                    <Loading mode="skeleton" count={1} message="" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-12 text-gray-500 text-lg font-semibold">
              No data found
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {programs.map((program, index) => (
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
                          {program.subjects?.map(
                            (subject: string, idx: number) => (
                              <span
                                key={idx}
                                className={`px-3 py-1 bg-${program.color}-50 text-${program.color}-700 text-sm rounded-full`}
                              >
                                {subject}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full bg-transparent"
                      >
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
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
    </motion.div>
  );
}
