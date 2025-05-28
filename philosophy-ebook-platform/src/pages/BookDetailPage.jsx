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
const DiscussionsContent = () => <div><h3>Discussions</h3><p>Discussions placeholder...</p></div>;

const TABS = [
  {id: 'overview', label: 'Overview'},
  {id: 'questions', label: 'Questions'},
  {id: 'reviews', label: 'Reviews'},
  {id: 'discussions', label: 'Discussions'}
];

const SimilarBooksSection = () => {
  // Dummy data for similar books
  const similarBooksData = [
    { id: 1, title: "Another Great Book", author: "Famous Author", readingTime: "15 min", description: "A fantastic read." },
    { id: 2, title: "Philosophical Adventures", author: "Wise Writer", readingTime: "30 min", description: "Explore deep thoughts." },
  ];
  return (
    <section style={{ marginTop: '20px' }}>
      <h2>Similar Books</h2>
      <div style={{ display: 'flex', overflowX: 'auto' }}>
        {similarBooksData.map(book => <BookCard key={book.id} {...book} />)}
      </div>
    </section>
  );
};

// Dummy book data to pass to OverviewContent
const dummyBookData = {
  detailedDescription: "This is a dummy detailed description for the book. It talks about complex themes in an accessible way for young readers, encouraging them to think critically about the world around them.",
  learningObjectives: ["Objective A from dummy data.", "Objective B from dummy data.", "Objective C from dummy data."],
  relatedBooks: [
    { id: 'rb_dummy1', title: "Dummy Related Book 1", author: "Author D1", description: "A brief description of dummy book 1." },
    { id: 'rb_dummy2', title: "Dummy Related Book 2", author: "Author D2", description: "A brief description of dummy book 2." }
  ]
};

// Dummy questions list
const dummyQuestionsList = [
  { id: 'dq1', text: "What is the main moral of this story according to you?", type: "Open-ended", difficulty: "Medium" },
  { id: 'dq2', text: "If you were the main character, what would you have done differently?", type: "Hypothetical", difficulty: "Easy" },
  { id: 'dq3', text: "Can you think of a real-life situation where the lessons from this book might apply?", type: "Application", difficulty: "Hard" },
];

// Dummy reviews list
const dummyReviewsList = [
  { id: 'dr1', userName: "Thoughtful Parent", rating: 5, reviewText: "Excellent book, sparked many family discussions.", reviewDate: "2023-11-10" },
  { id: 'dr2', userName: "Young Reader", rating: 4, reviewText: "A bit challenging but I liked it!", reviewDate: "2023-11-12" },
];

function BookDetailPage() {
  // In a real app, an :id would be used to fetch book data
  // For now, BookHeroSection uses default props

  const [activeTab, setActiveTab] = React.useState(TABS[0].id); // Default to the first tab

  return (
    <>
      <MainHeader />
      <main>
        <BookHeroSection />
        <TabNavigation tabs={TABS} activeTab={activeTab} onTabClick={setActiveTab} />

        {/* Tab Content Area */}
        <div>
          {activeTab === 'overview' && <OverviewContent book={dummyBookData} />}
          {activeTab === 'questions' && <QuestionsContent questionsList={dummyQuestionsList} />}
          {activeTab === 'reviews' && <ReviewsContent reviewsList={dummyReviewsList} />}
          {activeTab === 'discussions' && <DiscussionsContent />}
        </div>

        <SimilarBooksSection />
      </main>
      <MainFooter />
    </>
  );
}

export default BookDetailPage;
