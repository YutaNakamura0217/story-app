import React from 'react';
import AchievementBadge from './AchievementBadge'; // Adjust path if moved to Common

function AchievementsContent() {
  // Dummy data
  const earnedBadges = [
    { id: 'b1', badgeName: "Book Worm", iconUrl: "https://via.placeholder.com/50?text=🐛" },
    { id: 'b2', badgeName: "Curiosity Champ", iconUrl: "https://via.placeholder.com/50?text=💡" },
    { id: 'b3', badgeName: "Deep Thinker", iconUrl: "https://via.placeholder.com/50?text=🧠" },
    { id: 'b4', badgeName: "Star Reader", iconUrl: "https://via.placeholder.com/50?text=🌟" },
  ];
  const upcomingBadges = [
    { id: 'ub1', badgeName: "Story Spinner", iconUrl: "https://via.placeholder.com/50?text=✍️", achieved: false },
    { id: 'ub2', badgeName: "Discussion Starter", iconUrl: "https://via.placeholder.com/50?text=💬", achieved: false },
    { id: 'ub3', badgeName: "Ethical Eagle", iconUrl: "https://via.placeholder.com/50?text=🦅", achieved: false },
  ];

  return (
    <div className="py-6 px-4 md:px-0">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Achievements & Badges</h3>
      
      <div className="mb-10">
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Earned Badges</h4>
        {earnedBadges.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-3 sm:gap-4">
            {earnedBadges.map(badge => <AchievementBadge key={badge.id} {...badge} achieved={true} />)}
          </div>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 shadow-sm">
            <p>No badges earned yet. Keep reading and thinking to unlock them!</p>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-xl font-semibold text-gray-700 mb-4">Progress to Next Badges</h4>
        {upcomingBadges.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-3 sm:gap-4 mb-4">
            {upcomingBadges.map(badge => <AchievementBadge key={badge.id} {...badge} />)}
          </div>
        ) : (
           <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 shadow-sm">
            <p>All badges achieved or no upcoming badges defined!</p>
          </div>
        )}
        {/* Placeholder for specific progress bars or text if any upcoming badges exist */}
        {upcomingBadges.length > 0 && (
          <div className="mt-6 bg-blue-50 p-4 rounded-lg shadow-sm">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">Keep it up!</span> For example, read 2 more books in the "Ethics" category to unlock the "Fairness Advocate" badge!
            </p>
            {/* Example progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "45%" }}></div>
            </div>
            <p className="text-xs text-blue-600 mt-1 text-right">45% to "Fairness Advocate"</p>
          </div>
        )}
      </div>
      {/* Placeholder for AchievementCategories if that's a planned feature */}
    </div>
  );
}

export default AchievementsContent;
