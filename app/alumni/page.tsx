"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  GraduationCap,
  MapPin,
  Briefcase,
  Mail,
  ExternalLink,
} from "lucide-react";
import axios from "axios";
import Loading from "@/components/Loading";
import { apiConfig } from "@/lib/config";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

// Local view model matching your NestJS Alumni schema shape
type AlumniType = {
  id?: string | number;
  name: string;
  graduationYear: number | string;
  currentPosition: string;
  company?: string;
  location?: string;
  email?: string;
  phone?: string;
  achievements?: string;
  image?: string;
  linkedIn?: string;
  testimonial?: string;
};

// Robust image extraction (same approach used in admin pages)
function extractImageUrl(data: any): string {
  if (!data) return "";
  if (Array.isArray(data?.urls) && data.urls[0]) return data.urls[0];
  if (Array.isArray(data) && data[0])
    return data[0].secure_url || data[0].url || data[0].path || data[0] || "";
  if (data?.files && data.files[0])
    return (
      data.files[0].secure_url || data.files[0].url || data.files[0].path || ""
    );
  if (data?.paths && data.paths[0]) return data.paths[0];
  if (data?.secure_url) return data.secure_url;
  if (data?.url) return data.url;
  if (data?.path) return data.path;
  if (typeof data === "string") return data;
  return "";
}

export default function AlumniPage() {
  const [alumniList, setAlumniList] = useState<AlumniType[]>([]);
  const [loading, setLoading] = useState(true);

  // Map backend record to AlumniType (tolerant to different shapes)
  const mapAlumni = (a: any): AlumniType => ({
    id: a._id ?? a.id,
    name: a.name ?? a.fullName ?? "",
    graduationYear:
      a.graduationYear ?? a.year ?? a.graduatedAt ?? new Date().getFullYear(),
    currentPosition: a.currentPosition ?? a.position ?? "",
    company: a.company ?? "",
    location: a.location ?? "",
    email: a.email ?? "",
    phone: a.phone ?? "",
    achievements: a.achievements ?? "",
    image: extractImageUrl(a.image ?? a.images ?? a.media),
    linkedIn: a.linkedIn ?? a.linkedin ?? a.profile ?? "",
    testimonial: a.testimonial ?? "",
  });

  useEffect(() => {
    let mounted = true;
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        const endpoint = apiConfig?.endpoints?.alumni;
        if (!endpoint) throw new Error("Alumni endpoint not configured");
        const res = await axios.get(endpoint);
        const data = res.data;
        if (!mounted) return;
        if (Array.isArray(data)) {
          setAlumniList(data.map(mapAlumni));
        } else {
          setAlumniList([]);
        }
      } catch (err) {
        console.error("Failed to fetch alumni:", err);
        setAlumniList([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchAlumni();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading message="Loading alumni..." />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            <GraduationCap
              className="inline-block mr-3 text-green-600"
              size={48}
            />
            Our Alumni
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Celebrating the success stories of our graduates who are making a
            difference in the world
          </p>
        </motion.div>

        {/* Alumni Statistics (basic counts derived from fetched data) */}
        <motion.section variants={itemVariants} className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">🎓</div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {alumniList.length}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Total Alumni
              </h3>
              <p className="text-gray-600 text-sm">Profiles in our network</p>
            </motion.div>
            {/* Add additional stats if required */}
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">💼</div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {alumniList.filter((a) => a.currentPosition).length}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Employed
              </h3>
              <p className="text-gray-600 text-sm">Active professionals</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">🌍</div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {
                  new Set(alumniList.map((a) => a.location).filter(Boolean))
                    .size
                }
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Locations
              </h3>
              <p className="text-gray-600 text-sm">
                Countries / Cities represented
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl mb-4">🏆</div>
              <div className="text-3xl font-bold text-green-600 mb-2">
                {alumniList.filter((a) => a.achievements).length}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Achievements
              </h3>
              <p className="text-gray-600 text-sm">Shared success stories</p>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Alumni (from fetched data) */}
        <motion.section variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Featured Alumni
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {alumniList.map((alumni) => (
              <motion.div
                key={String(alumni.id ?? alumni.name)}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="w-[100px] h-[100px] rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                      {alumni.image ? (
                        <Image
                          src={alumni.image}
                          alt={alumni.name}
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full text-gray-400">
                          <GraduationCap size={36} />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {alumni.name}
                      </h3>
                      <p className="text-green-600 font-semibold mb-2">
                        {alumni.currentPosition}
                      </p>
                      <div className="space-y-1 mb-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Briefcase size={16} className="mr-2" />
                          {alumni.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-2" />
                          {alumni.location}
                        </div>
                        <div className="flex items-center">
                          <GraduationCap size={16} className="mr-2" />
                          Class of {alumni.graduationYear}
                        </div>
                      </div>

                      {alumni.testimonial && (
                        <p className="text-gray-700 text-sm mb-4 italic">
                          "{alumni.testimonial}"
                        </p>
                      )}

                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-green-800 text-sm font-medium">
                          {alumni.achievements}
                        </p>
                      </div>

                      <div className="mt-4 flex gap-3">
                        {alumni.email && (
                          <a
                            href={`mailto:${alumni.email}`}
                            className="text-sm text-gray-700 underline"
                          >
                            <Mail size={16} className="inline mr-2" /> Email
                          </a>
                        )}
                        {alumni.linkedIn && (
                          <a
                            href={
                              alumni.linkedIn.startsWith("http")
                                ? alumni.linkedIn
                                : `https://${alumni.linkedIn}`
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-green-700 underline inline-flex items-center"
                          >
                            <ExternalLink size={16} className="inline mr-2" />
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Alumni Network CTA */}
        <motion.section
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-xl p-8 mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join Our Alumni Network
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay connected with your fellow graduates and continue to be part
              of the Chirayu family. Share your success stories and inspire
              current students.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-2 font-medium"
            >
              <Mail size={20} />
              Contact Alumni Office
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors inline-flex items-center gap-2 font-medium"
            >
              <ExternalLink size={20} />
              Alumni Registration
            </motion.button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
