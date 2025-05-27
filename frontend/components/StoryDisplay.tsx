
import React from 'react';

interface StoryDisplayProps {
  story: string | null;
  error: string | null;
  isLoading: boolean;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, error, isLoading }) => {
  if (isLoading) {
    return null; // Loading spinner is handled by parent
  }

  if (error) {
    return (
      <div className="mt-6 p-4 border border-red-500 bg-red-900 bg-opacity-30 rounded-lg shadow-lg">
        <h3 className="text-red-400 font-semibold text-lg mb-2">Oops, a plot twist!</h3>
        <p className="text-red-300 whitespace-pre-wrap">{error}</p>
      </div>
    );
  }

  if (story) {
    return (
      <div className="mt-8 p-6 bg-slate-800 bg-opacity-70 rounded-xl shadow-2xl transition-all duration-500 ease-in-out transform hover:scale-105">
        <h3 
          className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Your Unveiled Story
        </h3>
        <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
          {story.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 last:mb-0">{paragraph}</p>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 p-4 text-center text-slate-500">
      <p>Enter a prompt above and let the magic begin!</p>
    </div>
  );
};

export default StoryDisplay;
