import React from 'react';
import ThemeCard from './ThemeCard'; // Adjust path if moved

function PhilosophyThemesSection() {
  // Dummy data
  const themesData = [
    { id: 1, themeName: "Curiosity", ageRange: "4-6", bookCount: 8 },
    { id: 2, themeName: "Friendship", ageRange: "5-8", bookCount: 12 },
    { id: 3, themeName: "Courage", ageRange: "6-9", bookCount: 7 },
    { id: 4, themeName: "Justice", ageRange: "7-10", bookCount: 9 },
  ];

  return (
    <section className="py-8 px-4 md:px-6 bg-gray-50">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">Explore Philosophy Themes</h3>
      {themesData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {themesData.map(theme => (
            <ThemeCard
              key={theme.id}
              themeName={theme.themeName}
              ageRange={theme.ageRange}
              bookCount={theme.bookCount}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
          <p>No themes available at the moment. Check back soon!</p>
        </div>
      )}
    </section>
  );
}

export default PhilosophyThemesSection;
