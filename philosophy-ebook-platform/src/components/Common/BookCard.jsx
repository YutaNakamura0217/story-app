import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function BookCard({
  bookId = "example-id", // Added bookId prop for dynamic linking
  title = "Book Title",
  author = "Author Name",
  coverUrl = "https://via.placeholder.com/288x320?text=Book+Cover", // Adjusted placeholder size
  description = "Short book description that might be a bit longer to test text truncation or wrapping.",
  readingTime = "15 min",
  isPremium = false
}) {
  return (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden m-2 w-72 flex-shrink-0 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <Link to={`/books/${bookId}`} className="block hover:opacity-90 transition-opacity">
        <img 
          src={coverUrl} 
          alt={`${title} cover`} 
          className="w-full h-48 object-cover" // Maintain aspect ratio, cover area
        />
      </Link>
      <div className="p-5">
        <Link to={`/books/${bookId}`} className="hover:text-indigo-600 transition-colors">
          <h4 className="text-lg font-semibold text-gray-800 mb-1 truncate" title={title}>{title}</h4>
        </Link>
        <p className="text-xs text-gray-500 mb-2">By: {author}</p>
        <p className="text-sm text-gray-700 h-16 overflow-hidden mb-3"> 
          {description.length > 100 ? `${description.substring(0, 97)}...` : description}
        </p>
        <div className="flex justify-between items-center mb-3">
          <p className="text-xs text-gray-500"><small>Reading Time: {readingTime}</small></p>
          {isPremium && (
            <span className="px-2 py-1 bg-yellow-400 text-yellow-800 rounded-full text-xs font-semibold">
              Premium
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <Link 
            to={`/books/${bookId}/read`}
            className="flex-1 text-center bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-150"
          >
            Read
          </Link>
          <Link 
            to={`/books/${bookId}`}
            className="flex-1 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-150"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
