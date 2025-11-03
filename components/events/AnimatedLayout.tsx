"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { ReactNode } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
} as const;

interface AnimatedLayoutProps {
  children: ReactNode;
}

export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Calendar className="inline-block mr-3 text-purple-600" size={48} />
            School Events
          </h1>
          <p className="text-l text-gray-600 max-w-3xl mx-auto">
            Discover exciting events, celebrations, and activities happening at
            our school
          </p>
        </motion.div>
        {children}
      </div>
    </motion.div>
  );
}
