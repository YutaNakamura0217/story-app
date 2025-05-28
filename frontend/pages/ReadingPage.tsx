import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { Book, RoutePath, PhilosophyQuestionItem, ReadingPageBookmark, ReadingPageNote, BookPageItem } from '../types';
import { MOCK_BOOKS, MOCK_BOOK_QUESTIONS } from '../constants';
import ReadingHeader from '../components/reading_page/ReadingHeader';
import PageViewer from '../components/reading_page/PageViewer';
import ReadingTools from '../components/reading_page/ReadingTools';
import SidePanel from '../components/reading_page/SidePanel';
import PhilosophyQuestionPopup from '../components/reading_page/PhilosophyQuestionPopup';
import CompletionModal from '../components/reading_page/CompletionModal';

const ReadingPage: React.FC = () => {
  const { id: bookId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null | undefined>(undefined);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  type SidePanelTab = 'toc' | 'bookmarks' | 'notes';
  const [sidePanelActiveTab, setSidePanelActiveTab] = useState<SidePanelTab>('toc');
  
  const [bookmarks, setBookmarks] = useState<Set<ReadingPageBookmark>>(new Set());
  const [notes, setNotes] = useState<ReadingPageNote[]>([]);
  
  const [currentPhilosophyQuestion, setCurrentPhilosophyQuestion] = useState<PhilosophyQuestionItem | null>(null);
  const [showPhilosophyQuestionPopup, setShowPhilosophyQuestionPopup] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false); // Mock audio state

  useEffect(() => {
    const foundBook = MOCK_BOOKS.find(b => b.id === bookId);
    if (foundBook) {
      if (!foundBook.pages || foundBook.totalPages === undefined) {
        console.warn(`Book ${foundBook.id} is missing pages or totalPages data. Cannot open in reading mode.`);
        setBook(null); // Mark as not readable
        return;
      }
      setBook(foundBook);
      setCurrentPageNumber(1);
      // Load stored bookmarks/notes for this book (from localStorage or API in real app)
      // For now, reset them per book load
      setBookmarks(new Set());
      setNotes([]);
    } else {
      setBook(null); // Book not found
    }
  }, [bookId]);

  const totalPages = useMemo(() => book?.totalPages || 0, [book]);
  const currentPageData: BookPageItem | undefined = useMemo(() => {
    return book?.pages?.find(p => p.pageNumber === currentPageNumber);
  }, [book, currentPageNumber]);

  // Handle philosophy question popup
  useEffect(() => {
    if (currentPageData?.questionId) {
      const question = MOCK_BOOK_QUESTIONS.find(q => q.id === currentPageData.questionId);
      if (question) {
        setCurrentPhilosophyQuestion(question);
        setShowPhilosophyQuestionPopup(true);
      }
    } else {
      setCurrentPhilosophyQuestion(null);
      setShowPhilosophyQuestionPopup(false);
    }
  }, [currentPageData]);

  // Handle completion modal
  useEffect(() => {
    if (totalPages > 0 && currentPageNumber === totalPages) {
      setShowCompletionModal(true);
    } else {
      setShowCompletionModal(false);
    }
  }, [currentPageNumber, totalPages]);


  const handleNextPage = () => {
    if (currentPageNumber < totalPages) {
      setCurrentPageNumber(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageNumber > 1) {
      setCurrentPageNumber(prev => prev - 1);
    }
  };
  
  const goToPage = (page: number) => {
     if (page >= 1 && page <= totalPages) {
      setCurrentPageNumber(page);
      setIsSidePanelOpen(false); // Close panel on TOC navigation
    }
  }

  const toggleAudio = () => setIsPlayingAudio(prev => !prev);

  const toggleBookmark = () => {
    setBookmarks(prev => {
      const newBookmarks = new Set(prev);
      if (newBookmarks.has(currentPageNumber)) {
        newBookmarks.delete(currentPageNumber);
      } else {
        newBookmarks.add(currentPageNumber);
      }
      return newBookmarks;
    });
  };

  const addNote = (text: string) => {
    if (text.trim()) {
      setNotes(prev => [...prev, { pageNumber: currentPageNumber, text, date: new Date().toISOString() }]);
    }
  };
  
  const deleteNote = (noteDate: string) => {
      setNotes(prev => prev.filter(note => !(note.pageNumber === currentPageNumber && note.date === noteDate)));
  };

  const openSidePanel = (tab: SidePanelTab = 'toc') => {
    setSidePanelActiveTab(tab);
    setIsSidePanelOpen(true);
  };

  const currentNotes = useMemo(() => {
    return notes.filter(note => note.pageNumber === currentPageNumber);
  }, [notes, currentPageNumber]);


  if (book === undefined) {
    return <div className="flex justify-center items-center min-h-screen bg-amber-50"><div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!book) {
    // Book not found or not readable
    return <Navigate to={RoutePath.Books} replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      <ReadingHeader
        bookTitle={book.title}
        currentPage={currentPageNumber}
        totalPages={totalPages}
        onBack={() => navigate(`${RoutePath.Books}/${book.id}`)}
        onSettings={() => console.log("Settings clicked")}
      />
      
      <div className="flex-grow flex relative">
        <main className={`flex-grow transition-all duration-300 ease-in-out ${isSidePanelOpen ? 'mr-0 sm:mr-80' : 'mr-0'}`}>
          <PageViewer
            currentPageImageUrl={currentPageData?.imageUrl || ''}
            onNextPage={handleNextPage}
            onPreviousPage={handlePreviousPage}
            showPrev={currentPageNumber > 1}
            showNext={currentPageNumber < totalPages}
          />
        </main>

        {isSidePanelOpen && book && (
          <SidePanel
            isOpen={isSidePanelOpen}
            onClose={() => setIsSidePanelOpen(false)}
            activeTab={sidePanelActiveTab}
            onTabChange={setSidePanelActiveTab}
            tableOfContents={book.tableOfContents || []}
            bookmarks={bookmarks}
            notes={currentNotes}
            onAddNote={addNote}
            onDeleteNote={deleteNote}
            onGoToPage={goToPage}
            currentPage={currentPageNumber}
          />
        )}
      </div>

      <ReadingTools
        isPlaying={isPlayingAudio}
        onTogglePlay={toggleAudio}
        isBookmarked={bookmarks.has(currentPageNumber)}
        onToggleBookmark={toggleBookmark}
        onOpenNotes={() => openSidePanel('notes')}
        onToggleSidePanel={() => {
          if (isSidePanelOpen) setIsSidePanelOpen(false);
          else openSidePanel('toc');
        }}
        isSidePanelOpen={isSidePanelOpen}
      />

      {showPhilosophyQuestionPopup && currentPhilosophyQuestion && (
        <PhilosophyQuestionPopup
          question={currentPhilosophyQuestion}
          onClose={() => setShowPhilosophyQuestionPopup(false)}
          onHint={() => alert("ヒント: 親子で「もし自分だったらどう感じるかな？」「他の方法はあるかな？」と話し合ってみましょう。")}
        />
      )}

      {showCompletionModal && (
        <CompletionModal
          bookTitle={book.title}
          onClose={() => {
            setShowCompletionModal(false);
            navigate(`${RoutePath.Books}/${book.id}`); // Go back to book detail
          }}
          onFindNextBook={() => {
            setShowCompletionModal(false);
            navigate(RoutePath.Books); // Go to book list
          }}
        />
      )}
    </div>
  );
};

export default ReadingPage;