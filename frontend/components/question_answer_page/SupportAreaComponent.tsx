
import React, { useState } from 'react';
import { UserGroupIcon, QuestionMarkCircleIcon, AcademicCapIcon } from '../../assets/icons'; // Using UsersIcon for parent guidance
import Button from '../ui/Button';

const SupportAreaComponent: React.FC = () => {
  const [isGuidanceOpen, setIsGuidanceOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-amber-800">サポート</h3>
      
      {/* Parent Guidance (Collapsible) */}
      <div>
        <Button 
          variant="outline" 
          onClick={() => setIsGuidanceOpen(!isGuidanceOpen)} 
          className="w-full justify-between text-left !border-amber-200 hover:!bg-amber-50"
          rightIcon={
            <svg className={`w-5 h-5 transform transition-transform duration-200 ${isGuidanceOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          }
        >
          <div className="flex items-center">
            <UserGroupIcon className="w-5 h-5 mr-2 text-amber-500"/>
            保護者・先生向けガイダンス
          </div>
        </Button>
        {isGuidanceOpen && (
          <div className="mt-2 p-4 bg-amber-50/70 rounded-md border border-amber-100 text-sm text-amber-700 space-y-2 animate-fadeIn">
            <p><strong>教育目的:</strong> この質問は子供の共感力や多角的な視点を養うことを目的としています。(モック)</p>
            <p><strong>話し合いのヒント:</strong> 「もし自分がこの立場だったらどう思う？」など、具体的な問いかけで深掘りしましょう。(モック)</p>
            <p><strong>注意点:</strong> 正解を求めず、子供の自由な発想を尊重してください。(モック)</p>
          </div>
        )}
      </div>

      {/* Related Questions (Placeholder) */}
      <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
        <h4 className="text-md font-medium text-gray-700 mb-2 flex items-center">
          <QuestionMarkCircleIcon className="w-5 h-5 mr-2 text-gray-500"/>
          関連する他の質問 (準備中)
        </h4>
        <p className="text-xs text-gray-500">ここには、この質問と関連性の高い他の哲学的な問いが表示されます。</p>
      </div>

      {/* Break Time (Placeholder) */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
         <h4 className="text-md font-medium text-blue-700 mb-2 flex items-center">
            <AcademicCapIcon className="w-5 h-5 mr-2 text-blue-500"/> {/* Placeholder icon */}
            ちょっと休憩？ (準備中)
        </h4>
        <p className="text-xs text-blue-600">長時間の思考に疲れたら、ここで簡単なリフレッシュゲームやアクティビティを提案します。</p>
      </div>

       <div className="mt-4">
        <Button variant="ghost" className="w-full text-amber-600 hover:text-amber-700">
            ヘルプ・FAQを見る
        </Button>
       </div>
    </div>
  );
};

export default SupportAreaComponent;
