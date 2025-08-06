"use client";

import { motion } from "framer-motion";
import { Trophy, Star, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AcademicHighlights() {
  const achievements = [
    {
      icon: Trophy,
      title: "Municipality Topper",
      description:
        "Our student Hassana Shrestha secured 1st position in SEE 2025 municipality-wide",
      year: "2025",
      color: "text-yellow-600",
    },
    {
      icon: Star,
      title: "100% Pass Rate",
      description:
        "Achieved perfect pass rate in SEE examinations for 3 consecutive years",
      year: "2022-2025",
      color: "text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Academic Growth",
      description: "25% improvement in average GPA over the last 5 years",
      year: "2019-2024",
      color: "text-green-600",
    },
    {
      icon: Users,
      title: "National Recognition",
      description:
        "Recognized as 'Best Private School' by Nepal Education Board",
      year: "2022",
      color: "text-purple-600",
    },
  ];

  const subjects = [
    { name: "Mathematics", score: 95, color: "bg-blue-500" },
    { name: "Science", score: 92, color: "bg-green-500" },
    { name: "English", score: 94, color: "bg-purple-500" },
    { name: "Nepali", score: 91, color: "bg-orange-500" },
    { name: "Social Studies", score: 88, color: "bg-red-500" },
  ];

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Academic Highlights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating our students' achievements and academic excellence
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-0 hover:bg-gray-50">
                <CardContent className="p-6 text-center">
                  <achievement.icon
                    className={`w-12 h-12 ${achievement.color} mx-auto mb-4`}
                  />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {achievement.description}
                  </p>
                  <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    {achievement.year}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Subject Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Average Subject Performance (SEE 2023)
          </h3>
          <div className="space-y-6">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="flex items-center bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="w-32 text-gray-700 font-medium">
                  {subject.name}
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${subject.score}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-full ${subject.color} rounded-full shadow-sm`}
                    />
                  </div>
                </div>
                <div className="w-12 text-right font-bold text-gray-900">
                  {subject.score}%
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
    </section>
  );
}
