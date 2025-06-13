"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/lib/generated/prisma";
import CategoryForm from "@/components/CategoryForm/CategoryForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CategoryPage({ params }: PageProps) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Resolve params on component mount
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  const isEditing = resolvedParams?.id !== "new";

  useEffect(() => {
    if (resolvedParams && isEditing) {
      fetchCategory();
    }
  }, [resolvedParams, isEditing]);

  const fetchCategory = async () => {
    if (!resolvedParams) return;

    setIsLoading(true);
    setFetchError(null);
    try {
      const response = await fetch(`/api/categories/${resolvedParams.id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch category");
      }
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Error fetching category:", error);
      setFetchError("Failed to load category data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (formData: {
    name: string;
    description: string;
    image: string;
    isActive: boolean;
    displayOrder: number;
  }) => {
    if (!resolvedParams) return;

    setIsSaving(true);

    try {
      const url = isEditing
        ? `/api/categories/${resolvedParams.id}`
        : "/api/categories";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to save category");
      }

      // Redirect to categories list after successful save
      router.push("/dashboard/categories");
    } catch (error) {
      console.error("Error saving category:", error);
      throw error; // Re-throw so CategoryForm can handle the error display
    } finally {
      setIsSaving(false);
    }
  };

  // Show loading while resolving params
  if (!resolvedParams) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show loading spinner while fetching category data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  // Show error if failed to fetch category
  if (fetchError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">{fetchError}</p>
          </div>
          <button
            onClick={() => router.push("/dashboard/categories")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <CategoryForm
      initialData={category}
      onSubmit={handleSubmit}
      isLoading={isSaving}
    />
  );
}
