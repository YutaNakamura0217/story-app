import React from 'react';
import ReadingHeader from '../components/Reading/ReadingHeader';
import ReadingContent from '../components/Reading/ReadingContent';
import PhilosophyQuestionPopup from '../components/Reading/PhilosophyQuestionPopup';
import CompletionModal from '../components/Reading/CompletionModal';

function ReadingPage() {
  // Dummy data for now
  const bookTitle = "The Adventures of Thinky the Owl";
  const currentProgress = 25; // Example progress

  const [showQuestionPopup, setShowQuestionPopup] = React.useState(false);
  const [showCompletionModal, setShowCompletionModal] = React.useState(false);

  // Dummy question for the popup
  const dummyQuestion = { text: "What was the most surprising idea in this book so far, and how did it make you feel?" };

  // Handlers for PhilosophyQuestionPopup
  const handleOpenQuestionPopup = () => setShowQuestionPopup(true);
  const handleCloseQuestionPopup = () => setShowQuestionPopup(false);
  const handleSubmitQuestionResponse = (response) => {
    console.log("Response submitted:", response);
    // In a real app, send this to a backend or state management
    // Potentially trigger next question or feedback
  };

  // Handlers for CompletionModal
  const handleOpenCompletionModal = () => setShowCompletionModal(true);
  const handleCloseCompletionModal = () => setShowCompletionModal(false);
  const handleNextSteps = () => {
    console.log("Next steps after completion...");
    alert("Navigating to next steps (e.g., dashboard or book list)!");
    // In a real app, navigate user, e.g., router.push('/dashboard');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50"> {/* Full screen height, flex column, hidden overflow */}
      <ReadingHeader bookTitle={bookTitle} progress={currentProgress} />
      
      {/* Temporary buttons to trigger modals - can be placed in ReadingContent or Header for better UI */}
      {/* These buttons are for testing and would likely be removed or integrated differently in a real app */}
      <div className="bg-yellow-100 p-2 text-center text-xs text-yellow-700">
        <p className="font-semibold mb-1">Test Controls (Dev Only):</p>
        <button 
          onClick={handleOpenQuestionPopup} 
          className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"
        >
          Trigger Question
        </button>
        <button 
          onClick={handleOpenCompletionModal}
          className="px-3 py-1 bg-green-500 text-white rounded-md text-xs hover:bg-green-600"
        >
          Trigger Completion
        </button>
      </div>
      
      <ReadingContent /> {/* This component now takes up the remaining space */}
      
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
