import React, { useState } from 'react';
import FavoriteBookCard from './FavoriteBookCard';
import type { Book } from '../types';
import type { View } from '../constants';

interface FavoritePageProps {
  onNavigate: (view: View, data?: any) => void;
}

const initialFavoriteBooksData: Book[] = [
  { 
    id: 'fav1', 
    title: "ふしぎなツリーハウス", 
    author: "エミリー・カーター", 
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHc7fvhkcynyVKn1BU1Tqvt6b4pOdukTawNN8Upnnxe54852CNqoZ2vu4dNoa_A8Nifp3dFWU2Kmg0-QKyPMCHRaFsxQKuzackfnaJhXIU65nxWnm7xJeXPvCtd1uE6eI3HA3y1nm6vvVoKQBbupOqMP0mEfQCizgPPRSNlJEwstogQphxRz8CFoQi6tnTpn7EzcwccDwlBxf6BWs0TYUfm3wMRozi5qJxKte5TvBVqFAiFWF46Im1_V5xXaU6Uxxr6Qs3YwBD7jgC",
    description: "A magical treehouse takes two curious kids on amazing adventures through time and space. Join them as they explore dinosaurs, knights, and pirates!"
  },
  { 
    id: 'fav2', 
    title: "リリーとトムの冒険", 
    author: "デイビッド・ミラー", 
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMCT7m4oLE5VzSWuse1QlJImIUHQXTA8Oq0KNzacQy2EEALz2KV2ZAtOhFqar-EJG1DI4qtxhrG0i9mhKbnI-zBEEUE6SsHBZxORET25CWT1NN7z6HfUOiB5pKRIiMogwl4xwWVhOr8s3DhtZwxoMjoKJ46GKwc7OIWkZRkcSiEgCL51OxhdIyIU0iBmnHyDQ9uwsT0Xx9q0NDUMDpQ_nK2GpNAl-Krjuu6BNBa1hicgw6WXsyYt35l0O8SDMXjmHg-0pC8qBvNac2",
    description: "Lily and Tom discover a hidden map that leads them on an exciting treasure hunt. They'll need all their wits to solve the clues!"
  },
  // Add descriptions for other favorite books if available
  { 
    id: 'fav3', 
    title: "輝けない小さな星", 
    author: "サラ・ジョンソン", 
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDpJnUb7hkU_JU8g8a81vdy_wI2OM2xwUcP0JV4vaXG79_d9tyhT5VzMAtZ0MKfy3Diy6FoXmI9M6zD4vauPtjVnX9p78XWgWZNlLWrxQSaav82attVqf86nDo9gD6zL41ak0D_YlP4ggf9n8y4eQ50g3QveNTIhpF1VloC_NjTNL2-U3k-2CVBza-ToHeYxV4bEmj24xgn00ZZ-DZMvTqBm7tjpOPrNaDAroAULA7pzeRx4EfgTN_XqPH3WZMPZJndKXuVtP4LZUM7",
    description: "A little star who can't shine as brightly as the others learns that everyone has a unique way to sparkle."
  },
  { 
    id: 'fav4', 
    title: "なくなったおもちゃの謎", 
    author: "マイケル・ブラウン", 
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfTifF8XYN9fawY2yOqRXywJcztv1NEr3uCYBhVY0WTynTvWUeVKOoo8WTfVamjFIDhLUS5WHlXHpN9HPahrJO0b70wYbq49PzORANX2-RHLt4vPlFOZ_zEiLNYXRKR-Dy8yvxInmJYZEutSYbKqEz9Jy-50jj9rMcdi6YNWiJ8utG64vhOW3gfVSXBv_Ip6WmUlJMmKzej_uCT5Xh_L_UIkIZwUoSnQrn2d0RfyK0dmkzqrJWXIwK8EQi_QO4iDXpaXQWYTqLq-Bn",
    description: "When a favorite toy goes missing, a group of animal friends team up to solve the mystery."
  },
  { 
    id: 'fav5', 
    title: "眠たいドラゴン", 
    author: "ジェシカ・デイビス", 
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2M_YDRtXiw9OYu30HfnZPN9Rb6VCU3mhOxyMI0M_U7sIyGWyTFibFV3V36gGY91MnfSS032_7tHc-JmWc5PuEII0b4lBV6aekSAMutcIY4ezapVKYGlIGkPCsUqaPFC7p9FQZ22kMbYK6a_v1blexDgHG2a9Ljer8kMQGXhrPqNKFF0edredC_4vy-uGSEVNzbNmmAHxbIyjA_xExJKzKJddxrzWZTUr9EbGlhKI83u7Twku_Htx6OylEO1uTw-p9S0Micz6A28cP",
    description: "A little dragon is too sleepy to play, but his friends find a way to have fun while he rests."
  },
  { 
    id: 'fav6', 
    title: "勇敢な小さなリス", 
    author: "ロバート・ウィルソン", 
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHebx80fBf4CjNMxKUwXKTSPW35Ac-VwoWF9xFiAHhb8lVsl43moUZQIXgqq1a_w9ZKmaWWcSXtGyEny0AtxXpYceSTnsRn-oiYA3Fdefmn1E1hJY30e2Ys3PrzNi1CynyHSZWtRdais6C0myBJ6Y8SArtpRUN7vBGumUjMD2B8j2wESdk7WDEnY2FW1zid3PxJv-nDh9TJLs9nPLmE-k_1xsDtu_xK-eSwICQpRlBj-uOyJvwOskWMjs0_HTiddEkkVF5N2GBza7w",
    description: "A small squirrel must find his courage to help his family prepare for winter."
  },
];

const FavoritePage: React.FC<FavoritePageProps> = ({ onNavigate }) => {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>(initialFavoriteBooksData);

  const handleRemoveFavorite = (bookId: string) => {
    setFavoriteBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
  };

  const displayedBooks = favoriteBooks;

  return (
    <main className="flex-1 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 py-8 sm:py-12">
      <div className="layout-content-container mx-auto max-w-5xl flex flex-col">
        <div className="flex flex-wrap justify-between items-center gap-4 p-4 mb-6 sm:mb-8">
          <h2 className="text-amber-700 text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
            お気に入り
          </h2>
          <span className="text-amber-400 text-sm sm:text-base">
            {displayedBooks.length}冊の絵本
          </span>
        </div>

        {displayedBooks.length === 0 ? (
          <div className="text-center py-10">
            <i className="material-icons !text-6xl text-amber-300 mb-4">favorite_border</i>
            <p className="text-amber-600 text-xl">お気に入りの絵本はまだありません。</p>
            <p className="text-amber-500 mt-2">素敵な絵本を見つけて、お気に入りに追加しましょう！</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 p-2 sm:p-4" role="list">
            {displayedBooks.map((book) => (
              <FavoriteBookCard 
                key={book.id} 
                book={book} 
                onRemoveFavorite={handleRemoveFavorite}
                onNavigate={onNavigate} 
              />
            ))}
          </div>
        )}

        {favoriteBooks.length > 0 && (
          <div className="flex justify-center mt-8">
            <button 
              className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-6 rounded-lg shadow hover:shadow-md transition-all duration-300 ease-in-out flex items-center gap-2"
            >
              もっと見る
              <i className="material-icons !text-lg">expand_more</i>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritePage;