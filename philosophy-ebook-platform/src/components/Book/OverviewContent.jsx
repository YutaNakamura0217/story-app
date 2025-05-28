import React from 'react';
import BookCard from '../Common/BookCard'; // Assuming BookCard is in Common

function OverviewContent({ book }) {
  const {
    detailedDescription = "This is a much more detailed description of the book, expanding on its themes, plot, and philosophical value. It might include excerpts or key discussion points.",
    learningObjectives = ["Understand the concept of fairness.", "Explore different perspectives on a moral dilemma.", "Develop critical thinking skills."],
    relatedBooks = [
      { id: 'rb1', title: "The Boy Who Asked Why", author: "A. Philosopher", description: "Another great book on questioning." },
      { id: 'rb2', title: "Sophie's World Snippet", author: "J. Gaarder", description: "A taste of philosophical history." }
    ]
  } = book || {};

  return (
    <div>
      <h3>Overview</h3>
      <h4>Detailed Description</h4>
      <p>{detailedDescription}</p>
      <h4>Learning Objectives</h4>
      <ul>
        {learningObjectives.map((obj, index) => <li key={index}>{obj}</li>)}
      </ul>
      <h4>Related Books</h4>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {relatedBooks.map(relatedBook => <BookCard key={relatedBook.id} {...relatedBook} />)}
      </div>
    </div>
  );
}

export default OverviewContent;
