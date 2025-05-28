
import React from 'react';
import { MOCK_CHILDREN } from '../../constants';
import ChildProgressCard from './ChildProgressCard';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar'; // For overall progress
import Card, { CardContent, CardHeader } from '../ui/Card';
import { UsersIcon, PlusCircleIcon } from '../../assets/icons'; // UsersIcon as a placeholder

const ChildrenProgressSection: React.FC = () => {
  const children = MOCK_CHILDREN; // In a real app, this would come from state/API
  
  // Calculate overall progress if multiple children (example logic)
  const overallProgress = children.length > 0 
    ? children.reduce((sum, child) => sum + child.progress, 0) / children.length
    : 0;

  if (!children || children.length === 0) {
    return (
      <Card className="mb-8 text-center border-amber-100">
        <CardHeader className="border-b-amber-100">
            <h3 className="text-amber-900 text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">お子様の進捗状況</h3>
        </CardHeader>
        <CardContent className="p-6">
          <UsersIcon className="w-16 h-16 text-amber-300 mx-auto mb-4" />
          <h4 className="text-lg font-semibold text-amber-800 mb-2">お子様が登録されていません</h4>
          <p className="text-amber-700 text-sm mb-4">お子様の情報を追加して、学習の旅を始めましょう。</p>
          <Button 
            variant="primary" 
            onClick={() => { /* navigate to add child page */ }}
            leftIcon={<PlusCircleIcon className="w-5 h-5"/>}
            className="rounded-full"
          >
            お子様を追加する
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-8 border-amber-100 shadow-lg">
      <CardHeader className="border-b-amber-100">
        <h3 className="text-amber-900 text-xl sm:text-2xl font-bold leading-tight tracking-[-0.015em]">お子様の進捗状況</h3>
      </CardHeader>
      <CardContent className="p-6">
        {/* Overall Progress from reference */}
        <div className="mb-6">
            <div className="flex gap-6 justify-between items-center mb-1">
                <p className="text-amber-800 text-base font-medium leading-normal">全体の進捗</p>
                <p className="text-amber-600 text-lg font-semibold leading-normal">{overallProgress.toFixed(0)}%</p>
            </div>
            <ProgressBar value={overallProgress} colorScheme="amber" size="md" />
        </div>

        {/* Individual Children Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children.map((child) => (
            <ChildProgressCard key={child.id} child={child} />
          ))}
        </div>
        {children.length > 2 && ( // Example: Show "All children" if more than 2
           <div className="mt-6 text-center">
             <Button variant="outline" size="sm" onClick={() => { /* navigate to all children page */ }} className="rounded-full">
                すべてのお子様の進捗を見る
             </Button>
           </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ChildrenProgressSection;