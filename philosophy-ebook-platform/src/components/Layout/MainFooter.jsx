import React from 'react';

function MainFooter() {
  return (
    <footer style={{ padding: '2rem 1rem', backgroundColor: '#333', color: 'white', textAlign: 'center', borderTop: '1px solid #444' }}>
      <div style={{ marginBottom: '1rem' }}>
        <a href="/about" style={{ color: 'white', margin: '0 0.5rem' }}>About Us</a>
        <a href="/contact" style={{ color: 'white', margin: '0 0.5rem' }}>Contact</a>
        <a href="/faq" style={{ color: 'white', margin: '0 0.5rem' }}>FAQ</a>
        <a href="/terms" style={{ color: 'white', margin: '0 0.5rem' }}>Terms</a>
        <a href="/privacy" style={{ color: 'white', margin: '0 0.5rem' }}>Privacy</a>
      </div>
      <p>© 2023 Philosophy Ebook Platform - Main Footer</p>
    </footer>
  );
}

export default MainFooter;
