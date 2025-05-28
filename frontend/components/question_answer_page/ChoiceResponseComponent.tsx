
import React from 'react';
import { PhilosophyQuestionItem } from '../../types';
import { ListBulletIcon } from '../../assets/icons'; // Using ListBullet as a generic choice icon

interface ChoiceResponseComponentProps {
  question: PhilosophyQuestionItem;
}

const ChoiceResponseComponent: React.FC<ChoiceResponseComponentProps> = ({ question }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 text-center">
      <ListBulletIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h4 className="text-lg font-semibold text-gray-700 mb-2">選んで答える</h4>
      <p className="text-sm text-gray-500">
        この機能は現在準備中です。
        {question.type === 'MultipleChoice' ? ' 選択肢が表示される予定です。' : ' この質問は選択式ではありません。'}
      </p>
      {/* Placeholder for choice options and follow-up questions */}
    </div>
  );
};

export default ChoiceResponseComponent;
