
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center my-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-500"></div>
      <p className="ml-3 text-pink-400 text-lg">Crafting your tale...</p>
    </div>
  );
};

export default LoadingSpinner;
