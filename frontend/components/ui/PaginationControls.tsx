import React from 'react';
import Button from './Button';
import { ChevronLeftIcon, ChevronRightIcon } from '../../assets/icons';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  className?: string;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  className = '',
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers with ellipsis
  const pageNumbers = [];
  const maxPagesToShow = 5; // Number of page buttons to show around current page + first/last
  const halfPagesToShow = Math.floor(maxPagesToShow / 2);

  if (totalPages <= maxPagesToShow + 2) { // Show all if not too many pages
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    pageNumbers.push(1); // Always show first page

    let rangeStart = Math.max(2, currentPage - halfPagesToShow);
    let rangeEnd = Math.min(totalPages - 1, currentPage + halfPagesToShow);

    if (currentPage - halfPagesToShow <= 2) {
        rangeEnd = maxPagesToShow -1;
    }
    if (currentPage + halfPagesToShow >= totalPages -1 ) {
        rangeStart = totalPages - maxPagesToShow + 2;
    }
    
    if (rangeStart > 2) {
      pageNumbers.push('...');
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pageNumbers.push('...');
    }
    
    pageNumbers.push(totalPages); // Always show last page
  }


  return (
    <nav
      className={`flex flex-col sm:flex-row items-center justify-between border-t border-amber-200 bg-white px-4 py-3 sm:px-6 mt-8 ${className}`}
      aria-label="ページネーション"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-amber-700">
          全 <span className="font-medium">{totalItems}</span> 件中 <span className="font-medium">{startItem}</span> - <span className="font-medium">{endItem}</span> 件を表示中
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end items-center space-x-1">
        <Button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          className="rounded-md"
          leftIcon={<ChevronLeftIcon className="h-5 w-5" />}
        >
          前へ
        </Button>
        
        <div className="hidden md:flex space-x-1">
          {pageNumbers.map((number, index) =>
            typeof number === 'number' ? (
              <Button
                key={index}
                onClick={() => onPageChange(number)}
                variant={currentPage === number ? 'primary' : 'outline'}
                size="sm"
                className={`px-3 py-1 rounded-md ${currentPage === number ? 'font-semibold' : ''}`}
              >
                {number}
              </Button>
            ) : (
              <span key={index} className="px-3 py-1 text-sm text-amber-700">
                {number}
              </span>
            )
          )}
        </div>

        <Button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          className="rounded-md"
          rightIcon={<ChevronRightIcon className="h-5 w-5" />}
        >
          次へ
        </Button>
      </div>
    </nav>
  );
};

export default PaginationControls;