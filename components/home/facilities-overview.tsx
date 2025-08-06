"use client";

import { motion } from "framer-motion";
import {
  Monitor,
  FlaskConical,
  BookOpen,
  Dumbbell,
  Palette,
  Music,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function FacilitiesOverview() {
  const facilities = [
    {
      icon: Monitor,
      title: "Smart Classrooms",
      description:
        "Interactive whiteboards and digital learning tools in every classroom",
      image: "/school-classroom-students.png",
      features: [
        "Interactive Whiteboards",
        "High-Speed Internet",
        "Audio-Visual Systems",
      ],
    },
    {
      icon: FlaskConical,
      title: "Science Laboratory",
      description:
        "Fully equipped physics, chemistry, and biology labs for hands-on learning",
      image: "/school-science-laboratory.png",
      features: ["Modern Equipment", "Safety Protocols", "Experiment Kits"],
    },
    {
      icon: BookOpen,
      title: "Digital Library",
      description:
        "Extensive collection of books, journals, and digital resources",
      image: "/school-library.png",
      features: ["10,000+ Books", "Digital Catalog", "Study Areas"],
    },
    {
      icon: Dumbbell,
      title: "Sports Complex",
      description:
        "Multi-purpose sports facilities for various indoor and outdoor activities",
      image: "/school-sports.png",
      features: ["Basketball Court", "Football Field", "Indoor Games"],
    },
    {
      icon: Palette,
      title: "Art Studio",
      description: "Creative spaces for art, craft, and design activities",
      image: "/art-studio-students.png",
      features: ["Art Supplies", "Exhibition Space", "Creative Workshops"],
    },
    {
      icon: Music,
      title: "Music Room",
      description: "Dedicated space for music education and cultural programs",
      image: "/school-cultural-program.png",
      features: ["Musical Instruments", "Recording Setup", "Performance Stage"],
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            World-Class Facilities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Modern infrastructure designed to enhance learning and development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                y: -15,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Card className="h-full overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <facility.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {facility.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {facility.description}
                  </p>
                  <div className="space-y-2">
                    {facility.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-500"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 shadow-sm" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Experience Our Facilities
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Schedule a campus tour to see our world-class facilities and
              learning environment
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule School Tour
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
      {/* Section Divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
    </section>
  );
}
