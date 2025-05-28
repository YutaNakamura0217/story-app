import React from 'react';
import ReviewItem from './ReviewItem';

function ReviewsContent({ reviewsList }) {
  const defaultReviews = [
    { id: 'r1', userName: "Critical Reader", rating: 4, reviewText: "A thought-provoking story, though a bit complex for younger children. The themes are deep and worth exploring with some guidance.", reviewDate: "2023-11-01", userAvatar: "https://via.placeholder.com/50?text=CR" },
    { id: 'r2', userName: "Parent Approved", rating: 5, reviewText: "My kids loved it and it sparked great conversations about empathy and choices! A must-read for families.", reviewDate: "2023-11-05", userAvatar: "https://via.placeholder.com/50?text=PA" },
    { id: 'r3', userName: "Young Philosopher", rating: 4, reviewText: "It made me ask a lot of 'why' questions. Some parts were sad but it was good.", reviewDate: "2023-11-10", userAvatar: "https://via.placeholder.com/50?text=YP" },
  ];
  const currentReviews = reviewsList || defaultReviews;

  // Dummy summary data
  const totalReviews = currentReviews.length;
  const averageRating = totalReviews > 0 
    ? (currentReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews).toFixed(1) 
    : 0;

  return (
    <div className="py-6 px-4 md:px-0">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Reader Reviews</h3>
      
      {/* Reviews Summary Placeholder - Can be expanded into its own component */}
      <div className="bg-gray-50 p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <p className="text-lg font-semibold text-gray-700">
            Overall Rating: <span className="text-indigo-600">{averageRating} / 5</span>
          </p>
          <p className="text-sm text-gray-500">Based on {totalReviews} reviews</p>
        </div>
        <button className="mt-3 sm:mt-0 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-150 whitespace-nowrap">
          Write a Review
        </button>
      </div>

      {currentReviews.length > 0 ? (
        <div className="space-y-0"> {/* Removed space-y-6, ReviewItem has its own padding/border */}
          {currentReviews.map(r => <ReviewItem key={r.id} review={r} />)}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          <p>No reviews yet for this book. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
}

export default ReviewsContent;
