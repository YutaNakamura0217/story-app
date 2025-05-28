import React from 'react';

function ChildProgressCard({ childName = "Child Name", progress = 50, recentActivity = "Read 'The Thinking Owl'" }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 m-2 w-full sm:w-64 md:w-72 transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <h4 className="text-xl font-semibold text-indigo-700 mb-3 truncate">{childName}</h4>
      
      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-xs font-medium text-indigo-700">Progress</span>
          <span className="text-xs font-medium text-indigo-700">{progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full" 
            style={{ width: `${progress}%` }} // Inline style for dynamic width is acceptable here
          ></div>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4 h-10 overflow-hidden">
        <span className="font-medium">Recent:</span> {recentActivity}
      </p>
      
      <div className="flex justify-between space-x-2">
        <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-150">
          View Details
        </button>
        <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition-colors duration-150">
          Quick Action
        </button>
      </div>
    </div>
  );
}

export default ChildProgressCard;
