import React from 'react';

function PhilosophyQuestion({ question }) {
  const {
    text = "What do you think is the main idea of this story, and how does it relate to your own experiences or beliefs?",
    type = "Open-ended",
    difficulty = "Medium",
    // responseOptions = [] // For multiple choice, etc.
  } = question;

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mb-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <p className="text-gray-800 text-lg leading-relaxed mb-3">{text}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="text-xs">
          <span 
            className={`px-2 py-1 rounded-full font-semibold
              ${difficulty === 'Easy' ? 'bg-green-100 text-green-700' : ''}
              ${difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : ''}
              ${difficulty === 'Hard' ? 'bg-red-100 text-red-700' : ''}
              mr-2`}
          >
            {difficulty}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
            {type}
          </span>
        </div>
      </div>
      {/* Placeholder for response options or input area */}
      <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-150">
        Discuss This Question
      </button>
    </div>
  );
}

export default PhilosophyQuestion;
