"use client";

import { useState, useEffect, useRef } from "react";
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

  // preview cache for blob URLs: { performerId: blobUrl }
  const [previewMap, setPreviewMap] = useState<Record<string, string>>({});
  const previewMapRef = useRef(previewMap);
  previewMapRef.current = previewMap;

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

  // Clean up blob URLs when toppers change / component unmount
  useEffect(() => {
    return () => {
      // revoke all blob URLs on unmount
      Object.values(previewMapRef.current).forEach((url) => {
        try {
          if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
        } catch {}
      });
    };
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
    setPreviewMap({});
    setIsAddDialogOpen(true);
  };

  const handleEdit = (result: SEEResult) => {
    if (!result.id) {
      toast.error("Cannot edit: missing ID");
      return;
    }
    setSelectedResult(result);
    setFormData(result);
    // ensure previewMap is cleared — previews will be created for File objects only
    setPreviewMap({});
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

    // if setting photo and it's a File, create a preview and cache it
    if (field === "photo" && value instanceof File) {
      // revoke existing if any
      const id = updated[index].id;
      const existing = previewMapRef.current[id];
      if (existing && existing.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(existing);
        } catch {}
      }
      const url = URL.createObjectURL(value);
      setPreviewMap((p) => ({ ...p, [id]: url }));
    }
  };

  const removeTopPerformer = (index: number) => {
    const performer = formData.toppers?.[index];
    if (performer) {
      const url = previewMap[performer.id];
      if (url && url.startsWith("blob:")) {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      }
    }
    const updated = formData.toppers?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, toppers: updated });
    // remove from preview map
    setPreviewMap((p) => {
      const next = { ...p };
      if (performer) delete next[performer.id];
      return next;
    });
  };

  const handleImageUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Immediately set the selected file so the UI shows an instant preview.
    // We'll compress in background and replace the File afterwards.
    updateTopPerformer(index, "photo", file);

    // Compress on selection to keep upload size small (runs in background)
    const options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1600,
      useWebWorker: true,
      maxIteration: 10,
      fileType: file.type,
    };

    (async () => {
      try {
        const compressedFile = await imageCompression(file, options);
        // If compression returned a new File (or Blob) replace the performer photo so
        // upload will use the compressed file and updateTopPerformer will refresh preview.
        // If compression yields same object, this still works.
        updateTopPerformer(index, "photo", compressedFile as File);
        toast.success("Image compressed");
      } catch (err) {
        console.error("Image compression failed", err);
        // keep the original file (already set) and notify user
        toast.error("Image compression failed, original file will be used");
      }
    })();
  };

  // Helper to upload a single File to the configured upload endpoint.
  // Mirrors the approach used in admin blog/gallery pages to handle common backend shapes.
  const uploadImage = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("files", file);

    const prefixIfRelative = (u: string) => {
      if (!u) return u;
      if (u.startsWith("http://") || u.startsWith("https://")) return u;
      if (u.startsWith("/"))
        return (
          (typeof window !== "undefined" ? window.location.origin : "") + u
        );
      return u;
    };

    const findUrlRecursively = (obj: any, depth = 0): string | null => {
      if (!obj || depth > 6) return null;
      if (typeof obj === "string") {
        // treat anything that looks like a path or url as candidate
        if (
          obj.startsWith("http") ||
          obj.startsWith("/") ||
          obj.includes("uploads") ||
          obj.includes("cdn")
        )
          return obj;
        return null;
      }
      if (Array.isArray(obj)) {
        for (const v of obj) {
          const found = findUrlRecursively(v, depth + 1);
          if (found) return found;
        }
      } else if (typeof obj === "object") {
        // common keys
        const COMMON_KEYS = [
          "url",
          "secure_url",
          "location",
          "path",
          "file",
          "filename",
          "name",
          "src",
        ];
        for (const k of COMMON_KEYS) {
          if (obj[k] && typeof obj[k] === "string") return obj[k];
        }
        // fallback scan values
        for (const key of Object.keys(obj)) {
          const found = findUrlRecursively(obj[key], depth + 1);
          if (found) return found;
        }
      }
      return null;
    };

    try {
      const res = await axios.post(UPLOAD_URL, form, {
        // do NOT force multipart header manually if backend requires the boundary;
        // axios will set it automatically. Remove explicit header to be safe.
        // headers: { "Content-Type": "multipart/form-data" },
      });

      if (!res || typeof res.data === "undefined" || res.data === null) {
        throw new Error("Empty upload response");
      }

      // Quick passes for common shapes
      if (typeof res.data === "string") return prefixIfRelative(res.data);

      // array of objects [{ url: ... }]
      if (Array.isArray(res.data)) {
        const candidate = findUrlRecursively(res.data);
        if (candidate) return prefixIfRelative(candidate);
      }

      // object with url / data / files / etc.
      if (typeof res.data === "object") {
        // common direct cases
        if (res.data.url && typeof res.data.url === "string")
          return prefixIfRelative(res.data.url);
        if (res.data.secure_url && typeof res.data.secure_url === "string")
          return prefixIfRelative(res.data.secure_url);
        if (res.data.location && typeof res.data.location === "string")
          return prefixIfRelative(res.data.location);
        if (res.data.path && typeof res.data.path === "string")
          return prefixIfRelative(res.data.path);

        // nested container e.g. { data: { url: ... } } or { files: [...] }
        const candidate = findUrlRecursively(res.data);
        if (candidate) return prefixIfRelative(candidate);
      }

      console.error("Unexpected upload response:", res.data);
      throw new Error("Unexpected upload response");
    } catch (err) {
      console.error("Upload error:", err);
      throw err;
    }
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
              // Ensure we append a File (not a plain Blob)
              const uploadFile =
                performer.photo instanceof File
                  ? performer.photo
                  : new File([performer.photo], `photo-${Date.now()}.jpg`, {
                      type: (performer.photo as Blob).type || "image/jpeg",
                    });

              const url = await uploadImage(uploadFile);
              return { ...performer, photo: url };
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

      // cleanup previews
      Object.values(previewMap).forEach((url) => {
        try {
          if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
        } catch {}
      });
      setPreviewMap({});
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

  const getPreviewFor = (performer: TopPerformer) => {
    // prefer cached preview (for File objects)
    const cached = previewMap[performer.id];
    if (cached) return cached;
    // if performer.photo is File, create, cache and return
    if (performer.photo instanceof File) {
      const url = URL.createObjectURL(performer.photo);
      setPreviewMap((p) => ({ ...p, [performer.id]: url }));
      return url;
    }
    // if photo is remote url string, just return it
    return (performer.photo as string) || "/placeholder.svg";
  };

  // helper to close add/edit dialog and cleanup previews
  const closeAddEditDialog = () => {
    // revoke blob URLs
    Object.values(previewMapRef.current).forEach((url) => {
      try {
        if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
      } catch {}
    });
    setPreviewMap({});
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedResult(null);
    // optional: reset form if needed
    // setFormData({ results: {}, toppers: [] });
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
        onOpenChange={(open) => {
          // when user clicks the dialog close (X) or clicks outside, open will be false
          if (!open) closeAddEditDialog();
        }}
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
                            src={getPreviewFor(performer as TopPerformer)}
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
                onClick={closeAddEditDialog}
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
