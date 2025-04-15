"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Heart } from "lucide-react";
import clsx from "clsx";

// Define event type
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

// Type for countdown state
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState(false);

  // Color mapping
  const badgeColors: Record<EventType, string> = {
    birthday: "bg-gradient-to-r from-pink-500 to-rose-500",
    engagement: "bg-gradient-to-r from-purple-500 to-indigo-600",
    wedding: "bg-gradient-to-r from-amber-500 to-orange-500",
    default: "bg-gradient-to-r from-gray-500 to-slate-600",
  };

  const badgeColor = badgeColors[event.type] || badgeColors.default;

  useEffect(() => {
    const targetDate = new Date(event.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff <= 0) {
        setIsPast(true);
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [event.date]);

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const eventTime = new Date(event.date).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  if (isPast) return null;

  return (
    <div
      className={clsx(
        "group relative rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-zinc-900 transition-all duration-300",
        "hover:shadow-xl hover:translate-y-[-4px]",
        event.featured ? "ring-2 ring-amber-400 dark:ring-amber-500" : ""
      )}
    >
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

      {/* Event type badge */}
      <span
        className={clsx(
          "absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md capitalize z-20",
          badgeColor
        )}
      >
        {event.type}
      </span>

      {/* Featured badge */}
      {event.featured && (
        <span className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-md z-20">
          Featured
        </span>
      )}

      {/* Like button */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className={clsx(
          "absolute bottom-3 right-3 z-20 p-2 rounded-full transition-all duration-300",
          "bg-white/20 backdrop-blur-sm hover:bg-white/40",
          "opacity-0 group-hover:opacity-100"
        )}
      >
        <Heart
          className={clsx(
            "w-5 h-5 transition-colors",
            isLiked ? "fill-red-500 text-red-500" : "text-white"
          )}
        />
      </button>

      {/* Event image */}
      <div className="relative overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          width={500}
          height={300}
          className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Event details */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-white mb-3 line-clamp-2">
          {event.title}
        </h2>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
            <CalendarDays className="w-4 h-4 mr-2 text-zinc-500" />
            {formattedDate}
          </div>

          <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
            <Clock className="w-4 h-4 mr-2 text-zinc-500" />
            {event.time || eventTime}
          </div>

          {event.location && (
            <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
              <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
              {event.location}
            </div>
          )}
        </div>

        {/* Countdown timer */}
        <div className="mt-4 p-3 bg-zinc-50 dark:bg-zinc-800/70 rounded-xl">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase font-medium mb-1">
            Time Remaining
          </p>
          <div className="flex justify-between">
            <div className="text-center">
              <span className="block text-lg font-bold text-zinc-900 dark:text-white">
                {timeLeft.days}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Days
              </span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-zinc-900 dark:text-white">
                {timeLeft.hours}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Hours
              </span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-zinc-900 dark:text-white">
                {timeLeft.minutes}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Mins
              </span>
            </div>
            <div className="text-center">
              <span className="block text-lg font-bold text-zinc-900 dark:text-white">
                {timeLeft.seconds}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Secs
              </span>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 py-2 bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800">
          View Details
        </button>
      </div>
    </div>
  );
}
