import HeroSection from "@/components/HeroSection/HeroSection";
import WhyUs from "@/components/WhyUs/WhyUs";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center min-h-screen px-4">
      <HeroSection />
      <div>
        <h1 className="text-center text-2xl font-bold text-lavasecondary-500 md:text-4xl lg:text-5xl">
          Why Choose Us?
        </h1>
        <WhyUs />
      </div>
    </main>
  );
}
