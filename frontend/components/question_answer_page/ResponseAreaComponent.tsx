
import React from 'react';
import Tabs, { Tab } from '../ui/Tabs';
import TextResponseComponent from './TextResponseComponent';
import DrawingResponseComponent from './DrawingResponseComponent';
import VoiceResponseComponent from './VoiceResponseComponent';
import ChoiceResponseComponent from './ChoiceResponseComponent';
import { PhilosophyQuestionItem } from '../../types';

interface ResponseAreaComponentProps {
  question: PhilosophyQuestionItem;
  onSubmitTextAnswer: (answerText: string) => void;
}

const ResponseAreaComponent: React.FC<ResponseAreaComponentProps> = ({ question, onSubmitTextAnswer }) => {
  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold text-amber-800 mb-3">あなたの考えを教えてね</h3>
      <Tabs 
        tabPanelClassName="py-4" 
        tabListClassName="border-b-amber-200"
      >
        <Tab label="文字で答える" activeClassName="!border-amber-500 !text-amber-600" inactiveClassName="!border-transparent !text-amber-700 hover:!text-amber-800 hover:!border-amber-300">
          <TextResponseComponent question={question} onSubmit={onSubmitTextAnswer} />
        </Tab>
        <Tab label="絵で答える" activeClassName="!border-amber-500 !text-amber-600" inactiveClassName="!border-transparent !text-amber-700 hover:!text-amber-800 hover:!border-amber-300">
          <DrawingResponseComponent question={question} />
        </Tab>
        <Tab label="声で答える" activeClassName="!border-amber-500 !text-amber-600" inactiveClassName="!border-transparent !text-amber-700 hover:!text-amber-800 hover:!border-amber-300">
          <VoiceResponseComponent question={question} />
        </Tab>
        <Tab label="選んで答える" activeClassName="!border-amber-500 !text-amber-600" inactiveClassName="!border-transparent !text-amber-700 hover:!text-amber-800 hover:!border-amber-300">
          <ChoiceResponseComponent question={question} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ResponseAreaComponent;
