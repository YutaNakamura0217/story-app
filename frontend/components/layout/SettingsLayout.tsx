import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SettingsSidebar from './SettingsSidebar';

const SettingsLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Header variant="main" />
      <main className="flex-grow container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <SettingsSidebar className="w-full md:w-1/4 lg:w-1/5 xl:w-1/6 shrink-0" />
          <div className="flex-1 bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-amber-100">
            <Outlet /> {/* Content for each settings page will be rendered here */}
          </div>
        </div>
      </main>
      <Footer variant="main" />
    </div>
  );
};

export default SettingsLayout;
