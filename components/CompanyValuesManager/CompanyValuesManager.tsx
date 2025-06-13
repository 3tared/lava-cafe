"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCompanyValues } from "@/hooks/useCareers";
import { CompanyValue } from "@/types";
import { Plus, Edit, Trash2 } from "lucide-react";

export function CompanyValuesManager() {
  const { values, loading, refetch } = useCompanyValues();
  const [showForm, setShowForm] = useState(false);
  const [editingValue, setEditingValue] = useState<CompanyValue | null>(null);
  const [formData, setFormData] = useState({ value: "", order: 0 });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingValue
        ? `/api/company-values/${editingValue.id}`
        : "/api/company-values";

      const method = editingValue ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save value");

      await refetch();
      resetForm();
    } catch (error) {
      console.error("Error saving value:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this value?")) return;

    try {
      const response = await fetch(`/api/company-values/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete value");
      await refetch();
    } catch (error) {
      console.error("Error deleting value:", error);
    }
  };

  const resetForm = () => {
    setFormData({ value: "", order: 0 });
    setEditingValue(null);
    setShowForm(false);
  };

  if (loading) return <div className="p-8 text-center">Loading values...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Company Values Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Add Value
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
              className="bg-white rounded-lg p-6 max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h2 className="text-2xl font-bold mb-4">
                {editingValue ? "Edit Value" : "Add New Value"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Value
                  </label>
                  <input
                    type="text"
                    value={formData.value}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        value: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        order: parseInt(e.target.value) || 0,
                      }))
                    }
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg disabled:bg-blue-300"
                  >
                    {submitting
                      ? "Saving..."
                      : editingValue
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

      {/* Values List */}
      <div className="grid gap-4">
        {values.map((value) => (
          <motion.div
            key={value.id}
            className="bg-white border rounded-lg p-4 shadow-sm flex justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div>
              <h3 className="text-lg font-semibold">{value.value}</h3>
              <p className="text-sm text-gray-500">Order: {value.order}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingValue(value);
                  setFormData({ value: value.value, order: value.order });
                  setShowForm(true);
                }}
                className="text-blue-500 hover:text-blue-700 p-2"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => handleDelete(value.id)}
                className="text-red-500 hover:text-red-700 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
