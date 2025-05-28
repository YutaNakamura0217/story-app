import React from 'react';

function ThemeCard({ themeName = "Theme Name", ageRange = "5-7", bookCount = 10 }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 m-2 w-full sm:w-60 md:w-64 text-center transform hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out">
      {/* ThemeIcon Placeholder */}
      <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white mb-4 shadow-md">
        {/* Replace with actual icon later */}
        <span className="text-3xl">ICON</span>
      </div>
      <h4 className="text-xl font-semibold text-gray-800 mb-1 truncate">{themeName}</h4>
      <p className="text-sm text-gray-500 mb-1">Ages: {ageRange}</p>
      <p className="text-sm text-gray-500 mb-4">{bookCount} books</p>
      <button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 transition-colors duration-150">
        Explore Theme
      </button>
    </div>
  );
}

export default ThemeCard;
