import React from 'react';
import BookCard from '../Common/BookCard'; // Assuming BookCard is in Common

function BooksContent() {
  // Dummy data for demonstration
  const recentlyRead = [
    { id: 'rr1', title: "The Thinking Owl", author: "Wise Bird", coverUrl: "https://via.placeholder.com/150x200?text=Thinking+Owl" },
    { id: 'rr2', title: "Adventures in Questionland", author: "Curious Explorer", coverUrl: "https://via.placeholder.com/150x200?text=Questionland" },
  ];
  const currentlyReading = [
    { id: 'cr1', title: "My Big Book of Why", author: "Inquisitive Child", coverUrl: "https://via.placeholder.com/150x200?text=Book+of+Why" },
  ];
  const wishlist = [
    { id: 'wl1', title: "The Philosopher's Stone (Easy Reader)", author: "J.K. Rowling (Adapter)", coverUrl: "https://via.placeholder.com/150x200?text=Philosophers+Stone" },
  ];

  const BookListSection = ({ title, books }) => (
    <div style={{ marginBottom: '20px' }}>
      <h4>{title}</h4>
      {books.length > 0 ? (
        <div style={{ display: 'flex', overflowX: 'auto', paddingBottom: '10px' }}>
          {books.map(book => <BookCard key={book.id} {...book} />)}
        </div>
      ) : (
        <p>No books in this list yet.</p>
      )}
    </div>
  );

  return (
    <div>
      <h3>Book Activity</h3>
      <BookListSection title="Recently Read" books={recentlyRead} />
      <BookListSection title="Currently Reading" books={currentlyReading} />
      <BookListSection title="Wishlist" books={wishlist} />
    </div>
  );
}

export default BooksContent;
