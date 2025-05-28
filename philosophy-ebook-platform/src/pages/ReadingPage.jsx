import React from 'react';
import React from 'react';
import ReadingHeader from '../components/Reading/ReadingHeader';
import ReadingContent from '../components/Reading/ReadingContent';
import PhilosophyQuestionPopup from '../components/Reading/PhilosophyQuestionPopup';
import CompletionModal from '../components/Reading/CompletionModal';

function ReadingPage() {
  // Dummy data for now
  const bookTitle = "The Adventures of Thinky";
  const currentProgress = 25; // Example progress

  const [showQuestionPopup, setShowQuestionPopup] = React.useState(false);
  const [showCompletionModal, setShowCompletionModal] = React.useState(false);

  // Dummy question for the popup
  const dummyQuestion = { text: "What was the most surprising idea in this book so far?" };

  // Handlers for PhilosophyQuestionPopup
  const handleOpenQuestionPopup = () => setShowQuestionPopup(true);
  const handleCloseQuestionPopup = () => setShowQuestionPopup(false);
  const handleSubmitQuestionResponse = (response) => {
    console.log("Response submitted:", response);
    // In a real app, send this to a backend or state management
  };

  // Handlers for CompletionModal
  const handleOpenCompletionModal = () => setShowCompletionModal(true);
  const handleCloseCompletionModal = () => setShowCompletionModal(false);
  const handleNextSteps = () => {
    console.log("Next steps after completion...");
    alert("Navigating to next steps (e.g., dashboard or book list)!");
    // In a real app, navigate user
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <ReadingHeader bookTitle={bookTitle} progress={currentProgress} />
      {/* Temporary buttons to trigger modals - can be placed in ReadingContent or Header for better UI */}
      <div style={{ padding: '10px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
        <button onClick={handleOpenQuestionPopup} style={{ marginRight: '10px' }}>Trigger Question Popup</button>
        <button onClick={handleOpenCompletionModal}>Trigger Completion Modal</button>
      </div>
      <ReadingContent />
      
      {showQuestionPopup && (
        <PhilosophyQuestionPopup
          question={dummyQuestion}
          onClose={handleCloseQuestionPopup}
          onSubmitResponse={handleSubmitQuestionResponse}
        />
      )}
      
      {showCompletionModal && (
        <CompletionModal
          bookTitle={bookTitle}
          onClose={handleCloseCompletionModal}
          onNextSteps={handleNextSteps}
        />
      )}
    </div>
  );
}

export default ReadingPage;
