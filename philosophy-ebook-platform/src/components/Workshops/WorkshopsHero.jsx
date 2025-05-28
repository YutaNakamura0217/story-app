import React from 'react';

function WorkshopsHero() {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-4 text-center">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Interactive Philosophy Workshops</h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Deepen understanding, foster critical thinking, and engage in lively discussions with our expert-led workshops for various age groups.
        </p>
        {/* Optional: A CTA button or search bar can be added here later */}
      </div>
    </section>
  );
}

export default WorkshopsHero;
