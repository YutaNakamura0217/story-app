import React from 'react';
import { Link, useParams } from 'react-router-dom'; // Import Link and useParams
// Assuming a GearIcon component might be created later
// import { GearIcon } from '../Common/Icons'; 

function ReadingHeader({ bookTitle = "Book Title Placeholder", progress = 0 }) {
  const { bookId } = useParams(); // Get bookId from URL for the back link

  return (
    <header className="flex items-center justify-between p-3 bg-white shadow-md h-16 sticky top-0 z-50">
      <Link 
        to={bookId ? `/books/${bookId}` : "/dashboard"} // Fallback to dashboard if no bookId
        className="px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        &larr; Back to Details
      </Link>
      
      <h3 className="text-lg font-semibold text-gray-700 truncate mx-4 flex-grow text-center hidden sm:block">
        {bookTitle}
      </h3>
      
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 text-xs text-gray-600">
          <span>Progress: {progress}%</span>
          <div className="bg-gray-200 rounded-full h-1.5 w-20 md:w-24">
            <div 
              className="bg-indigo-500 h-1.5 rounded-full" 
              style={{ width: `${progress}%` }} // Dynamic width
            ></div>
          </div>
        </div>
        <button 
          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          title="Settings"
        >
          {/* Placeholder for GearIcon - using SVG for now */}
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M19.406 9.594a.75.75 0 00-.31-.515l-1.687-1.006a7.502 7.502 0 00-.882-1.434l.472-1.889a.75.75 0 00-.296-.83L15.39.73a.75.75 0 00-.83-.079l-1.813.73a7.502 7.502 0 00-1.562-.65L9.906.105A.75.75 0 009.25 0h-1.5a.75.75 0 00-.656.105L5.813 1.73A7.502 7.502 0 004.25 2.38l-1.813-.73a.75.75 0 00-.83.08L.39 2.919a.75.75 0 00-.296.83l.472 1.89a7.502 7.502 0 00-.882 1.433L.094 8.073a.75.75 0 000 .853l.688 1.006c.15.22.337.42.55.605l-.472 1.89a.75.75 0 00.296.83l1.313 1.181a.75.75 0 00.83.08l1.813-.73c.49.252 1.01.452 1.562.65l1.281 1.626a.75.75 0 00.656.105h1.5a.75.75 0 00.656-.105l1.281-1.625a7.502 7.502 0 001.563-.65l1.813.73a.75.75 0 00.83-.08l1.313-1.18a.75.75 0 00.296-.83l-.472-1.89a7.502 7.502 0 00.55-.605l.688-1.006a.75.75 0 00.094-.42zM10 13a3 3 0 110-6 3 3 0 010 6z"></path>
          </svg>
          <span className="sr-only">Settings</span>
        </button>
      </div>
    </header>
  );
}

export default ReadingHeader;
