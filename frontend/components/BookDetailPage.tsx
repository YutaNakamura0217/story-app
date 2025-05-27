import React from 'react';
import type { Book, Review } from '../types';
import type { View } from '../constants';
import { IconBookOpen, IconPlayCircle, IconArrowRight } from './icons/PhosphorIcons';
import StarRating from './StarRating';
import ReviewCard from './ReviewCard';

interface BookDetailPageProps {
  book: Book;
  onNavigate: (view: View, data?: any) => void;
}

// Mock data for reviews, to be associated with the book passed in props
const mockReviews: Review[] = [
  {
    id: 'rev1',
    author: { name: 'ソフィア・グリーン', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcB61KY0afFLiLxV6EagcCCTZk_mRlYOQgULG1oG95s09YM0zyWXaA0AADPl13ImyrsvU6nqcs0kIoo0mJSXe_ka1WBmi6fNHPItmx6Tm0QaWgkjl25cHQ8lXRk_8q6I8elyHJ7oFHyiabWwcVGj-gRXuI7-v2I0SO51iQoDrJDkGPYRZapUAQS8JIk1VtGHJzV8xXEUl6oRXFRQxTt05iqx3wYyfYDcfzZzbMDEfb5msOb0NH-qrEGDqbYL8RJBVF4OXcN4RlH7Y7' },
    date: '2023年8月15日',
    rating: 5,
    text: 'この本は本当に素晴らしいです！娘はイラストが大好きで、物語もとても魅力的です。若い読者には強くお勧めします。',
    likes: 5,
    dislikes: 1,
  },
  {
    id: 'rev2',
    author: { name: 'リアム・カーター', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATNEe-vAi4RZsr_M5yewV0mclyX-RFffcaWXl4jWZyyiJD0U4s_8steowgJ32XNbUCxYxfM5V_qs9kFUacR44mkbTiw6ZeVeI8pW19nXzcU5jwqDUnehy_QyYYCRqeBbHJDi3rVX5gwYSpHxSz7ArXs96i9VkDgZu-zNikOqgeYOjuqKoLH5dvIgG3OiVoEnVjgBvchIlVuMRUox4KTP8F9WhshkylZ0M0NOemV9ksP0eEI8mY7zsCRPdEZIQEKjzAXRdj0SWA1py8' },
    date: '2023年7月22日',
    rating: 4,
    text: '良いメッセージの甘い物語です。息子は楽しんでいましたが、一部の場面は彼には少し遅かったです。',
    likes: 2,
    // dislikes explicitly not provided for variation
  },
  {
    id: 'rev3',
    author: { name: 'オリビア・ベネット', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAONDarrzk9Dl1k4f7svDszjQ9GlqZrGGSzSMpV4CLE5nFFMCy1zIuXuvpxjfUdevD65ZjFwlIdjHXGiDu_44PBhayTZM34-X7rmMwTYvsD6tDUtf6oQi6MUIEp0inHxuDQywYCXXtqy0ENTKQj9z9utQXND68a_buKhVcNvvHernEIoB8m4bYhVONmIuRA35Vs0pE0k7A7xgMZaShrhKCR6OOQsqSbt7oLZuV479CERl05G-7IIvtb5NABD4ViYlyUuoWUXIUYWkZC' },
    date: '2023年6月10日',
    rating: 5,
    text: '勇気と優しさについて貴重な教訓を教えてくれる素晴らしい本です。キャラクターは愛らしく、プロットはテンポが良いです。',
    likes: 7,
  }
];

const BookDetailPage: React.FC<BookDetailPageProps> = ({ book, onNavigate }) => {
  const bookDetails = [
    { label: '対象年齢', value: book.ageRange || 'N/A' },
    { label: '出版社', value: book.publisher || 'N/A' },
    { label: '出版日', value: book.publishDate || 'N/A' },
    { label: '言語', value: book.language || 'N/A' },
    { label: 'ページ数', value: book.pages || 'N/A', fullWidth: true },
  ];
  
  // Mock rating distribution
  const ratingDistribution = [
    { stars: 5, percentage: 70 }, { stars: 4, percentage: 20 },
    { stars: 3, percentage: 5 }, { stars: 2, percentage: 3 },
    { stars: 1, percentage: 2 },
  ];

  return (
    <main className="px-4 sm:px-10 md:px-20 lg:px-40 flex flex-1 justify-center py-8">
      <div className="layout-content-container flex flex-col max-w-4xl flex-1 gap-8">
        <nav aria-label="Breadcrumb" className="px-4">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onNavigate('home');}} 
                className="text-slate-500 hover-primary-color transition-colors"
              >
                ホーム
              </a>
            </li>
            <li><span className="text-amber-300">/</span></li>
            <li><span className="text-slate-800 font-medium">{book.title}</span></li>
          </ol>
        </nav>

        <section className="p-4 sm:p-6 bg-white rounded-xl shadow-lg @container">
          <div className="flex flex-col @lg:flex-row @lg:items-start gap-6">
            <div className="w-full @lg:w-2/5">
              <div 
                className="w-full aspect-[3/4] bg-center bg-no-repeat bg-cover rounded-lg shadow-md" 
                style={{ backgroundImage: `url("${book.imageUrl}")` }}
                aria-label={`${book.title} cover image`}
              ></div>
            </div>
            <div className="flex w-full @lg:w-3/5 flex-col gap-4 py-2">
              <h2 className="text-slate-900 text-3xl font-bold tracking-tight">{book.title}</h2>
              {book.author && <p className="text-slate-600 text-base">作：{book.author}</p>}
              <p className="text-slate-700 text-base leading-relaxed">
                {book.description || 'No description available.'}
              </p>
              <div className="mt-auto pt-4 flex flex-col sm:flex-row gap-3">
                <button className="bg-primary-color text-white px-6 py-3 rounded-lg font-semibold hover-bg-primary-color hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2">
                  <IconBookOpen size={20} />
                  ライブラリに追加
                </button>
                <button className="border border-primary-color text-primary-color px-6 py-3 rounded-lg font-semibold hover-bg-primary-color hover:text-white transition-colors flex items-center justify-center gap-2">
                  <IconPlayCircle size={20} />
                  今すぐ読む
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="p-4 sm:p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-slate-900 text-xl font-bold tracking-tight mb-4">この絵本について</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {bookDetails.map(detail => (
              <div key={detail.label} className={`border-t border-t-amber-200 py-4 ${detail.fullWidth ? 'sm:col-span-2' : ''}`}>
                <p className="text-slate-500 text-sm font-medium">{detail.label}</p>
                <p className="text-slate-800 text-base">{detail.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 sm:p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-slate-900 text-xl font-bold tracking-tight mb-6">レビュー</h3>
          {book.averageRating && book.reviewCount && (
            <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 mb-8">
              <div className="flex flex-col items-center sm:items-start gap-1">
                <p className="primary-color text-5xl font-black leading-tight">{book.averageRating.toFixed(1)}</p>
                <StarRating rating={book.averageRating} size="20px" />
                <p className="text-slate-600 text-sm">{book.reviewCount}件のレビュー</p>
              </div>
              <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-1.5">
                {ratingDistribution.map(item => (
                  <React.Fragment key={item.stars}>
                    <p className="text-slate-700 text-sm font-medium">{item.stars}</p>
                    <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-amber-100">
                      <div className="rounded-full bg-primary-color" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                    <p className="text-slate-500 text-sm text-right">{item.percentage}%</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
          
          <div className="space-y-8">
            {mockReviews.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>

          <button className="mt-8 w-full sm:w-auto text-primary-color border border-primary-color px-6 py-3 rounded-lg font-semibold hover-bg-primary-color hover:text-white transition-colors flex items-center justify-center gap-2">
            レビューをもっと見る
            <IconArrowRight size={16} />
          </button>
        </section>
      </div>
    </main>
  );
};

export default BookDetailPage;