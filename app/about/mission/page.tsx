"use client";

import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Heart,
  Users,
  BookOpen,
  Award,
  Globe,
  Lightbulb,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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

export default function MissionVisionPage() {
  const values = [
    {
      icon: Heart,
      title: "Excellence",
      description:
        "We strive for excellence in all aspects of education and character development.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building a strong, supportive community of learners, educators, and families.",
    },
    {
      icon: BookOpen,
      title: "Innovation",
      description:
        "Embracing innovative teaching methods and modern educational technologies.",
    },
    {
      icon: Award,
      title: "Integrity",
      description:
        "Maintaining the highest standards of honesty, ethics, and moral values.",
    },
  ];

  const visionGoals = [
    {
      icon: Award,
      title: "Academic Excellence",
      description:
        "Strive for 100% SEE pass rate with majority of students achieving distinction.",
      target: "2026",
    },
    {
      icon: Users,
      title: "Stronger Community Engagement",
      description:
        "Enhance collaboration with parents, alumni, and the local community through events and outreach programs.",
      target: "2027",
    },
    {
      icon: Lightbulb,
      title: "Technology in Education",
      description:
        "Introduce smart classrooms and expand ICT training for both students and teachers.",
      target: "2028",
    },
    {
      icon: Globe,
      title: "Broader Educational Reach",
      description:
        "Expand facilities and programs to attract students from surrounding districts while maintaining affordability.",
      target: "2030",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}

      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
        className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-poppins">
              Our Mission{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                & Vision
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Guiding principles that shape our educational philosophy and drive
              our commitment to excellence
            </p>
          </div>
        </div>
      </motion.section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <div className="flex items-center mb-6">
                <Target className="w-12 h-12 text-blue-600 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  To provide quality education that nurtures intellectual
                  curiosity, critical thinking, and moral values in our
                  students. We are committed to creating a supportive learning
                  environment that empowers every child to reach their full
                  potential and become responsible global citizens.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Through innovative teaching methods, dedicated faculty, and
                  comprehensive programs, we prepare our students for academic
                  success and lifelong learning while fostering creativity,
                  leadership, and social responsibility.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/school-classroom-students.png"
                alt="Students in classroom"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="lg:order-2">
              <div className="flex items-center mb-6">
                <Eye className="w-12 h-12 text-blue-600 mr-4" />
                <h2 className="text-4xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  To be recognized as a leading educational institution in
                  Nepal, known for academic excellence, character development,
                  and innovative teaching practices. We envision a future where
                  our graduates become confident, compassionate, and capable
                  leaders who contribute positively to society.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  We aspire to create an educational ecosystem that celebrates
                  diversity, promotes inclusivity, and prepares students for the
                  challenges and opportunities of the 21st century through
                  holistic development and cutting-edge learning experiences.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Creating a future where every student thrives and contributes
                  meaningfully to society through transformative education,
                  innovative learning, and strong moral foundations.
                </p>
              </div>
            </div>
            <div className="lg:order-1 relative">
              <img
                src="/school-graduation.png"
                alt="Graduation ceremony"
                className="rounded-2xl shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Goals 2030 */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Vision 2030
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our strategic goals and aspirations for the next decade
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {visionGoals.map((goal, index) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <goal.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      Target: {goal.target}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {goal.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {goal.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The fundamental principles that guide our educational approach and
              institutional culture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                <Card className="h-full shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
                  <CardContent className="p-6 text-center">
                    <value.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Educational Journey
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Be part of a community that values excellence, integrity, and
              holistic development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Us
              </motion.a>
              <motion.a
                href="/about/history"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Learn Our History
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
