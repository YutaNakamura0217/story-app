
import React, { useState, FormEvent, useRef, useEffect } from 'react';
import { DiscussionSummary, DiscussionPost } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import { ArrowLeftIcon, PaperAirplaneIcon } from '../../assets/icons'; 

interface DiscussionThreadViewProps {
  discussion: DiscussionSummary;
  posts: DiscussionPost[];
  onAddPost: (text: string) => void;
  onBackToList?: () => void; // For mobile view to go back to list
}

const DiscussionThreadView: React.FC<DiscussionThreadViewProps> = ({ discussion, posts, onAddPost, onBackToList }) => {
  const [newPostText, setNewPostText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(scrollToBottom, [posts]);

  const handleSubmitPost = async (e: FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setIsSubmitting(true);
    // Simulate API call delay for adding post
    await new Promise(resolve => setTimeout(resolve, 500)); 
    onAddPost(newPostText);
    setNewPostText('');
    setIsSubmitting(false);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ja-JP', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-amber-100 flex flex-col h-[calc(100vh-200px)] sm:h-auto sm:min-h-[600px]">
      {/* Header */}
      <div className="p-4 border-b border-amber-200 flex items-center">
        {onBackToList && (
            <Button variant="ghost" onClick={onBackToList} className="md:hidden mr-2 !p-2">
                <ArrowLeftIcon className="w-5 h-5"/>
            </Button>
        )}
        <div>
            <h2 className="text-lg font-semibold text-amber-900">{discussion.title}</h2>
            <p className="text-xs text-amber-700">
            作成者: {discussion.createdByUserName}・{discussion.participantCount}人が参加中
            </p>
        </div>
      </div>

      {/* Posts Area */}
      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-amber-50/30">
        {posts.map(post => (
          <div key={post.id} className={`flex ${post.userId === 'user123' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md p-3 rounded-xl shadow ${
                post.userId === 'user123' 
                ? 'bg-amber-500 text-white rounded-br-none' 
                : 'bg-gray-100 text-amber-900 rounded-bl-none border border-amber-100'
            }`}>
              <div className="flex items-center mb-1">
                <Avatar src={post.userAvatarUrl} alt={post.userName} size="sm" className="mr-2 !w-6 !h-6 !text-xs" />
                <span className={`text-xs font-semibold ${post.userId === 'user123' ? 'text-amber-100' : 'text-amber-800'}`}>{post.userName}</span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{post.text}</p>
              <p className={`text-xs mt-1.5 ${post.userId === 'user123' ? 'text-amber-200 text-right' : 'text-gray-500 text-left'}`}>
                {formatTimestamp(post.timestamp)}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-amber-200 bg-white">
        <form onSubmit={handleSubmitPost} className="flex items-center gap-2">
          <textarea
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
            placeholder="メッセージを入力..."
            rows={1}
            className="flex-grow p-2.5 border border-amber-300 rounded-lg shadow-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none text-sm text-amber-900"
            onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitPost(e);
                }
            }}
          />
          <Button 
            type="submit" 
            variant="primary" 
            className="rounded-lg !p-2.5" 
            isLoading={isSubmitting}
            aria-label="送信"
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DiscussionThreadView;
