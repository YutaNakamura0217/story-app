import React from 'react';
import { PhilosophyQuestionItem } from '../../types';
import Button from '../ui/Button';
import { QuestionMarkCircleIcon, ChatBubbleBottomCenterTextIcon, XCircleIcon } from '../../assets/icons';

interface PhilosophyQuestionPopupProps {
  question: PhilosophyQuestionItem;
  onClose: () => void;
  onHint: () => void;
}

const PhilosophyQuestionPopup: React.FC<PhilosophyQuestionPopupProps> = ({ question, onClose, onHint }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[60] backdrop-blur-sm">
      <div className="bg-gray-800 text-white p-6 rounded-xl shadow-2xl w-full max-w-md transform transition-all animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-amber-400 flex items-center">
            <QuestionMarkCircleIcon className="w-7 h-7 mr-2" />
            考えてみよう！
          </h3>
          <Button variant="ghost" onClick={onClose} className="!p-1 !text-gray-400 hover:!text-white">
            <XCircleIcon className="w-7 h-7" />
          </Button>
        </div>
        
        <p className="text-lg text-gray-100 mb-6 leading-relaxed">{question.text}</p>

        {/* Optional: Response Form Placeholder */}
        {/* {question.type === 'OpenEnded' && (
          <textarea className="w-full p-2 bg-gray-700 rounded border border-gray-600 mb-4 text-sm" placeholder="君の考えを書いてみよう..." rows={3}></textarea>
        )} */}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            onClick={onHint} 
            className="w-full !border-amber-500/70 !text-amber-400 hover:!bg-amber-500/10 rounded-md"
            leftIcon={<ChatBubbleBottomCenterTextIcon className="w-5 h-5"/>}
          >
            親子で話すヒント
          </Button>
          <Button 
            variant="primary" 
            onClick={onClose} 
            className="w-full bg-amber-500 hover:bg-amber-600 rounded-md"
          >
            わかった！ (閉じる)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PhilosophyQuestionPopup;