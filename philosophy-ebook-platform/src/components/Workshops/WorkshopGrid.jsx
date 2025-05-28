import React from 'react';
import WorkshopCard from './WorkshopCard';

function WorkshopGrid({ workshops = [] }) {
  if (!workshops || workshops.length === 0) {
    return <p className="text-center text-gray-600 py-10 text-lg">No workshops available at the moment. Please check back soon!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {workshops.map(workshop => (
        <WorkshopCard key={workshop.id} workshop={workshop} />
      ))}
    </div>
  );
}

export default WorkshopGrid;
