import React from 'react';
import { Link } from 'react-router-dom';
import { LearningActivity } from '../../types';
import Avatar from '../ui/Avatar';
import { BookIcon, QuestionMarkCircleIcon, TrophyIcon, PencilSquareIcon } from '../../assets/icons';

interface LearningHistoryItemProps {
  activity: LearningActivity;
}

const ActivityIcon: React.FC<{ type: LearningActivity['activityType'], className?: string }> = ({ type, className="w-6 h-6 text-amber-500" }) => {
  switch (type) {
    case 'book_read':
      return <BookIcon className={className} />;
    case 'question_answered':
      return <QuestionMarkCircleIcon className={className} />;
    case 'badge_earned':
      return <TrophyIcon className={className} />;
    case 'note_taken':
      return <PencilSquareIcon className={className} />;
    default:
      return <div className={`w-6 h-6 rounded-full bg-gray-300 ${className}`} />; // Fallback
  }
};

const LearningHistoryItem: React.FC<LearningHistoryItemProps> = ({ activity }) => {
  const activityDate = new Date(activity.date);
  const formattedDate = activityDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' });
  const formattedTime = activityDate.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
      <div className="flex-shrink-0 pt-1">
        {activity.childAvatarUrl ? (
          <Avatar src={activity.childAvatarUrl} alt={activity.childName || 'Child'} size="md" className="!border-amber-200" />
        ) : (
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <ActivityIcon type={activity.activityType} className="w-5 h-5 text-amber-500" />
          </div>
        )}
      </div>
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1">
          <p className="text-sm font-medium text-amber-800">
            {activity.childName ? `${activity.childName} さんが` : ''} {activity.description}
          </p>
          <p className="text-xs text-amber-600 mt-1 sm:mt-0 shrink-0 sm:ml-4">
            {formattedDate} {formattedTime}
          </p>
        </div>
        {activity.link && (
          <Link to={activity.link} className="text-xs text-amber-600 hover:text-amber-700 hover:underline">
            詳細を見る &rarr;
          </Link>
        )}
      </div>
    </div>
  );
};

export default LearningHistoryItem;
