
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import WelcomeSection from '../components/dashboard/WelcomeSection';
import ChildrenProgressSection from '../components/dashboard/ChildrenProgressSection';
import PhilosophyThemesSection from '../components/dashboard/PhilosophyThemesSection';
import RecommendedBooksSection from '../components/dashboard/RecommendedBooksSection';

const DashboardPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen"> {/* Background is bg-amber-50 from body */}
      <Header variant="main" />
      <main className="flex-grow flex justify-center py-8">
        <div className="layout-content-container flex flex-col max-w-screen-lg flex-1 gap-8 px-4 sm:px-10 md:px-20 lg:px-0"> {/* Adjusted padding, lg:px-0 if max-w handles it */}
          <WelcomeSection />
          <ChildrenProgressSection />
          <PhilosophyThemesSection />
          <RecommendedBooksSection />
          {/* 
            <RecentActivitySection /> 
            <UpcomingWorkshopsSection /> 
          */}
        </div>
      </main>
      <Footer variant="main" />
    </div>
  );
};

export default DashboardPage;