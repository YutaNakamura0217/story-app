
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import Tabs, { Tab } from '../ui/Tabs';
import { Book, Review, PhilosophyQuestionItem, DiscussionSummary, RoutePath } from '../../types';
import { MOCK_DISCUSSION_SUMMARIES } from '../../constants';
import PhilosophyQuestion from './PhilosophyQuestion';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import Badge from '../ui/Badge';
import StartDiscussionModal from './StartDiscussionModal'; 
import { ChatBubbleLeftRightIcon, ArrowRightIcon, PlusIcon } from '../../assets/icons';


const StarIcon: React.FC<{ className?: string, solid?: boolean }> = ({ className, solid }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`${className || 'w-5 h-5'} ${solid ? 'text-yellow-400' : 'text-amber-200'}`}> {/* Adjusted outline star color */}
    <path fillRule="evenodd" d="M10 8.269l-1.932 3.916-4.34.63.001.001-3.139 3.056.74 4.323L10 17.765l3.87 2.033.74-4.323-3.138-3.056h-.001l-4.34-.63L10 8.269zm0-2.063l2.403 4.871 5.39.783-3.899 3.798.92 5.37L10 18.33l-4.814 2.53.92-5.37L2.207 11.86l5.39-.783L10 6.206z" clipRule="evenodd" />
     <path d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.39-3.429 3.245.995 4.725 4.211-2.234 4.211 2.234.995-4.725-3.429-3.245-4.753-.39L10.868 2.884z" />
  </svg>
);


interface BookTabsProps {
  book: Book;
  questions: PhilosophyQuestionItem[];
  reviews: Review[];
}

const OverviewContent: React.FC<{ book: Book }> = ({ book }) => (
  <div className="text-amber-700">
    <h3 className="text-xl font-semibold text-amber-900 mb-3">詳細な説明</h3>
    <p className="leading-relaxed mb-6 whitespace-pre-line">
      {book.longDescription || book.description}
    </p>
    {book.learningObjectives && book.learningObjectives.length > 0 && (
      <>
        <h3 className="text-xl font-semibold text-amber-900 mb-3">学習目標</h3>
        <ul className="list-disc list-inside space-y-1 mb-6">
          {book.learningObjectives.map((obj, idx) => <li key={idx}>{obj}</li>)}
        </ul>
      </>
    )}
  </div>
);

const QuestionsContent: React.FC<{ bookId: string, questions: PhilosophyQuestionItem[] }> = ({ bookId, questions }) => (
  <div>
    {questions.length > 0 ? (
      questions.map(q => (
        <Link 
          key={q.id} 
          to={RoutePath.QuestionAnswer.replace(':bookId', bookId).replace(':questionId', q.id)}
          className="block mb-4 last:mb-0 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
          aria-label={`質問「${q.text}」に答える`}
        >
          <PhilosophyQuestion question={q} />
        </Link>
      ))
    ) : (
      <p className="text-amber-700 text-center py-4">この本にはまだ哲学的な質問が登録されていません。</p>
    )}
  </div>
);


