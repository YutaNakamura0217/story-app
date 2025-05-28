import React from 'react';
import BookCard from '../Common/BookCard'; // Assuming BookCard is in Common

function BooksContent() {
  // Dummy data for demonstration
  const recentlyRead = [
    { id: 'rr1', title: "The Thinking Owl", author: "Wise Bird", coverUrl: "https://via.placeholder.com/150x200?text=Thinking+Owl", description: "A profound story about asking big questions." },
    { id: 'rr2', title: "Adventures in Questionland", author: "Curious Explorer", coverUrl: "https://via.placeholder.com/150x200?text=Questionland", description: "Join the hero on a quest for answers." },
    { id: 'rr3', title: "The Little Philosopher", author: "S. Thinksalot", coverUrl: "https://via.placeholder.com/150x200?text=Little+Philosopher", description: "Simple lessons in complex ideas." },
  ];
  const currentlyReading = [
    { id: 'cr1', title: "My Big Book of Why", author: "Inquisitive Child", coverUrl: "https://via.placeholder.com/150x200?text=Book+of+Why", description: "Exploring the world with endless curiosity." },
  ];
  const wishlist = [
    { id: 'wl1', title: "The Philosopher's Stone (Easy Reader)", author: "J.K. Rowling (Adapter)", coverUrl: "https://via.placeholder.com/150x200?text=Philosophers+Stone", description: "A magical journey of discovery." },
    { id: 'wl2', title: "Ethics for Kids: A Guide", author: "Dr. Moral", coverUrl: "https://via.placeholder.com/150x200?text=Ethics+Guide", description: "Understanding right and wrong." },
  ];

  const BookListSection = ({ title, books }) => (
    <div className="mb-10">
      <h4 className="text-xl font-semibold text-gray-700 mb-4 px-1">{title}</h4>
      {books.length > 0 ? (
        <div className="flex overflow-x-auto space-x-6 pb-4 -mx-1 px-1"> {/* Horizontal scroll with padding adjustment */}
          {books.map(book => (
            <BookCard 
              key={book.id} 
              title={book.title}
              author={book.author}
              coverUrl={book.coverUrl}
              description={book.description}
              // Pass other necessary props if BookCard expects them
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 shadow-sm">
          <p>No books in this list yet.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="py-6 px-4 md:px-0"> {/* Added padding for overall content area */}
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Book Activity</h3>
      <BookListSection title="Recently Read" books={recentlyRead} />
      <BookListSection title="Currently Reading" books={currentlyReading} />
      <BookListSection title="Wishlist" books={wishlist} />
    </div>
  );
}

export default BooksContent;
