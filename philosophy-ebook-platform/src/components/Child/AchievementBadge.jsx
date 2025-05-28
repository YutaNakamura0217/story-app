import React from 'react';

function AchievementBadge({ 
  badgeName = "Badge Name", 
  iconUrl = "https://via.placeholder.com/50?text=🏆", 
  achieved = true 
}) {
  return (
    <div 
      className={`
        border-2 rounded-lg p-3 m-1.5 w-32 h-36 flex flex-col items-center justify-center text-center 
        transition-all duration-300 ease-in-out transform hover:scale-105
        ${achieved 
          ? 'border-yellow-400 bg-yellow-50 shadow-lg hover:shadow-yellow-200' 
          : 'border-gray-300 bg-gray-100 opacity-70 hover:opacity-100'
        }
      `}
      title={achieved ? badgeName : `${badgeName} (Not yet achieved)`}
    >
      <img 
        src={iconUrl} 
        alt={`${badgeName} icon`} 
        className={`w-12 h-12 mb-2 ${achieved ? '' : 'filter grayscale'}`} 
      />
      <p className={`text-xs font-semibold ${achieved ? 'text-yellow-700' : 'text-gray-500'}`}>
        {badgeName}
      </p>
    </div>
  );
}

export default AchievementBadge;
