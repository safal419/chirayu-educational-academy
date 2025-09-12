"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { apiConfig } from "@/lib/config";
import Loading from "@/components/Loading";

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

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Education Technology": "bg-blue-100 text-blue-800",
      "Character Development": "bg-green-100 text-green-800",
      "STEM Education": "bg-purple-100 text-purple-800",
      "Student Development": "bg-orange-100 text-orange-800",
      "Parent Engagement": "bg-pink-100 text-pink-800",
      "Global Education": "bg-teal-100 text-teal-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  useEffect(() => {
    let mounted = true;
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = apiConfig?.endpoints?.articles ?? "/articles";
        const res = await axios.get(endpoint);
        const data = res.data;
        if (!mounted) return;
        // map backend shape to client-friendly shape (support _id or id)
        const mapped = Array.isArray(data)
          ? data.map((a: any) => ({
              id: a._id ?? a.id,
              title: a.title,
              excerpt: a.excerpt,
              content: a.content,
              author: a.author,
              date: a.publishDate ?? a.createdAt ?? a.date,
              category: a.category ?? "General",
              image: a.image ?? a.thumbnail ?? "",
              readTime: a.readTime ?? "5 min read",
            }))
          : [];
        setPosts(mapped);
      } catch (err: any) {
        console.error("Failed to load blog posts", err);
        setError("Failed to load posts");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchPosts();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">School Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, updates, and educational perspectives from our faculty and
            community
          </p>
        </motion.div>

        {/* Search and Filter (kept UI only) */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {/* categories UI retained */}
                {[
                  "All",
                  "Education Technology",
                  "Character Development",
                  "STEM Education",
                  "Student Development",
                  "Parent Engagement",
                  "Global Education",
                ].map((category) => (
                  <button
                    key={category}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {loading ? (
            <div className="col-span-full">
              <Loading mode="skeleton" count={6} message="Loading posts..." />
            </div>
          ) : error ? (
            <div className="col-span-full text-center text-red-500">
              {error}
            </div>
          ) : posts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No posts found.
            </div>
          ) : (
            posts.map((post) => (
              <motion.article
                key={String(post.id)}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
              >
                <Link href={`/blog/${post.id}`} className="block relative h-48">
                  {post.image ? (
                    // avoid Next/Image errors for external/blob urls by using img when needed
                    post.image.startsWith("http") ||
                    post.image.startsWith("/") ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      // fallback to img for other shapes
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <Calendar className="h-16 w-16 text-white" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                        post.category
                      )}`}
                    >
                      {post.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <User size={16} className="mr-1" />
                      {post.author || "Unknown"}
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      {post.date
                        ? new Date(post.date).toLocaleDateString()
                        : ""}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {post.readTime}
                    </span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-orange-600 font-medium inline-flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </motion.div>

        {/* Load More (UI placeholder) */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
          >
            Load More Posts
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
