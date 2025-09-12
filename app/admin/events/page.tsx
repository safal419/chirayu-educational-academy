"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Eye, Calendar, MapPin, Clock } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { apiConfig } from "@/lib/config";
import CreateEventModal from "./CreateEventModal";
import EditEventModal from "./EditEventModal";

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

interface Event {
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: string;
  attendees: number;
  image: string;
}

const inFlight = new Map<string, Promise<any>>();

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);
  const endpoint = apiConfig.endpoints.events;
  const uploadEndpoint = apiConfig.endpoints.upload;

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEvents = async () => {
    const key = endpoint;
    if (inFlight.has(key)) {
      try {
        const data = await inFlight.get(key);
        setEvents(Array.isArray(data) ? data : []);
        return;
      } catch {
        // fallthrough to fresh attempt
      }
    }

    const p = axios
      .get(endpoint)
      .then((res) => res.data)
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
        return data;
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        toast.error("Failed to load events");
        setEvents([]);
        throw err;
      })
      .finally(() => {
        inFlight.delete(key);
      });

    inFlight.set(key, p);
    await p;
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await axios.delete(`${endpoint}/${id}`);
      toast.success("Event deleted");
      // local remove for instant UI response
      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete event");
    }
  };

  const handleCreate = async (payload: any) => {
    try {
      let imageUrl = payload.image || "";
      if (payload.image instanceof File) {
        const formData = new FormData();
        formData.append("files", payload.image);
        const res = await axios.post(uploadEndpoint, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl =
          (Array.isArray(res.data) && res.data[0]?.url) ||
          res.data.url ||
          res.data.path ||
          "";
      }
      const eventData = { ...payload, image: imageUrl };
      eventData.attendees = Math.max(0, Number(eventData.attendees) || 0);

      const createRes = await axios.post(endpoint, eventData);
      setEvents((prev) => [createRes.data, ...prev]);
      toast.success("Event created");
    } catch (err) {
      console.error("Save event error:", err);
      toast.error("Error saving event");
      throw err;
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("files", file);

    const res = await axios.post(apiConfig.endpoints.upload, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return extractImageUrl(res.data);
  };

  // Update handler: if payload.image is File -> upload first, then patch
  const handleUpdate = async (payload: any) => {
    try {
      let imageUrl = payload.image || "";

      if (payload.image instanceof File) {
        imageUrl = await uploadFile(payload.image);
      } else if (payload.image === null) {
        imageUrl = ""; // removed
      }

      const eventData = {
        ...payload,
        image: imageUrl,
        attendees: Math.max(0, Number(payload.attendees) || 0),
      };
      const id = payload._id ?? payload.id;
      if (!id) throw new Error("Missing event id");

      await axios.patch(`${endpoint}/${id}`, eventData);
      await fetchEvents();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update event");
      throw err;
    }
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setShowCreateModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "ongoing":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-600">Manage school events and activities</p>
        </div>
        <Button
          onClick={() => {
            setEditingEvent(null);
            setShowCreateModal(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Event</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Events</p>
                <p className="text-2xl font-bold">{events.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold">
                  {events.filter((e) => e.status === "upcoming").length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Attendees</p>
                <p className="text-2xl font-bold">
                  {events.reduce((sum, e) => sum + (e.attendees || 0), 0)}
                </p>
              </div>
              <div className="p-2 bg-orange-100 rounded-full">
                <Eye className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event._id} className="overflow-hidden">
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              {event.image ? (
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Calendar className="h-16 w-16 text-white" />
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    event.status
                  )}`}
                >
                  {event.status.toUpperCase()}
                </span>
                <div className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Eye className="h-4 w-4 mr-2" />
                  {event.attendees || 0} attendees
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{event.description}</p>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingEvent(event)}
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(event)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 bg-transparent"
                  onClick={() => handleDelete(event._id!)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create / Edit Event Modal */}
      {showCreateModal && (
        <CreateEventModal
          event={editingEvent}
          onClose={() => {
            setShowCreateModal(false);
            setEditingEvent(null);
          }}
          onCreate={async (payload: any) => {
            await handleCreate(payload);
            await fetchEvents();
          }}
          onUpdate={async (payload: any) => {
            await handleUpdate(payload);
            await fetchEvents();
          }}
        />
      )}

      {viewingEvent && (
        <EventViewModal
          event={viewingEvent}
          onClose={() => setViewingEvent(null)}
        />
      )}
    </div>
  );
}

function EventViewModal({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}

        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-4">{event.description}</p>

        <div className="space-y-2 text-sm text-gray-700">
          <p>
            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {event.time}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Status:</strong> {event.status}
          </p>
          <p>
            <strong>Attendees:</strong> {event.attendees}
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
