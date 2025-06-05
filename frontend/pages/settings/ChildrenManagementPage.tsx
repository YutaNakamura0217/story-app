import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RoutePath } from '../../types';
import ChildManagementCard from '../../components/settings/ChildManagementCard';
import Button from '../../components/ui/Button';
import { PlusCircleIcon, IdentificationIcon } from '../../assets/icons';
import { useChildren } from '../../hooks/useChildren';

const ChildrenManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const { children, deleteChild, loading } = useChildren();

  const handleAddChild = () => {
    navigate(RoutePath.ChildAdd);
  };

  const handleDeleteChild = async (childId: string) => {
    if (window.confirm('本当にこのお子様の情報を削除しますか？この操作は元に戻せません。')) {
      try {
        await deleteChild(childId);
      } catch (err) {
        console.error('Failed to delete child:', err);
        alert('削除に失敗しました');
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 tracking-tight">
          お子さまの管理
        </h1>
        <Button 
          variant="primary" 
          onClick={handleAddChild}
          leftIcon={<PlusCircleIcon className="w-5 h-5"/>}
          className="w-full sm:w-auto rounded-full"
        >
          新しいお子さまを追加する
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : children.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => (
            <ChildManagementCard
              key={child.id}
              child={child}
              onDelete={() => handleDeleteChild(child.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 bg-amber-50/50 rounded-lg border border-amber-200">
          <IdentificationIcon className="w-20 h-20 text-amber-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-amber-800 mb-2">まだお子さまが登録されていません。</h3>
          <p className="text-amber-700 mb-6">
            お子様の情報を追加して、学習の記録や進捗管理を始めましょう。
          </p>
          <Button 
            variant="primary" 
            onClick={handleAddChild}
            leftIcon={<PlusCircleIcon className="w-5 h-5"/>}
            className="rounded-full"
            size="lg"
          >
            まずはお子さまを追加しましょう！
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChildrenManagementPage;
