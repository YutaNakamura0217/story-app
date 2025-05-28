
import React from 'react';
import { PhilosophyQuestionItem } from '../../types';
import { SpeakerWaveIcon } from '../../assets/icons';

interface VoiceResponseComponentProps {
  question: PhilosophyQuestionItem;
}

const VoiceResponseComponent: React.FC<VoiceResponseComponentProps> = ({ question }) => {
  return (
    <div className="p-6 bg-gray-100 rounded-lg border border-gray-200 text-center">
      <SpeakerWaveIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h4 className="text-lg font-semibold text-gray-700 mb-2">声で回答する</h4>
      <p className="text-sm text-gray-500">
        この機能は現在準備中です。お楽しみに！
      </p>
      {/* Placeholder for recording interface */}
    </div>
  );
};

export default VoiceResponseComponent;
