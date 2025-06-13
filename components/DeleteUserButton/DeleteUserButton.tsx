"use client";

// File path: app/dashboard/users/components/DeleteUserButton.tsx
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteUserButtonProps {
  userId: string;
  userName: string;
}

export default function DeleteUserButton({
  userId,
  userName,
}: DeleteUserButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (isDeleting) return;

    try {
      setIsDeleting(true);

      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Refresh the users list
        router.refresh();
        setShowConfirmation(false);
      } else {
        const error = await response.json();
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirmation(true)}
        className="text-red-600 hover:text-red-900"
        type="button"
      >
        Delete
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to delete {userName}? This action cannot be
              undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                onClick={() => setShowConfirmation(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
