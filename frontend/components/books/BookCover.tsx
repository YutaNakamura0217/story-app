
import React from 'react';

interface BookCoverProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl'; // sm for card, md/lg for detail page
  className?: string;
  priority?: boolean; // for Next.js Image-like optimization hint, not used in standard img
}

const BookCover: React.FC<BookCoverProps> = ({ src, alt, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-24 h-36',    // For book cards
    md: 'w-40 h-56 sm:w-48 sm:h-64',  // Default for details
    lg: 'w-56 h-80 sm:w-64 sm:h-96',  // Large display
    xl: 'w-full max-w-xs h-auto aspect-[3/4]', // Responsive, for hero like sections
  };

  return (
    <div className={`${sizeClasses[size]} ${className} bg-gray-200 rounded-lg shadow-md overflow-hidden flex-shrink-0`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy" // Basic lazy loading
      />
    </div>
  );
};

export default BookCover;
