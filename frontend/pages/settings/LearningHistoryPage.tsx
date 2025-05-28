import React, { useState, useMemo } from 'react';
import LearningHistoryItem from '../../components/settings/LearningHistoryItem';
import { LearningActivity, Child } from '../../types';
import { MOCK_CHILDREN } from '../../constants'; // Assuming MOCK_CHILDREN exists
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import { ClockIcon } from '../../assets/icons';

// Mock learning activities
const MOCK_ACTIVITIES: LearningActivity[] = [
  { id: 'act1', date: new Date(Date.now() - 86400000 * 1).toISOString(), childId: 'child1', childName: 'はなちゃん', childAvatarUrl: MOCK_CHILDREN[0]?.avatarUrl, activityType: 'book_read', description: '『なぜ空は青いの？』を読み終えました。', link: '/books/book1' },
  { id: 'act2', date: new Date(Date.now() - 86400000 * 2).toISOString(), childId: 'child2', childName: 'たろうくん', childAvatarUrl: MOCK_CHILDREN[1]?.avatarUrl, activityType: 'question_answered', description: '「勇気とは何か？」の質問に答えました。', link: '/questions/q_courage1/answer' },
  { id: 'act3', date: new Date(Date.now() - 86400000 * 3).toISOString(), childId: 'child1', childName: 'はなちゃん', childAvatarUrl: MOCK_CHILDREN[0]?.avatarUrl, activityType: 'badge_earned', description: '「探求者バッジ」を獲得しました！' },
  { id: 'act4', date: new Date(Date.now() - 86400000 * 5).toISOString(), activityType: 'note_taken', description: '『ふしぎの箱のひみつ』についてメモを取りました。 (保護者アカウント全体)' },
];


const LearningHistoryPage: React.FC = () => {
  const [selectedChildId, setSelectedChildId] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');

  const childOptions = [
    { value: '', label: 'すべてのお子さま' },
    ...MOCK_CHILDREN.map(child => ({ value: child.id, label: child.name })),
  ];

  const filteredActivities = useMemo(() => {
    return MOCK_ACTIVITIES.filter(activity => {
      const activityDate = new Date(activity.date);
      const from = dateFrom ? new Date(dateFrom) : null;
      const to = dateTo ? new Date(dateTo) : null;

      if (selectedChildId && activity.childId !== selectedChildId) return false;
      if (from && activityDate < from) return false;
      if (to) { // If 'to' date is set, include the entire day
          const endOfDayTo = new Date(to);
          endOfDayTo.setHours(23, 59, 59, 999);
          if (activityDate > endOfDayTo) return false;
      }
      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedChildId, dateFrom, dateTo]);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-6 tracking-tight">
        学習のあしあと
      </h1>

      <section className="mb-8 p-4 sm:p-6 bg-amber-50/50 rounded-lg border border-amber-200 space-y-4">
        <h2 className="text-lg font-semibold text-amber-800 mb-3">絞り込み</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            id="childFilter"
            label="お子さまを選択"
            options={childOptions}
            value={selectedChildId}
            onChange={(e) => setSelectedChildId(e.target.value)}
            className="bg-white"
          />
          <Input
            id="dateFrom"
            label="開始日"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="bg-white"
          />
          <Input
            id="dateTo"
            label="終了日"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="bg-white"
          />
        </div>
      </section>

      <section>
        {filteredActivities.length > 0 ? (
          <div className="space-y-6">
            {filteredActivities.map(activity => (
              <LearningHistoryItem key={activity.id} activity={activity} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 px-4">
            <ClockIcon className="w-20 h-20 text-amber-300 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-amber-800 mb-2">学習の記録がまだありません。</h3>
            <p className="text-amber-700">
              絵本を読んだり、質問に答えたりすると、ここに記録が表示されます。
            </p>
          </div>
        )}
        {/* TODO: Add PaginationControls if many activities */}
      </section>
    </div>
  );
};

export default LearningHistoryPage;
