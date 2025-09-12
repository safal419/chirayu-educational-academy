import React, { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export interface BlogPost {
  id?: number | string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  status: "published" | "draft" | "scheduled";
  publishDate: string;
  views?: number;
  image?: string | File | null;
  tags?: string[];
}

export interface BlogFormProps {
  initialValues?: Partial<BlogPost>;
  onSubmit: (payload: any) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

function formatDateForInput(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function BlogForm({
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: BlogFormProps) {
  const id = useId?.() ?? Math.random().toString(36).slice(2);
  const fileInputId = `blog-image-upload-${id}`;
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<BlogPost>({
    title: initialValues.title ?? "",
    excerpt: initialValues.excerpt ?? "",
    content: initialValues.content ?? "",
    author: initialValues.author ?? "",
    category: initialValues.category ?? "education",
    status: (initialValues.status as BlogPost["status"]) ?? "draft",
    // keep datetime-local shape in state, convert to ISO on submit
    publishDate: formatDateForInput(initialValues.publishDate),
    image:
      typeof initialValues.image === "string" ? initialValues.image : undefined,
    tags: initialValues.tags ?? [],
    views: initialValues.views ?? 0,
    id: initialValues.id,
  });

  const [imagePreview, setImagePreview] = useState<string>(
    typeof initialValues.image === "string"
      ? (initialValues.image as string)
      : ""
  );
  const [imageFile, setImageFile] = useState<File | null>(
    initialValues.image instanceof File ? (initialValues.image as File) : null
  );
  const [removeImage, setRemoveImage] = useState<boolean>(false);
  const [tagsInput, setTagsInput] = useState<string>(
    (initialValues.tags ?? []).join(", ")
  );

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImageFile(file);
      setRemoveImage(false);
      // keep formData.image (existing URL) — we won't overwrite until submit
    }
  };

  const handleClearImage = () => {
    // clear preview and mark for removal if there was an existing image URL
    setImagePreview("");
    setImageFile(null);
    setRemoveImage(Boolean(formData.image)); // if there was an existing URL, signal removal
    // don't mutate formData.image now — submit will decide
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setLoading(true); // start loading

    try {
      // Normalize tags
      const tags = (formData.tags ?? [])
        .concat((formData.tags ?? []).join(",").split(","))
        .map((t) => t.trim())
        .filter(Boolean);

      const payload: any = { ...formData, tags };

      if (payload.publishDate) {
        const dt = new Date(payload.publishDate);
        payload.publishDate = !isNaN(dt.getTime())
          ? dt.toISOString()
          : new Date().toISOString();
      } else {
        payload.publishDate = new Date().toISOString();
      }

      if (formData.image instanceof File) {
        payload.image = formData.image;
      } else if (!formData.image) {
        payload.image = null;
      }

      await onSubmit(payload); // wait for parent onSubmit
    } finally {
      setLoading(false); // stop loading after submission
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Featured Image
        </label>
        <div className="space-y-4">
          {imagePreview ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              {/* Next/Image can't handle blob: URLs, use <img> for blobs */}
              {imagePreview.startsWith("blob:") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              )}
              <button
                type="button"
                onClick={handleClearImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            // If no preview but existing remote image exists, show it
            !imagePreview &&
            formData.image &&
            typeof formData.image === "string" && (
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <Image
                  src={formData.image}
                  alt="Current"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={handleClearImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )
          )}
          <div>
            <input
              id={fileInputId}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor={fileInputId}
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Upload className="h-4 w-4 mr-2" />
              {imagePreview || formData.image ? "Change Image" : "Upload Image"}
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) =>
            setFormData((p) => ({ ...p, title: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          placeholder="Enter blog post title"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Author *
          </label>
          <input
            type="text"
            required
            value={formData.author}
            onChange={(e) =>
              setFormData((p) => ({ ...p, author: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="Author name"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Category *
          </label>
          <select
            required
            value={formData.category}
            onChange={(e) =>
              setFormData((p) => ({ ...p, category: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          >
            <option value="education">Education</option>
            <option value="student-life">Student Life</option>
            <option value="parenting">Parenting</option>
            <option value="announcements">Announcements</option>
            <option value="events">Events</option>
            <option value="achievements">Achievements</option>
            <option value="alumni-stories">Alumni Stories</option>
            <option value="technology">Technology</option>
            <option value="career-guidance">Career Guidance</option>
            <option value="health-wellness">Health & Wellness</option>
            <option value="extracurricular">Extracurricular</option>
            <option value="faculty-updates">Faculty Updates</option>
            <option value="community">Community</option>
            <option value="scholarships">Scholarships</option>
            <option value="news">News</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Status *
          </label>
          <select
            required
            value={formData.status}
            onChange={(e) =>
              setFormData((p) => ({ ...p, status: e.target.value as any }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Excerpt *
        </label>
        <textarea
          rows={3}
          required
          value={formData.excerpt}
          onChange={(e) =>
            setFormData((p) => ({ ...p, excerpt: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          placeholder="Brief description of the blog post..."
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Content *
        </label>
        <textarea
          rows={12}
          required
          value={formData.content}
          onChange={(e) =>
            setFormData((p) => ({ ...p, content: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          placeholder="Write your blog post content here..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            placeholder="technology, education, students"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Publish Date *
          </label>
          <input
            type="datetime-local"
            required
            value={formData.publishDate}
            onChange={(e) =>
              setFormData((p) => ({ ...p, publishDate: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="w-full md:w-auto shadow-sm bg-transparent"
          disabled={loading} // disable cancel while submitting if desired
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="w-full md:w-auto shadow-md hover:shadow-lg transition-shadow"
          disabled={loading} // disable save while submitting
        >
          {loading
            ? initialValues.id
              ? "Updating Blog..."
              : "Creating Blog..."
            : submitLabel}
        </Button>
      </div>
    </form>
  );
}
