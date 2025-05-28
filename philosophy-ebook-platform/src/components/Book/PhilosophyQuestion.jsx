import React from 'react';

function PhilosophyQuestion({ question }) {
  const {
    text = "What do you think is the main idea of this story?",
    type = "Open-ended",
    difficulty = "Medium",
    // responseOptions = [] // For multiple choice, etc.
  } = question;

  return (
    <div style={{ border: '1px solid #eee', padding: '10px', margin: '10px 0' }}>
      <p><strong>{text}</strong></p>
      <p><small>Type: {type} | Difficulty: {difficulty}</small></p>
      {/* Placeholder for response options or input area */}
      <button>Discuss</button>
    </div>
  );
}

export default PhilosophyQuestion;
