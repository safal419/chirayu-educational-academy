"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Award, BookOpen, Users, Mail, Phone } from "lucide-react";

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

export default function PrincipalPage() {
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
              Principal's{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Message
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A message from our esteemed Principal about our educational
              philosophy and commitment to excellence.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Principal Profile */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src="/shiva-devkota.jpg"
                  alt="Dr. Ram Sharma - Principal"
                  className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full opacity-20"></div>
              </motion.div>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
                Shiva Devkota
              </h2>
              <p className="text-xl text-blue-600 font-semibold mb-6">
                Principal, Chirayu Educational Academy
              </p>

              <div className="space-y-4 mb-8">
                {/* <div className="flex items-center text-gray-600">
                  <Award className="w-5 h-5 mr-3 text-blue-600" />
                  <span>
                    Ph.D. in Educational Leadership, Tribhuvan University
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <BookOpen className="w-5 h-5 mr-3 text-green-600" />
                  <span>M.Ed. in Educational Administration</span>
                </div> */}
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3 text-purple-600" />
                  <span>30+ Years in Educational Leadership</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-3 text-blue-600" />
                  <span>principal@chirayuacademy.edu.np</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-green-600" />
                  <span>+977-9851060977</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Principal's Message */}
      <motion.section variants={itemVariants} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-0 shadow-xl">
            <CardContent className="p-8 md:p-12">
              <div className="flex items-center mb-8">
                <Quote className="w-12 h-12 text-blue-600 mr-4" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
                  A Message from Our Principal
                </h2>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
                <p>Dear Students, Parents, and Well-wishers,</p>

                <p>
                  It is with great pride and joy that I welcome you to Chirayu
                  Educational Academy. As we continue our journey of educational
                  excellence that began in 2055 B.S., I am constantly amazed by
                  the dedication of our students, the support of our parents,
                  and the commitment of our faculty.
                </p>

                <p>
                  At Chirayu, we believe that education is not merely about
                  academic achievement, but about nurturing the whole child. Our
                  mission extends beyond textbooks and examinations to include
                  character development, critical thinking, creativity, and
                  compassion. We strive to create an environment where every
                  student feels valued, challenged, and inspired to reach their
                  full potential.
                </p>

                <p>
                  Our outstanding SEE results, with a consistent 100% success
                  rate, are a testament to the hard work of our students and the
                  dedication of our teachers. However, we measure our success
                  not just in grades, but in the confident, caring, and capable
                  young people who graduate from our institution.
                </p>

                <p>
                  As we look to the future, we remain committed to innovation in
                  education while preserving the values that have made us who we
                  are. We continue to invest in modern facilities, technology,
                  and teaching methodologies to ensure our students are prepared
                  for the challenges of the 21st century.
                </p>

                <p>
                  I invite you to be part of the Chirayu family, where every
                  child's potential is recognized, nurtured, and celebrated.
                  Together, we will continue to build a brighter future for our
                  students and our community.
                </p>

                <p className="font-semibold">
                  With warm regards,
                  <br />
                  Shiva Devkota
                  <br />
                  Principal, Chirayu Educational Academy
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Educational Philosophy */}
      <motion.section variants={itemVariants} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-poppins">
              Our Educational Philosophy
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide our approach to education
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Holistic Development
              </h3>
              <p className="text-gray-600">
                We focus on developing not just academic skills, but also
                emotional intelligence, creativity, and character.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Individual Attention
              </h3>
              <p className="text-gray-600">
                Every student is unique, and we tailor our approach to meet
                individual learning needs and styles.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Excellence in All
              </h3>
              <p className="text-gray-600">
                We encourage students to strive for excellence in academics,
                sports, arts, and community service.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
