import React from 'react';

function UpcomingWorkshopsSection() {
  // Dummy data - can be expanded with WorkshopCard later if needed
  const workshops = [
    { id: 1, title: "Intro to Big Questions", date: "2023-12-15", instructor: "Dr. Why" },
    { id: 2, title: "Creative Problem Solving", date: "2024-01-10", instructor: "Ms. Innovate" },
  ];

  return (
    <section>
      <h3>Upcoming Workshops</h3>
      {workshops.length > 0 ? (
        <ul>
          {workshops.map(workshop => (
            <li key={workshop.id} style={{ borderBottom: '1px solid #eee', padding: '8px 0' }}>
              <strong>{workshop.title}</strong> with {workshop.instructor} on {workshop.date}
              <button style={{ marginLeft: '10px' }}>View Details</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming workshops scheduled.</p>
      )}
      <div style={{ marginTop: '10px' }}>
        <a href="/workshops">View all workshops</a>
      </div>
    </section>
  );
}

export default UpcomingWorkshopsSection;
