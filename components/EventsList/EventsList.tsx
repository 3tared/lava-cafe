"use client";

import { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import { CalendarClock, Filter, ArrowRight, ChevronDown } from "lucide-react";
import EventCard from "../EventCard/EventCard";
import clsx from "clsx";

// Reuse the Event type
type EventType = "birthday" | "engagement" | "wedding" | string;

interface Event {
  title: string;
  date: string;
  image: string;
  type: EventType;
  location?: string;
  time?: string;
  featured?: boolean;
}

interface EventsListProps {
  events: Event[];
  title?: string;
  subtitle?: string;
}

export default function EventsList({
  events,
  title = "Upcoming Events",
  subtitle,
}: EventsListProps) {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);

  // Get unique event types for filter
  const eventTypes = [
    "all",
    ...Array.from(new Set(events.map((event) => event.type))),
  ];

  useEffect(() => {
    const now = new Date().getTime();

    // Sort by date (closest first)
    const sorted = [...events].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const filtered = sorted.filter(
      (event) => new Date(event.date).getTime() > now
    );

    setUpcomingEvents(filtered);
    setFilteredEvents(filtered);
  }, [events]);

  // Filter events by type
  const filterEvents = (type: string) => {
    setSelectedFilter(type);
    if (type === "all") {
      setFilteredEvents(upcomingEvents);
    } else {
      setFilteredEvents(upcomingEvents.filter((event) => event.type === type));
    }
    setIsFilterOpen(false);
  };

  // Load more events
  const loadMore = () => {
    setDisplayCount((prev) => prev + 3);
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            <div className="flex items-center text-lavasecondary-600 dark:text-blue-400 mb-2">
              <CalendarClock className="w-5 h-5 mr-2" />
              <span className="font-medium text-sm">{currentDate}</span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold text-transparent 
        bg-clip-text bg-gradient-to-r 
        from-lavasecondary-500 to-lavaprimary-500  dark:text-white mb-3"
            >
              {title}
            </h1>

            {subtitle && (
              <p className="text-zinc-600 dark:text-zinc-300 max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Filter dropdown for mobile */}
          <div className="relative mt-6 md:mt-0 md:hidden">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-between w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <Filter className="w-4 h-4 mr-2 text-zinc-500" />
                <span className="capitalize">
                  {selectedFilter === "all" ? "All Events" : selectedFilter}
                </span>
              </div>
              <ChevronDown
                className={clsx(
                  "w-4 h-4 text-zinc-500 transition-transform",
                  isFilterOpen ? "rotate-180" : ""
                )}
              />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-10">
                {eventTypes.map((type) => (
                  <button
                    key={type}
                    className={clsx(
                      "w-full text-left px-4 py-2 capitalize hover:bg-zinc-100 dark:hover:bg-zinc-700",
                      selectedFilter === type
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                        : "text-zinc-800 dark:text-zinc-200"
                    )}
                    onClick={() => filterEvents(type)}
                  >
                    {type === "all" ? "All Events" : type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tab filters for desktop */}
        <div className="hidden md:block mb-8">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/50 p-1">
              {eventTypes.map((type) => (
                <Tab
                  key={type}
                  onClick={() => filterEvents(type)}
                  className={({ selected }) =>
                    clsx(
                      "w-full py-2.5 text-sm font-medium capitalize leading-5 rounded-lg",
                      "focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white/60 ring-opacity-60",
                      selected
                        ? "bg-white dark:bg-zinc-800 shadow text-blue-600 dark:text-blue-400"
                        : "text-zinc-600 dark:text-zinc-300 hover:bg-white/[0.12] dark:hover:bg-zinc-700"
                    )
                  }
                >
                  {type === "all" ? "All Events" : type}
                </Tab>
              ))}
            </Tab.List>
          </Tab.Group>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-zinc-900/50 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800">
            <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
              <CalendarClock className="w-8 h-8 text-zinc-500 dark:text-zinc-400" />
            </div>
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-white mb-2">
              No upcoming events
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
              There are no upcoming events at the moment. Please check back
              later.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredEvents.slice(0, displayCount).map((event, index) => (
                <EventCard
                  key={`${event.title}-${index}`}
                  event={{
                    ...event,
                    featured: index === 0,
                  }}
                />
              ))}
            </div>

            {displayCount < filteredEvents.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMore}
                  className="group flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition shadow-md hover:shadow-lg"
                >
                  Load More
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
