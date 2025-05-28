import React from 'react';

function PhilosophyQuestionPopup({
  question = { text: "What is the kindest thing a character did in this chapter?" },
  onClose,
  onSubmitResponse
}) {
  const [responseText, setResponseText] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitResponse(responseText);
    setResponseText(''); // Clear after submit
    onClose(); // Close after submit
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 1000
    }}>
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
        <h3>Food for Thought!</h3>
        <p>{question.text}</p>
        <form onSubmit={handleSubmit}>
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Share your thoughts..."
            rows="4"
            style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={onClose}>Skip for Now</button>
            <button type="submit">Submit Response</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PhilosophyQuestionPopup;
