import React from 'react';

function ChildProfileSection({
  childName = "Child's Name Placeholder",
  age = 8,
  preferences = "Loves adventure stories and puzzles",
  avatarUrl = "https://via.placeholder.com/150?text=Child+Avatar",
  overallProgress = 65, // Percentage
  stats = { booksRead: 15, hoursRead: 20, questionsAnswered: 30 },
  achievementsCount = 5
}) {
  return (
    <section style={{ display: 'flex', padding: '20px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
      <img src={avatarUrl} alt={`${childName} avatar`} style={{ width: '150px', height: '150px', borderRadius: '50%', marginRight: '20px' }} />
      <div style={{ flexGrow: 1 }}>
        <h2>{childName}</h2>
        <p>Age: {age}</p>
        <p>Preferences: {preferences}</p>
        <button>Edit Child Info</button> {/* Link to /children/:id/edit */}
      </div>
      <div style={{ textAlign: 'center', marginLeft: '20px' }}>
        {/* Basic progress circle placeholder */}
        <div style={{
          width: '100px', height: '100px', borderRadius: '50%', border: '5px solid #76c7c0',
          display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', margin: '0 auto 10px auto'
        }}>
          {overallProgress}%
        </div>
        <p><strong>{stats.booksRead}</strong> Books Read | <strong>{stats.hoursRead}</strong> Hours Read</p>
        <p><strong>{stats.questionsAnswered}</strong> Questions Answered</p>
        <p><strong>{achievementsCount}</strong> Achievements Unlocked</p>
      </div>
    </section>
  );
}

export default ChildProfileSection;
