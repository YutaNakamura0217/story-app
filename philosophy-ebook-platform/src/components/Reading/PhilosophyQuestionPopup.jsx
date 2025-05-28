import React from 'react';

function PhilosophyQuestionPopup({
  question = { text: "What is the kindest thing a character did in this chapter, and why do you think it was kind?" },
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
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[1000] transition-opacity duration-300 ease-in-out"
      onClick={onClose} // Allow closing by clicking overlay
    >
      <div 
        className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-lg transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-modalShow"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">Food for Thought!</h3>
        <p className="text-gray-700 leading-relaxed mb-6 text-center">{question.text}</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
            placeholder="Share your thoughts..."
            rows="5"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-150"
            autoFocus
          />
          <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-3 space-y-2 sm:space-y-0">
            <button 
              type="button" 
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors duration-150"
            >
              Skip for Now
            </button>
            <button 
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-150"
            >
              Submit Response
            </button>
          </div>
        </form>
      </div>
      {/* Basic CSS for modal animation - can be moved to index.css if preferred */}
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

export default PhilosophyQuestionPopup;
