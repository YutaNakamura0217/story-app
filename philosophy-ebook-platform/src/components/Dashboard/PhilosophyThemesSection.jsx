import React from 'react';
import ThemeCard from './ThemeCard'; // Adjust path if moved

function PhilosophyThemesSection() {
  // Dummy data
  const themesData = [
    { id: 1, themeName: "Curiosity", ageRange: "4-6", bookCount: 8 },
    { id: 2, themeName: "Friendship", ageRange: "5-8", bookCount: 12 },
    { id: 3, themeName: "Courage", ageRange: "6-9", bookCount: 7 },
  ];

  return (
    <section>
      <h3>Explore Philosophy Themes</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {themesData.map(theme => (
          <ThemeCard
            key={theme.id}
            themeName={theme.themeName}
            ageRange={theme.ageRange}
            bookCount={theme.bookCount}
          />
        ))}
        {themesData.length === 0 && <p>No themes available at the moment.</p>}
      </div>
    </section>
  );
}

export default PhilosophyThemesSection;
