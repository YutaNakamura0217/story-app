import React from 'react';
import BookCard from '../Common/BookCard'; // Corrected path

function RecommendedBooksSection() {
  // Dummy data
  const booksData = [
    { id: 1, title: "The Little Prince of Logic", author: "Dr. Thinker", readingTime: "20 min", isPremium: true, description: "A journey into critical thinking for young minds. This book encourages children to ask 'why' and explore the world with curiosity." },
    { id: 2, title: "Why is the Sky Blue?", author: "Curious Jane", readingTime: "10 min", isPremium: false, description: "Exploring the wonders of the world around us through simple questions and delightful illustrations. Perfect for early readers." },
    { id: 3, title: "Empathy Island", author: "Feelings Friend", readingTime: "25 min", isPremium: false, description: "Learning about understanding others' feelings and perspectives. A heartwarming tale of friendship and emotional intelligence." },
    { id: 4, title: "The Great Debate Machine", author: "Argue Smart", readingTime: "30 min", isPremium: true, description: "An introduction to logical fallacies and constructing strong arguments. Fun and engaging for older children." },
  ];

  return (
    <section className="py-8 px-4 md:px-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recommended Books</h3>
      {booksData.length > 0 ? (
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4"> {/* Negative margin to allow full-bleed scroll area with padding */}
          {booksData.map(book => (
            <BookCard
              key={book.id}
              title={book.title}
              author={book.author}
              description={book.description}
              readingTime={book.readingTime}
              isPremium={book.isPremium}
              // coverUrl={book.coverUrl} // Assuming dummy data might have cover URLs
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          <p>No book recommendations at this time. Please check back later!</p>
        </div>
      )}
    </section>
  );
}

export default RecommendedBooksSection;
