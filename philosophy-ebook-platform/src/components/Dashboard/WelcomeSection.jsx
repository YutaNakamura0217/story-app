import React from 'react';

function WelcomeSection() {
  return (
    <section className="p-6 mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-semibold mb-2">Welcome, [User Name Placeholder]!</h2>
      <p className="text-lg">
        Your Tier: <span className="px-3 py-1 bg-yellow-400 text-yellow-800 rounded-full text-sm font-medium ml-2">Tier Badge Placeholder</span>
      </p>
      {/* Add any other relevant welcome messages or quick stats */}
      <p className="mt-4 text-indigo-100">Here's what's new and exciting on your learning journey!</p>
    </section>
  );
}

export default WelcomeSection;
