import React from 'react';
import PhilosophyQuestion from './PhilosophyQuestion';

function QuestionsContent({ questionsList }) {
  const defaultQuestions = [
    { id: 'q1', text: "What if the character made a different choice?", type: "Hypothetical", difficulty: "Medium" },
    { id: 'q2', text: "Why do you think the author ended the story this way?", type: "Reflective", difficulty: "Easy" },
  ];
  const currentQuestions = questionsList || defaultQuestions;

  return (
    <div>
      <h3>Philosophy Questions</h3>
      {currentQuestions.map(q => <PhilosophyQuestion key={q.id} question={q} />)}
      {currentQuestions.length === 0 && <p>No questions available for this book yet.</p>}
    </div>
  );
}

export default QuestionsContent;
