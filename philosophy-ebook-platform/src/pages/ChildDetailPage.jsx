import React from 'react';
import MainHeader from '../components/Layout/MainHeader';
import MainFooter from '../components/Layout/MainFooter';
import ChildProfileSection from '../components/Child/ChildProfileSection';
import TabNavigation from '../components/Book/TabNavigation'; // Reusing for now
import BooksContent from '../components/Child/BooksContent';
import AchievementsContent from '../components/Child/AchievementsContent';
// Placeholder for BookCard if used in Recommendations or BooksContent
// import BookCard from '../components/Common/BookCard';

// Placeholder Content Components for Tabs - Now with Tailwind styling
const ProgressContent = () => (
  <div className="py-6 px-4 md:px-0 bg-white rounded-b-lg shadow-sm"> {/* Match tab content container style */}
    <div className="p-6 border border-gray-200 rounded-lg shadow-inner bg-gray-50">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Progress Details</h3>
      <p className="text-gray-600">
        Detailed reading progress, theme exploration charts, and activity milestones for this child will be displayed here. 
        This section will provide a comprehensive overview of their learning journey.
      </p>
      {/* Placeholder for charts or more detailed stats */}
      <div className="mt-6 h-48 bg-gray-200 rounded flex items-center justify-center text-gray-400">
        Chart Placeholder
      </div>
    </div>
  </div>
);

const QuestionsChildContent = () => (
  <div className="py-6 px-4 md:px-0 bg-white rounded-b-lg shadow-sm">
     <div className="p-6 border border-gray-200 rounded-lg shadow-inner bg-gray-50">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Question & Discussion Activity</h3>
      <p className="text-gray-600">
        This area will showcase the child's engagement with philosophy questions, including their response history, 
        highlights of thoughtful answers, and participation in discussions.
      </p>
      {/* Placeholder for list of questions/responses */}
      <div className="mt-6 space-y-3">
        <div className="p-3 bg-white border border-gray-200 rounded shadow-sm text-sm">"What if animals could talk?" - Response: "It would be cool..."</div>
        <div className="p-3 bg-white border border-gray-200 rounded shadow-sm text-sm">"Why is sharing good?" - Response: "Because it makes friends happy."</div>
      </div>
    </div>
  </div>
);

const RecommendationsSection = () => (
  <section className="mt-10 py-8 px-4 md:px-0 bg-gray-100 rounded-lg shadow">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">Recommendations for [Child's Name]</h2>
    <div className="p-6 bg-white rounded-lg shadow-inner text-center text-gray-500">
      <p>
        Tailored book, theme, and activity recommendations based on this child's age, preferences, and reading history will appear here.
      </p>
      {/* Placeholder for recommended BookCards or other items */}
      <div className="mt-4 text-indigo-600 font-semibold">Coming Soon!</div>
    </div>
  </section>
);


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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MainHeader />
      <main className="flex-grow container mx-auto px-4 py-2"> {/* Reduced py */}
        <ChildProfileSection /> {/* Already styled with its own container and padding */}
        
        <TabNavigation
          tabs={CHILD_TABS}
          activeTab={activeTab}
          onTabClick={setActiveTab}
        />

        {/* Tab Content Area - Styling applied to individual content components or a wrapper here */}
        <div className="bg-white shadow-sm rounded-b-lg"> {/* Optional wrapper for tab content */}
          {activeTab === 'progress' && <ProgressContent />}
          {activeTab === 'books' && <BooksContent />} {/* BooksContent handles its own padding */}
          {activeTab === 'questions' && <QuestionsChildContent />}
          {activeTab === 'achievements' && <AchievementsContent />} {/* AchievementsContent handles its own padding */}
        </div>

        <RecommendationsSection />
      </main>
      <MainFooter />
    </div>
  );
}

export default ChildDetailPage;
