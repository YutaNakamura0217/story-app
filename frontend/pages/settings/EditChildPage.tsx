import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EditChildForm from '../../components/settings/EditChildForm';
import Button from '../../components/ui/Button';
import { RoutePath, Child } from '../../types';
import { MOCK_CHILDREN } from '../../constants';
import { ArrowUturnLeftIcon } from '../../assets/icons';

const EditChildPage: React.FC = () => {
  const navigate = useNavigate();
  const { id: childId } = useParams<{ id: string }>();
  const [childToEdit, setChildToEdit] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (childId) {
      const foundChild = MOCK_CHILDREN.find(c => c.id === childId);
      setChildToEdit(foundChild || null);
    }
    setLoading(false);
  }, [childId]);

  if (loading) {
    return <div className="text-center py-10">お子様の情報を読み込み中...</div>;
  }

  if (!childToEdit) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 mb-4">指定されたお子様が見つかりません。</p>
        <Button onClick={() => navigate(RoutePath.ChildrenManage)}>お子さまの管理へ戻る</Button>
      </div>
    );
  }

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
        お子さま情報の編集
      </h1>
      <EditChildForm child={childToEdit} />
    </div>
  );
};

export default EditChildPage;
