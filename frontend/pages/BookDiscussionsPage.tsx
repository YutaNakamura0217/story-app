
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BookDiscussionHeader from '../components/book_discussions_page/BookDiscussionHeader';
import DiscussionListItem from '../components/book_discussions_page/DiscussionListItem';
import DiscussionThreadView from '../components/book_discussions_page/DiscussionThreadView';
import StartDiscussionModal from '../components/books/StartDiscussionModal';
import Button from '../components/ui/Button';
import { Book, DiscussionSummary, DiscussionPost, RoutePath } from '../types';
import { MOCK_BOOKS, MOCK_DISCUSSION_SUMMARIES, MOCK_DISCUSSION_POSTS, MOCK_CHILDREN } from '../constants';
import { PlusIcon, ChatBubbleLeftRightIcon } from '../assets/icons';

const BookDiscussionsPage: React.FC = () => {
  const { id: bookId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [book, setBook] = useState<Book | null | undefined>(undefined);
  const [discussions, setDiscussions] = useState<DiscussionSummary[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState<DiscussionSummary | null>(null);
  const [posts, setPosts] = useState<DiscussionPost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const foundBook = MOCK_BOOKS.find(b => b.id === bookId);
    setBook(foundBook || null);

    if (foundBook) {
      const bookDiscussions = MOCK_DISCUSSION_SUMMARIES.filter(d => d.bookId === bookId)
        .sort((a,b) => new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime());
      setDiscussions(bookDiscussions);

      // Check for anchor link to pre-select a discussion
      const hash = location.hash.substring(1); // Remove #
      if (hash) {
        const discussionToSelect = bookDiscussions.find(d => d.id === hash);
        if (discussionToSelect) {
          setSelectedDiscussion(discussionToSelect);
        }
      }

    } else {
      setDiscussions([]);
    }
    setIsLoading(false);
  }, [bookId, location.hash]);

  useEffect(() => {
    if (selectedDiscussion) {
      const discussionPosts = MOCK_DISCUSSION_POSTS.filter(p => p.discussionId === selectedDiscussion.id)
        .sort((a,b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setPosts(discussionPosts);
    } else {
      setPosts([]);
    }
  }, [selectedDiscussion]);

  const handleSelectDiscussion = (discussion: DiscussionSummary) => {
    setSelectedDiscussion(discussion);
    // Optional: Update URL hash without full navigation
    // navigate(`${RoutePath.Books}/${bookId}${RoutePath.BookDiscussions.substring(RoutePath.BookDiscussions.lastIndexOf('/'))}#${discussion.id}`, { replace: true });
  };
  
  const handleStartNewDiscussion = (title: string, initialMessage: string) => {
      console.log('New Discussion Submitted on Page:', { bookId, title, initialMessage });
      // Mock adding to the list, in a real app this would be an API call and state update
      const newDiscussionSummary: DiscussionSummary = {
        id: `disc_new_${Date.now()}`,
        bookId: bookId!,
        title,
        participantCount: 1,
        latestCommentPreview: initialMessage.substring(0, 50) + "...",
        firstFewLines: initialMessage,
        lastActivity: new Date().toISOString(),
        createdByUserId: 'user123', // Mock current user
        createdByUserName: '哲学者キッズ',
      };
      const newPost: DiscussionPost = {
          id: `post_new_${Date.now()}`,
          discussionId: newDiscussionSummary.id,
          userId: 'user123',
          userName: '哲学者キッズ',
          timestamp: new Date().toISOString(),
          text: initialMessage,
      }
      setDiscussions(prev => [newDiscussionSummary, ...prev]);
      // MOCK_DISCUSSION_SUMMARIES.unshift(newDiscussionSummary) // This would modify constant, not good
      // MOCK_DISCUSSION_POSTS.push(newPost)
      setSelectedDiscussion(newDiscussionSummary); // Select the new discussion
  };
  
  const handleAddPost = (text: string) => {
    if (!selectedDiscussion) return;
    console.log('New Post Added:', { discussionId: selectedDiscussion.id, text });
     const newPost: DiscussionPost = {
          id: `post_${Date.now()}`,
          discussionId: selectedDiscussion.id,
          userId: 'user123', // Mock current user
          userName: '哲学者キッズ',
          userAvatarUrl: MOCK_CHILDREN[0]?.avatarUrl,
          timestamp: new Date().toISOString(),
          text,
      }
    setPosts(prev => [...prev, newPost]);
    // Update latestCommentPreview and lastActivity for the summary (mock)
    setDiscussions(prevDiscussions => prevDiscussions.map(d => 
        d.id === selectedDiscussion.id ? {...d, latestCommentPreview: text.substring(0,50)+'...', lastActivity: new Date().toISOString()} : d
    ));

  }


  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50"><div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!book) {
    return <div className="text-center py-10 text-amber-700">指定された絵本が見つかりません。</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Header variant="main" />
      <main className="flex-grow">
        <BookDiscussionHeader book={book} />
        <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Discussion List Area */}
            <div className={`w-full md:w-1/3 lg:w-1/4 ${selectedDiscussion ? 'hidden md:block' : 'block'}`}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-amber-900">ディスカッション一覧</h2>
                <Button 
                  variant="primary" 
                  size="sm" 
                  onClick={() => setIsModalOpen(true)}
                  leftIcon={<PlusIcon className="w-4 h-4" />}
                  className="rounded-full"
                >
                  新規作成
                </Button>
              </div>
              {discussions.length > 0 ? (
                <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                  {discussions.map(discussion => (
                    <DiscussionListItem 
                      key={discussion.id} 
                      discussion={discussion} 
                      onSelect={() => handleSelectDiscussion(discussion)}
                      isActive={selectedDiscussion?.id === discussion.id}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 px-4 bg-white rounded-xl shadow border border-amber-100">
                    <ChatBubbleLeftRightIcon className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                    <p className="text-amber-700">この本に関するディスカッションはまだありません。</p>
                    <p className="text-sm text-amber-600 mt-1">最初のトピックを開始してみましょう！</p>
                </div>
              )}
            </div>

            {/* Selected Discussion Thread Area */}
            <div className={`w-full md:w-2/3 lg:w-3/4 ${selectedDiscussion ? 'block' : 'hidden md:block'}`}>
              {selectedDiscussion ? (
                <DiscussionThreadView 
                  discussion={selectedDiscussion} 
                  posts={posts} 
                  onAddPost={handleAddPost}
                  onBackToList={() => setSelectedDiscussion(null)} // For mobile view
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center p-8 bg-white rounded-xl shadow border border-amber-100">
                  <ChatBubbleLeftRightIcon className="w-20 h-20 text-amber-300 mb-6" />
                  <h3 className="text-xl font-semibold text-amber-800">ディスカッションを選択してください</h3>
                  <p className="text-amber-700 max-w-sm">
                    左側のリストからディスカッションを選択して内容を表示するか、新しいディスカッションを開始してください。
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <StartDiscussionModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleStartNewDiscussion}
        bookId={bookId!}
      />
      <Footer variant="main" />
    </div>
  );
};

export default BookDiscussionsPage;
