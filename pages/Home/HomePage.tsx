import Curesol from "@/components/Curesol/Curesol";
import HeroSection from "@/components/HeroSection/HeroSection";
import AnnouncementBanner from "@/components/AnnouncementBanner/AnnouncementBanner";
import OurEvents from "@/components/OurEvents/OurEvents";
import GradientHeading from "@/components/ui/GradientHeading";
import WhyUs from "@/components/WhyUs/WhyUs";

const HomePage = () => {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4">
      <HeroSection />

      <AnnouncementBanner />
      <section className="w-full text-center py-10">
        <GradientHeading>Why Choose Us?</GradientHeading>
        <WhyUs />
      </section>

      <section className="w-full text-center py-10">
        <GradientHeading>Featured Menu</GradientHeading>
        <Curesol />
      </section>

      <section className="w-full text-center mt-6 mb-10 md:mb-15 lg:mb-20 space-y-10">
        <GradientHeading>Our Events</GradientHeading>
        <OurEvents />
      </section>
    </main>
  );
};

export default HomePage;
