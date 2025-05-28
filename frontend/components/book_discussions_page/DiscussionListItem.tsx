import React from 'react';
import { DiscussionSummary } from '../../types';
import { ChatBubbleLeftRightIcon } from '../../assets/icons';

interface DiscussionListItemProps {
  discussion: DiscussionSummary;
  onSelect: () => void;
  isActive: boolean;
}

const DiscussionListItem: React.FC<DiscussionListItemProps> = ({ discussion, onSelect, isActive }) => {
  const timeSince = (dateString: string): string => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "年前";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "ヶ月前";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "日前";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "時間前";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "分前";
    return Math.floor(seconds) + "秒前";
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ease-in-out
                  ${isActive 
                    ? 'bg-amber-500 text-white shadow-lg ring-2 ring-amber-600 ring-offset-1 ring-offset-amber-50' 
                    : 'bg-white hover:bg-amber-50 border-amber-200 shadow-sm hover:shadow-md'
                  }`}
    >
      <h3 className={`text-md font-semibold mb-1 truncate ${isActive ? 'text-white' : 'text-amber-900'}`}>
        {discussion.title}
      </h3>
      <p className={`text-xs mb-2 line-clamp-2 ${isActive ? 'text-amber-100' : 'text-amber-700'}`}>
        {discussion.latestCommentPreview || discussion.firstFewLines}
      </p>
      <div className={`flex justify-between items-center text-xs ${isActive ? 'text-amber-200' : 'text-amber-600'}`}>
        <span className="flex items-center">
          <ChatBubbleLeftRightIcon className="w-3.5 h-3.5 mr-1" />
          {discussion.participantCount}人が参加中
        </span>
        <span>{timeSince(discussion.lastActivity)}</span>
      </div>
    </button>
  );
};

export default DiscussionListItem;