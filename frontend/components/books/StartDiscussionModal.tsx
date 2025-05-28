import React, { useState, FormEvent } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { XIcon, ChatBubbleLeftRightIcon } from '../../assets/icons'; // Assuming XIcon exists for close

interface StartDiscussionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, initialMessage: string) => void;
  bookId: string; // To associate discussion with a book
}

const StartDiscussionModal: React.FC<StartDiscussionModalProps> = ({ isOpen, onClose, onSubmit, bookId }) => {
  const [title, setTitle] = useState('');
  const [initialMessage, setInitialMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('ディスカッションのタイトルを入力してください。');
      return;
    }
    if (!initialMessage.trim()) {
      setError('最初のメッセージを入力してください。');
      return;
    }
    setError('');
    onSubmit(title, initialMessage);
    setTitle('');
    setInitialMessage('');
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg border border-amber-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-amber-900 flex items-center">
            <ChatBubbleLeftRightIcon className="w-6 h-6 mr-2 text-amber-500" />
            新しいディスカッションを開始
          </h2>
          <Button variant="ghost" onClick={onClose} className="!p-1.5">
            <XIcon className="w-6 h-6 text-amber-700 hover:text-amber-900" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-sm text-red-600 bg-red-100 p-2 rounded-md text-center">{error}</p>}
          <Input
            id="discussionTitle"
            label="ディスカッションのタイトル"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例: この本のテーマについて話したい"
            required
            className="bg-amber-50/50"
          />
          <div>
            <label htmlFor="initialMessage" className="block text-sm font-medium text-amber-700 mb-1">
              最初のメッセージ
            </label>
            <textarea
              id="initialMessage"
              value={initialMessage}
              onChange={(e) => setInitialMessage(e.target.value)}
              rows={4}
              placeholder="みんなで話し合いたいことを書き出してみましょう。"
              required
              className="block w-full px-3 py-2 border border-amber-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm bg-amber-50/50 text-amber-900"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-full">
              キャンセル
            </Button>
            <Button type="submit" variant="primary" className="rounded-full">
              ディスカッションを開始
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StartDiscussionModal;