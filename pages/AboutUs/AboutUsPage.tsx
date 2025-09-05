"use client";

import { useState, useEffect } from "react";
import CafeIntro from "@/components/CafeIntro/CafeIntro";
import TeamSection from "@/components/TeamLava/TeamLava";
import GradientHeading from "@/components/ui/GradientHeading";
import React from "react";

interface Employee {
  id: string;
  name: string;
  position: string;
  bio: string | null;
  imageUrl: string | null;
  funFact: string | null;
  departmentId: string | null;
  status: string;
  startDate: string;
}

interface Department {
  id: string;
  title: string;
  description: string | null;
  employees: Employee[];
}

const AboutUsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const fetchDepartments = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/departments?t=${timestamp}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch departments");
      }

      const data = await response.json();
      setDepartments(data);

      console.log(
        `Fetched ${data.length} departments at:`,
        new Date().toISOString()
      );
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to load team data. Please try refreshing the page.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchDepartments();
  }, []);

  // Optional: Add a refresh function that can be called after CRUD operations
  useEffect(() => {
    const handleFocus = () => {
      // Refetch when user returns to the tab
      fetchDepartments();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  if (isLoading) {
    return (
      <main className="container mx-auto flex flex-col items-center justify-center mt-7 md:mt-12 lg:mt-15 xl:mt-16 min-h-screen px-4">
        <section className="w-full text-center py-10">
          <GradientHeading>About Lava Cafe</GradientHeading>
          <CafeIntro />
        </section>
        <section className="w-full text-center mt-6 mb-10 md:mb-15 lg:mb-20 space-y-10">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-md w-48 mx-auto mb-6"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-200 h-64 rounded-xl"></div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto flex flex-col items-center justify-center mt-7 md:mt-12 lg:mt-15 xl:mt-16 min-h-screen px-4">
        <section className="w-full text-center py-10">
          <GradientHeading>About Lava Cafe</GradientHeading>
          <div className="text-red-500 mt-8">
            <p>{error}</p>
            <button
              onClick={fetchDepartments}
              className="mt-4 px-4 py-2 bg-lavasecondary-500 text-white rounded-md hover:bg-lavasecondary-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex flex-col items-center justify-center mt-7 md:mt-12 lg:mt-15 xl:mt-16 min-h-screen px-4">
      <section className="w-full text-center py-10">
        <GradientHeading>About Lava Cafe</GradientHeading>
        <CafeIntro />
      </section>
      <section className="w-full text-center mt-6 mb-10 md:mb-15 lg:mb-20 space-y-10">
        <TeamSection departments={departments} />
      </section>
    </main>
  );
};

export default AboutUsPage;
