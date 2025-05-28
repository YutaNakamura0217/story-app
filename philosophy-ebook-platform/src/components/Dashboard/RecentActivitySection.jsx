import React from 'react';

function RecentActivitySection() {
  // Dummy data
  const activities = [
    { id: 1, text: "Alex completed 'The Thinking Owl'." },
    { id: 2, text: "You added 'Curiosity' to your favorite themes." },
    { id: 3, text: "Jamie earned a new badge: 'Book Worm'." },
  ];

  return (
    <section>
      <h3>Recent Activity</h3>
      {activities.length > 0 ? (
        <ul>
          {activities.map(activity => (
            <li key={activity.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
              {activity.text}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recent activity.</p>
      )}
    </section>
  );
}

export default RecentActivitySection;
