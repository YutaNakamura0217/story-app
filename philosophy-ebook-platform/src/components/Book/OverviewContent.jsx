import React from 'react';
import BookCard from '../Common/BookCard'; // Assuming BookCard is in Common

function OverviewContent({ book }) {
  const {
    detailedDescription = "This is a much more detailed description of the book, expanding on its themes, plot, and philosophical value. It might include excerpts or key discussion points. It should be engaging and informative, providing deeper insights than the hero section's summary.",
    learningObjectives = [
      "Understand the core concept of fairness and its implications.", 
      "Explore different perspectives on a significant moral dilemma presented in the story.", 
      "Develop critical thinking skills by analyzing character motivations and consequences.",
      "Identify key philosophical themes woven into the narrative."
    ],
    relatedBooks = [
      { id: 'rb1', title: "The Boy Who Asked Why", author: "A. Philosopher", description: "Another great book on questioning.", coverUrl: "https://via.placeholder.com/150x200?text=Related+1" },
      { id: 'rb2', title: "Sophie's World Snippet", author: "J. Gaarder", description: "A taste of philosophical history.", coverUrl: "https://via.placeholder.com/150x200?text=Related+2" },
      { id: 'rb3', title: "Ethics for Young Minds", author: "Dr. Ethicist", description: "Exploring moral choices.", coverUrl: "https://via.placeholder.com/150x200?text=Related+3" }
    ]
  } = book || {}; // Ensure 'book' prop can be undefined without error

  return (
    <div className="py-6 px-4 md:px-0"> {/* Added padding for content area */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Detailed Description</h3>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{detailedDescription}</p>
      </div>

      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Learning Objectives</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {learningObjectives.map((obj, index) => <li key={index}>{obj}</li>)}
        </ul>
      </div>

      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Related Books</h3>
        {relatedBooks.length > 0 ? (
          <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4"> {/* Horizontal scroll for related books */}
            {relatedBooks.map(relatedBook => (
              <BookCard 
                key={relatedBook.id} 
                {...relatedBook} 
                // Ensure BookCard props match if different from default
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No related books to display at this time.</p>
        )}
      </div>
    </div>
  );
}

export default OverviewContent;
