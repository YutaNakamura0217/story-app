import React from 'react';
import { Link } from 'react-router-dom';
import { Child, RoutePath } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Card, { CardContent, CardFooter } from '../ui/Card';
import { AcademicCapIcon, PencilIcon, TrashIcon } from '../../assets/icons';

interface ChildManagementCardProps {
  child: Child;
  onDelete: (childId: string) => void;
}

const ChildManagementCard: React.FC<ChildManagementCardProps> = ({ child, onDelete }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="flex-grow p-5">
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:items-start gap-4">
          <Avatar src={child.avatarUrl} alt={child.name} size="lg" className="!border-amber-300 shrink-0" />
          <div className="flex-grow">
            <h3 className="text-xl font-semibold text-amber-900 mb-1">{child.name}</h3>
            <p className="text-sm text-amber-700">{child.age}歳</p>
            {child.interests && child.interests.length > 0 && (
                 <p className="text-xs text-amber-600 mt-2">
                    興味: {child.interests.join(', ')}
                 </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-amber-50/30">
        <Button
          as={Link}
          to={`${RoutePath.ChildrenManage}/${child.id}`} // Uses /children/:id path
          variant="outline"
          size="sm"
          className="w-full rounded-md !text-xs sm:!text-sm"
          leftIcon={<AcademicCapIcon className="w-4 h-4" />}
        >
          進捗を見る
        </Button>
        <Button
          as={Link}
          to={`${RoutePath.ChildrenManage}/${child.id}/edit`} // Uses /children/:id/edit path
          variant="outline"
          size="sm"
          className="w-full rounded-md !text-xs sm:!text-sm"
          leftIcon={<PencilIcon className="w-4 h-4" />}
        >
          編集
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(child.id)}
          className="w-full rounded-md !text-red-500 hover:!bg-red-100 sm:col-span-1 !text-xs sm:!text-sm"
          leftIcon={<TrashIcon className="w-4 h-4" />}
        >
          削除
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChildManagementCard;
