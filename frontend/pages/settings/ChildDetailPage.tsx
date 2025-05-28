import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Child, RoutePath } from '../../types';
import { MOCK_CHILDREN } from '../../constants'; // Assuming MOCK_CHILDREN is available
import ChildDetailContent from '../../components/settings/ChildDetailContent';
import Button from '../../components/ui/Button';
import { ArrowUturnLeftIcon } from '../../assets/icons';

const ChildDetailPage: React.FC = () => {
  const { id: childId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (childId) {
      const foundChild = MOCK_CHILDREN.find(c => c.id === childId);
      setChild(foundChild || null);
    }
    setLoading(false);
  }, [childId]);

  if (loading) {
    return <div className="text-center py-10">お子様の情報を読み込み中...</div>;
  }

  if (!child) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 mb-4">指定されたお子様が見つかりません。</p>
        <Button onClick={() => navigate(RoutePath.ChildrenManage)} leftIcon={<ArrowUturnLeftIcon />}>
          お子さまの管理へ戻る
        </Button>
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
        <ChildDetailContent child={child} />
    </div>
  );
};

export default ChildDetailPage;
