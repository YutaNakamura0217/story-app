import React from 'react';

function AchievementBadge({ badgeName = "Badge Name", iconUrl = "https://via.placeholder.com/50?text=🏆", achieved = true }) {
  return (
    <div style={{
      border: `2px solid ${achieved ? 'gold' : '#ccc'}`,
      borderRadius: '8px',
      padding: '10px',
      margin: '5px',
      width: '120px',
      textAlign: 'center',
      opacity: achieved ? 1 : 0.5
    }}>
      <img src={iconUrl} alt={`${badgeName} icon`} style={{ width: '40px', height: '40px', marginBottom: '5px' }} />
      <p style={{ margin: 0, fontSize: '0.9em' }}>{badgeName}</p>
    </div>
  );
}

export default AchievementBadge;
