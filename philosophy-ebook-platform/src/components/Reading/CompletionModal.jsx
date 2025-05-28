import React from 'react';

function CompletionModal({
  bookTitle = "The Adventures of Thinky",
  onClose,
  onNextSteps
}) {
  // Dummy reading stats
  const readingStats = { timeSpent: "45 minutes", pagesRead: 30, questionsAnswered: 2 };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '500px', textAlign: 'center' }}>
        <h2>Congratulations!</h2>
        <p>You've finished reading <strong>"{bookTitle}"</strong>!</p>
        
        <h4>Your Reading Stats:</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>Time Spent: {readingStats.timeSpent}</li>
          <li>Pages Read: {readingStats.pagesRead}</li>
          <li>Questions Answered: {readingStats.questionsAnswered}</li>
        </ul>

        <h4>Next Steps:</h4>
        <button onClick={onNextSteps} style={{ marginRight: '10px' }}>Explore More Books</button>
        <button onClick={() => alert('Shared (placeholder)!')} style={{ marginRight: '10px' }}>Share Your Achievement</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default CompletionModal;
