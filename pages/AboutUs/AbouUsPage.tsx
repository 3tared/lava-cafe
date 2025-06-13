import CafeIntro from "@/components/CafeIntro/CafeIntro";
import TeamSection from "@/components/TeamLava/TeamLava";
import GradientHeading from "@/components/ui/GradientHeading";

import { prisma } from "@/lib/prisma";
import React from "react";

const AbouUsPage = async () => {
  // Fetch departments with their employees
  const departments = await prisma.department.findMany({
    include: {
      employees: {
        where: {
          status: "Active", // Only include active employees
        },
        orderBy: {
          startDate: "asc", // Sort by seniority (optional)
        },
      },
    },
    orderBy: {
      title: "asc", // Order departments alphabetically
    },
  });
  return (
    <main className="container mx-auto flex flex-col items-center justify-center mt-7 md:mt-12 lg:mt-15 xl:mt-16 min-h-screen px-4">
      <section className="w-full text-center py-10 ">
        <GradientHeading>About Lava Cafe</GradientHeading>
        <CafeIntro />
      </section>
      <section className="w-full text-center mt-6 mb-10 md:mb-15 lg:mb-20 space-y-10">
        <TeamSection departments={departments} />
      </section>
    </main>
  );
};

export default AbouUsPage;
