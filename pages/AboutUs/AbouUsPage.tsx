import CafeIntro from "@/components/CafeIntro/CafeIntro";
import TeamSection from "@/components/TeamLava/TeamLava";
import GradientHeading from "@/components/ui/GradientHeading";
import { teamData } from "@/constants";
import React from "react";

const AbouUsPage = () => {
  return (
    <main className="container mx-auto flex flex-col items-center justify-center mt-7 md:mt-12 lg:mt-15 xl:mt-16 min-h-screen px-4">
      <section className="w-full text-center py-10 ">
        <GradientHeading>About Lava Cafe</GradientHeading>
        <CafeIntro />
      </section>
      <section className="w-full text-center mt-6 mb-10 md:mb-15 lg:mb-20 space-y-10">
        <TeamSection teamData={teamData} />
      </section>
    </main>
  );
};

export default AbouUsPage;
