// components/EventForm.tsx
"use client";

import { useState, useEffect } from "react";
import { IEvent, IPackage, CreateEventData, UpdateEventData } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Type,
  Image as ImageIcon,
} from "lucide-react";

// Option 1: Using overloaded function signatures (more type-safe)
interface EventFormProps {
  event?: IEvent | null;
  packages: IPackage[];
  onSubmit: {
    (data: CreateEventData): Promise<void>;
    (data: UpdateEventData): Promise<void>;
  };
  onCancel: () => void;
}

// Option 2: Alternative approach - single function with proper typing
// interface EventFormProps {
//   event?: IEvent | null;
//   packages: IPackage[];
//   onSubmit: (data: CreateEventData | UpdateEventData) => Promise<void>;
//   onCancel: () => void;
// }

export default function EventForm({
  event,
  packages,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    type: "",
    location: "",
    image: "",
    packageId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (event) {
      const eventDate = new Date(event.date);
      setFormData({
        title: event.title,
        date: eventDate.toISOString().split("T")[0],
        time: event.time,
        type: event.type,
        location: event.location,
        image: event.image || "",
        packageId: event.packageId || "",
      });
    }
  }, [event]);

  const eventTypes = [
    { value: "birthday", label: "🎉 Birthday", icon: "🎉" },
    { value: "engagement", label: "💍 Engagement", icon: "💍" },
    { value: "wedding", label: "💒 Wedding", icon: "💒" },
    { value: "anniversary", label: "💝 Anniversary", icon: "💝" },
    { value: "graduation", label: "🎓 Graduation", icon: "🎓" },
    { value: "corporate", label: "🏢 Corporate", icon: "🏢" },
    { value: "other", label: "🎊 Other", icon: "🎊" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Event title is required";
    }

    if (!formData.date) {
      newErrors.date = "Event date is required";
    }

    if (!formData.time.trim()) {
      newErrors.time = "Event time is required";
    }

    if (!formData.type) {
      newErrors.type = "Event type is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Event location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      date: new Date(formData.date + "T" + formData.time).toISOString(),
      packageId: formData.packageId || undefined,
      image: formData.image || undefined,
    };

    if (event) {
      // Type assertion to help TypeScript understand the structure
      onSubmit({ ...submitData, id: event.id } as UpdateEventData);
    } else {
      // Type assertion to help TypeScript understand the structure
      onSubmit(submitData as CreateEventData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-2xl font-bold text-gray-900">
          {event ? "Edit Event" : "Create New Event"}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Event Title */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <Type className="w-4 h-4 mr-2" />
          Event Title *
        </label>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="e.g., Mohamed's Birthday Party 🎉"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-red-500 text-xs">{errors.title}</p>}
      </div>

      {/* Date and Time */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 mr-2" />
            Date *
          </label>
          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            className={errors.date ? "border-red-500" : ""}
          />
          {errors.date && <p className="text-red-500 text-xs">{errors.date}</p>}
        </div>

        <div className="space-y-2">
          <label className="flex items-center text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 mr-2" />
            Time *
          </label>
          <Input
            type="time"
            value={formData.time}
            onChange={(e) => handleInputChange("time", e.target.value)}
            className={errors.time ? "border-red-500" : ""}
          />
          {errors.time && <p className="text-red-500 text-xs">{errors.time}</p>}
        </div>
      </div>

      {/* Event Type */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Event Type *
        </label>
        <select
          value={formData.type}
          onChange={(e) => handleInputChange("type", e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.type ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select event type</option>
          {eventTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <MapPin className="w-4 h-4 mr-2" />
          Location *
        </label>
        <Input
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          placeholder="e.g., Lava Cafe, Cairo"
          className={errors.location ? "border-red-500" : ""}
        />
        {errors.location && (
          <p className="text-red-500 text-xs">{errors.location}</p>
        )}
      </div>

      {/* Package Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Package (Optional)
        </label>
        <select
          value={formData.packageId}
          onChange={(e) => handleInputChange("packageId", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">No package selected</option>
          {packages.map((pkg) => (
            <option key={pkg.id} value={pkg.id}>
              {pkg.emoji} {pkg.name} - {pkg.price} {pkg.per}
            </option>
          ))}
        </select>
      </div>

      {/* Image URL */}
      <div className="space-y-2">
        <label className="flex items-center text-sm font-medium text-gray-700">
          <ImageIcon className="w-4 h-4 mr-2" />
          Image URL (Optional)
        </label>
        <Input
          type="url"
          value={formData.image}
          onChange={(e) => handleInputChange("image", e.target.value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      {/* Form Actions */}
      <div className="flex space-x-3 pt-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
          {event ? "Update Event" : "Create Event"}
        </Button>
      </div>
    </form>
  );
}
