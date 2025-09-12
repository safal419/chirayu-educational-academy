"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ExternalLink } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { apiConfig } from "@/lib/config";
import Loading from "@/components/Loading";
import EmptyState from "@/components/EmptyState";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(apiConfig.endpoints.events);
        const events = res.data;

        const now = new Date();
        setUpcomingEvents(events.filter((e: any) => new Date(e.date) >= now));
        setPastEvents(events.filter((e: any) => new Date(e.date) < now));
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Sports":
        return "bg-green-100 text-green-800";
      case "Academic":
        return "bg-blue-100 text-blue-800";
      case "Cultural":
        return "bg-purple-100 text-purple-800";
      case "Educational":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return <Loading mode="skeleton" count={2} message="Loading events..." />;

  if (upcomingEvents.length === 0)
    return (
      <EmptyState
        title="No upcoming events"
        message="There are no upcoming events at the moment."
        action={{ label: "Refresh", onClick: () => window.location.reload() }}
      />
    );

  const placeholderImage = "/event-placeholder.jpg";

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

        {/* Upcoming Events */}
        <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Upcoming Events
          </h2>
          {upcomingEvents.length === 0 ? (
            <p className="text-center text-gray-500">
              No upcoming events available.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={event.image || placeholderImage}
                      alt={event.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          event.category
                        )}`}
                      >
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-2 text-purple-600" />
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                      {event.time && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={16} className="mr-2 text-purple-600" />
                          {event.time}
                        </div>
                      )}
                      {event.venue && (
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin size={16} className="mr-2 text-purple-600" />
                          {event.venue}
                        </div>
                      )}
                      {event.participants && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Users size={16} className="mr-2 text-purple-600" />
                          {event.participants}
                        </div>
                      )}
                    </div>

                    {/* View Details Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Past Events */}
        <motion.section variants={itemVariants}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Past Events</h2>
          {pastEvents.length === 0 ? (
            <p className="text-center text-gray-500">
              No past events available.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <motion.div
                  key={event.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <div className="relative">
                    <Image
                      src={event.image || placeholderImage}
                      alt={event.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          event.category
                        )}`}
                      >
                        {event.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar size={16} className="mr-2 text-purple-600" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>

                    {/* View Details Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <ExternalLink size={16} />
                      View Details
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </motion.div>
  );
}
