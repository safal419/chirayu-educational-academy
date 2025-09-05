"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Save, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { apiConfig } from "@/lib/config";

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  priority: "high" | "medium" | "low";
}

const API_BASE = apiConfig.baseUrl;

export default function NoticesAdmin() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [noticeToDelete, setNoticeToDelete] = useState<Notice | null>(null);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState<Partial<Notice>>({});

  // Convert backend _id to frontend id
  const mapNoticeId = (notice: any): Notice => ({
    id: notice._id,
    title: notice.title,
    content: notice.content,
    date: notice.date,
    priority: notice.priority,
  });

  // Fetch notices on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch(`${API_BASE}/notices`)
      .then(async (res) => {
        if (!res.ok) throw new Error((await res.text()) || res.statusText);
        return res.json();
      })
      .then((data: any[]) => {
        if (mounted) setNotices(data.map(mapNoticeId));
      })
      .catch((err) => {
        console.error("Failed to fetch notices", err);
        if (mounted) setError("Failed to load notices");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleAdd = () => {
    setFormData({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      priority: "medium",
    });
    setIsAddDialogOpen(true);
  };

  const handleEdit = (notice: Notice) => {
    setSelectedNotice(notice);
    setFormData(notice);
    setIsEditDialogOpen(true);
  };

  const handleView = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;
    try {
      const res = await fetch(`${API_BASE}/notices/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error((await res.text()) || res.statusText);
      setNotices((prev) => prev.filter((n) => n.id !== id));
      toast.success("Notice deleted successfully!");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete notice.");
    }
  };

  const handleSave = async () => {
    const payload = {
      title: formData.title || "",
      content: formData.content || "",
      date: formData.date || new Date().toISOString().split("T")[0],
      priority: (formData.priority as Notice["priority"]) || "medium",
    };

    try {
      if (selectedNotice) {
        // Edit existing
        const res = await fetch(`${API_BASE}/notices/${selectedNotice.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.text()) || res.statusText);
        const updated: any = await res.json();
        setNotices((prev) =>
          prev.map((n) => (n.id === updated._id ? mapNoticeId(updated) : n))
        );
        setIsEditDialogOpen(false);
        toast.success("Notice updated successfully!");
      } else {
        // Add new
        const res = await fetch(`${API_BASE}/notices`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error((await res.text()) || res.statusText);
        const created: any = await res.json();
        setNotices((prev) => [...prev, mapNoticeId(created)]);
        setIsAddDialogOpen(false);
        toast.success("Notice added successfully!");
      }
      setFormData({});
      setSelectedNotice(null);
    } catch (err) {
      console.error("Save failed", err);
      toast.error("Failed to save notice.");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Notices Management
          </h1>
          <p className="text-gray-600 mt-1">
            Create and manage school notices and announcements
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Notice
        </Button>
      </div>

      {/* Notices Table */}
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
        <CardHeader>
          <CardTitle>All Notices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <div>Loading notices...</div>
            ) : error ? (
              <div className="text-red-600">{error}</div>
            ) : notices.length === 0 ? (
              <div>No notices yet.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notices.map((notice) => (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium">
                        {notice.title}
                      </TableCell>
                      <TableCell>
                        {new Date(notice.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(notice.priority)}>
                          {notice.priority}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleView(notice)}
                            className="bg-white shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(notice)}
                            className="bg-white shadow-sm hover:shadow-md transition-all duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setNoticeToDelete(notice);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="bg-white shadow-sm hover:shadow-md transition-all duration-200 text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Dialog */}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!open) setNoticeToDelete(null);
          setIsDeleteDialogOpen(open);
        }}
      >
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this notice? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={async () => {
                if (!noticeToDelete) return;
                try {
                  const res = await fetch(
                    `${API_BASE}/notices/${noticeToDelete.id}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (!res.ok)
                    throw new Error((await res.text()) || res.statusText);
                  setNotices((prev) =>
                    prev.filter((n) => n.id !== noticeToDelete.id)
                  );
                  toast.success("Notice deleted successfully!");
                } catch (err) {
                  console.error("Delete failed", err);
                  toast.error("Failed to delete notice.");
                } finally {
                  setIsDeleteDialogOpen(false);
                  setNoticeToDelete(null);
                }
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Add New Notice</DialogTitle>
            <DialogDescription>
              Create a new notice or announcement
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter notice title"
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={formData.content || ""}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Enter notice content"
                rows={5}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <select
                  id="priority"
                  value={formData.priority || "medium"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as Notice["priority"],
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Notice
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Edit Notice</DialogTitle>
            <DialogDescription>Update the notice details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Enter notice title"
              />
            </div>
            <div>
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={formData.content || ""}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="Enter notice content"
                rows={5}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="edit-date">Date</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-priority">Priority</Label>
                <select
                  id="edit-priority"
                  value={formData.priority || "medium"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      priority: e.target.value as Notice["priority"],
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Update Notice
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle>Notice Details</DialogTitle>
          </DialogHeader>
          {selectedNotice && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 text-xl">
                  {selectedNotice.title}
                </h3>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(selectedNotice.date).toLocaleDateString()}
                  </div>
                  <Badge className={getPriorityColor(selectedNotice.priority)}>
                    {selectedNotice.priority}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Content</h4>
                <p className="text-gray-600 whitespace-pre-wrap">
                  {selectedNotice.content}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
