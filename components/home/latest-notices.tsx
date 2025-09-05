"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { apiConfig } from "@/lib/config";
import Link from "next/link";

interface Notice {
  _id: string;
  title: string;
  date: string;
  priority: string;
  content: string;
}

export default function LatestNotices() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await axios.get(apiConfig.endpoints.notices);
        // Sort by date descending and take the latest 3
        const latestNotices = res.data
          .sort(
            (a: Notice, b: Notice) =>
              new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 3);
        setNotices(latestNotices);
      } catch (err) {
        console.error("Failed to fetch notices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-20 text-gray-700 text-xl">
        Loading latest notices...
      </p>
    );

  if (notices.length === 0)
    return (
      <p className="text-center mt-20 text-gray-700 text-xl">
        No notices available.
      </p>
    );

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Notices
          </h2>
          <p className="text-xl text-gray-600">
            Stay updated with important announcements and information
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice, index) => (
            <motion.div
              key={notice._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Bell className="w-6 h-6 text-blue-600 flex-shrink-0" />
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        notice.priority === "High"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {notice.priority}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {notice.content}
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(notice.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href={"/notices"}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              View All Notices
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent z-10"></div>
    </section>
  );
}
