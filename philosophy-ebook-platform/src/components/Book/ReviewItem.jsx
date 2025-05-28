import React from 'react';

function ReviewItem({ review }) {
  const {
    userAvatar = "https://via.placeholder.com/50?text=User",
    userName = "Reviewer Name",
    rating = 5,
    reviewText = "This book was fantastic! It really made me think about different perspectives and sparked some great conversations with my family. Highly recommended for all young thinkers looking for an engaging read.",
    reviewDate = "2023-10-26"
  } = review;

  // Create an array for star icons based on rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg 
      key={index} 
      className={`w-4 h-4 fill-current ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
      viewBox="0 0 20 20"
    >
      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 .5l2.939 5.455 6.572.955-4.756 4.635 1.123 6.545z"/>
    </svg>
  ));

  return (
    <article className="py-6 border-b border-gray-200 last:border-b-0">
      <div className="flex items-start mb-3">
        <img 
          src={userAvatar} 
          alt={`${userName} avatar`} 
          className="w-10 h-10 rounded-full mr-4 object-cover flex-shrink-0" 
        />
        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-800">{userName}</h4>
            <div className="flex items-center" title={`Rated ${rating} out of 5 stars`}>
              {stars}
            </div>
          </div>
          <p className="text-xs text-gray-500">{reviewDate}</p>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed text-sm">{reviewText}</p>
      {/* Placeholder for LikeButtons or other actions */}
      <div className="mt-3 flex space-x-4">
        <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium focus:outline-none">Like</button>
        <button className="text-xs text-gray-500 hover:text-gray-700 font-medium focus:outline-none">Reply</button>
      </div>
    </article>
  );
}

export default ReviewItem;
