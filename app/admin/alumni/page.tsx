"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  User,
  Calendar,
  Briefcase,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { apiConfig } from "@/lib/config";
import CreateAlumniModal from "./CreateAlumniModal";
import EditAlumniModal from "./EditAlumniModal";
import Loading from "@/components/Loading";
import EmptyState from "@/components/EmptyState";

interface Alumni {
  _id?: string;
  id?: number;
  name: string;
  graduationYear: number;
  currentPosition: string;
  company: string;
  location: string;
  email: string;
  phone: string;
  achievements: string;
  image?: string;
  linkedIn?: string;
  testimonial?: string;
}

const inFlight = new Map<string, Promise<any>>();

function extractImageUrl(data: any): string {
  if (!data) return "";
  if (Array.isArray(data?.urls) && data.urls[0]) return data.urls[0];
  if (Array.isArray(data) && data[0])
    return data[0].secure_url || data[0].url || data[0].path || data[0];
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
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingAlumni, setEditingAlumni] = useState<Alumni | null>(null);
  const [viewingAlumni, setViewingAlumni] = useState<Alumni | null>(null);

  const endpoint = apiConfig.endpoints.alumni;
  const uploadEndpoint = apiConfig.endpoints.upload;

  useEffect(() => {
    fetchAlumni();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAlumni = async () => {
    const key = endpoint;
    if (inFlight.has(key)) {
      try {
        const data = await inFlight.get(key);
        setAlumni(Array.isArray(data) ? data : []);
        setLoading(false);
        return;
      } catch {
        // fallthrough to new attempt
      }
    }

    const p = axios
      .get(endpoint)
      .then((res) => res.data)
      .then((data) => {
        setAlumni(Array.isArray(data) ? data : []);
        return data;
      })
      .catch((err) => {
        console.error("Failed to fetch alumni:", err);
        toast.error("Failed to load alumni");
        setAlumni([]);
        throw err;
      })
      .finally(() => {
        inFlight.delete(key);
        setLoading(false);
      });

    inFlight.set(key, p);
    await p;
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append("files", file);
    const res = await axios.post(uploadEndpoint, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return extractImageUrl(res.data);
  };

  const handleCreate = async (payload: any) => {
    try {
      let imageUrl = payload.image || "";
      if (payload.image instanceof File) {
        imageUrl = await uploadImage(payload.image);
      }

      const createPayload = {
        ...payload,
        image: imageUrl || payload.image || "",
      };

      const res = await axios.post(endpoint, createPayload);
      setAlumni((prev) => [res.data, ...prev]);
      toast.success("Alumni record created");
      setShowCreateModal(false);
    } catch (err) {
      console.error("Create alumni failed:", err);
      toast.error("Failed to create alumni");
      throw err;
    }
  };

  const handleUpdate = async (payload: any) => {
    try {
      let imageUrl = payload.image || "";
      if (payload.image instanceof File) {
        imageUrl = await uploadImage(payload.image);
      }

      const id = payload._id ?? payload.id;
      if (!id) {
        toast.error("Missing alumni id");
        return;
      }

      const updatePayload = {
        ...payload,
        image: imageUrl || payload.image || "",
      };
      await axios.put(`${endpoint}/${id}`, updatePayload);
      // update local list
      setAlumni((prev) =>
        prev.map((a) => {
          const match = a._id === id || a.id === id;
          return match ? { ...(a as any), ...updatePayload } : a;
        })
      );
      toast.success("Alumni updated");
      setEditingAlumni(null);
      setShowCreateModal(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update alumni");
      throw err;
    }
  };

  const handleDelete = async (id?: string | number) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this alumni record?")) return;
    try {
      await axios.delete(`${endpoint}/${id}`);
      setAlumni((prev) => prev.filter((a) => a._id !== id && a.id !== id));
      toast.success("Alumni deleted");
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete alumni");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading)
    return <Loading mode="skeleton" count={6} message="Loading alumni..." />;

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
            Alumni Management
          </h1>
          <p className="text-gray-600">
            Manage alumni records and success stories
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingAlumni(null);
            setShowCreateModal(true);
          }}
          className="flex items-center space-x-2 w-full md:w-auto shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="h-4 w-4" />
          <span>Add Alumni</span>
        </Button>
      </motion.div>

      {/* Empty state when no alumni, otherwise show grid */}
      {alumni.length === 0 ? (
        <EmptyState
          title="No alumni found"
          message="No alumni records available. Add a new alumni to get started."
          action={{
            label: "Add Alumni",
            onClick: () => setShowCreateModal(true),
          }}
        />
      ) : (
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {alumni.map((a) => (
            <motion.div
              key={a._id ?? a.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.18 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 shadow-md">
                <div className="h-48 relative">
                  {a.image ? (
                    <Image
                      src={a.image || "/placeholder.svg"}
                      alt={a.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {a.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Class of {a.graduationYear}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Briefcase className="h-4 w-4 mr-2" />
                      {a.currentPosition}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {a.location}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {a.company}
                  </p>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => setViewingAlumni(a)}
                    >
                      <Eye className="h-4 w-4 mr-1" /> View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setEditingAlumni(a);
                        setShowCreateModal(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => handleDelete(a._id ?? a.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Create / Edit Modal is rendered regardless so EmptyState action can open it */}
      {showCreateModal && (
        <CreateAlumniModal
          alumni={editingAlumni}
          onClose={() => {
            setShowCreateModal(false);
            setEditingAlumni(null);
          }}
          onCreate={async (payload: any) => {
            await handleCreate(payload);
            await fetchAlumni();
          }}
          onUpdate={async (payload: any) => {
            await handleUpdate(payload);
            await fetchAlumni();
          }}
        />
      )}

      {viewingAlumni && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Alumni Details
              </h2>
              <button
                onClick={() => setViewingAlumni(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  {viewingAlumni.image ? (
                    <Image
                      src={viewingAlumni.image}
                      alt={viewingAlumni.name}
                      width={80}
                      height={80}
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-10 w-10 text-gray-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {viewingAlumni.name}
                  </h3>
                  <p className="text-gray-600">
                    Class of {viewingAlumni.graduationYear}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Current Position
                    </label>
                    <p className="text-gray-900">
                      {viewingAlumni.currentPosition}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Company
                    </label>
                    <p className="text-gray-900">{viewingAlumni.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Location
                    </label>
                    <p className="text-gray-900">{viewingAlumni.location}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Email
                    </label>
                    <p className="text-gray-900">{viewingAlumni.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Phone
                    </label>
                    <p className="text-gray-900">{viewingAlumni.phone}</p>
                  </div>
                  {viewingAlumni.linkedIn && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        LinkedIn
                      </label>
                      <a
                        href={viewingAlumni.linkedIn}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Achievements
                </label>
                <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {viewingAlumni.achievements}
                </p>
              </div>

              {viewingAlumni.testimonial && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Testimonial
                  </label>
                  <p className="text-gray-900 bg-blue-50 p-4 rounded-lg italic">
                    "{viewingAlumni.testimonial}"
                  </p>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => setViewingAlumni(null)}
                  className="shadow-md hover:shadow-lg"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
