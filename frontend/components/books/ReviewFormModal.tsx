import React, { useState, FormEvent } from 'react';
import Button from '../ui/Button';
import { XIcon, StarIcon } from '../../assets/icons';

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, text: string) => void;
}

const ReviewFormModal: React.FC<ReviewFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      setError('星の数を選択してください');
      return;
    }
    setError('');
    onSubmit(rating, text);
    setRating(0);
    setText('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md border border-amber-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-amber-900">レビューを書く</h2>
          <Button variant="ghost" onClick={onClose} className="!p-1.5">
            <XIcon className="w-6 h-6 text-amber-700 hover:text-amber-900" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md text-center">{error}</p>}
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`${star}星を選択`}
              >
                <StarIcon className={`w-8 h-8 ${star <= rating ? 'text-yellow-400' : 'text-amber-200'}`} solid={star <= rating} />
              </button>
            ))}
          </div>
          <div>
            <label htmlFor="reviewText" className="block text-sm font-medium text-amber-700 mb-1">感想</label>
            <textarea
              id="reviewText"
              value={text}
              onChange={e => setText(e.target.value)}
              rows={4}
              className="block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm bg-amber-50/50 text-amber-900"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">キャンセル</Button>
            <Button type="submit" variant="primary" className="rounded-full">投稿</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewFormModal;
