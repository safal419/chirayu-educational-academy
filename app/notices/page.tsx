"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Bell } from "lucide-react";
import axios from "axios";
import Loading from "@/components/Loading";
import EmptyState from "@/components/EmptyState";
import { apiConfig } from "@/lib/config";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function NoticesPage() {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parseDateValue = (v: any): number => {
      if (!v && v !== 0) return NaN;
      // Date instance
      if (v instanceof Date) return v.getTime();
      // number: could be ms or seconds
      if (typeof v === "number") {
        // if looks like seconds (10 digits) convert to ms
        if (v < 1e12) return v * 1000;
        return v;
      }
      // string
      if (typeof v === "string") {
        const t = Date.parse(v);
        return Number.isNaN(t) ? NaN : t;
      }
      // Firestore / Firebase timestamp shapes
      if (typeof v === "object") {
        const seconds = v.seconds ?? v._seconds ?? v._sec ?? v.sec;
        const nanos = v.nanoseconds ?? v._nanoseconds ?? v.nanos ?? 0;
        if (typeof seconds === "number") {
          return seconds * 1000 + Math.floor((nanos || 0) / 1e6);
        }
        // sometimes nested like { createdAt: { seconds: ... } }
        for (const key of Object.keys(v)) {
          const nested = v[key];
          if (
            nested &&
            typeof nested === "object" &&
            (nested.seconds || nested._seconds)
          ) {
            const s = nested.seconds ?? nested._seconds;
            const ns = nested.nanoseconds ?? nested._nanoseconds ?? 0;
            if (typeof s === "number") return s * 1000 + Math.floor(ns / 1e6);
          }
        }
      }
      return NaN;
    };

    const fetchNotices = async () => {
      try {
        const res = await axios.get(apiConfig.endpoints.notices);
        const raw = Array.isArray(res.data) ? res.data : [];

        // keep items from last 14 days only, and sort newest first
        const TWO_WEEKS_MS = 14 * 24 * 60 * 60 * 1000;
        const cutoff = Date.now() - TWO_WEEKS_MS;

        const prepared = raw
          .map((n: any) => {
            // try common date fields and many possible shapes
            const candidates = [
              n.date,
              n.createdAt,
              n.created_at,
              n.created,
              n.publishedAt,
              n.updatedAt,
              n.meta?.createdAt,
            ];
            let parsed = NaN;
            for (const c of candidates) {
              const p = parseDateValue(c);
              if (!Number.isNaN(p)) {
                parsed = p;
                break;
              }
            }
            // fallback: search object recursively for a date-like value
            if (Number.isNaN(parsed)) {
              const searchRec = (obj: any, depth = 0): number => {
                if (!obj || depth > 5) return NaN;
                if (
                  typeof obj === "string" ||
                  typeof obj === "number" ||
                  obj instanceof Date
                ) {
                  return parseDateValue(obj);
                }
                if (Array.isArray(obj)) {
                  for (const v of obj) {
                    const r = searchRec(v, depth + 1);
                    if (!Number.isNaN(r)) return r;
                  }
                } else if (typeof obj === "object") {
                  for (const k of Object.keys(obj)) {
                    const r = searchRec(obj[k], depth + 1);
                    if (!Number.isNaN(r)) return r;
                  }
                }
                return NaN;
              };
              parsed = searchRec(n);
            }

            return { original: n, parsedDate: parsed || NaN };
          })
          .filter(
            (p: any) => !Number.isNaN(p.parsedDate) && p.parsedDate >= cutoff
          )
          .sort((a: any, b: any) => b.parsedDate - a.parsedDate)
          .map((p: any) => {
            // attach parsedDate for rendering convenience
            return { ...p.original, parsedDate: p.parsedDate };
          });

        setNotices(prepared);
      } catch (err) {
        console.error("Failed to fetch notices", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Event":
        return "bg-purple-100 text-purple-800";
      case "Academic":
        return "bg-blue-100 text-blue-800";
      case "Holiday":
        return "bg-orange-100 text-orange-800";
      case "Facility":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading)
    return (
      <Loading mode="skeleton" count={3} message="Loading latest notices..." />
    );

  if (!notices.length)
    return (
      <EmptyState
        title="No notices"
        message="No notices are available right now."
        action={{ label: "Refresh", onClick: () => window.location.reload() }}
      />
    );
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            <Bell className="inline-block mr-3 text-blue-600" size={48} />
            School Notices
          </h1>
          <p className="text-l text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest announcements, events, and important
            information
          </p>
        </motion.div>

        {/* Notices Grid */}
        <motion.div variants={itemVariants} className="space-y-6">
          {notices.map((notice) => (
            <motion.div
              key={notice.id}
              variants={itemVariants}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-l-4 border-blue-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                        notice.priority
                      )}`}
                    >
                      {notice.priority?.toUpperCase()}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        notice.category
                      )}`}
                    >
                      {notice.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {notice.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {notice.content}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {new Date(notice.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {Math.floor(Math.random() * 5) + 1} days ago
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
