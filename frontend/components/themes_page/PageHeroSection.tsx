import React from 'react';
// Optional: Add an illustration component or img tag if you have one.
// For now, focusing on text and background.

const PageHeroSection: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 text-center bg-gradient-to-br from-amber-200 via-amber-100 to-amber-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-amber-900 mb-4 tracking-tight leading-tight">
          どんなことを考えてみる？
        </h1>
        <p className="text-lg sm:text-xl text-amber-700 max-w-3xl mx-auto leading-relaxed">
          「自分」「友達」「世界」… いろんな「なぜ？」を探検しよう！<br />
          気になるテーマを見つけて、心と頭の冒険に出かけよう。
        </p>
        {/* 
        <div className="mt-8">
          <img src="/path-to-illustration.svg" alt="子供たちが考えているイラスト" className="mx-auto h-48 w-auto" />
        </div> 
        */}
      </div>
    </section>
  );
};

export default PageHeroSection;