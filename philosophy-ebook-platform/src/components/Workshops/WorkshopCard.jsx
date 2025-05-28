import React from 'react';

function WorkshopCard({ workshop }) {
  const {
    title = "Workshop Title Placeholder",
    instructor = "Instructor Name",
    dateTime = "Upcoming: Jan 15, 2024, 10:00 AM PST",
    duration = "90 minutes",
    ageRange = "7-10 years",
    price = "$25",
    participantCount = 12,
    description = "A brief and engaging description of what the workshop is about and what participants will learn or discuss.",
    imageUrl = "https://via.placeholder.com/400x250?text=Workshop+Image"
  } = workshop || {};

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full transform hover:scale-105 transition-transform duration-300 ease-in-out">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2 truncate" title={title}>{title}</h3>
        <p className="text-sm text-purple-700 font-medium mb-1">With: {instructor}</p>
        <div className="text-sm text-gray-600 mb-3 space-y-1">
          <p><strong>Date & Time:</strong> {dateTime}</p>
          <p><strong>Duration:</strong> {duration}</p>
          <p><strong>Age Range:</strong> {ageRange}</p>
          <p><strong>Price:</strong> <span className="font-bold text-lg text-green-600">{price}</span></p>
          <p><strong>Participants:</strong> Up to {participantCount} children</p>
        </div>
        <p className="text-gray-700 text-sm mb-4 flex-grow">{description.length > 150 ? `${description.substring(0, 147)}...` : description}</p>
        <button className="mt-auto w-full bg-purple-600 text-white py-2.5 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          View Details & Register
        </button>
      </div>
    </div>
  );
}

export default WorkshopCard;
