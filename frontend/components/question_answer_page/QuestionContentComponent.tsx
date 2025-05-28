
import React from 'react';
import { PhilosophyQuestionItem } from '../../types';
import Button from '../ui/Button';
import { SpeakerWaveIcon, LightBulbIcon } from '../../assets/icons';

interface QuestionContentComponentProps {
  question: PhilosophyQuestionItem;
}

const QuestionContentComponent: React.FC<QuestionContentComponentProps> = ({ question }) => {
  return (
    <div className="space-y-6">
      {/* Main Question */}
      <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
        <h1 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-3 leading-snug">
          {question.text}
        </h1>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => alert('読み上げ機能は準備中です。')}
          leftIcon={<SpeakerWaveIcon className="w-5 h-5" />}
          className="text-amber-600 hover:text-amber-700"
        >
          質問を読み上げる
        </Button>
      </div>

      {/* Optional: Question Background Explanation */}
      {/* <div className="text-sm text-amber-700 p-3 bg-gray-50 rounded-md border border-gray-200">
        <p className="font-medium mb-1 text-amber-800">この質問の背景:</p>
        <p>この質問は、物語の核心に迫る重要な問いかけです。主人公の動機や葛藤を理解する手がかりになります。(モック説明)</p>
      </div> */}

      {/* Thinking Steps Placeholder */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-amber-800">考えるヒント</h3>
        <div className="p-3 bg-amber-50/50 rounded-md border border-amber-100 text-sm text-amber-700 space-y-1">
          <p><strong className="text-amber-600">Step 1:</strong> まず、物語の出来事を思い出してみよう。</p>
          <p><strong className="text-amber-600">Step 2:</strong> 次に、登場人物の気持ちを想像してみよう。</p>
          <p><strong className="text-amber-600">Step 3:</strong> 最後に、自分の言葉でまとめてみよう。</p>
        </div>
      </div>

      {/* Example Thoughts Placeholder */}
      <div className="p-3 bg-green-50 rounded-md border border-green-200 text-sm text-green-700 flex items-start">
        <LightBulbIcon className="w-6 h-6 mr-2 text-green-500 shrink-0 mt-0.5"/>
        <div>
            <p className="font-medium text-green-800">大丈夫、答えはひとつじゃないよ！</p>
            <p>感じたことや考えたことを自由に表現してみよう。他の人の意見を聞くのも面白い発見があるかも。</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionContentComponent;
