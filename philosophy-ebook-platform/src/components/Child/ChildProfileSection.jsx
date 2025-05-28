import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function ChildProfileSection({
  childId = "example-child-id", // Added childId prop for dynamic linking
  childName = "Child's Name Placeholder",
  age = 8,
  preferences = "Loves adventure stories, mythical creatures, and asking 'why?' about everything.",
  avatarUrl = "https://via.placeholder.com/150?text=Child+Avatar",
  overallProgress = 65, // Percentage
  stats = { booksRead: 15, hoursRead: 20, questionsAnswered: 30 },
  achievementsCount = 5
}) {
  return (
    <section className="flex flex-col md:flex-row items-center p-6 bg-white shadow-xl rounded-lg my-8 mx-auto max-w-5xl">
      <img 
        src={avatarUrl} 
        alt={`${childName} avatar`} 
        className="w-24 h-24 md:w-36 md:h-36 rounded-full shadow-md mb-4 md:mb-0 md:mr-8 object-cover border-4 border-indigo-200" 
      />
      <div className="flex-grow text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-1">{childName}</h2>
        <p className="text-md text-gray-600 mb-1">Age: {age}</p>
        <p className="text-sm text-gray-500 mb-3 leading-relaxed md:max-w-md">{preferences}</p>
        <Link 
          to={`/children/${childId}/edit`} // Example navigation, route not defined yet
          className="px-4 py-2 text-xs font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-150"
        >
          Edit Child Info
        </Link>
      </div>
      <div className="text-center md:text-right mt-6 md:mt-0 md:ml-8 flex-shrink-0">
        <div 
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-8 border-blue-500 flex items-center justify-center text-2xl md:text-3xl font-bold text-blue-600 mx-auto md:mx-0 mb-3 shadow-inner bg-blue-50"
          title={`Overall Progress: ${overallProgress}%`}
        >
          {overallProgress}%
        </div>
        <div className="text-xs text-gray-600 space-y-0.5">
          <p><strong className="text-gray-700">{stats.booksRead}</strong> Books Read</p>
          <p><strong className="text-gray-700">{stats.hoursRead}</strong> Hours Read</p>
          <p><strong className="text-gray-700">{stats.questionsAnswered}</strong> Questions Answered</p>
          <p><strong className="text-gray-700">{achievementsCount}</strong> Achievements Unlocked</p>
        </div>
      </div>
    </section>
  );
}

export default ChildProfileSection;
