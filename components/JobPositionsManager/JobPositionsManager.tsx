"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useJobPositions } from "@/hooks/useCareers";
import { JobPosition } from "@/types";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

interface JobPositionForm {
  title: string;
  description: string;
  requirements: string[];
  isActive: boolean;
}

export default function JobPositionsManager() {
  const { positions, loading, error, refetch } = useJobPositions();
  const [showForm, setShowForm] = useState(false);
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(
    null
  );
  const [formData, setFormData] = useState<JobPositionForm>({
    title: "",
    description: "",
    requirements: [""],
    isActive: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingPosition
        ? `/api/job-positions/${editingPosition.id}`
        : "/api/job-positions";

      const method = editingPosition ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          requirements: formData.requirements.filter(
            (req) => req.trim() !== ""
          ),
        }),
      });

      if (!response.ok) throw new Error("Failed to save position");

      await refetch();
      resetForm();
    } catch (error) {
      console.error("Error saving position:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this position?")) return;

    try {
      const response = await fetch(`/api/job-positions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete position");
      await refetch();
    } catch (error) {
      console.error("Error deleting position:", error);
    }
  };

  const handleEdit = (position: JobPosition) => {
    setEditingPosition(position);
    setFormData({
      title: position.title,
      description: position.description,
      requirements: position.requirements,
      isActive: position.isActive,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      requirements: [""],
      isActive: true,
    });
    setEditingPosition(null);
    setShowForm(false);
  };

  const addRequirement = () => {
    setFormData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.map((req, i) =>
        i === index ? value : req
      ),
    }));
  };

  const removeRequirement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  if (loading)
    return <div className="p-8 text-center">Loading positions...</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Job Positions Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Position
        </button>
      </div>

      {/* Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                {editingPosition ? "Edit Position" : "Add New Position"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Requirements
                  </label>
                  {formData.requirements.map((req, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={req}
                        onChange={(e) =>
                          updateRequirement(index, e.target.value)
                        }
                        className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder={`Requirement ${index + 1}`}
                      />
                      {formData.requirements.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequirement(index)}
                          className="text-red-500 hover:text-red-700 px-2"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                  >
                    + Add Requirement
                  </button>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isActive: e.target.checked,
                      }))
                    }
                    className="mr-2"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium">
                    Active Position
                  </label>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:bg-blue-300"
                  >
                    {submitting
                      ? "Saving..."
                      : editingPosition
                        ? "Update"
                        : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Positions List */}
      <div className="grid gap-6">
        {positions.map((position) => (
          <motion.div
            key={position.id}
            className="bg-white border rounded-lg p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-semibold">{position.title}</h3>
                  {position.isActive ? (
                    <Eye className="text-green-500" size={20} />
                  ) : (
                    <EyeOff className="text-gray-400" size={20} />
                  )}
                </div>
                <p className="text-gray-600 mb-3">{position.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Requirements:</h4>
                  <ul className="list-disc pl-5 text-sm text-gray-600">
                    {position.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(position)}
                  className="text-blue-500 hover:text-blue-700 p-2"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(position.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500 border-t pt-3">
              Created: {new Date(position.createdAt).toLocaleDateString()} |
              Updated: {new Date(position.updatedAt).toLocaleDateString()}
            </div>
          </motion.div>
        ))}
      </div>

      {positions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No job positions found.</p>
          <p className="text-gray-400">
            Create your first position to get started.
          </p>
        </div>
      )}
    </div>
  );
}
