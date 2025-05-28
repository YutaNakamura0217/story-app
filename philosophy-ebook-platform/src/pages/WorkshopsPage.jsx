import React from 'react';
import MainHeader from '../components/Layout/MainHeader';
import MainFooter from '../components/Layout/MainFooter';
import WorkshopsHero from '../components/Workshops/WorkshopsHero';
import WorkshopGrid from '../components/Workshops/WorkshopGrid';
import FilterSection from '../components/Workshops/FilterSection';
import PaginationControls from '../components/Workshops/PaginationControls';

function WorkshopsPage() {
  // Dummy workshop data
  const sampleWorkshops = [
    { id: 'w1', title: "The Art of Asking Questions", instructor: "Dr. Socrates Jr.", dateTime: "Feb 10, 2024, 2:00 PM EST", duration: "60 minutes", ageRange: "6-8 years", price: "$20", participantCount: 15, description: "Learn how to ask amazing questions that spark deep thoughts and fun conversations.", imageUrl: "https://via.placeholder.com/400x250?text=Art+of+Questions" },
    { id: 'w2', title: "Ethical Dilemmas for Young Thinkers", instructor: "Prof. Ethica Values", dateTime: "Feb 17, 2024, 11:00 AM PST", duration: "90 minutes", ageRange: "9-12 years", price: "$30", participantCount: 10, description: "Explore challenging scenarios and discuss what makes a choice 'right' or 'wrong'.", imageUrl: "https://via.placeholder.com/400x250?text=Ethical+Dilemmas" },
    { id: 'w3', title: "Logic Puzzles & Brain Teasers", instructor: "Mr. R. Easoning", dateTime: "Feb 24, 2024, 4:00 PM GMT", duration: "75 minutes", ageRange: "7-10 years", price: "$25", participantCount: 20, description: "Sharpen your mind with fun logic puzzles and learn the basics of critical thinking.", imageUrl: "https://via.placeholder.com/400x250?text=Logic+Puzzles" },
    { id: 'w4', title: "My First Philosophy Club", instructor: "Ms. Wonder More", dateTime: "Mar 2, 2024, 10:00 AM EST", duration: "45 minutes", ageRange: "4-6 years", price: "$15", participantCount: 8, description: "A gentle introduction to big ideas through stories and play. Perfect for preschoolers.", imageUrl: "https://via.placeholder.com/400x250?text=First+Philosophy+Club" },
    // Adding a few more for pagination testing
    { id: 'w5', title: "Debate for Beginners", instructor: "Ms. Argue Well", dateTime: "Mar 5, 2024, 3:00 PM PST", duration: "60 minutes", ageRange: "10-13 years", price: "$22", participantCount: 12, description: "Learn the fundamentals of constructing arguments and engaging in respectful debate.", imageUrl: "https://via.placeholder.com/400x250?text=Debate+Beginners" },
    { id: 'w6', title: "Mindfulness for Kids", instructor: "Mr. Calm Corner", dateTime: "Mar 9, 2024, 9:00 AM EST", duration: "45 minutes", ageRange: "5-8 years", price: "$18", participantCount: 10, description: "Introduction to mindfulness practices to help children focus and understand their emotions.", imageUrl: "https://via.placeholder.com/400x250?text=Mindfulness+Kids" },
  ];

  // Dummy pagination state and handler
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 5; // Assuming 5 pages for dummy data
  const handlePageChange = (page) => {
    console.log("Go to page:", page);
    setCurrentPage(page);
    // In a real app, you would fetch data for the new page here
  };


  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <MainHeader />
      <WorkshopsHero />

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <FilterSection />
          <WorkshopGrid workshops={sampleWorkshops} /> {/* This would be paginated data in a real app */}
          <PaginationControls 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
      
      <div className="flex-grow"></div> {/* Pushes footer down */}
      <MainFooter />
    </div>
  );
}

export default WorkshopsPage;
