"use client";

import { motion } from "framer-motion";
import { Users, Award, BookOpen, GraduationCap } from "lucide-react";

export default function QuickStats() {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Students",
      description: "Active learners across all grades",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Award,
      number: "100%",
      label: "SEE Pass Rate",
      description: "Consistently high performance",
      color: "from-green-500 to-green-600",
    },
    {
      icon: BookOpen,
      number: "18+",
      label: "Years Experience",
      description: "Excellence in education since 2006",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: GraduationCap,
      number: "1000+",
      label: "Alumni",
      description: "Successful graduates worldwide",
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.03,
                y: -5,
                transition: { duration: 0.25, ease: "easeOut" },
              }}
              className="text-center group bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-6 shadow-lg hover:shadow-2xl hover:bg-white/20 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`w-10 h-10 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <stat.icon className="w-5 h-5 sm:w-8 sm:h-8 text-white" />
              </div>

              {/* Number */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="text-lg sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2"
              >
                {stat.number}
              </motion.div>

              {/* Label */}
              <div className="text-xs sm:text-lg font-semibold mb-1 sm:mb-2">
                {stat.label}
              </div>

              {/* Description */}
              <div className="text-blue-100 text-xs sm:text-sm">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </section>
  );
}
