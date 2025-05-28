import React from 'react';

function CompletionModal({
  bookTitle = "The Adventures of Thinky",
  onClose,
  onNextSteps
}) {
  // Dummy reading stats
  const readingStats = { timeSpent: "45 minutes", pagesRead: 30, questionsAnswered: 2 };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[1000] transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Allow closing by clicking overlay
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg text-center transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h2 className="text-3xl font-bold text-green-500 mb-4">Congratulations!</h2>
        <p className="text-gray-700 text-lg mb-1">
          You've finished reading
        </p>
        <p className="text-indigo-600 font-semibold text-xl mb-6">
          "{bookTitle}"
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="text-md font-semibold text-gray-700 mb-3">Your Reading Stats:</h4>
          <ul className="list-none p-0 space-y-1 text-sm text-gray-600">
            <li>Time Spent: <span className="font-medium">{readingStats.timeSpent}</span></li>
            <li>Pages Read: <span className="font-medium">{readingStats.pagesRead}</span></li>
            <li>Questions Answered: <span className="font-medium">{readingStats.questionsAnswered}</span></li>
          </ul>
        </div>

        <h4 className="text-md font-semibold text-gray-700 mb-4">Next Steps:</h4>
        <div className="flex flex-col sm:flex-row sm:justify-center sm:space-x-3 space-y-3 sm:space-y-0">
          <button 
            onClick={onNextSteps} 
            className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-150"
          >
            Explore More Books
          </button>
          <button 
            onClick={() => alert('Shared (placeholder)!')} 
            className="px-5 py-2.5 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-150"
          >
            Share Your Achievement
          </button>
          <button 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors duration-150"
          >
            Close
          </button>
        </div>
      </div>
      {/* Ensure modalShow animation is defined (e.g., in PhilosophyQuestionPopup or global CSS) */}
      <style jsx global>{`
        @keyframes modalShow {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modalShow {
          animation: modalShow 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default CompletionModal;
