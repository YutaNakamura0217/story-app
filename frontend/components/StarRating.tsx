import React from 'react';
import { IconStar } from './icons/PhosphorIcons';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: string | number;
  className?: string;
  starColor?: string;
  emptyStarColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalStars = 5,
  size = "20px",
  className = "",
  starColor = "text-yellow-400", // Default fill color
  emptyStarColor = "text-amber-200" // Default empty star color from mockup
}) => {
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      // Full star
      stars.push(<IconStar key={`star-${i}`} variant="fill" size={size} className={starColor} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      // Half star
      stars.push(<IconStar key={`star-${i}`} variant="half" size={size} className={starColor} />);
    } else {
      // Empty star
      stars.push(<IconStar key={`star-${i}`} variant="regular" size={size} className={`${emptyStarColor} ${starColor}`} />);
    }
  }

  return <div className={`flex gap-0.5 ${className}`}>{stars}</div>;
};

export default StarRating;