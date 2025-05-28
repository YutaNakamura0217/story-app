import React from 'react';
import ChildProgressCard from './ChildProgressCard'; // Adjust path if moved to Common

function ChildrenProgressSection() {
  // Dummy data for now
  const childrenData = [
    { id: 1, childName: "Alex", progress: 75, recentActivity: "Finished 'Wonder Why'" },
    { id: 2, childName: "Jamie", progress: 40, recentActivity: "Started 'Philosopher's Stone'" },
  ];

  return (
    <section>
      <h3>Children's Progress</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {childrenData.map(child => (
          <ChildProgressCard
            key={child.id}
            childName={child.childName}
            progress={child.progress}
            recentActivity={child.recentActivity}
          />
        ))}
        {/* Placeholder for when no children are added yet */}
        {childrenData.length === 0 && <p>No children added yet. <a href="/children/add">Add a child?</a></p>}
      </div>
    </section>
  );
}

export default ChildrenProgressSection;
