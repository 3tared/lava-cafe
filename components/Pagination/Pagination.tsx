import { useState, useEffect } from "react";

// Define the interface for the pagination props
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // State for hover effects
  const [hoveredPage, setHoveredPage] = useState<number | null>(null);
  const [activeTransition, setActiveTransition] = useState(false);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than or equal to max
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Calculate which pages to show
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      // Adjust if we're at the end
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      // Add first page
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("ellipsis-start");
        }
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("ellipsis-end");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  // Animation effect when page changes
  useEffect(() => {
    setActiveTransition(true);
    const timer = setTimeout(() => {
      setActiveTransition(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="inline-flex items-center rounded-lg overflow-hidden shadow-lg bg-white">
        {/* Previous button */}
        <button
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-3 flex items-center transition-all duration-200 ${
            currentPage === 1
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Previous page"
          onMouseEnter={() => setHoveredPage(-1)}
          onMouseLeave={() => setHoveredPage(null)}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              hoveredPage === -1 ? "transform -translate-x-1" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Page numbers */}
        <div className="hidden sm:flex divide-x">
          {pageNumbers.map((number, index) => {
            if (number === "ellipsis-start" || number === "ellipsis-end") {
              return (
                <div
                  key={number}
                  className="px-4 py-2 text-gray-500 flex items-center justify-center"
                >
                  <span className="text-gray-400">•••</span>
                </div>
              );
            }

            return (
              <button
                key={index}
                onClick={() => onPageChange(number as number)}
                onMouseEnter={() => setHoveredPage(number as number)}
                onMouseLeave={() => setHoveredPage(null)}
                className={`relative w-12 h-12 flex items-center justify-center transition-all duration-200 ${
                  number === currentPage
                    ? "text-white font-medium z-10"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
                aria-label={`Page ${number}`}
                aria-current={number === currentPage ? "page" : undefined}
              >
                {number === currentPage && (
                  <span
                    className={`absolute inset-0 bg-lavasecondary-600 rounded-md transform scale-95 transition-all duration-300 ${
                      activeTransition ? "scale-100" : ""
                    }`}
                  ></span>
                )}
                <span
                  className={`relative z-10 ${number === currentPage ? "text-white" : ""}`}
                >
                  {number}
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile view - just show current/total */}
        <div className="flex sm:hidden mx-2 items-center">
          <span className="text-gray-700 font-medium">{currentPage}</span>
          <span className="text-gray-400 mx-1">/</span>
          <span className="text-gray-500">{totalPages}</span>
        </div>

        {/* Next button */}
        <button
          onClick={() =>
            currentPage < totalPages && onPageChange(currentPage + 1)
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-3 flex items-center transition-all duration-200 ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Next page"
          onMouseEnter={() => setHoveredPage(-2)}
          onMouseLeave={() => setHoveredPage(null)}
        >
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${
              hoveredPage === -2 ? "transform translate-x-1" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Page indicator text */}
      <div className="text-sm text-gray-500">
        Page <span className="font-medium">{currentPage}</span> of{" "}
        <span>{totalPages}</span>
      </div>
    </div>
  );
}
