"use client";

import React, { useEffect, useId, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export interface EventType {
  _id?: string;
  title: string;
  description: string;
  date: string; // yyyy-mm-dd
  time: string; // hh:mm
  location: string;
  status: string;
  attendees: number;
  image?: string | File | null;
}

export interface EventFormProps {
  initialValues?: Partial<EventType>;
  onSubmit: (payload: any) => Promise<any>; // async-aware now
  onCancel?: () => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

function formatDateForInput(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function EventForm({
  initialValues = {},
  onSubmit,
  onCancel,
  submitLabel = "Save",
  isSubmitting = false,
}: EventFormProps) {
  const id = React.useId();
  const fileInputId = `event-image-upload-${id}`;

  const [formData, setFormData] = useState<EventType>({
    title: initialValues.title ?? "",
    description: initialValues.description ?? "",
    date: formatDateForInput(initialValues.date),
    time: initialValues.time ?? "",
    location: initialValues.location ?? "",
    status: initialValues.status ?? "upcoming",
    attendees: initialValues.attendees ?? 0,
    image:
      typeof initialValues.image === "string" ? initialValues.image : undefined,
    _id: initialValues._id,
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

  // Keep formData & previews in sync when initialValues changes (important for editing)
  useEffect(() => {
    setFormData({
      title: initialValues.title ?? "",
      description: initialValues.description ?? "",
      date: formatDateForInput(initialValues.date),
      time: initialValues.time ?? "",
      location: initialValues.location ?? "",
      status: initialValues.status ?? "upcoming",
      attendees: initialValues.attendees ?? 0,
      image:
        typeof initialValues.image === "string"
          ? initialValues.image
          : undefined,
      _id: initialValues._id,
    });
    setImagePreview(
      typeof initialValues.image === "string" ? initialValues.image : ""
    );
    setImageFile(
      initialValues.image instanceof File ? initialValues.image : null
    );
    setRemoveImage(false);
  }, [initialValues]);

  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setRemoveImage(false);
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImagePreview("");
    setRemoveImage(Boolean(formData.image));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const payload: any = {
      ...formData,
    };

    // If new file chosen, include File. If removed, set image:null. Else keep existing URL.
    if (imageFile) {
      payload.image = imageFile;
    } else if (removeImage) {
      payload.image = null;
    } else if (typeof formData.image === "string" && formData.image) {
      payload.image = formData.image;
    } else {
      delete payload.image;
    }

    payload.attendees = Math.max(0, Number(payload.attendees) || 0);

    // Await parent handler and bubble up any errors for the caller to handle.
    await onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor={fileInputId}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Event Image
        </label>
        <div className="space-y-3">
          {imagePreview ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {imagePreview.startsWith("blob:") ? (
                <img
                  src={imagePreview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={imagePreview}
                  alt="preview"
                  fill
                  className="object-cover"
                  onError={(e: any) => {
                    (e.target as HTMLImageElement).src = "/placeholder.png";
                  }}
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
          ) : formData.image && typeof formData.image === "string" ? (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image
                src={formData.image}
                alt="current"
                fill
                className="object-cover"
                onError={(e: any) => {
                  (e.target as HTMLImageElement).src = "/placeholder.png";
                }}
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
              onChange={handleFileChange}
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
        <label
          htmlFor={`title-${id}`}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Event Title
        </label>
        <input
          id={`title-${id}`}
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        <label
          htmlFor={`desc-${id}`}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id={`desc-${id}`}
          rows={4}
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`date-${id}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Date
          </label>
          <input
            id={`date-${id}`}
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            htmlFor={`time-${id}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Time
          </label>
          <input
            id={`time-${id}`}
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor={`location-${id}`}
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Location
        </label>
        <input
          id={`location-${id}`}
          type="text"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`att-${id}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Attendees
          </label>
          <input
            id={`att-${id}`}
            type="number"
            min={0}
            value={formData.attendees}
            onChange={(e) =>
              setFormData({ ...formData, attendees: Number(e.target.value) })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label
            htmlFor={`status-${id}`}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>
          <select
            id={`status-${id}`}
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
