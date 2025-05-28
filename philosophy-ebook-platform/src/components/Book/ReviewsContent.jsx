import React from 'react';
import ReviewItem from './ReviewItem';

function ReviewsContent({ reviewsList }) {
  const defaultReviews = [
    { id: 'r1', userName: "Critical Reader", rating: 4, reviewText: "A thought-provoking story, though a bit complex for younger children.", reviewDate: "2023-11-01" },
    { id: 'r2', userName: "Parent Approved", rating: 5, reviewText: "My kids loved it and it sparked great conversations!", reviewDate: "2023-11-05" },
  ];
  const currentReviews = reviewsList || defaultReviews;

  return (
    <div>
      <h3>Reviews</h3>
      {/* ReviewsSummary placeholder */}
      <div style={{ marginBottom: '10px' }}>Overall Rating: 4.5/5 (based on X reviews)</div>
      <button style={{ marginBottom: '20px' }}>Write a Review</button>
      {currentReviews.map(r => <ReviewItem key={r.id} review={r} />)}
      {currentReviews.length === 0 && <p>No reviews yet. Be the first to write one!</p>}
    </div>
  );
}

export default ReviewsContent;
