import React from 'react';

function ReviewItem({ review }) {
  const {
    userAvatar = "https://via.placeholder.com/50?text=User",
    userName = "Reviewer Name",
    rating = 5,
    reviewText = "This book was fantastic! Highly recommended for all young thinkers.",
    reviewDate = "2023-10-26"
  } = review;

  return (
    <div style={{ borderBottom: '1px solid #eee', padding: '10px 0', marginBottom: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        <img src={userAvatar} alt={`${userName} avatar`} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }} />
        <strong>{userName}</strong>
        <span style={{ marginLeft: 'auto', color: '#666' }}><small>Rated: {rating}/5</small></span>
      </div>
      <p>{reviewText}</p>
      <p style={{ textAlign: 'right', fontSize: '0.8em', color: '#777' }}>{reviewDate}</p>
      {/* Placeholder for LikeButtons */}
    </div>
  );
}

export default ReviewItem;
