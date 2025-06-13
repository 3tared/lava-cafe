"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  Heart,
  Share2,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import clsx from "clsx";
import Link from "next/link";

// Define event type
type EventType = "birthday" | "engagement" | "wedding" | string;

// Updated interface to match your database schema
interface Event {
  id: string;
  title: string;
  date: string;
  image: string | null;
  type: EventType;
  location: string;
  time: string;
  packageId: string | null;
  package?: {
    id: string;
    name: string;
    price?: number;
    color?: string;
  };
  createdAt: string;
  updatedAt: string;
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
  variant?: "default" | "compact" | "detailed";
  showActions?: boolean;
  onEdit?: (event: Event) => void;
  onDelete?: (eventId: string) => void;
  onLike?: (eventId: string, isLiked: boolean) => void;
  onShare?: (event: Event) => void;
  onView?: (eventId: string) => void;
  className?: string;
}

export default function EventCard({
  event,
  variant = "default",
  showActions = false,
  onEdit,
  onDelete,
  onLike,
  onShare,
  onView,
  className,
}: EventCardProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isPast, setIsPast] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Dynamic color mapping based on event type
  const getBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      birthday: "bg-gradient-to-r from-pink-500 to-rose-500",
      engagement: "bg-gradient-to-r from-purple-500 to-indigo-600",
      wedding: "bg-gradient-to-r from-amber-500 to-orange-500",
      conference: "bg-gradient-to-r from-blue-500 to-cyan-500",
      party: "bg-gradient-to-r from-green-500 to-emerald-500",
      corporate: "bg-gradient-to-r from-slate-500 to-gray-600",
      default: "bg-gradient-to-r from-gray-500 to-slate-600",
    };
    return colors[type.toLowerCase()] || colors.default;
  };

  // Handle image source with fallback
  const getImageSource = () => {
    if (imageError || !event.image) {
      return "/images/default-event.jpg";
    }
    return event.image;
  };

  // Handle like functionality
  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onLike?.(event.id, newLikedState);
  };

  // Handle share functionality
  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onShare) {
      onShare(event);
    } else {
      // Default share functionality
      if (navigator.share) {
        navigator.share({
          title: event.title,
          text: `Check out this event: ${event.title}`,
          url: window.location.href,
        });
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
      }
    }
  };

  // Handle view details
  const handleView = () => {
    if (onView) {
      onView(event.id);
    }
  };

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

  // Don't render past events unless it's a detailed variant
  if (isPast && variant !== "detailed") return null;

  // Variant-specific styling
  const getCardClasses = () => {
    const baseClasses =
      "group relative rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-zinc-900 transition-all duration-300";

    switch (variant) {
      case "compact":
        return clsx(baseClasses, "hover:shadow-md", className);
      case "detailed":
        return clsx(
          baseClasses,
          "hover:shadow-2xl hover:translate-y-[-8px]",
          className
        );
      default:
        return clsx(
          baseClasses,
          "hover:shadow-xl hover:translate-y-[-4px]",
          event.featured ? "ring-2 ring-amber-400 dark:ring-amber-500" : "",
          className
        );
    }
  };

  const getImageHeight = () => {
    switch (variant) {
      case "compact":
        return "h-40";
      case "detailed":
        return "h-80";
      default:
        return "h-60";
    }
  };

  return (
    <div
      className={getCardClasses()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

      {/* Event type badge */}
      <span
        className={clsx(
          "absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md capitalize z-20",
          getBadgeColor(event.type)
        )}
      >
        {event.type}
      </span>

      {/* Status badges */}
      <div className="absolute top-3 right-3 flex gap-2 z-20">
        {event.featured && (
          <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Featured
          </span>
        )}
        {isPast && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Past Event
          </span>
        )}
      </div>

      {/* Action buttons */}
      <div
        className={clsx(
          "absolute bottom-3 right-3 z-20 flex gap-2 transition-all duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      >
        <button
          onClick={handleLike}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all"
        >
          <Heart
            className={clsx(
              "w-5 h-5 transition-colors",
              isLiked ? "fill-red-500 text-red-500" : "text-white"
            )}
          />
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all"
        >
          <Share2 className="w-5 h-5 text-white" />
        </button>

        {showActions && (
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
              className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all"
            >
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <div className="w-1 h-1 bg-white rounded-full mt-1"></div>
              <div className="w-1 h-1 bg-white rounded-full mt-1"></div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 top-full mt-2 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 min-w-[120px]">
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(event);
                      setShowDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 flex items-center gap-2"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(event.id);
                      setShowDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left text-sm hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event image with fallback handling */}
      <div className="relative overflow-hidden">
        {!event.image && !imageError ? (
          <div
            className={clsx(
              "w-full bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-800 flex items-center justify-center",
              getImageHeight()
            )}
          >
            <div className="text-center">
              <CalendarDays className="w-12 h-12 text-zinc-400 dark:text-zinc-500 mx-auto mb-2" />
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                No Image
              </p>
            </div>
          </div>
        ) : (
          <Image
            src={getImageSource()}
            alt={event.title}
            width={500}
            height={300}
            className={clsx(
              "w-full object-cover transition-transform duration-500 group-hover:scale-105",
              getImageHeight()
            )}
            onError={() => setImageError(true)}
            priority={event.featured}
          />
        )}
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

          <div className="flex items-center text-sm text-zinc-600 dark:text-zinc-300">
            <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
            {event.location}
          </div>
        </div>

        {/* Package info if available */}
        {event.package && (
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex justify-between items-center">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                {event.package.name}
              </p>
              {event.package.price && (
                <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                  ${event.package.price}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Countdown timer - only show for upcoming events */}
        {!isPast && variant !== "compact" && (
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
        )}

        {/* Action button */}
        <Link href={`/events/${event.id}`}>
          <button
            onClick={handleView}
            className="w-full mt-4 py-2 bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
