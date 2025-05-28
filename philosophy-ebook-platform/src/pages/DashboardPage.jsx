import React from 'react';
import MainHeader from '../components/Layout/MainHeader';
import MainFooter from '../components/Layout/MainFooter';
import WelcomeSection from '../components/Dashboard/WelcomeSection';
import ChildrenProgressSection from '../components/Dashboard/ChildrenProgressSection';
import PhilosophyThemesSection from '../components/Dashboard/PhilosophyThemesSection';
import RecommendedBooksSection from '../components/Dashboard/RecommendedBooksSection';
import RecentActivitySection from '../components/Dashboard/RecentActivitySection';
import UpcomingWorkshopsSection from '../components/Dashboard/UpcomingWorkshopsSection';

function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MainHeader />
      <main className="flex-grow container mx-auto px-0 md:px-4 py-8"> {/* Adjusted padding for different screen sizes */}
        {/* No explicit h1 for "Dashboard" as sections have their own titles */}
        
        {/* WelcomeSection is already styled with its own background and padding */}
        <WelcomeSection /> 
        
        {/* Sections will have their own internal padding and background where appropriate */}
        <ChildrenProgressSection />
        <PhilosophyThemesSection /> {/* This section might have a light gray bg itself */}
        <RecommendedBooksSection />
        <RecentActivitySection />   {/* This section might have a light gray bg itself */}
        <UpcomingWorkshopsSection />

      </main>
      <MainFooter />
    </div>
  );
}

export default DashboardPage;
