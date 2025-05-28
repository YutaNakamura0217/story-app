import React from 'react';
import { Link } from 'react-router-dom';
import { Child, RoutePath } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Tabs, { Tab } from '../ui/Tabs';
import ProgressBar from '../ui/ProgressBar';
import { PencilIcon, SparklesIcon, BookIcon, QuestionMarkCircleIcon, TrophyIcon } from '../../assets/icons';
import Badge from '../ui/Badge';

interface ChildDetailContentProps {
  child: Child;
}

interface EarnedBadge {
  id: string;
  name: string;
  icon: React.ReactElement<{ className?: string }>;
}

const ChildDetailContent: React.FC<ChildDetailContentProps> = ({ child }) => {
  // Mock data for tabs - replace with actual data fetching/props
  const recentlyReadBooks = MOCK_BOOKS.slice(0, 2);
  const thoughtfulResponses = MOCK_BOOK_QUESTIONS.slice(0,1).map(q => ({...q, answer: "とても良い質問だと思いました。たくさん考えました。"}));
  const earnedBadges: EarnedBadge[] = [
    {id: 'b1', name: "読書好きバッジ", icon: <BookIcon/>}, 
    {id: 'b2', name: "探求者バッジ", icon: <SparklesIcon/>}
  ];

  return (
    <div className="space-y-8">
      {/* Child Profile Section */}
      <section className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-amber-50/50 rounded-lg border border-amber-200">
        <Avatar src={child.avatarUrl} alt={child.name} size="xl" className="!border-amber-300" />
        <div className="flex-grow text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
            <h2 className="text-3xl font-bold text-amber-900">{child.name}</h2>
            <Button 
              as={Link} 
              to={`${RoutePath.ChildrenManage}/${child.id}/edit`} 
              variant="outline" 
              size="sm" 
              className="mt-2 sm:mt-0 rounded-full"
              leftIcon={<PencilIcon className="w-4 h-4" />}
            >
              情報を編集
            </Button>
          </div>
          <p className="text-amber-700 text-lg">{child.age}歳</p>
          <div className="mt-3">
            <p className="text-sm font-medium text-amber-800 mb-1">全体の進捗:</p>
            <ProgressBar value={child.progress} colorScheme="amber" showLabel />
             <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                {earnedBadges.slice(0,3).map(b => <Badge key={b.id} colorScheme="amber" variant="solid" icon={React.cloneElement(b.icon, {className: 'w-4 h-4'})}>{b.name}</Badge>)}
             </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation and Content */}
      <Tabs tabPanelClassName="min-h-[250px]">
        <Tab label="進捗">
          <div className="p-1">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">テーマ別進捗</h3>
            {/* Replace with actual progress data and charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MOCK_THEMES.slice(0,2).map(theme => (
                    <div key={theme.id} className="p-4 bg-amber-50 rounded-md border border-amber-100">
                        <h4 className="font-medium text-amber-700">{theme.name}</h4>
                        <ProgressBar value={Math.random()*100} colorScheme="amber" size="sm" showLabel className="mt-1"/>
                    </div>
                ))}
            </div>
            <p className="mt-6 text-amber-600 text-sm">詳細な進捗グラフやマイルストーンはここに表示されます。</p>
          </div>
        </Tab>
        <Tab label="読んだ本">
           <div className="p-1 space-y-4">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">最近読んだ本</h3>
             {recentlyReadBooks.map(book => (
                <Link key={book.id} to={`${RoutePath.Books}/${book.id}`} className="block p-3 bg-amber-50 hover:bg-amber-100 rounded-md border border-amber-100 transition-colors">
                    <h4 className="font-medium text-amber-700">{book.title}</h4>
                    <p className="text-xs text-amber-600">{book.authorName}</p>
                </Link>
             ))}
            <p className="mt-6 text-amber-600 text-sm">読書履歴やお気に入りリストはここに表示されます。</p>
          </div>
        </Tab>
        <Tab label="考えたこと">
           <div className="p-1 space-y-4">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">回答した質問</h3>
             {thoughtfulResponses.map(q => (
                <div key={q.id} className="p-3 bg-amber-50 rounded-md border border-amber-100">
                    <p className="text-sm font-medium text-amber-700">{q.text}</p>
                    <p className="text-xs text-amber-600 mt-1">回答: {q.answer}</p>
                </div>
             ))}
            <p className="mt-6 text-amber-600 text-sm">質問への回答履歴やディスカッションへの参加記録はここに表示されます。</p>
          </div>
        </Tab>
        <Tab label="バッジ">
           <div className="p-1">
            <h3 className="text-xl font-semibold text-amber-800 mb-4">獲得したバッジ</h3>
            <div className="flex flex-wrap gap-3">
                {earnedBadges.map(badge => (
                    <div key={badge.id} className="flex flex-col items-center p-3 bg-amber-50 rounded-md border border-amber-100 w-28 text-center">
                       {React.cloneElement(badge.icon, {className: 'w-8 h-8 text-amber-500 mb-1'})}
                       <span className="text-xs font-medium text-amber-700">{badge.name}</span>
                    </div>
                ))}
            </div>
            <p className="mt-6 text-amber-600 text-sm">達成した目標や獲得したバッジの一覧はここに表示されます。</p>
          </div>
        </Tab>
      </Tabs>

      {/* Optional: Recommendations Section */}
      <section className="mt-10">
        <h3 className="text-2xl font-bold text-amber-900 mb-4 tracking-tight">この子へのおすすめ絵本</h3>
        {/* Placeholder for recommended books based on child's profile/progress */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_BOOKS.slice(2, 5).map(book => (
             <div key={book.id} className="p-4 bg-amber-50 rounded-lg border border-amber-100 text-center">
                <img src={book.coverUrl} alt={book.title} className="w-24 h-32 mx-auto rounded shadow mb-2"/>
                <h4 className="text-sm font-semibold text-amber-800">{book.title}</h4>
                <Button as={Link} to={`${RoutePath.Books}/${book.id}`} variant="outline" size="sm" className="mt-2 rounded-full !text-xs">詳細を見る</Button>
             </div>
          ))}
        </div>
      </section>
    </div>
  );
};

// Mock data used inside the component for now
const MOCK_BOOKS = [
  { id: 'book1', title: 'なぜ空は青いの？', authorName: 'そら博士', coverUrl: 'https://picsum.photos/seed/book1/300/400' },
  { id: 'book2', title: '勇気の小さなタネ', authorName: 'こころ先生', coverUrl: 'https://picsum.photos/seed/book2/300/400' },
  { id: 'book3', title: 'ふしぎの箱のひみつ', authorName: 'はてな探偵', coverUrl: 'https://picsum.photos/seed/book3/300/400' },
  { id: 'book4', title: '月のうさぎと魔法の絵筆', authorName: 'つきよみ姫', coverUrl: 'https://picsum.photos/seed/book4/300/400' },
  { id: 'book5', title: '一番星みつけた', authorName: 'ほしぞら守', coverUrl: 'https://picsum.photos/seed/book5/300/400' },
];
const MOCK_THEMES = [ { id: 'theme1', name: '友情'}, {id: 'theme2', name: '勇気'}];
const MOCK_BOOK_QUESTIONS = [ {id: 'q1', text: 'このお話の主人公はどんな気持ちだったかな？'}];


export default ChildDetailContent;