import React from 'react';

function PricingHero() {
  // Basic state for monthly/yearly toggle
  const [isYearly, setIsYearly] = React.useState(false);

  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Find the Perfect Plan for Your Family</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Unlock a world of philosophical adventures and critical thinking for your children. Choose the plan that best suits your needs.
        </p>
        <div className="flex justify-center items-center space-x-3 mb-10">
          <span className={`text-lg ${!isYearly ? 'font-semibold' : ''}`}>Monthly</span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out ${isYearly ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${isYearly ? 'translate-x-6' : 'translate-x-1'}`} />
          </button>
          <span className={`text-lg ${isYearly ? 'font-semibold' : ''}`}>Yearly</span>
          {isYearly && <span className="ml-2 px-2 py-0.5 bg-green-200 text-green-700 text-xs font-semibold rounded-full">Save 20%</span>}
        </div>
      </div>
    </section>
  );
}

export default PricingHero;
