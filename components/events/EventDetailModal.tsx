import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
  organizer?: string;
  contact?: string;
  details?: string;
  attendees?: Array<{
    name: string;
    role?: string;
    class?: string;
  }>;
}

interface EventDetailModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function EventDetailModal({
  event,
  isOpen,
  onClose,
}: EventDetailModalProps) {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {event.title}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {event.image && (
            <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="space-y-6">
            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3 text-blue-600" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3 text-blue-600" />
                <span>{event.time}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3 text-blue-600" />
                <span>{event.location}</span>
              </div>

              {event.organizer && (
                <div className="flex items-center text-gray-600">
                  <User className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{event.organizer}</span>
                </div>
              )}

              {event.contact && (
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-3 text-blue-600" />
                  <span>{event.contact}</span>
                </div>
              )}
            </div>

            {/* Category Badge */}
            <div>
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
                {event.category}
              </span>
            </div>

            {/* Description */}
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {event.description}
              </p>
            </div>

            {/* Additional Details */}
            {event.details && (
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-2">
                  Additional Details
                </h3>
                <p className="text-gray-600 whitespace-pre-line">
                  {event.details}
                </p>
              </div>
            )}

            {/* Attendees Section */}
            {event.attendees && event.attendees.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">Attendees</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.attendees.map((attendee, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {attendee.name}
                        </p>
                        {(attendee.role || attendee.class) && (
                          <p className="text-sm text-gray-500">
                            {[attendee.role, attendee.class]
                              .filter(Boolean)
                              .join(" • ")}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
