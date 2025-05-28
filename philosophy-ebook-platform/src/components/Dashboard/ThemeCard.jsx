import React from 'react';

function ThemeCard({ themeName = "Theme Name", ageRange = "5-7", bookCount = 10 }) {
  return (
    <div style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
      {/* ThemeIcon Placeholder */}
      <div>ICON</div>
      <h4>{themeName}</h4>
      <p>Ages: {ageRange}</p>
      <p>{bookCount} books</p>
      <button>Explore</button>
    </div>
  );
}

export default ThemeCard;
