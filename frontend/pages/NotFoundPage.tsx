
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { RoutePath } from '../types';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { QuestionMarkCircleIcon } from '../assets/icons'; // Or a more fitting icon

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50">
      <Header variant="simple" />
      <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
        {/* Using a placeholder icon, image can be re-added if preferred */}
        <QuestionMarkCircleIcon className="w-32 h-32 text-amber-300 mb-8" />
        {/* <img src="https://picsum.photos/seed/404page/400/300" alt="迷子のイラスト" className="w-64 h-auto mb-8 rounded-lg shadow-md"/> */}
        <h1 className="text-6xl font-bold text-amber-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-amber-900 mb-3">お探しのページが見つかりませんでした</h2>
        <p className="text-amber-700 mb-8 max-w-md">
          申し訳ありませんが、リクエストされたページは存在しないか、移動された可能性があります。
          URLをご確認いただくか、ホームページへお戻りください。
        </p>
        <Button as={Link} to={RoutePath.Home} size="lg" className="rounded-full">
          ホームページへ戻る
        </Button>
      </div>
      <Footer variant="simple" />
    </div>
  );
};

export default NotFoundPage;