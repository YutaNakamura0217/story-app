import React, { useState } from 'react';
// Placeholder for a logo component if you have one
// import Logo from '../../Common/Logo'; 

function AdminHeader({ toggleSidebar }) { // toggleSidebar prop to handle mobile sidebar
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 lg:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          {/* Mobile sidebar toggle button - shown on small screens */}
          <button 
            onClick={toggleSidebar} 
            className="text-gray-300 hover:text-white focus:outline-none focus:text-white lg:hidden mr-3"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
          {/* <Logo theme="light" /> You would typically have a logo here */}
          <h1 className="text-xl font-semibold ml-2">Admin Dashboard</h1>
        </div>
        <div className="relative">
          <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center focus:outline-none">
            <img 
              src="https://via.placeholder.com/40?text=Adm" 
              alt="Admin Profile" 
              className="w-8 h-8 rounded-full object-cover border-2 border-gray-600 hover:border-gray-400"
            />
            <span className="hidden md:inline-block ml-2 text-sm">Admin User</span>
            <svg className={`w-4 h-4 ml-1 hidden md:inline-block transform transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
              <a href="#profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="#settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default AdminHeader;
