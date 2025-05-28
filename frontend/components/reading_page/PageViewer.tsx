import React from 'react';
import BookPageDisplay from './BookPageDisplay';
import { ChevronLeftIcon, ChevronRightIcon } from '../../assets/icons';

interface PageViewerProps {
  currentPageImageUrl: string;
  onNextPage: () => void;
  onPreviousPage: () => void;
  showPrev: boolean;
  showNext: boolean;
}

const PageViewer: React.FC<PageViewerProps> = ({
  currentPageImageUrl,
  onNextPage,
  onPreviousPage,
  showPrev,
  showNext
}) => {
  return (
    <div className="w-full h-full flex items-center justify-center relative p-4 pt-16 pb-20"> {/* Padding for header/footer */}
      {/* Previous Page Button */}
      {showPrev && (
        <button
          onClick={onPreviousPage}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors z-10"
          aria-label="前のページへ"
        >
          <ChevronLeftIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      )}

      {/* Book Page Image */}
      <div className="w-full h-full flex items-center justify-center">
        <BookPageDisplay imageUrl={currentPageImageUrl} />
      </div>
      

      {/* Next Page Button */}
      {showNext && (
        <button
          onClick={onNextPage}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/30 hover:bg-black/50 text-white rounded-full transition-colors z-10"
          aria-label="次のページへ"
        >
          <ChevronRightIcon className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>
      )}
    </div>
  );
};

export default PageViewer;