
import React from 'react';
import Button from '../ui/Button';
import { ChevronLeftIcon, ChevronRightIcon, ArrowUturnLeftIcon } from '../../assets/icons'; 

interface NavigationAreaComponentProps {
  onPreviousQuestion?: () => void; // Optional for now
  onNextQuestion?: () => void; // Optional for now
  onSkipQuestion?: () => void; // Optional for now
  onFinishSession?: () => void; // Optional for now
  onSaveAndContinue: () => void; // Main action from TextResponseComponent
  canGoPrev?: boolean;
  canGoNext?: boolean;
}

const NavigationAreaComponent: React.FC<NavigationAreaComponentProps> = ({
  onPreviousQuestion,
  onNextQuestion,
  onSkipQuestion,
  onFinishSession,
  onSaveAndContinue, // This might be tied to the submit button in TextResponseComponent itself
  canGoPrev = false, // Mock
  canGoNext = true, // Mock
}) => {
  return (
    <div className="mt-8 pt-6 border-t border-amber-200">
      <h3 className="text-lg font-semibold text-amber-800 mb-3 text-center sm:text-left">次のステップ</h3>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <Button 
          variant="outline" 
          onClick={onPreviousQuestion || (() => alert("前の質問へ (準備中)"))} 
          disabled={!canGoPrev}
          className="w-full sm:w-auto rounded-full"
          leftIcon={<ChevronLeftIcon className="w-5 h-5" />}
        >
          前の質問へ
        </Button>
        
        {/* The main save action is in TextResponseComponent. This could be a "Next Question" button */}
        {/* Or, if saving is tied to navigation, it could be a combined button */}
        {/* For now, let's assume TextResponse has its own save button */}
        {/* And these are for navigating between questions if there's a sequence */}

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* <Button 
                variant="ghost" 
                onClick={onSkipQuestion || (() => alert("質問をスキップ (準備中)"))} 
                className="w-full sm:w-auto text-amber-600 rounded-full"
                leftIcon={<ChevronRightIcon className="w-5 h-5"/>} // Replaced ForwardIcon if it were to be used
            >
                スキップ
            </Button> */}
            <Button 
                variant="secondary" // Using secondary for "Finish"
                onClick={onFinishSession || (() => alert("セッションを終了 (準備中)"))} 
                className="w-full sm:w-auto rounded-full"
                leftIcon={<ArrowUturnLeftIcon className="w-5 h-5"/>} // Replaced StopCircleIcon
            >
                読書に戻る
            </Button>
             <Button 
                variant="primary" 
                onClick={onNextQuestion || (() => alert("次の質問へ (準備中)"))} 
                disabled={!canGoNext}
                className="w-full sm:w-auto rounded-full"
                rightIcon={<ChevronRightIcon className="w-5 h-5"/>}
            >
                次の質問へ
            </Button>
        </div>
      </div>
      <p className="text-xs text-amber-600 mt-4 text-center">
        あなたの考えは大切に記録されます。いつでも「学習のあしあと」ページで振り返ることができます。
      </p>
    </div>
  );
};

export default NavigationAreaComponent;
