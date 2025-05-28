import React from 'react';

function BookHeroSection({
  title = "Book Title Placeholder",
  author = "Author Name Placeholder",
  description = "This is a compelling description of the book, drawing the reader in and making them excited to explore its philosophical themes.",
  coverUrl = "https://via.placeholder.com/300x450?text=Large+Book+Cover",
  readingTime = "25 min",
  ageRange = "6-8 years",
  publisher = "Philosophical Press",
  publishDate = "2023-01-15",
  tags = ["Curiosity", "Adventure", "Ethics"]
}) {
  return (
    <section style={{ display: 'flex', padding: '20px', borderBottom: '1px solid #eee' }}>
      <img src={coverUrl} alt={`${title} cover`} style={{ width: '300px', height: 'auto', marginRight: '20px' }} />
      <div>
        <h1>{title}</h1>
        <p>By: <strong>{author}</strong></p>
        <p>{description}</p>
        <div style={{ margin: '10px 0' }}>
          <p><small>Reading Time: {readingTime} | Age Range: {ageRange}</small></p>
          <p><small>Publisher: {publisher} | Published: {publishDate}</small></p>
        </div>
        <div>
          {tags.map(tag => <span key={tag} style={{ background: '#eee', padding: '2px 5px', marginRight: '5px', borderRadius: '3px' }}>{tag}</span>)}
        </div>
        <div style={{ marginTop: '20px' }}>
          <button style={{ marginRight: '10px', padding: '10px 15px' }}>Read Book</button>
          <button style={{ marginRight: '10px' }}>Favorite</button>
          <button style={{ marginRight: '10px' }}>Share</button>
          <button>Download (Premium)</button>
        </div>
      </div>
    </section>
  );
}

export default BookHeroSection;