const ReviewsContent: React.FC<{ reviews: Review[], bookId: string }> = ({ reviews, bookId }) => {
  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 p-4 bg-amber-50 rounded-lg border border-amber-100">
        <div>
          <h3 className="text-xl font-semibold text-amber-900">レビュー概要</h3>
          {reviews.length > 0 ? (
            <div className="flex items-center mt-1">
              <span className="text-3xl font-bold text-yellow-500 mr-2">{averageRating.toFixed(1)}</span>
              <div className="flex">
                {[1,2,3,4,5].map(star => <StarIcon key={star} solid={star <= averageRating} className="w-6 h-6" />)}
              </div>
              <span className="ml-2 text-amber-700 text-sm">({reviews.length}件のレビュー)</span>
            </div>
          ) : (
             <p className="text-amber-700 text-sm mt-1">まだレビューがありません。</p>
          )}
        </div>
        <Button variant="primary" className="mt-4 sm:mt-0 rounded-full">レビューを書く</Button>
      </div>
      
      {reviews.length > 0 && (
        <div className="space-y-6">
          {reviews.map(review => (
            <div key={review.id} className="p-4 border border-amber-100 rounded-lg bg-white">
              <div className="flex items-start space-x-3">
                <Avatar src={review.userAvatarUrl} alt={review.userName} size="md" />
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-amber-900">{review.userName}</span>
                    <span className="text-xs text-amber-600">{new Date(review.date).toLocaleDateString('ja-JP')}</span>
                  </div>
                  <div className="flex mb-1">
                    {[1,2,3,4,5].map(star => <StarIcon key={star} solid={star <= review.rating} className="w-4 h-4" />)}
                  </div>
                  <p className="text-sm text-amber-700 leading-relaxed">{review.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const DiscussionsContent: React.FC<{ bookId: string }> = ({ bookId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const discussionSummaries = useMemo(() => {
    return MOCK_DISCUSSION_SUMMARIES.filter(ds => ds.bookId === bookId).slice(0, 3);
  }, [bookId]);

  const handleStartDiscussion = (title: string, initialMessage: string) => {
    console.log('New Discussion Started:', { bookId, title, initialMessage });
    // Here you would typically call an API to create the discussion
    // For now, we just log it and close the modal.
    // You might want to refresh the discussionSummaries list if it's dynamic.
  };

  return (
    <div>
      {discussionSummaries.length > 0 && (
        <div className="space-y-4 mb-6">
          <h4 className="text-lg font-semibold text-amber-800 mb-2">進行中のディスカッション</h4>
          {discussionSummaries.map(summary => (
            <div key={summary.id} className="p-4 bg-amber-50 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-shadow">
              <h5 className="font-semibold text-amber-900 mb-1">{summary.title}</h5>
              <p className="text-xs text-amber-700 mb-2 line-clamp-2">
                {summary.latestCommentPreview || summary.firstFewLines}
              </p>
              <div className="flex justify-between items-center text-xs text-amber-600">
                <span>参加者: {summary.participantCount}人</span>
                <Button 
                  as={Link} 
                  to={`${RoutePath.Books}/${bookId}${RoutePath.BookDiscussions.substring(RoutePath.BookDiscussions.lastIndexOf('/'))}#${summary.id}`}
                  variant="outline" 
                  size="sm" 
                  className="!text-xs rounded-full !py-1"
                  rightIcon={<ArrowRightIcon className="w-3 h-3" />}
                >
                  参加する
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <Button 
            variant="primary" 
            onClick={() => setIsModalOpen(true)} 
            className="rounded-full w-full sm:w-auto"
            leftIcon={<PlusIcon className="w-5 h-5"/>}
        >
            新しいディスカッションを開始
        </Button>
        <Button 
            as={Link} 
            to={`${RoutePath.Books}/${bookId}${RoutePath.BookDiscussions.substring(RoutePath.BookDiscussions.lastIndexOf('/'))}`}
            variant="outline" 
            className="rounded-full w-full sm:w-auto"
            leftIcon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
        >
            すべてのディスカッションを見る
        </Button>
      </div>

      {discussionSummaries.length === 0 && (
         <p className="text-amber-700 mt-4 text-sm text-center">
            この本に関するディスカッションはまだありません。最初のトピックを開始してみませんか？
        </p>
      )}

      <StartDiscussionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleStartDiscussion}
        bookId={bookId}
      />
    </div>
  );
};


const BookTabsComponent: React.FC<BookTabsProps> = ({ book, questions, reviews }) => {
  return (
    <Tabs 
      tabPanelClassName="min-h-[300px]" 
      tabListClassName="border-b-amber-200"
    >
      <Tab label="概要" activeClassName="border-amber-500 text-amber-600" inactiveClassName="border-transparent text-amber-700 hover:text-amber-800 hover:border-amber-300">
        <OverviewContent book={book} />
      </Tab>
      <Tab label={`質問 (${questions.length})`} activeClassName="border-amber-500 text-amber-600" inactiveClassName="border-transparent text-amber-700 hover:text-amber-800 hover:border-amber-300">
        <QuestionsContent bookId={book.id} questions={questions} />
      </Tab>
      <Tab label={`レビュー (${reviews.length})`} activeClassName="border-amber-500 text-amber-600" inactiveClassName="border-transparent text-amber-700 hover:text-amber-800 hover:border-amber-300">
        <ReviewsContent reviews={reviews} bookId={book.id} />
      </Tab>
      <Tab label="ディスカッション" activeClassName="border-amber-500 text-amber-600" inactiveClassName="border-transparent text-amber-700 hover:text-amber-800 hover:border-amber-300">
        <DiscussionsContent bookId={book.id} />
      </Tab>
    </Tabs>
  );
};

export default BookTabsComponent;
