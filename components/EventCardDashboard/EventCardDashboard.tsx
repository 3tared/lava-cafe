// components/EventCardDashboard.tsx
"use client";

import { IEvent } from "@/types";
import { Calendar, Clock, MapPin, Edit, Trash2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EventCardDashboardProps {
  event: IEvent;
  onEdit: (event: IEvent) => void;
  onDelete: (eventId: string) => void;
}

export default function EventCardDashboard({
  event,
  onEdit,
  onDelete,
}: EventCardDashboardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "birthday":
        return "🎉";
      case "engagement":
        return "💍";
      case "wedding":
        return "💒";
      case "anniversary":
        return "💝";
      case "graduation":
        return "🎓";
      default:
        return "🎊";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "birthday":
        return "bg-pink-100 text-pink-800";
      case "engagement":
        return "bg-purple-100 text-purple-800";
      case "wedding":
        return "bg-rose-100 text-rose-800";
      case "anniversary":
        return "bg-red-100 text-red-800";
      case "graduation":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            {getTypeIcon(event.type)}
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(event.type)}`}
          >
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{formatDate(event.date)}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{event.time}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm">{event.location}</span>
          </div>

          {event.package && (
            <div className="flex items-center text-gray-600">
              <Package className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="text-sm">{event.package.name}</span>
            </div>
          )}
        </div>

        {/* Package Details */}
        {event.package && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">
                {event.package.emoji} {event.package.name}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 line-through">
                  {event.package.originalPrice}
                </span>
                <span className="font-bold text-green-600">
                  {event.package.price}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-600">{event.package.description}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            onClick={() => onEdit(event)}
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-blue-50 hover:border-blue-300"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
          <Button
            onClick={() => onDelete(event.id)}
            variant="outline"
            size="sm"
            className="flex-1 hover:bg-red-50 hover:border-red-300 text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
