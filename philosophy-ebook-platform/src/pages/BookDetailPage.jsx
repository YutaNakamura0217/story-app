import React from 'react';
import MainHeader from '../components/Layout/MainHeader';
import MainFooter from '../components/Layout/MainFooter';
import BookHeroSection from '../components/Book/BookHeroSection';
import BookCard from '../components/Common/BookCard'; // For SimilarBooksSection
import TabNavigation from '../components/Book/TabNavigation';
import OverviewContent from '../components/Book/OverviewContent';
import QuestionsContent from '../components/Book/QuestionsContent';
import ReviewsContent from '../components/Book/ReviewsContent';

// Placeholder for DiscussionsContent
const DiscussionsContent = () => (
  <div className="py-6 px-4 md:px-0">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Discussions</h3>
    <div className="bg-white p-6 rounded-lg shadow text-center text-gray-500">
      <p>The discussion forum for this book is coming soon!</p>
      <p className="mt-2">Check back later to share your thoughts and see what others are saying.</p>
    </div>
  </div>
);

const TABS = [
  {id: 'overview', label: 'Overview'},
  {id: 'questions', label: 'Questions'},
  {id: 'reviews', label: 'Reviews'},
  {id: 'discussions', label: 'Discussions'}
];

const SimilarBooksSection = () => {
  // Dummy data for similar books
  const similarBooksData = [
    { id: 'sim1', title: "Another Great Book of Thoughts", author: "Famous Author", readingTime: "15 min", description: "A fantastic read that complements the themes of the main book.", coverUrl: "https://via.placeholder.com/150x200?text=Similar+1" },
    { id: 'sim2', title: "Philosophical Adventures Await", author: "Wise Writer", readingTime: "30 min", description: "Explore deep thoughts and expand your understanding of key concepts.", coverUrl: "https://via.placeholder.com/150x200?text=Similar+2" },
    { id: 'sim3', title: "The Young Thinker's Guide", author: "Jane Doe", readingTime: "20 min", description: "Perfect for young readers interested in similar philosophical ideas.", coverUrl: "https://via.placeholder.com/150x200?text=Similar+3" },
  ];
  return (
    <section className="py-8 px-4 md:px-0 mt-8 border-t border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Similar Books You Might Enjoy</h2>
      {similarBooksData.length > 0 ? (
         <div className="flex overflow-x-auto space-x-6 pb-4 -mx-4 px-4"> {/* Horizontal scroll */}
          {similarBooksData.map(book => <BookCard key={book.id} {...book} />)}
        </div>
      ) : (
        <p className="text-gray-500">No similar book recommendations at this time.</p>
      )}
    </section>
  );
};

// Dummy book data to pass to OverviewContent
const dummyBookData = {
  detailedDescription: "This is a dummy detailed description for the book. It talks about complex themes in an accessible way for young readers, encouraging them to think critically about the world around them. The narrative follows a young protagonist on a journey of discovery, facing challenges that prompt philosophical reflection. This section aims to provide a rich, engaging summary that goes beyond the hero section.",
  learningObjectives: ["Objective A from dummy data: Understand key concepts presented.", "Objective B from dummy data: Analyze character motivations.", "Objective C from dummy data: Relate themes to personal experiences.", "Objective D: Engage in thoughtful discussion."],
  relatedBooks: [
    { id: 'rb_dummy1', title: "Dummy Related Book 1", author: "Author D1", description: "A brief description of dummy book 1 focusing on similar themes.", coverUrl: "https://via.placeholder.com/150x200?text=Related+Dummy+1" },
    { id: 'rb_dummy2', title: "Dummy Related Book 2", author: "Author D2", description: "A brief description of dummy book 2, perhaps by the same author.", coverUrl: "https://via.placeholder.com/150x200?text=Related+Dummy+2" }
  ]
};

// Dummy questions list
const dummyQuestionsList = [
  { id: 'dq1', text: "What is the main moral or lesson you took away from this story? Explain your reasoning.", type: "Open-ended", difficulty: "Medium" },
  { id: 'dq2', text: "If you were the main character, what would you have done differently in the pivotal scene? Why?", type: "Hypothetical", difficulty: "Easy" },
  { id: 'dq3', text: "Can you think of a real-life situation where the lessons or ideas from this book might be helpful or applicable?", type: "Application", difficulty: "Hard" },
];

// Dummy reviews list
const dummyReviewsList = [
  { id: 'dr1', userName: "Thoughtful Parent", rating: 5, reviewText: "Excellent book, sparked many family discussions about important topics. Well-written and engaging for my 8-year-old.", reviewDate: "2023-11-10", userAvatar: "https://via.placeholder.com/50?text=TP" },
  { id: 'dr2', userName: "Young Reader", rating: 4, reviewText: "A bit challenging in some parts, but I liked the story and the main character. It made me think a lot!", reviewDate: "2023-11-12", userAvatar: "https://via.placeholder.com/50?text=YR" },
];

function BookDetailPage() {
  const [activeTab, setActiveTab] = React.useState(TABS[0].id); // Default to the first tab

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <MainHeader />
      <main className="flex-grow container mx-auto px-4 py-2"> {/* Reduced py for less top/bottom space */}
        <BookHeroSection /> {/* Already styled with its own container and padding */}
        
        <TabNavigation tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />

        {/* Tab Content Area - Add a container for consistent padding if needed, or let content components handle it */}
        <div className="bg-white shadow-sm rounded-b-lg"> {/* Optional container for tab content area */}
          {activeTab === 'overview' && <OverviewContent book={dummyBookData} />}
          {activeTab === 'questions' && <QuestionsContent questionsList={dummyQuestionsList} />}
          {activeTab === 'reviews' && <ReviewsContent reviewsList={dummyReviewsList} />}
          {activeTab === 'discussions' && <DiscussionsContent />}
        </div>

        <SimilarBooksSection />
      </main>
      <MainFooter />
    </div>
  );
}

export default BookDetailPage;
