import React from 'react';

function ChildProgressCard({ childName = "Child Name", progress = 50, recentActivity = "Read 'The Thinking Owl'" }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
      <h4>{childName}</h4>
      {/* Basic progress bar representation */}
      <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '4px' }}>
        <div style={{ width: `${progress}%`, backgroundColor: '#76c7c0', height: '20px', borderRadius: '4px', textAlign: 'center', color: 'white' }}>
          {progress}%
        </div>
      </div>
      <p>Recent: {recentActivity}</p>
      <div>
        <button>View Details</button>
        <button>Quick Action</button>
      </div>
    </div>
  );
}

export default ChildProgressCard;
