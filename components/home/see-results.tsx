"use client";

import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SEEResults() {
  const results = [
    { year: "2023", passRate: "100%", distinction: "90%", toppers: 3 },
    { year: "2022", passRate: "100%", distinction: "85%", toppers: 2 },
    { year: "2021", passRate: "100%", distinction: "80%", toppers: 4 },
  ];

  const toppers = [
    { name: "Priya Sharma", gpa: "3.95", year: "2023", position: "1st" },
    { name: "Arjun Thapa", gpa: "3.90", year: "2023", position: "2nd" },
    { name: "Sita Rai", gpa: "3.85", year: "2023", position: "3rd" },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            SEE Results Excellence
          </h2>
          <p className="text-xl text-gray-600">
            Celebrating our students' outstanding academic achievements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Results Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Performance
            </h3>
            <div className="space-y-4">
              {results.map((result, index) => (
                <Card
                  key={result.year}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold text-gray-900">
                        SEE {result.year}
                      </span>
                      <Trophy className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {result.passRate}
                        </div>
                        <div className="text-sm text-gray-600">Pass Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {result.distinction}
                        </div>
                        <div className="text-sm text-gray-600">Distinction</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">
                          {result.toppers}
                        </div>
                        <div className="text-sm text-gray-600">
                          School Toppers
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              2025 Top Performers
            </h3>
            <div className="space-y-4">
              {toppers.map((topper, index) => (
                <Card
                  key={topper.name}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                            index === 0
                              ? "bg-yellow-500"
                              : index === 1
                              ? "bg-gray-400"
                              : "bg-orange-500"
                          }`}
                        >
                          {topper.position}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            {topper.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            GPA: {topper.gpa}
                          </div>
                        </div>
                      </div>
                      <Star className="w-6 h-6 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/see-results">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              View Complete Results
            </Button>
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent z-10"></div>
    </section>
  );
}
