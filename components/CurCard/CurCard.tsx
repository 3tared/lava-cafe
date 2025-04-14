"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import slider1 from "@/app/assets/slider (1).jpeg";
import birth2 from "@/app/assets/birth2.jpeg";
import birth from "@/app/assets/birth.jpg";
import engagment from "@/app/assets/engagment.jpeg";
import CardContent from "../CardContent/CardContent";

export const EventsCardata = [
  {
    category: "Birthday",
    title: "Celebrate an unforgettable birthday!",
    src: birth.src,
    content: (
      <CardContent
        title="A special day for special people"
        description="Plan a unique birthday party filled with joy, gifts, and lasting memories."
        image={birth2.src}
      />
    ),
  },
  {
    category: "Engagement",
    title: "The beginning of a beautiful journey",
    src: engagment.src,
    content: (
      <CardContent
        title="Celebrate your engagement differently"
        description="Make your engagement day full of love, laughter, and stunning decorations."
        image={slider1.src}
      />
    ),
  },
  {
    category: "Wedding",
    title: "Your big day is coming!",
    src: slider1.src,
    content: (
      <CardContent
        title="Your dream wedding, perfectly planned"
        description="From the first moment to the last dance, we’ll make your wedding unforgettable."
        image={slider1.src}
      />
    ),
  },
  {
    category: "Katb El Ketab",
    title: "A spiritual and joyful ceremony",
    src: slider1.src,
    content: (
      <CardContent
        title="Elegant and memorable Katb El Ketab"
        description="We help you prepare for a beautifully simple and heartwarming Katb El Ketab ceremony."
        image={slider1.src}
      />
    ),
  },
  {
    category: "All Occasions",
    title: "Whatever the event, we’ve got you",
    src: slider1.src,
    content: (
      <CardContent
        title="Every occasion, any time"
        description="Birthday, engagement, wedding, or more — we cover all events with top quality."
        image={slider1.src}
      />
    ),
  },
];

export function CurCard() {
  const cards = EventsCardata.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full pb-20">
      <Carousel items={cards} />
    </div>
  );
}
