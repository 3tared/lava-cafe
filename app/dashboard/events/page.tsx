// app/dashboard/events/page.tsx
"use client";

import { useState, useEffect } from "react";
import { IEvent, IPackage, CreateEventData, UpdateEventData } from "@/types";

import { Button } from "@/components/ui/button";
import { Plus, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import EventCardDashboard from "@/components/EventCardDashboard/EventCardDashboard";
import EventForm from "@/components/EventForm/EventForm";

export default function DashboardEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [packages, setPackages] = useState<IPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPackagesLoading, setIsPackagesLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchEvents();
    fetchPackages();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await fetch("/api/packages");
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      }
    } catch (error) {
      console.error("Error fetching packages:", error);
    } finally {
      setIsPackagesLoading(false);
    }
  };

  const handleCreateEvent = async (eventData: CreateEventData) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const newEvent = await response.json();
        setEvents([...events, newEvent]);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const handleUpdateEvent = async (eventData: UpdateEventData) => {
    try {
      const response = await fetch(`/api/events/${eventData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        const updatedEvent = await response.json();
        setEvents(
          events.map((event) =>
            event.id === updatedEvent.id ? updatedEvent : event
          )
        );
        setEditingEvent(null);
        setShowForm(false);
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  // Wrapper function to handle both create and update
  const handleSubmitEvent = async (data: CreateEventData | UpdateEventData) => {
    if ("id" in data) {
      // It's an update
      await handleUpdateEvent(data as UpdateEventData);
    } else {
      // It's a create
      await handleCreateEvent(data as CreateEventData);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const response = await fetch(`/api/events/${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setEvents(events.filter((event) => event.id !== eventId));
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const eventTypes = [...new Set(events.map((event) => event.type))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Events Dashboard
          </h1>
          <p className="text-gray-600">Manage your cafe events and bookings</p>
        </div>
        <Button
          onClick={() => {
            setEditingEvent(null);
            setShowForm(true);
          }}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Event
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📅</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No events found
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || filterType !== "all"
              ? "Try adjusting your search or filter criteria."
              : "Get started by creating your first event."}
          </p>
          {!searchTerm && filterType === "all" && (
            <Button
              onClick={() => {
                setEditingEvent(null);
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create First Event
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCardDashboard
              key={event.id}
              event={event}
              onEdit={(event) => {
                setEditingEvent(event);
                setShowForm(true);
              }}
              onDelete={() => handleDeleteEvent(event.id)}
            />
          ))}
        </div>
      )}

      {/* Event Form Modal */}
      {showForm && !isPackagesLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <EventForm
              event={editingEvent}
              packages={packages}
              onSubmit={handleSubmitEvent}
              onCancel={() => {
                setShowForm(false);
                setEditingEvent(null);
              }}
            />
          </div>
        </div>
      )}

      {/* Loading overlay for form */}
      {showForm && isPackagesLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading form...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
