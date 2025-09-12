"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression"; // <--- added
import { Plus, Edit, Trash2, Eye, X, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { toast } from "react-hot-toast";
import { apiConfig } from "@/lib/config";

const API_URL = apiConfig.endpoints.results;
const UPLOAD_URL = apiConfig.endpoints.upload;

interface TopPerformer {
  id: string;
  name: string;
  grade: string;
  gpa: string;
  school: string;
  photo: string | File;
}

interface SEEResult {
  id?: string;
  batch: string;
  year: string;
  totalStudents: number;
  successRate: number;
  results: Record<string, number>;
  toppers: TopPerformer[];
}

export default function SEEResultsAdmin() {
  const [results, setResults] = useState<SEEResult[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState<SEEResult | null>(null);
  const [formData, setFormData] = useState<Partial<SEEResult>>({
    results: {},
    toppers: [],
  });
  const [isUploading, setIsUploading] = useState(false);

  // Fetch all results
  const fetchResults = async () => {
    try {
      const res = await axios.get(API_URL);
      const normalized: SEEResult[] = (res.data || []).map((item: any) => ({
        ...item,
        id: item.id || item._id || item.ID,
      }));
      setResults(normalized);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch results");
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleAdd = () => {
    setSelectedResult(null); // <-- reset so new entry is created
    setFormData({
      batch: "",
      year: "",
      totalStudents: 0,
      successRate: 0,
      results: {},
      toppers: [],
    });
    setIsAddDialogOpen(true);
  };

  const handleEdit = (result: SEEResult) => {
    if (!result.id) {
      toast.error("Cannot edit: missing ID");
      return;
    }
    setSelectedResult(result);
    setFormData(result);
    setIsEditDialogOpen(true);
  };

  const handleView = (result: SEEResult) => {
    setSelectedResult(result);
    setIsViewDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this result?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      toast.success("Result deleted successfully");
      fetchResults();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete result");
    }
  };

  // Top Performers Functions
  const addTopPerformer = () => {
    const newPerformer: TopPerformer = {
      id: Date.now().toString(),
      name: "",
      grade: "",
      gpa: "",
      school: "Chirayu Academy",
      photo: "/placeholder.svg?height=100&width=100",
    };
    setFormData({
      ...formData,
      toppers: [...(formData.toppers || []), newPerformer],
    });
  };

  const updateTopPerformer = (
    index: number,
    field: keyof TopPerformer,
    value: string | File
  ) => {
    const updated = [...(formData.toppers || [])];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, toppers: updated });
  };

  const removeTopPerformer = (index: number) => {
    const updated = formData.toppers?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, toppers: updated });
  };

  const handleImageUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Compress on selection to keep preview small and reduce upload size
    const options = {
      maxSizeMB: 0.8, // target max size in MB
      maxWidthOrHeight: 1600, // max dimension
      useWebWorker: true,
      maxIteration: 10,
      fileType: file.type,
    };

    (async () => {
      try {
        const compressedFile = await imageCompression(file, options);
        // compressedFile is a File (or Blob); store it so handleSave can upload
        updateTopPerformer(index, "photo", compressedFile as File);
        toast.success("Image compressed");
      } catch (err) {
        console.error("Image compression failed", err);
        // Fallback to original file if compression fails
        updateTopPerformer(index, "photo", file);
        toast.error("Image compression failed, original file will be used");
      }
    })();
  };

  // Save Result
  const handleSave = async () => {
    try {
      setIsUploading(true);

      const toppersWithPhotos = await Promise.all(
        (formData.toppers || []).map(async (performer) => {
          if (
            performer.photo instanceof File ||
            performer.photo instanceof Blob
          ) {
            try {
              const form = new FormData();

              // Ensure we append a File (not a plain Blob)
              const uploadFile =
                performer.photo instanceof File
                  ? performer.photo
                  : new File([performer.photo], `photo-${Date.now()}.jpg`, {
                      type: (performer.photo as Blob).type || "image/jpeg",
                    });

              form.append("files", uploadFile); // ✅ correct field name

              const res = await axios.post(UPLOAD_URL, form, {
                headers: { "Content-Type": "multipart/form-data" },
              });

              if (res.data && res.data.url) {
                return { ...performer, photo: res.data.url }; // ✅ match backend
              } else {
                console.error("Upload response format unexpected:", res.data);
                toast.error("Failed to upload image for " + performer.name);
                return { ...performer, photo: "/placeholder.svg" };
              }
            } catch (uploadError) {
              console.error(
                "Upload error for performer:",
                performer.name,
                uploadError
              );
              toast.error("Failed to upload image for " + performer.name);
              return { ...performer, photo: "/placeholder.svg" };
            }
          }
          return performer;
        })
      );

      const payload = {
        batch: formData.batch,
        year: formData.year,
        totalStudents: formData.totalStudents,
        successRate: formData.successRate,
        results: formData.results,
        toppers: toppersWithPhotos,
      };

      if (selectedResult && isEditDialogOpen) {
        await axios.patch(`${API_URL}/${selectedResult.id}`, payload);
        toast.success("Result updated successfully");
      } else {
        await axios.post(API_URL, payload);
        toast.success("Result added successfully");
      }

      setFormData({ results: {}, toppers: [] });
      setSelectedResult(null);
      setIsAddDialogOpen(false);
      setIsEditDialogOpen(false);
      fetchResults();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save result");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            SEE Results Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage SEE examination results and top performers
          </p>
        </div>
        <Button
          onClick={handleAdd}
          className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" /> Add New Result
        </Button>
      </div>

      {/* Results Table */}
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
        <CardHeader>
          <CardTitle>SEE Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Total Students</TableHead>
                  <TableHead>Pass %</TableHead>
                  <TableHead>Top Performers</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell>{result.batch}</TableCell>
                    <TableCell>{result.year}</TableCell>
                    <TableCell>{result.totalStudents}</TableCell>
                    <TableCell>{result.successRate}%</TableCell>
                    <TableCell>{result.toppers.length} students</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleView(result)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(result)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(result.id!)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog
        open={isAddDialogOpen || isEditDialogOpen}
        onOpenChange={() => {}}
      >
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>
              {selectedResult ? "Edit SEE Result" : "Add New SEE Result"}
            </DialogTitle>

            <DialogDescription>
              {selectedResult ? "Update the details" : "Enter the details"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Batch</Label>
                <Input
                  value={formData.batch || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, batch: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Year</Label>
                <Input
                  value={formData.year || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Total Students</Label>
                <Input
                  type="number"
                  value={formData.totalStudents || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      totalStudents: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Pass Percentage</Label>
                <Input
                  type="number"
                  value={formData.successRate || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      successRate: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            {/* Top Performers */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label>Top Performers</Label>
                <Button onClick={addTopPerformer} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Add Performer
                </Button>
              </div>
              <div className="space-y-4">
                {formData.toppers?.map((performer, index) => (
                  <Card key={performer.id} className="p-4 shadow-sm">
                    <div className="flex items-start space-x-4">
                      {/* Image preview */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden mb-2">
                          <img
                            src={
                              performer.photo instanceof File
                                ? URL.createObjectURL(performer.photo)
                                : performer.photo || "/placeholder.svg"
                            }
                            alt={performer.name || "Performer"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "/placeholder.svg";
                            }}
                          />
                        </div>

                        {/* Upload button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            document
                              .getElementById(`file-${performer.id}`)
                              ?.click()
                          }
                        >
                          Upload Image
                        </Button>
                        <input
                          type="file"
                          accept="image/*"
                          id={`file-${performer.id}`}
                          className="hidden"
                          onChange={(e) => handleImageUpload(index, e)}
                        />
                      </div>

                      {/* Performer details */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input
                          value={performer.name}
                          onChange={(e) =>
                            updateTopPerformer(index, "name", e.target.value)
                          }
                          placeholder="Name"
                        />
                        <Input
                          value={performer.grade}
                          onChange={(e) =>
                            updateTopPerformer(index, "grade", e.target.value)
                          }
                          placeholder="Grade"
                        />
                        <Input
                          value={performer.gpa}
                          onChange={(e) =>
                            updateTopPerformer(index, "gpa", e.target.value)
                          }
                          placeholder="GPA"
                        />
                        <Input
                          value={performer.school}
                          onChange={(e) =>
                            updateTopPerformer(index, "school", e.target.value)
                          }
                          placeholder="School"
                        />
                      </div>

                      {/* Remove performer */}
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeTopPerformer(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddDialogOpen(false);
                  setIsEditDialogOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isUploading}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {isUploading
                  ? "Saving..."
                  : selectedResult
                  ? "Update Result"
                  : "Save Result"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle>
              SEE Result Details - {selectedResult?.year}
            </DialogTitle>
          </DialogHeader>
          {selectedResult && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900">
                    Total Students
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedResult.totalStudents}
                  </p>
                </Card>
                <Card className="p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900">
                    Pass Percentage
                  </h3>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedResult.successRate}%
                  </p>
                </Card>
                <Card className="p-4 shadow-sm">
                  <h3 className="font-semibold text-gray-900">
                    Top Performers
                  </h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {selectedResult.toppers.length}
                  </p>
                </Card>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <pre className="text-gray-600">
                  {JSON.stringify(selectedResult.results, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Top Performers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedResult.toppers.map((performer) => (
                    <Card key={performer.id} className="p-4 shadow-sm">
                      <div className="flex items-center space-x-4">
                        <img
                          src={performer.photo || "/placeholder.svg"}
                          alt={performer.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {performer.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Grade: {performer.grade}
                          </p>
                          <p className="text-sm text-gray-600">
                            GPA: {performer.gpa}
                          </p>
                          <p className="text-sm text-gray-600">
                            {performer.school}
                          </p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
