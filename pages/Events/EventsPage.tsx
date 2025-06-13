import CafePackages from "@/components/CafePackages/CafePackages";
import { CurCard } from "@/components/CurCard/CurCard";
import EventsList from "@/components/EventsList/EventsList";
import { ImageSlider } from "@/components/ImageSlider/ImageSlider";
import GradientHeading from "@/components/ui/GradientHeading";
import { imagesSlider } from "@/constants";
import { getPackages } from "@/lib/packages";
import React from "react";

const EventsPage = async () => {
  const packages = await getPackages();
  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4">
      <section>
        <ImageSlider
          images={imagesSlider}
          text={` Celebrate Life’s Special Moments: Birthdays, Engagements, and Weddings with Us!`}
        />
      </section>
      <section className="w-full text-center my-6 sm:my-10 md:my-15 lg:my-20 space-y-10 ">
        <GradientHeading>More About Our Events</GradientHeading>
        <CurCard />
      </section>
      <section className="w-full text-center my-5 sm:my-5 md:my-7 lg:mb-10  space-y-10">
        <GradientHeading>Choose Your Perfect Package</GradientHeading>
        <CafePackages packages={packages} />
      </section>
      <section className="w-full text-center my-5 sm:my-5 md:my-7 lg:mb-10  space-y-10">
        <EventsList />
      </section>
    </main>
  );
};

export default EventsPage;
