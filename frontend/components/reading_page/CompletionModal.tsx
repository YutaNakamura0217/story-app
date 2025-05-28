import React from 'react';
import Button from '../ui/Button';
import { TrophyIcon, BookIcon, ArrowUturnLeftIcon } from '../../assets/icons';

interface CompletionModalProps {
  bookTitle: string;
  onClose: () => void; // Typically navigates back to book detail or dashboard
  onFindNextBook: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ bookTitle, onClose, onFindNextBook }) => {
  // Mock data, replace with actual data if available
  const readingTime = Math.floor(Math.random() * 10) + 5; // Random minutes
  const earnedBadgeName = "読書名人バッジ"; // Example badge

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[70] backdrop-blur-md">
      <div className="bg-gradient-to-br from-amber-700 via-amber-600 to-orange-700 text-white p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-lg text-center transform transition-all animate-fadeIn scale-up-center">
        <TrophyIcon className="w-20 h-20 sm:w-24 sm:h-24 text-yellow-400 mx-auto mb-4 animate-bounce" />
        
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">読み終わったね！おめでとう！</h2>
        <p className="text-amber-200 text-sm sm:text-base mb-1">
          「<span className="font-semibold text-amber-100">{bookTitle}</span>」を最後まで読みました。
        </p>
        
        <div className="my-6 p-4 bg-black/20 rounded-lg space-y-2 text-sm">
          <p>読書時間: 約 <span className="font-semibold text-yellow-300">{readingTime}分</span></p>
          {earnedBadgeName && <p>獲得バッジ: <span className="font-semibold text-yellow-300">{earnedBadgeName}</span></p>}
        </div>

        <p className="text-amber-100 mb-6 text-base sm:text-lg">
          素晴らしい探求でした！次の冒険は何にする？
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="w-full sm:w-auto !border-amber-300 !text-amber-100 hover:!bg-amber-500/30 rounded-lg"
            leftIcon={<ArrowUturnLeftIcon className="w-5 h-5" />}
          >
            書籍詳細へ戻る
          </Button>
          <Button 
            variant="primary" 
            onClick={onFindNextBook} 
            className="w-full sm:w-auto !bg-yellow-400 hover:!bg-yellow-500 !text-amber-900 rounded-lg"
            leftIcon={<BookIcon className="w-5 h-5" />}
          >
            次の絵本を探す
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;