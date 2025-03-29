import Curesol from "@/components/Curesol/Curesol";
import HeroSection from "@/components/HeroSection/HeroSection";
import OurEvents from "@/components/OurEvents/OurEvents";
import GradientHeading from "@/components/ui/GradientHeading";
import WhyUs from "@/components/WhyUs/WhyUs";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4">
      <HeroSection />
      <div>
        <GradientHeading>Why Choose Us?</GradientHeading>
        <WhyUs />
      </div>

      <GradientHeading>Featured Menu</GradientHeading>
      <Curesol />
      <div className="mt-6 mb-10 md:mb-15 lg:mb-20 space-y-10">
        <GradientHeading>Our Events</GradientHeading>
        <OurEvents />
      </div>
    </main>
  );
}
