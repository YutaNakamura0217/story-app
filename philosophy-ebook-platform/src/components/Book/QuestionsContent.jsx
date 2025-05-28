import React from 'react';
import PhilosophyQuestion from './PhilosophyQuestion';

function QuestionsContent({ questionsList }) {
  const defaultQuestions = [
    { id: 'q1', text: "What if the main character in the story made a completely different choice at the turning point? How might the story have changed, and what different lessons could be learned?", type: "Hypothetical", difficulty: "Medium" },
    { id: 'q2', text: "Why do you believe the author chose to end the story this particular way? What message or feeling were they trying to leave with the reader?", type: "Reflective", difficulty: "Easy" },
    { id: 'q3', text: "Can you identify a moment in the book where a character faced a moral dilemma? What were the different options, and what would you have done in their place?", type: "Ethical Analysis", difficulty: "Hard" },
  ];
  const currentQuestions = questionsList || defaultQuestions;

  return (
    <div className="py-6 px-4 md:px-0">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Philosophy Questions</h3>
      {currentQuestions.length > 0 ? (
        <div className="space-y-6">
          {currentQuestions.map(q => <PhilosophyQuestion key={q.id} question={q} />)}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          <p>No philosophy questions available for this book yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}

export default QuestionsContent;
