import React from 'react';
import ChildProgressCard from './ChildProgressCard'; // Adjust path if moved to Common

function ChildrenProgressSection() {
  // Dummy data for now
  const childrenData = [
    { id: 1, childName: "Alex", progress: 75, recentActivity: "Finished 'Wonder Why'" },
    { id: 2, childName: "Jamie", progress: 40, recentActivity: "Started 'Philosopher's Stone'" },
    { id: 3, childName: "Sam", progress: 90, recentActivity: "Explored 'Ethics for Kids'" },
  ];

  return (
    <section className="py-8 px-4 md:px-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Children's Progress</h3>
      {childrenData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {childrenData.map(child => (
            <ChildProgressCard
              key={child.id}
              childName={child.childName}
              progress={child.progress}
              recentActivity={child.recentActivity}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          <p>No children added yet. <a href="/children/add" className="text-indigo-600 hover:underline">Add a child to track their progress!</a></p>
        </div>
      )}
    </section>
  );
}

export default ChildrenProgressSection;
