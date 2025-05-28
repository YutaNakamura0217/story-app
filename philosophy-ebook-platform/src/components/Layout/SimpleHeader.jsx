import React from 'react';

function SimpleHeader() {
  return (
    <header style={{ padding: '1rem', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>Logo</div>
      <div>Language</div>
    </header>
  );
}

export default SimpleHeader;
