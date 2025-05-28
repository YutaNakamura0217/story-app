import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function BookHeroSection({
  bookId = "example-id", // Added bookId prop for dynamic linking
  title = "Book Title Placeholder",
  author = "Author Name Placeholder",
  description = "This is a compelling description of the book, drawing the reader in and making them excited to explore its philosophical themes. It might be a bit longer to see how text flows.",
  coverUrl = "https://via.placeholder.com/300x450?text=Large+Book+Cover",
  readingTime = "25 min",
  ageRange = "6-8 years",
  publisher = "Philosophical Press",
  publishDate = "2023-01-15",
  tags = ["Curiosity", "Adventure", "Ethics", "Critical Thinking"]
}) {
  return (
    <section className="flex flex-col md:flex-row items-start p-6 md:p-8 bg-white shadow-xl rounded-lg my-8 mx-auto max-w-5xl">
      <img 
        src={coverUrl} 
        alt={`${title} cover`} 
        className="w-full md:w-1/3 lg:w-1/4 rounded-lg shadow-md mr-0 md:mr-8 mb-6 md:mb-0 object-cover" 
      />
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-lg text-gray-600 mb-4">
          By: <strong className="text-gray-700">{author}</strong>
        </p>
        <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-600 mb-6">
          <p><strong className="text-gray-700">Reading Time:</strong> {readingTime}</p>
          <p><strong className="text-gray-700">Age Range:</strong> {ageRange}</p>
          <p><strong className="text-gray-700">Publisher:</strong> {publisher}</p>
          <p><strong className="text-gray-700">Published:</strong> {publishDate}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span 
                key={tag} 
                className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold mr-2 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link 
            to={`/books/${bookId}/read`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Read Book
          </Link>
          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
            Favorite
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50">
            Share
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Download (Premium)
          </button>
        </div>
      </div>
    </section>
  );
}

export default BookHeroSection;
