"use client";

import { motion } from "framer-motion";
import { Award, Users, BookOpen, Globe, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: Award,
      title: "Academic Excellence",
      description:
        "Consistently high SEE results with 100% pass rate and top performers in municipality rankings.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Users,
      title: "Experienced Faculty",
      description:
        "Highly qualified teachers with average 15+ years experience and continuous professional development.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: BookOpen,
      title: "Modern Curriculum",
      description:
        "Updated curriculum aligned with national standards plus additional skill development programs.",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description:
        "International exposure through exchange programs, global competitions, and multicultural learning.",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Heart,
      title: "Holistic Development",
      description:
        "Focus on character building, emotional intelligence, and social responsibility alongside academics.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Zap,
      title: "Innovation & Technology",
      description:
        "Smart classrooms, digital learning tools, and technology integration in all subjects.",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
      {/* Section Divider - Top */}
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Chirayu Academy?
          </h2>
          <p className="text-l text-gray-600 max-w-3xl mx-auto">
            Discover what makes us the preferred choice for quality education in
            Kathmandu
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                <CardContent className="p-8 text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${reason.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <reason.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl font-bold text-blue-600 mb-2">18+</div>
            <div className="text-gray-600">Years of Excellence</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl font-bold text-green-600 mb-2">1000+</div>
            <div className="text-gray-600">Alumni Network</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">SEE Pass Rate</div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl font-bold text-orange-600 mb-2">20+</div>
            <div className="text-gray-600">Expert Teachers</div>
          </motion.div>
        </motion.div>
      </div>
      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
    </section>
  );
}
