import React from 'react';

const PageTitleSection: React.FC = () => {
  return (
    <section className="py-8 text-center bg-gradient-to-b from-amber-100 via-amber-50 to-transparent">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-3 tracking-tight">
          さがしてみよう、こころの絵本
        </h1>
        <p className="text-lg text-amber-700 max-w-2xl mx-auto">
          たくさんの絵本の中から、今日の1冊を見つけよう！哲学のテーマ、年齢、キーワードで検索できます。
        </p>
      </div>
    </section>
  );
};

export default PageTitleSection;