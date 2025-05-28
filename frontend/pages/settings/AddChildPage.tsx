import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddChildForm from '../../components/settings/AddChildForm';
import Button from '../../components/ui/Button';
import { RoutePath } from '../../types';
import { ArrowUturnLeftIcon } from '../../assets/icons';

const AddChildPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button 
        variant="ghost" 
        onClick={() => navigate(RoutePath.ChildrenManage)} 
        className="mb-6 text-amber-600 hover:text-amber-700"
        leftIcon={<ArrowUturnLeftIcon className="w-5 h-5" />}
      >
        お子さまの管理へ戻る
      </Button>
      <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 tracking-tight">
        新しいお子さまの追加
      </h1>
      <AddChildForm />
    </div>
  );
};

export default AddChildPage;
