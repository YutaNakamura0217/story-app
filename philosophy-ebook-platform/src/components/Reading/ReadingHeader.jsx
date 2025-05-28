import React from 'react';

function ReadingHeader({ bookTitle = "Book Title Placeholder", progress = 0 }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #eee' }}>
      <button>&larr; Back to Details</button> {/* Or to library, depending on flow */}
      <h3>{bookTitle}</h3>
      <div>
        <span>Progress: {progress}%</span>
        {/* Basic progress bar representation */}
        <div style={{ width: '100px', backgroundColor: '#e0e0e0', borderRadius: '4px', display: 'inline-block', marginLeft: '10px' }}>
          <div style={{ width: `${progress}%`, backgroundColor: '#76c7c0', height: '10px', borderRadius: '4px' }}></div>
        </div>
      </div>
      <button>Settings (ギアアイコン)</button>
    </header>
  );
}

export default ReadingHeader;
