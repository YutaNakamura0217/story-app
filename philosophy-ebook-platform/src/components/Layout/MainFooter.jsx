import React from 'react';

function MainFooter() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="mb-4 space-x-4 md:space-x-6">
          <a href="/about" className="hover:text-white hover:underline">About Us</a>
          <a href="/contact" className="hover:text-white hover:underline">Contact</a>
          <a href="/faq" className="hover:text-white hover:underline">FAQ</a>
          <a href="/terms" className="hover:text-white hover:underline">Terms</a>
          <a href="/privacy" className="hover:text-white hover:underline">Privacy</a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Philosophy Ebook Platform - Main Footer</p>
        <p className="text-xs mt-2">All rights reserved. Built with care.</p>
      </div>
    </footer>
  );
}

export default MainFooter;
