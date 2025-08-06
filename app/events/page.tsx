"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react"
import Image from "next/image"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

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
}

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Annual Sports Day 2024",
      date: "2024-02-20",
      time: "8:00 AM - 4:00 PM",
      venue: "School Sports Ground",
      category: "Sports",
      image: "/school-sports-day.png",
      description:
        "Join us for our annual sports day featuring track and field events, team sports, and cultural performances.",
      participants: "All Students",
    },
    {
      id: 2,
      title: "Science Exhibition",
      date: "2024-02-15",
      time: "10:00 AM - 3:00 PM",
      venue: "Science Laboratory",
      category: "Academic",
      image: "/science-exhibition.png",
      description: "Students will showcase their innovative science projects and experiments to parents and visitors.",
      participants: "Grades 6-10",
    },
    {
      id: 3,
      title: "Cultural Program",
      date: "2024-03-05",
      time: "6:00 PM - 9:00 PM",
      venue: "School Auditorium",
      category: "Cultural",
      image: "/cultural-program.png",
      description: "An evening of music, dance, and drama performances by our talented students.",
      participants: "Selected Students",
    },
  ]

  const pastEvents = [
    {
      id: 4,
      title: "Teachers' Day Celebration",
      date: "2023-09-05",
      category: "Cultural",
      image: "/teachers-day-celebration.png",
      description: "Students organized a special program to honor and appreciate their teachers.",
    },
    {
      id: 5,
      title: "Inter-House Competition",
      date: "2023-11-15",
      category: "Sports",
      image: "/school-competition-students.png",
      description: "Exciting competitions between different houses including debates, sports, and arts.",
    },
    {
      id: 6,
      title: "Environmental Awareness Program",
      date: "2023-12-01",
      category: "Educational",
      image: "/placeholder-ff8jg.png",
      description: "Students participated in tree planting and environmental conservation activities.",
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sports":
        return "bg-green-100 text-green-800"
      case "Academic":
        return "bg-blue-100 text-blue-800"
      case "Cultural":
        return "bg-purple-100 text-purple-800"
      case "Educational":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <Calendar className="inline-block mr-3 text-purple-600" size={48} />
            School Events
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover exciting events, celebrations, and activities happening at our school
          </p>
        </motion.div>

        {/* Upcoming Events */}
        <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar size={16} className="mr-2 text-purple-600" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock size={16} className="mr-2 text-purple-600" />
                      {event.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={16} className="mr-2 text-purple-600" />
                      {event.venue}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users size={16} className="mr-2 text-purple-600" />
                      {event.participants}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                  >
                    <ExternalLink size={16} />
                    Learn More
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Past Events */}
        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                      {event.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{event.description}</p>

                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar size={16} className="mr-2 text-purple-600" />
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}
