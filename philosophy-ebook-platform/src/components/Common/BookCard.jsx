import React from 'react';

function BookCard({
  title = "Book Title",
  author = "Author Name",
  coverUrl = "https://via.placeholder.com/150x200?text=Book+Cover", // Placeholder image
  description = "Short book description...",
  readingTime = "15 min",
  isPremium = false
}) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '250px' }}>
      <img src={coverUrl} alt={`${title} cover`} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
      <h4>{title}</h4>
      <p>By: {author}</p>
      <p style={{ fontSize: '0.9em', height: '60px', overflow: 'hidden' }}>{description}</p>
      <p><small>Reading Time: {readingTime}</small></p>
      {isPremium && <span style={{ color: 'gold', fontWeight: 'bold' }}>Premium</span>}
      <div>
        <button>Read</button>
        <button>Details</button>
      </div>
    </div>
  );
}

export default BookCard;
