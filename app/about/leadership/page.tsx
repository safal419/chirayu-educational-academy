"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Award, Users, BookOpen, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LeadershipPage() {
  const leaders = [
    {
      name: "Dr. Rajesh Sharma",
      position: "Chairman & Founder",
      image: "/placeholder-fa0sc.png",
      bio: "With over 25 years of experience in education, Dr. Sharma founded Chirayu Educational Academy with a vision to provide quality education in Nepal. He holds a PhD in Educational Leadership and has been instrumental in shaping the school's academic excellence.",
      achievements: [
        "Founded Chirayu Educational Academy in 2006",
        "PhD in Educational Leadership from Tribhuvan University",
        "Former Principal at prestigious schools in Kathmandu",
        "Author of 3 books on educational methodology",
      ],
      email: "chairman@chirayuacademy.edu.np",
      phone: "+977-9851060977",
    },
    {
      name: "Mrs. Sunita Poudel",
      position: "Principal",
      image: "/middle-aged-principal.png",
      bio: "Mrs. Poudel brings 20 years of educational leadership experience to Chirayu Academy. She is passionate about student-centered learning and has implemented numerous innovative programs during her tenure.",
      achievements: [
        "M.Ed in Educational Administration",
        "20+ years in educational leadership",
        "Implemented digital learning initiatives",
        "Winner of 'Excellence in Education' award 2022",
      ],
      email: "principal@chirayuacademy.edu.np",
      phone: "+977-1-4450778",
    },
    {
      name: "Mr. Prakash Adhikari",
      position: "Vice Principal (Academic)",
      image: "/placeholder-k4mmd.png",
      bio: "Mr. Adhikari oversees the academic programs and curriculum development at Chirayu Academy. His expertise in curriculum design has helped maintain high academic standards across all grades.",
      achievements: [
        "M.A. in English Literature",
        "15+ years in curriculum development",
        "Certified in Cambridge Assessment",
        "Led SEE result improvements for 5 consecutive years",
      ],
      email: "vp.academic@chirayuacademy.edu.np",
      phone: "+977-1-4450779",
    },
    {
      name: "Mrs. Kamala Thapa",
      position: "Vice Principal (Administration)",
      image: "/friendly-woman-counselor.png",
      bio: "Mrs. Thapa manages the administrative operations and student affairs at the academy. Her focus on creating a supportive environment has enhanced student satisfaction and parent engagement.",
      achievements: [
        "MBA in Educational Management",
        "12+ years in school administration",
        "Implemented student counseling programs",
        "Expert in parent-teacher relationship building",
      ],
      email: "vp.admin@chirayuacademy.edu.np",
      phone: "+977-1-4450780",
    },
  ];

  const stats = [
    { icon: Users, label: "Years of Combined Experience", value: "70+" },
    { icon: Award, label: "Educational Awards", value: "15+" },
    { icon: BookOpen, label: "Published Research Papers", value: "25+" },
    { icon: Target, label: "Student Success Rate", value: "95%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Leadership Team
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Meet the dedicated leaders who guide our educational mission and
              inspire excellence
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Profiles */}
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
              Our Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced educators and administrators committed to academic
              excellence and student success
            </p>
          </motion.div>

          <div className="space-y-16">
            {leaders.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div
                      className={`grid lg:grid-cols-2 gap-8 ${
                        index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                      }`}
                    >
                      <div
                        className={`relative ${
                          index % 2 === 1 ? "lg:col-start-2" : ""
                        }`}
                      >
                        <img
                          src={leader.image || "/placeholder.svg"}
                          alt={leader.name}
                          className="w-full h-96 lg:h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                      <div
                        className={`p-8 lg:p-12 ${
                          index % 2 === 1 ? "lg:col-start-1" : ""
                        }`}
                      >
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          {leader.name}
                        </h3>
                        <p className="text-xl text-blue-600 font-semibold mb-6">
                          {leader.position}
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {leader.bio}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {leader.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start">
                                <Award className="w-4 h-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            variant="outline"
                            className="flex items-center bg-transparent"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center bg-transparent"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
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
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Experience Leadership Excellence
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Our leadership team is always available to discuss your child's
              educational journey
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Schedule a Meeting
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
