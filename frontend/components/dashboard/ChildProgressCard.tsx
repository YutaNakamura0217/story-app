
import React from 'react';
import { Child } from '../../types';
// Card component is not used here as this is part of a larger card
import Avatar from '../ui/Avatar';
import ProgressBar from '../ui/ProgressBar';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, SparklesIcon } from '../../assets/icons';

interface ChildProgressCardProps {
  child: Child;
}

// This component represents an item *within* the ChildrenProgressSection Card
const ChildProgressCard: React.FC<ChildProgressCardProps> = ({ child }) => {
  return (
    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:space-x-4">
        <Avatar src={child.avatarUrl} alt={child.name} size="lg" className="mb-3 sm:mb-0 shrink-0 !border-amber-300 hover:!border-amber-500" />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-amber-900">{child.name} ({child.age}歳)</h3>
          <ProgressBar value={child.progress} colorScheme="amber" size="md" showLabel className="my-2" labelPrefix="学習進捗"/>
          <p className="text-xs text-amber-700 mt-1 mb-3">
            <span className="font-medium">最近のアクティビティ:</span> {child.recentActivity}
          </p>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 justify-center sm:justify-start">
            <Button 
              variant="outline" 
              size="sm" 
              as={Link} 
              to={`/children/${child.id}`}
              leftIcon={<AcademicCapIcon className="w-4 h-4"/>}
              className="rounded-full"
            >
              進捗詳細
            </Button>
            <Button 
              variant="primary" 
              size="sm"
              leftIcon={<SparklesIcon className="w-4 h-4"/>}
              className="rounded-full"
              // onClick event for navigation or action
            >
              新しい本を探す
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildProgressCard;