import React from 'react';

function PricingCard({
  planName = "Basic Plan",
  priceDisplay = "$9.99/mo",
  isPopular = false,
  features = ["Feature 1", "Feature 2", "Feature 3"],
  ctaText = "Choose Plan",
  isCurrentPlan = false
}) {
  return (
    <div className={`relative border rounded-xl p-6 shadow-lg flex flex-col h-full ${isPopular ? 'border-indigo-500 border-2 ring-2 ring-indigo-200' : 'border-gray-200'} bg-white transform hover:scale-105 transition-transform duration-300`}>
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="px-4 py-1 bg-indigo-500 text-white text-xs font-semibold tracking-wider uppercase rounded-full shadow-md">Popular</span>
        </div>
      )}
      <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center pt-2">{planName}</h3>
      <p className="text-4xl font-bold text-gray-900 mb-6 text-center">{priceDisplay}</p>
      
      <ul className="space-y-3 text-gray-600 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start"> {/* Changed to items-start for multi-line features */}
            <svg className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
            <span className="flex-1">{feature}</span> {/* Added flex-1 for text wrapping */}
          </li>
        ))}
      </ul>
      
      <button 
        className={`w-full py-3 px-6 rounded-lg font-semibold text-center transition-colors duration-200 shadow-md hover:shadow-lg
                    ${isCurrentPlan ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 
                                     isPopular ? 'bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-300' : 
                                                 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300'}`}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? "Current Plan" : ctaText}
      </button>
    </div>
  );
}

export default PricingCard;
