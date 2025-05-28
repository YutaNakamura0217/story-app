
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import QuestionHeaderComponent from '../components/question_answer_page/QuestionHeaderComponent';
import QuestionContentComponent from '../components/question_answer_page/QuestionContentComponent';
import ResponseAreaComponent from '../components/question_answer_page/ResponseAreaComponent';
import SupportAreaComponent from '../components/question_answer_page/SupportAreaComponent';
import NavigationAreaComponent from '../components/question_answer_page/NavigationAreaComponent';
import { Book, PhilosophyQuestionItem, RoutePath } from '../types';
import { MOCK_BOOKS, MOCK_BOOK_QUESTIONS } from '../constants';
import { useAuth } from '../hooks/useAuth';

const QuestionAnswerPage: React.FC = () => {
  const { bookId, questionId } = useParams<{ bookId: string; questionId: string }>();
  const { user } = useAuth();

  const [book, setBook] = useState<Book | null | undefined>(undefined);
  const [question, setQuestion] = useState<PhilosophyQuestionItem | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (bookId && questionId) {
      const foundBook = MOCK_BOOKS.find(b => b.id === bookId);
      const foundQuestion = MOCK_BOOK_QUESTIONS.find(q => q.id === questionId);
      
      setBook(foundBook || null);
      setQuestion(foundQuestion || null);
    } else {
      setBook(null);
      setQuestion(null);
    }
    setIsLoading(false);
  }, [bookId, questionId]);

  const handleAnswerSubmit = (answerText: string) => {
    if (!book || !question || !user) return;
    // In a real app, this would be an API call.
    console.log('Answer Submitted:', {
      userId: user.id,
      bookId: book.id,
      questionId: question.id,
      answerText,
      timestamp: new Date().toISOString(),
    });
    alert('回答が（コンソールに）保存されました！');
    // Potentially navigate to next question or back to book detail.
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-amber-50">
        <Header variant="main" />
        <main className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </main>
        <Footer variant="main" />
      </div>
    );
  }

  if (!book || !question) {
    // Could redirect to NotFoundPage or show a specific error message
    return <Navigate to={RoutePath.Books} replace />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Header variant="main" />
      <main className="flex-grow container mx-auto max-w-screen-lg px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-2xl border border-amber-100">
          <QuestionHeaderComponent book={book} question={question} />
          <hr className="my-6 border-amber-200" />
          <QuestionContentComponent question={question} />
          <hr className="my-6 border-amber-200" />
          <ResponseAreaComponent question={question} onSubmitTextAnswer={handleAnswerSubmit} />
          <hr className="my-6 border-amber-200" />
          <SupportAreaComponent />
          <hr className="my-6 border-amber-200" />
          <NavigationAreaComponent 
            onSaveAndContinue={() => console.log("Save and Continue Clicked (Not Implemented)")}
          />
        </div>
      </main>
      <Footer variant="main" />
    </div>
  );
};

export default QuestionAnswerPage;
