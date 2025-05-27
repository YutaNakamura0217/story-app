import React from 'react';
import type { Review as ReviewType } from '../types';
import { IconStar, IconThumbsUp, IconThumbsDown } from './icons/PhosphorIcons';
import StarRating from './StarRating';

interface ReviewCardProps {
  review: ReviewType;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <article className="flex flex-col gap-3 border-t border-amber-200 pt-6">
      <div className="flex items-center gap-3">
        {review.author.imageUrl ? (
          <div 
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-amber-200" 
            style={{ backgroundImage: `url("${review.author.imageUrl}")` }}
            aria-label={`${review.author.name}'s profile picture`}
          ></div>
        ) : (
          <div className="bg-amber-100 rounded-full size-10 flex items-center justify-center text-amber-500 font-semibold border border-amber-200">
            {review.author.name.substring(0, 1)}
          </div>
        )}
        <div className="flex-1">
          <p className="text-slate-800 text-base font-medium">{review.author.name}</p>
          <p className="text-slate-500 text-sm">{review.date}</p>
        </div>
      </div>
      
      <StarRating rating={review.rating} size="18px" starColor="text-yellow-400" emptyStarColor="text-amber-200" />

      <p className="text-slate-700 text-base leading-relaxed">
        {review.text}
      </p>
      
      <div className="flex gap-6 text-slate-500 mt-2">
        {typeof review.likes === 'number' && (
          <button className="flex items-center gap-1.5 hover-primary-color transition-colors" aria-label={`Like this review. Current likes: ${review.likes}`}>
            <IconThumbsUp size="18px" className="text-inherit" />
            <span className="text-sm">{review.likes}</span>
          </button>
        )}
        {typeof review.dislikes === 'number' && (
          <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors" aria-label={`Dislike this review. Current dislikes: ${review.dislikes}`}>
            <IconThumbsDown size="18px" className="text-inherit" />
            <span className="text-sm">{review.dislikes}</span>
          </button>
        )}
         {/* Fallback if likes/dislikes not provided but actions are still desired */}
        {(typeof review.likes !== 'number' && typeof review.dislikes !== 'number') && (
             <>
                <button className="flex items-center gap-1.5 hover-primary-color transition-colors" aria-label="Like this review">
                    <IconThumbsUp size="18px" className="text-inherit" />
                </button>
                <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors" aria-label="Dislike this review">
                    <IconThumbsDown size="18px" className="text-inherit" />
                </button>
             </>
        )}
      </div>
    </article>
  );
};

export default ReviewCard;