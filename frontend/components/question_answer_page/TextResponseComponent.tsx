
import React, { useState } from 'react';
import { PhilosophyQuestionItem } from '../../types';
import Button from '../ui/Button';
import { PencilSquareIcon, SpeakerWaveIcon, SparklesIcon } from '../../assets/icons';

interface TextResponseComponentProps {
  question: PhilosophyQuestionItem;
  onSubmit: (answerText: string) => void;
}

const TextResponseComponent: React.FC<TextResponseComponentProps> = ({ question, onSubmit }) => {
  const [answerText, setAnswerText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const characterLimit = 500; // Example character limit

  const handleSubmit = async () => {
    if (!answerText.trim()) {
      alert("回答を入力してください。");
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 700));
    onSubmit(answerText);
    setIsSubmitting(false);
    // Optionally clear text: setAnswerText('');
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="textAnswer" className="block text-sm font-medium text-amber-700 mb-1">
          あなたの考えを自由に入力してください:
        </label>
        <textarea
          id="textAnswer"
          rows={6}
          value={answerText}
          onChange={(e) => setAnswerText(e.target.value)}
          placeholder="「なぜそう思ったのかな？」「もし自分だったら？」など、自由に書いてみよう！"
          className="w-full p-3 border border-amber-300 rounded-md shadow-sm focus:ring-amber-500 focus:border-amber-500 text-sm text-amber-900 bg-white placeholder-gray-400"
          maxLength={characterLimit}
        />
        <div className="text-xs text-amber-600 text-right mt-1">
          {answerText.length} / {characterLimit} 文字
        </div>
      </div>

      {/* Thinking Prompts Placeholder */}
      {/* <div className="p-3 bg-amber-50/70 rounded-md border border-amber-100 text-sm">
        <p className="font-medium text-amber-800 mb-1">考えるヒント:</p>
        <ul className="list-disc list-inside text-amber-700 space-y-0.5 text-xs">
          <li>主人公の気持ちになってみよう。</li>
          <li>もし違う選択をしたらどうなるかな？</li>
          <li>あなたの経験と比べてみよう。</li>
        </ul>
      </div> */}
      
      {/* Mock Voice Input Button */}
      {/* <Button variant="ghost" size="sm" leftIcon={<SpeakerWaveIcon className="w-4 h-4"/>} className="text-amber-600">
        音声で入力する (準備中)
      </Button> */}

      <div className="flex flex-col sm:flex-row gap-3 items-center pt-2">
        <Button 
          onClick={handleSubmit} 
          variant="primary" 
          isLoading={isSubmitting}
          className="w-full sm:w-auto rounded-full"
          leftIcon={<PencilSquareIcon className="w-5 h-5"/>}
          size="lg"
        >
          回答を保存する
        </Button>
        {/* <Button variant="outline" className="w-full sm:w-auto rounded-full" size="md">下書き保存 (準備中)</Button> */}
        {/* <Button variant="outline" className="w-full sm:w-auto rounded-full" size="md" leftIcon={<UsersIcon className="w-4 h-4"/>}>家族と共有 (準備中)</Button> */}
      </div>
       <p className="text-xs text-amber-600 mt-2">
        ※ 保存された回答は、学習の記録ページで確認できます。(現在のバージョンではコンソールに出力されます)
      </p>
    </div>
  );
};

export default TextResponseComponent;
