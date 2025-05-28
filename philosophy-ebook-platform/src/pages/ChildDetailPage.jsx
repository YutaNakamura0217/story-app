import React from 'react';
import MainHeader from '../components/Layout/MainHeader';
import MainFooter from '../components/Layout/MainFooter';
import ChildProfileSection from '../components/Child/ChildProfileSection';
import TabNavigation from '../components/Book/TabNavigation'; // Reusing for now
import BooksContent from '../components/Child/BooksContent';
import AchievementsContent from '../components/Child/AchievementsContent';
// Placeholder for BookCard if used in Recommendations or BooksContent
// import BookCard from '../components/Common/BookCard';

// Placeholder Content Components for Tabs
const ProgressContent = () => <div><h3>Progress Details</h3><p>Reading progress, theme progress, charts, and milestones will be shown here.</p></div>;
const QuestionsChildContent = () => <div><h3>Question & Discussion Activity</h3><p>Response history, thoughtful responses, and discussion participation will be shown here.</p></div>;
const RecommendationsSection = () => <section><h2>Recommendations</h2><p>Book/activity recommendations tailored to this child will appear here.</p></section>;

const CHILD_TABS = [
  { id: 'progress', label: 'Progress' },
  { id: 'books', label: 'Books' },
  { id: 'questions', label: 'Questions' },
  { id: 'achievements', label: 'Achievements' },
];

function ChildDetailPage() {
  // In a real app, an :id would be used to fetch child data
  const [activeTab, setActiveTab] = React.useState(CHILD_TABS[0].id);

  return (
    <>
      <MainHeader />
      <main>
        <ChildProfileSection /> {/* Uses default props for now */}
        
        <TabNavigation
          tabs={CHILD_TABS}
          activeTab={activeTab}
          onTabClick={setActiveTab}
        />

        {/* Tab Content Area */}
        <div>
          {activeTab === 'progress' && <ProgressContent />}
          {activeTab === 'books' && <BooksContent />}
          {activeTab === 'questions' && <QuestionsChildContent />}
          {activeTab === 'achievements' && <AchievementsContent />}
        </div>

        <RecommendationsSection />
      </main>
      <MainFooter />
    </>
  );
}

export default ChildDetailPage;
