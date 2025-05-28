
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, PhilosophyQuestionItem, RoutePath } from '../../types';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar'; // Assuming ProgressBar exists
import { BookIcon, AcademicCapIcon, SparklesIcon } from '../../assets/icons'; // Or other relevant icons

interface QuestionHeaderComponentProps {
  book: Book;
  question: PhilosophyQuestionItem;
}

const QuestionHeaderComponent: React.FC<QuestionHeaderComponentProps> = ({ book, question }) => {
  // Mock data for demo
  const currentQuestionNumber = 1; // This would be dynamic in a real scenario
  const totalQuestionsForBook = MOCK_BOOK_QUESTIONS.filter(q => q.difficulty === question.difficulty).length || 5; // Mock total questions
  const estimatedTime = "5-10分"; 
  const questionCategory = question.type === 'OpenEnded' ? "自由な発想" : "論理的な思考"; // Mock category

  return (
    <div className="mb-6">
      {/* Book Context */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-amber-100">
        <Link to={`${RoutePath.Books}/${book.id}`}>
          <img 
            src={book.coverUrl} 
            alt={book.title} 
            className="w-16 h-20 sm:w-20 sm:h-28 object-cover rounded-md shadow-md hover:opacity-80 transition-opacity"
          />
        </Link>
        <div>
          <p className="text-xs text-amber-600">この絵本に関する質問です:</p>
          <Link to={`${RoutePath.Books}/${book.id}`} className="hover:underline">
            <h2 className="text-xl font-semibold text-amber-800 ">{book.title}</h2>
          </Link>
          {/* Optional: Related page number placeholder */}
          {/* <p className="text-xs text-amber-600 mt-0.5">関連ページ: P.12 (モック)</p> */}
        </div>
      </div>

      {/* Question Info & Progress */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <p className="text-sm font-medium text-amber-700">
            質問 {currentQuestionNumber} / {totalQuestionsForBook}
          </p>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge colorScheme={question.difficulty === 'Easy' ? 'success' : 'warning'} size="sm">
              難易度: {question.difficulty}
            </Badge>
            <Badge colorScheme="info" size="sm" icon={<AcademicCapIcon className="w-3 h-3" />}>
              {questionCategory}
            </Badge>
            <Badge colorScheme="gray" size="sm">
              推定回答時間: {estimatedTime}
            </Badge>
          </div>
        </div>
        <div className="w-full sm:w-1/3 mt-2 sm:mt-0">
          <ProgressBar 
            value={(currentQuestionNumber / totalQuestionsForBook) * 100} 
            size="md" 
            showLabel={false} 
          />
           <p className="text-xs text-amber-600 text-right mt-0.5">進捗</p>
        </div>
      </div>
    </div>
  );
};

// Placeholder for MOCK_BOOK_QUESTIONS if not imported from constants
const MOCK_BOOK_QUESTIONS: PhilosophyQuestionItem[] = [
  {id: 'q1', text: 'このお話の主人公が一番知りたかったことは何かな？', type: 'OpenEnded', difficulty: 'Easy'},
];

export default QuestionHeaderComponent;
