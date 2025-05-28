import React from 'react';

function RecentActivitySection() {
  // Dummy data
  const activities = [
    { id: 1, text: "Alex completed 'The Thinking Owl'." },
    { id: 2, text: "You added 'Curiosity' to your favorite themes." },
    { id: 3, text: "Jamie earned a new badge: 'Book Worm'." },
    { id: 4, text: "A new book 'The Art of Questioning' was added to the library." },
  ];

  return (
    <section className="py-8 px-4 md:px-6 bg-gray-50">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recent Activity</h3>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {activities.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {activities.map(activity => (
              <li key={activity.id} className="py-4">
                <p className="text-sm text-gray-700">{activity.text}</p>
                {/* Optionally, add a timestamp or icon here */}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-4">
            <p>No recent activity to display.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentActivitySection;
