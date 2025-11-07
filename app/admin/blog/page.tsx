"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, User, Tag } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { apiConfig } from "@/lib/config";
import CreateBlogModal from "./CreateBlogModal";
import EditBlogModal from "./EditBlogModal";

interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: "published" | "draft" | "scheduled";
  publishDate: string;
  image: string;
  tags: string[];
}

function extractImageUrl(data: any): string {
  if (!data) return "";

  if (Array.isArray(data?.urls) && data.urls[0]) return data.urls[0];

  if (Array.isArray(data) && data[0])
    return data[0].secure_url || data[0].url || data[0].path || "";
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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);

  const endpoint = apiConfig?.endpoints?.articles;

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const res = await axios.get(endpoint);
      const data = res.data;
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load articles", err);
      toast.error("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleView = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setShowViewModal(true);
  };

  const handleEdit = (blog: BlogPost) => {
    setSelectedBlog(blog);
    setShowEditModal(true);
  };

  const handleDelete = async (blog: BlogPost) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;
    try {
      setSelectedBlog(blog);
      await axios.delete(`${endpoint}/${blog._id}`);
      setBlogs((prev) => prev.filter((item) => item._id !== blog._id));
      toast.success("Post deleted");
      setSelectedBlog(null);
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete post");
      setSelectedBlog(null);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("files", file);

    const res = await axios.post(apiConfig.endpoints.upload, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return extractImageUrl(res.data);
  };

  const handleCreate = async (newBlog: any) => {
    try {
      let imageUrl = "";
      if (newBlog.image instanceof File) {
        imageUrl = await uploadImage(newBlog.image);
      }

      const payload = {
        ...newBlog,
        image: imageUrl || newBlog.image || "",
      };

      const res = await axios.post(endpoint, payload, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      setBlogs((prev) => [res.data, ...prev]);
      toast.success("Post created");
      setShowCreateModal(false);
    } catch (err) {
      console.error("Create error:", err);
      toast.error("Failed to create post");
    }
  };

  const handleUpdate = async (updatedBlog: any) => {
    try {
      let imageUrl = updatedBlog.image;

      if (updatedBlog.image instanceof File) {
        imageUrl = await uploadImage(updatedBlog.image);
      }

      const payload = {
        ...updatedBlog,
        image: imageUrl || "",
      };

      await axios.put(`${endpoint}/${updatedBlog.id}`, payload, {
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      });

      // Refetch all blogs after update
      await fetchArticles();

      toast.success("Post updated");
      setShowEditModal(false);
      setSelectedBlog(null);
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Failed to update post");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            Blog Posts
          </h1>
          <p className="text-gray-600">
            Create and manage educational blog content
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 w-full md:w-auto shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="h-4 w-4" />
          <span>Create Post</span>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold">{blogs.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Edit className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Published</p>
                <p className="text-2xl font-bold">
                  {blogs.filter((b) => b.status === "published").length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Eye className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Drafts</p>
                <p className="text-2xl font-bold">
                  {blogs.filter((b) => b.status === "draft").length}
                </p>
              </div>
              <div className="p-2 bg-gray-100 rounded-full">
                <Edit className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow"></Card>
      </motion.div>

      {/* Blog Posts Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {loading ? (
          <div className="col-span-full text-center text-gray-500">
            Loading...
          </div>
        ) : blogs.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No posts found.
          </div>
        ) : (
          blogs.map((blog) => (
            <motion.div
              key={String(blog.id)}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="h-48 relative">
                  {blog.image ? (
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Edit className="h-16 w-16 text-white" />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        blog.status
                      )}`}
                    >
                      {blog.status.toUpperCase()}
                    </span>
                    <div className="text-sm text-gray-500">
                      {new Date(blog.publishDate).toLocaleDateString()}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      {blog.author}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Tag className="h-4 w-4 mr-2" />
                      {blog.category}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 shadow-sm hover:shadow-md transition-shadow bg-transparent"
                      onClick={() => handleView(blog)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 shadow-sm hover:shadow-md transition-shadow bg-transparent"
                      onClick={() => handleEdit(blog)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 shadow-sm hover:shadow-md transition-shadow bg-transparent"
                      onClick={() => handleDelete(blog)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Modals */}
      {showCreateModal && (
        <CreateBlogModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}
      {showEditModal && selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          onClose={() => {
            setShowEditModal(false);
            setSelectedBlog(null);
          }}
          onUpdate={handleUpdate}
        />
      )}
      {showViewModal && selectedBlog && (
        <ViewBlogModal
          blog={selectedBlog}
          onClose={() => {
            setShowViewModal(false);
            setSelectedBlog(null);
          }}
        />
      )}
    </motion.div>
  );
}

function ViewBlogModal({
  blog,
  onClose,
}: {
  blog: BlogPost;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-poppins">
            Blog Post Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Featured Image */}
          {blog.image && (
            <div className="w-full h-64 relative rounded-lg overflow-hidden">
              <Image
                src={blog.image || "/placeholder.svg"}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {blog.title}
              </h3>
              <div className="flex items-center space-x-4 mt-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    blog.status === "published"
                      ? "bg-green-100 text-green-800"
                      : blog.status === "draft"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {blog.status.toUpperCase()}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(blog.publishDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Author
              </label>
              <p className="text-gray-900">{blog.author}</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Category
              </label>
              <p className="text-gray-900">{blog.category}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt
            </label>
            <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
              {blog.excerpt}
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Content
            </label>
            <div className="text-gray-900 bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
              <p className="whitespace-pre-wrap">{blog.content}</p>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={onClose}
              className="shadow-md hover:shadow-lg transition-shadow"
            >
              Close
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
