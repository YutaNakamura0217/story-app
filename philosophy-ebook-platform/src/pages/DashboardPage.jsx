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
    <>
      <MainHeader />
      <main style={{ padding: '1rem' }}>
        <h1>Dashboard</h1>
        <WelcomeSection />
        <ChildrenProgressSection />
        <PhilosophyThemesSection />
        <RecommendedBooksSection />
        <RecentActivitySection />
        <UpcomingWorkshopsSection />
      </main>
      <MainFooter />
    </>
  );
}

export default DashboardPage;
