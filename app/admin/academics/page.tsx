"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading";
import { apiConfig } from "@/lib/config";

interface AcademicItem {
  _id?: string;
  title: string;
  grades: string;
  ageGroup: string;
  description: string;
  subjects: string[];
  color?: string;
}

export default function AdminAcademicsPage() {
  const [items, setItems] = useState<AcademicItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<AcademicItem | null>(null);

  const endpoint = apiConfig.endpoints.academics;

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await axios.get(endpoint);
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load academics", err);
      toast.error("Failed to load academics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this academic item?")) return;
    try {
      await axios.delete(`${endpoint}/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      toast.success("Deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  const openCreate = () => {
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (item: AcademicItem) => {
    setEditing(item);
    setShowModal(true);
  };

  const handleSave = async (payload: AcademicItem) => {
    try {
      if (editing && (editing._id || (payload as any).id)) {
        const id = editing._id || (payload as any).id;
        await axios.patch(`${endpoint}/${id}`, payload);
        await fetchItems();
        toast.success("Updated");
      } else {
        const res = await axios.post(endpoint, payload);
        setItems((prev) => [res.data, ...prev]);
        toast.success("Created");
      }
      setShowModal(false);
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save");
    }
  };

  return (
    <motion.div className="space-y-6">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 font-poppins">
            Academics
          </h1>
          <p className="text-gray-600">Manage academic programs and details</p>
        </div>
        <Button
          onClick={openCreate}
          className="flex items-center space-x-2 w-full md:w-auto shadow-md hover:shadow-lg transition-shadow"
        >
          <Plus className="h-4 w-4" /> <span>Create</span>
        </Button>
      </div>

      {loading ? (
        <Loading mode="skeleton" count={4} />
      ) : items.length === 0 ? (
        <div className="text-center text-gray-500">
          No academic items found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card
              key={item._id}
              className="overflow-hidden shadow-md hover:shadow-lg transition-shadow border-0"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="pr-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <div className="text-sm text-gray-600">
                      Grades:{" "}
                      <span className="font-medium text-gray-800">
                        {item.grades}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Age group:{" "}
                      <span className="font-medium text-gray-800">
                        {item.ageGroup}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{ background: item.color || "transparent" }}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => openEdit(item)}
                      >
                        <Edit className="h-4 w-4 text-gray-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => handleDelete(item._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-gray-700 text-sm">{item.description}</p>

                {item.subjects && item.subjects.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.subjects.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {showModal && (
        <AcademicsModal
          initial={editing}
          onClose={() => {
            setShowModal(false);
            setEditing(null);
          }}
          onSave={handleSave}
        />
      )}
    </motion.div>
  );
}

function AcademicsModal({
  initial,
  onClose,
  onSave,
}: {
  initial: AcademicItem | null;
  onClose: () => void;
  onSave: (payload: AcademicItem) => Promise<void> | void;
}) {
  const [title, setTitle] = useState(initial?.title || "");
  const [grades, setGrades] = useState(initial?.grades || "");
  const [ageGroup, setAgeGroup] = useState(initial?.ageGroup || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [subjects, setSubjects] = useState(
    (initial?.subjects || []).join(", ")
  );
  const [color, setColor] = useState(initial?.color || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: AcademicItem = {
      title,
      grades,
      ageGroup,
      description,
      subjects: subjects
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      color,
    };

    try {
      await onSave(payload);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {initial ? "Edit" : "Create"} Academic
          </h2>
          <button onClick={onClose} className="text-2xl text-gray-400">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Grades
              </label>
              <input
                value={grades}
                onChange={(e) => setGrades(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Age Group
              </label>
              <input
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Color (css)
              </label>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#E5E7EB"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subjects (comma separated)
            </label>
            <input
              value={subjects}
              onChange={(e) => setSubjects(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : initial ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
