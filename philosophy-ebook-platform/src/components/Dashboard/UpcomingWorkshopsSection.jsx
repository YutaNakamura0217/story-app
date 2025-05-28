import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function UpcomingWorkshopsSection() {
  // Dummy data - can be expanded with WorkshopCard later if needed
  const workshops = [
    { id: 1, title: "Intro to Big Questions", date: "2023-12-15", instructor: "Dr. Why", description: "A fun and interactive session exploring life's biggest questions." },
    { id: 2, title: "Creative Problem Solving", date: "2024-01-10", instructor: "Ms. Innovate", description: "Learn new ways to tackle challenges and think outside the box." },
    { id: 3, title: "Ethics for Everyday", date: "2024-02-05", instructor: "Prof. Good", description: "Discussing moral dilemmas relevant to children's lives." },
  ];

  return (
    <section className="py-8 px-4 md:px-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Workshops</h3>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {workshops.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {workshops.map(workshop => (
              <li key={workshop.id} className="py-5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <h4 className="text-lg font-medium text-indigo-700 hover:text-indigo-800 cursor-pointer">{workshop.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      With <strong>{workshop.instructor}</strong> on <span className="font-medium">{workshop.date}</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1 hidden md:block">{workshop.description}</p>
                  </div>
                  {/* Assume workshop.id can be used for a dynamic route */}
                  <Link 
                    to={`/workshops/${workshop.id}`} 
                    className="mt-3 sm:mt-0 sm:ml-4 bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-150 self-start sm:self-center whitespace-nowrap"
                  >
                    View Details
                  </Link>
                </div>
                 <p className="text-sm text-gray-500 mt-2 md:hidden">{workshop.description}</p> {/* Show description below on small screens */}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-4">
            <p>No upcoming workshops scheduled. Please check back soon!</p>
          </div>
        )}
        <div className="mt-6 text-center">
          <Link 
            to="/workshops" 
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 text-sm"
          >
            View All Workshops
          </Link>
        </div>
      </div>
    </section>
  );
}

export default UpcomingWorkshopsSection;
