import React from 'react';
import BookCard from './BookCard';
import type { Book } from '../types';
import type { View } from '../constants';

interface MainContentProps {
  onNavigate: (view: View, data?: any) => void;
}

// Expanded book data
const recommendedBooksData: Book[] = [
  { id: 'rec1', title: "The Magical Treehouse Adventure", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuABOvuXv7ur4ZOiDABoFdypTlbqPvyV-M8GF6_gIuajyQPWZgvv9GoQ7EkjKmJ0cQpG61QSg3IH6RVmhroht5y8J0R2J7-uIdXiOQsi2ot9eMfvlw-qQct22kfoQN0tY3tWB0hgufsIgLCNhvLUm4vWHM8VxHOcsfFoAiX-33cg2kHT9p7T4RqQZcs0Ss3SGU8Z0qYYyVMh6qzJ1amrRqXiWd3B9MB9ILanwwx86GaSd4xl9GBQBau6wVA0nnjBy2TNQPkJf5xFNnsb", author: "Author A", description: "Join Tim and Mia on an adventure in a magical treehouse that can travel through time and space!" },
  { id: 'rec2', title: "The Little Bear's Big Journey", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0e7pRts8AWBMY2YyA9-gPts2RLW8MItTOf1KrBjh4JUrzOUxHoorixI9o69eE_rU8gHF8do9GCQVQnRtec5U-PH0YMnG43y9OZTJZSQRGaqbi7gufkITSfC6vVs7eIQuO7lANfW_VYbu9SBr0J4E2LYCTgU0doHfFCPnJgmoevxNtyxHF3_OdSWC167WUElWBjhbdw7l9TduM2X6ebVTXLVjRQgqD570XzFkraf1wgxJsdcUQPJF8Qe7HeYGO8NnUoObpm7st-XdN", author: "Emily Clark", description: "A heartwarming tale of a young bear's first adventure into the forest, learning about friendship and courage. This is the main book for the detail page example." , ageRange: "3-7歳", publisher: "StoryTime Publishing", publishDate: "2023年", language: "英語", pages: "32ページ", averageRating: 4.8, reviewCount: 125 },
  { id: 'rec3', title: "The Princess and the Dragon", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyM9DZClr20wtDvNhHxWrw6Ax_jzPJxhEIdvLVdwfO7lHxAfKVvMnqY33wZOTXhlMUpAPaB40l9eXK-PchnNy7eOpdzSmOooH1tDsu1yq9Kca9vbZDOlsPBB9xmggJ0-GrVO7FMjvbbjeSZpmx_X4V95uD7r-VyoRT1onCyNP9XoLP8OPTyMR3B2n0wmT73ihvUL554mUbGhsFyLXuYuKzvZH7CWh7FOpcebLNE359ta-zf56qyKwhdetVcarpO6-kjhIFmaBFbCrb", author: "Author C", description: "A brave princess, a friendly dragon, and a quest to save the kingdom. What could go wrong?" },
  { id: 'rec4', title: "The Mystery of the Missing Toy", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ_flTDP09zYwyKwOk7zv7voGC4KeGmaXRyVhgNJMWtKBrmEIhaVW8vHZdr0IwuOP7Gl3wZdyCMelINbMR4tcvFZlDKVzZhxKVlwv2qJSEwMDFHbCwrNXqBexRGMqYrgJgI4GRBD6jqvXnY2FhW6TgMnH_g5fgy5JptQSr-fTDe2Gl7B5i_5CyEkMIogTMaD7uCANnGigjcDh-yqlxVRDyadu160H5z02VHBMX_zufWK4aI5WIGL5KQaF91_IaDWq8YetE1bdh4ziN", author: "Author D", description: "Detective Dog is on the case to find a little girl's favorite missing toy!" },
  { id: 'rec5', title: "The Brave Knight and the Unicorn", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxZSksw1jr7cImdYnerqD9vQ1cKmlOIK1QPvMj7fF2ytdqwYUxA-tORdmxcqIORmcUTGyAhTANLc6mxWO5qqFE_oLiLy36FuGzEe_OaCSymVB9EJttIMuF9hsOLzNm9qJP2bu7MLMFXKIwU-Of9Vwt5hIa4fowOUltgjod_lHvfBSTFjQL7ZRtZp5zmWmbGqbeYyvUE3HwtJlql9VWbEV3zgxWwf0I5AATedqbLZ3jjGqN22sEACvnmzIHKo_g-DboSkWqgFDooIdH", author: "Author E", description: "A young knight must prove his courage by helping a mystical unicorn." },
];

const newArrivalsData: Book[] = [
  { id: 'new1', title: "The Mystery of the Missing Toy", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQ_flTDP09zYwyKwOk7zv7voGC4KeGmaXRyVhgNJMWtKBrmEIhaVW8vHZdr0IwuOP7Gl3wZdyCMelINbMR4tcvFZlDKVzZhxKVlwv2qJSEwMDFHbCwrNXqBexRGMqYrgJgI4GRBD6jqvXnY2FhW6TgMnH_g5fgy5JptQSr-fTDe2Gl7B5i_5CyEkMIogTMaD7uCANnGigjcDh-yqlxVRDyadu160H5z02VHBMX_zufWK4aI5WIGL5KQaF91_IaDWq8YetE1bdh4ziN", author: "Author D", description: "Detective Dog is on the case to find a little girl's favorite missing toy!" },
  { id: 'new2', title: "The Brave Knight and the Unicorn", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxZSksw1jr7cImdYnerqD9vQ1cKmlOIK1QPvMj7fF2ytdqwYUxA-tORdmxcqIORmcUTGyAhTANLc6mxWO5qqFE_oLiLy36FuGzEe_OaCSymVB9EJttIMuF9hsOLzNm9qJP2bu7MLMFXKIwU-Of9Vwt5hIa4fowOUltgjod_lHvfBSTFjQL7ZRtZp5zmWmbGqbeYyvUE3HwtJlql9VWbEV3zgxWwf0I5AATedqbLZ3jjGqN22sEACvnmzIHKo_g-DboSkWqgFDooIdH", author: "Author E", description: "A young knight must prove his courage by helping a mystical unicorn." },
  // ... other new arrivals with descriptions
];

const popularBooksData: Book[] = [
  { id: 'pop1', title: "The Adventures of Timmy the Turtle", imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1nbACalDSGczXdsoaK61mhBDdcrJtX2R4QRbbiE2b0yQu2SteeqtcmUPpeCtWzPNm1jvrbgT1WjlFiSvSRdyatr2EolMDcGzLwbZU9dOy1Vrl9U5ptukZfqyIheyRkc6n95mlc11ynVhxMG7cXeBaV3L3QuhEUQ0iekiW7Jlu4554A9UPXIbRJpY-G3EVBYCGxByZQD4d5bIl9jIjaJgzdosjZ-TCTaxcFHonkRuJFxtqaa37b1gdGrkdgh8uQfHqf7FZahFZ1hM5", author: "Author G", description: "Timmy the Turtle goes on exciting adventures and learns valuable life lessons." },
  // ... other popular books with descriptions
];


const BookSection: React.FC<{title: string, books: Book[], searchTerm?: string, onNavigate: (view: View, data?: any) => void}> = ({title, books, searchTerm, onNavigate}) => {
  const filteredBooks = searchTerm
    ? books.filter(book => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : books;

  if (filteredBooks.length === 0 && searchTerm) return null;
  if (filteredBooks.length === 0 && !searchTerm && books.length > 0) { // if original list has items but filtered is empty (should be caught by above)
     // This case might not be hit if searchTerm logic is robust
  } else if (filteredBooks.length === 0) {
    return null; // Don't render section if no books to show, even without search
  }


  return (
    <section className="mb-10" aria-labelledby={title.replace(/\s+/g, '-').toLowerCase()}>
      <h2 id={title.replace(/\s+/g, '-').toLowerCase()} className="text-slate-800 text-2xl font-semibold leading-tight tracking-tight px-4 pb-4 pt-2">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4" role="list">
        {filteredBooks.map(book => <BookCard key={book.id} book={book} onNavigate={onNavigate} />)}
      </div>
    </section>
  );
};

const MainContent: React.FC<MainContentProps> = ({ onNavigate }) => {
  return (
    <main className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-8 sm:py-12">
      <div className="layout-content-container flex flex-col w-full max-w-5xl">
        <BookSection title="Recommended for You" books={recommendedBooksData} onNavigate={onNavigate} />
        <BookSection title="New Arrivals" books={newArrivalsData} onNavigate={onNavigate} />
        <BookSection title="Popular Books" books={popularBooksData} onNavigate={onNavigate} />
      </div>
    </main>
  );
};

export default MainContent;