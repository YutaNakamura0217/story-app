import React from 'react';
import { PhilosophyQuestionItem } from '../../types';
import Badge from '../ui/Badge';
import { QuestionMarkCircleIcon } from '../../assets/icons';

interface PhilosophyQuestionProps {
  question: PhilosophyQuestionItem;
}

const PhilosophyQuestion: React.FC<PhilosophyQuestionProps> = ({ question }) => {
  return (
    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200 shadow-sm mb-4">
      <div className="flex items-start space-x-3">
        <QuestionMarkCircleIcon className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-base font-medium text-amber-800 mb-1">{question.text}</p>
          <div className="flex items-center space-x-2">
            <Badge colorScheme="info" size="sm">{question.type === 'OpenEnded' ? '自由記述' : '選択式'}</Badge>
            <Badge 
              colorScheme={
                question.difficulty === 'Easy' ? 'success' : 'danger'
              } 
              size="sm"
            >
              難易度: {question.difficulty}
            </Badge>
          </div>
          {question.type === 'MultipleChoice' && question.options && (
            <div className="mt-3 space-y-2">
              {question.options.map((option, index) => (
                <label key={index} className="flex items-center text-sm text-amber-700">
                  <input 
                    type="radio" 
                    name={`question-${question.id}`} 
                    value={option} 
                    className="mr-2 text-amber-600 focus:ring-amber-500 border-amber-300"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhilosophyQuestion;