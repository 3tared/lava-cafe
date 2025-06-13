import { useState, useEffect } from "react";
import {
  JobPosition,
  CompanyValue,
  JobApplication,
  JobApplicationForm,
} from "@/types";

export function useJobPositions() {
  const [positions, setPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPositions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/job-positions");
      if (!response.ok) throw new Error("Failed to fetch positions");
      const data = await response.json();
      setPositions(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, []);

  return { positions, loading, error, refetch: fetchPositions };
}

export function useCompanyValues() {
  const [values, setValues] = useState<CompanyValue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchValues = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/company-values");
      if (!response.ok) throw new Error("Failed to fetch values");
      const data = await response.json();
      setValues(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValues();
  }, []);

  return { values, loading, error, refetch: fetchValues };
}

export function useJobApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/job-applications");
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const submitApplication = async (applicationData: JobApplicationForm) => {
    try {
      const response = await fetch("/api/job-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) throw new Error("Failed to submit application");

      const newApplication = await response.json();
      setApplications((prev) => [newApplication, ...prev]);
      return newApplication;
    } catch (err) {
      throw new Error(
        err instanceof Error ? err.message : "Failed to submit application"
      );
    }
  };

  return {
    applications,
    loading,
    error,
    refetch: fetchApplications,
    submitApplication,
  };
}
