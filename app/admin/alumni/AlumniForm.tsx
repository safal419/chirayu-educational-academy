"use client";

import React, { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export interface AlumniType {
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
  image?: string | File | null;
  linkedIn?: string;
  testimonial?: string;
}

export interface AlumniFormProps {
  initialValues?: Partial<AlumniType>;
  onSubmit: (payload: any) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

export default function AlumniForm({
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: AlumniFormProps) {
  const id = useId?.() ?? Math.random().toString(36).slice(2);
  const fileInputId = `alumni-image-upload-${id}`;

  const [formData, setFormData] = useState<AlumniType>({
    name: initialValues.name ?? "",
    graduationYear: initialValues.graduationYear ?? new Date().getFullYear(),
    currentPosition: initialValues.currentPosition ?? "",
    company: initialValues.company ?? "",
    location: initialValues.location ?? "",
    email: initialValues.email ?? "",
    phone: initialValues.phone ?? "",
    achievements: initialValues.achievements ?? "",
    image:
      typeof initialValues.image === "string" ? initialValues.image : undefined,
    linkedIn: initialValues.linkedIn ?? "",
    testimonial: initialValues.testimonial ?? "",
    _id: initialValues._id,
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

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:"))
        URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setImageFile(file);
      setRemoveImage(false);
    }
  };

  const handleClearImage = () => {
    setImagePreview("");
    setImageFile(null);
    setRemoveImage(Boolean(formData.image));
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const payload: any = { ...formData };
    if (imageFile) payload.image = imageFile;
    else if (removeImage) payload.image = null;
    else if (typeof formData.image === "string" && formData.image)
      payload.image = formData.image;
    else delete payload.image;

    // ensure numeric graduationYear
    payload.graduationYear =
      Number(payload.graduationYear) || new Date().getFullYear();

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Profile Image
        </label>
        <div className="space-y-3">
          {imagePreview ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              {imagePreview.startsWith("blob:") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePreview}
                  alt="preview"
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
          ) : formData.image ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={formData.image as string}
                alt="current"
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
          ) : null}

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
          Full Name *
        </label>
        <input
          required
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Graduation Year *
          </label>
          <input
            required
            type="number"
            value={formData.graduationYear}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                graduationYear: Number(e.target.value),
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Current Position *
          </label>
          <input
            required
            type="text"
            value={formData.currentPosition}
            onChange={(e) =>
              setFormData((p) => ({ ...p, currentPosition: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Company *
        </label>
        <input
          required
          type="text"
          value={formData.company}
          onChange={(e) =>
            setFormData((p) => ({ ...p, company: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location *
        </label>
        <input
          required
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData((p) => ({ ...p, location: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email *
          </label>
          <input
            required
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({ ...p, email: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone *
          </label>
          <input
            required
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((p) => ({ ...p, phone: e.target.value }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Achievements *
        </label>
        <textarea
          rows={3}
          required
          value={formData.achievements}
          onChange={(e) =>
            setFormData((p) => ({ ...p, achievements: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Testimonial (optional)
        </label>
        <textarea
          rows={3}
          value={formData.testimonial}
          onChange={(e) =>
            setFormData((p) => ({ ...p, testimonial: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          LinkedIn (optional)
        </label>
        <input
          type="url"
          value={formData.linkedIn}
          onChange={(e) =>
            setFormData((p) => ({ ...p, linkedIn: e.target.value }))
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
