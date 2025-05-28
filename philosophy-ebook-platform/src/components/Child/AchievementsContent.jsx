import React from 'react';
import AchievementBadge from './AchievementBadge'; // Adjust path if moved to Common

function AchievementsContent() {
  // Dummy data
  const earnedBadges = [
    { id: 'b1', badgeName: "Book Worm", iconUrl: "https://via.placeholder.com/50?text=🐛" },
    { id: 'b2', badgeName: "Curiosity Champ", iconUrl: "https://via.placeholder.com/50?text=💡" },
    { id: 'b3', badgeName: "Deep Thinker", iconUrl: "https://via.placeholder.com/50?text=🧠" },
  ];
  const upcomingBadges = [
    { id: 'ub1', badgeName: "Story Spinner", iconUrl: "https://via.placeholder.com/50?text=✍️", achieved: false },
    { id: 'ub2', badgeName: "Discussion Starter", iconUrl: "https://via.placeholder.com/50?text=💬", achieved: false },
  ]

  return (
    <div>
      <h3>Achievements</h3>
      <h4>Earned Badges</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
        {earnedBadges.map(badge => <AchievementBadge key={badge.id} {...badge} achieved={true} />)}
        {earnedBadges.length === 0 && <p>No badges earned yet. Keep reading and thinking!</p>}
      </div>

      <h4>Progress to Next Badges</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
         {upcomingBadges.map(badge => <AchievementBadge key={badge.id} {...badge} />)}
         {/* Placeholder for specific progress bars or text */}
         <p style={{width: '100%', marginTop: '10px'}}>Read 2 more books in "Ethics" to unlock "Fairness Advocate"!</p>
      </div>
      {/* Placeholder for AchievementCategories */}
    </div>
  );
}

export default AchievementsContent;
