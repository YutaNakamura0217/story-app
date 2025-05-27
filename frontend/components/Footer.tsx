import React from 'react';
// APP_TITLE is not used in this specific footer design from mockup
// import { APP_TITLE } from '../constants'; 

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-amber-700 text-amber-100 py-12 px-6 sm:px-10 text-center mt-auto">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} StoryTime. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;