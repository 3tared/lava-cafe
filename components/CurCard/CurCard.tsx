"use client";
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import slider1 from "@/app/assets/slider (1).jpeg";
import birth2 from "@/app/assets/birth2.jpeg";
import birth from "@/app/assets/birth.jpg";
import engagment from "@/app/assets/engagment.jpeg";
import CardContent from "../CardContent/CardContent";
import engagment2 from "@/app/assets/engagment2.jpeg";
import all from "@/app/assets/alllava.png";
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
        href="birthday"
        buttonText="Birthday"
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
        image={engagment2.src}
        href="engagement"
        buttonText="Engagement"
      />
    ),
  },
  {
    category: "Wedding",
    title: "Your big day is coming!",
    src: engagment2.src,
    content: (
      <CardContent
        title="Your dream wedding, perfectly planned"
        description="From the first moment to the last dance, we’ll make your wedding unforgettable."
        image={slider1.src}
        href="wedding"
        buttonText="Wedding"
      />
    ),
  },
  {
    category: "Katb El Ketab",
    title: "A spiritual and joyful ceremony",
    src: engagment.src,
    content: (
      <CardContent
        title="Elegant and memorable Katb El Ketab"
        description="We help you prepare for a beautifully simple and heartwarming Katb El Ketab ceremony."
        image={engagment2.src}
        href="wedding"
        buttonText="Wedding"
      />
    ),
  },
  {
    category: "All Occasions",
    title: "Whatever the event, we’ve got you",
    src: all.src,
    content: (
      <CardContent
        title="Every occasion, any time"
        description="Birthday, engagement, wedding, or more — we cover all events with top quality."
        image={all.src}
        href="/"
        buttonText="All Events"
      />
    ),
  },
];

export function CurCard() {
  const cards = EventsCardata.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full">
      <Carousel items={cards} />
    </div>
  );
}
