import React from 'react';

function PaginationControls({ currentPage = 1, totalPages = 5, onPageChange }) {
  // In a real app, onPageChange would handle state updates
  const handlePrevious = () => {
    if (currentPage > 1 && onPageChange) onPageChange(currentPage - 1);
  };
  const handleNext = () => {
    if (currentPage < totalPages && onPageChange) onPageChange(currentPage + 1);
  };

  // Generate page numbers (simplified)
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex items-center justify-center py-8" aria-label="Pagination">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      >
        <span className="sr-only">Previous</span>
        &laquo; Prev
      </button>
      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => onPageChange && onPageChange(number)}
          aria-current={currentPage === number ? 'page' : undefined}
          className={`relative inline-flex items-center px-4 py-2 border-t border-b -ml-px border-gray-300 bg-white text-sm font-medium
                      ${currentPage === number ? 'text-purple-600 border-purple-500 z-10 ring-1 ring-purple-500' : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500'}`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
      >
        <span className="sr-only">Next</span>
        Next &raquo;
      </button>
    </nav>
  );
}

export default PaginationControls;
