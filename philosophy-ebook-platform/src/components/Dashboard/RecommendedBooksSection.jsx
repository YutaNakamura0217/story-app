import React from 'react';
import BookCard from '../Common/BookCard'; // Corrected path

function RecommendedBooksSection() {
  // Dummy data
  const booksData = [
    { id: 1, title: "The Little Prince of Logic", author: "Dr. Thinker", readingTime: "20 min", isPremium: true, description: "A journey into critical thinking for young minds." },
    { id: 2, title: "Why is the Sky Blue?", author: "Curious Jane", readingTime: "10 min", isPremium: false, description: "Exploring the wonders of the world around us." },
    { id: 3, title: "Empathy Island", author: "Feelings Friend", readingTime: "25 min", isPremium: false, description: "Learning about understanding others." },
  ];

  return (
    <section>
      <h3>Recommended Books</h3>
      <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '10px' }}> {/* Allow horizontal scrolling for books */}
        {booksData.map(book => (
          <BookCard
            key={book.id}
            title={book.title}
            author={book.author}
            description={book.description}
            readingTime={book.readingTime}
            isPremium={book.isPremium}
          />
        ))}
        {booksData.length === 0 && <p>No book recommendations at this time.</p>}
      </div>
    </section>
  );
}

export default RecommendedBooksSection;
