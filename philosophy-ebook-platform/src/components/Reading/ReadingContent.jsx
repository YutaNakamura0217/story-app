import React from 'react';

// Placeholders for sub-components - Apply Tailwind within these structures
const PageViewer = () => (
  <div className="flex-grow bg-gray-100 flex flex-col justify-center items-center p-4 overflow-y-auto"> {/* Added overflow-y-auto */}
    <div 
      className="w-full max-w-2xl h-auto min-h-[calc(100vh-280px)] sm:min-h-[calc(100vh-220px)] bg-white border border-gray-300 shadow-lg flex justify-center items-center p-6 rounded-md"
    > {/* Adjusted height for responsiveness and content, added padding and rounded */}
      Book Page Content (Image/PDF/Text Placeholder)
    </div>
    <div className="mt-4 flex justify-between w-full max-w-2xl">
      <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        &larr; Previous Page
      </button>
      <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Next Page &rarr;
      </button>
    </div>
  </div>
);

const ReadingTools = () => (
  <div className="flex flex-wrap justify-center items-center p-3 bg-gray-50 border-t border-gray-200 space-x-2 sm:space-x-3">
    {['Bookmark', 'Notes', 'Text Size', 'Play Audio'].map(tool => (
      <button 
        key={tool}
        className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 my-1"
      >
        {tool} {/* Placeholder for icons later */}
      </button>
    ))}
  </div>
);

function ReadingContent() {
  const [isSidePanelOpen, setIsSidePanelOpen] = React.useState(false);

  return (
    <div className="flex h-[calc(100vh-4rem)]"> {/* Adjust height based on ReadingHeader's height (h-16 = 4rem) */}
      <div className="flex-grow flex flex-col overflow-hidden"> {/* Added overflow-hidden */}
        <PageViewer />
        <ReadingTools />
      </div>
      
      {/* Button to toggle side panel - positioned absolutely relative to parent */}
      <button 
        onClick={() => setIsSidePanelOpen(!isSidePanelOpen)} 
        className="fixed top-18 right-0 mt-2 mr-2 z-30 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:hidden"
         // Show only on small screens, or adjust as needed. For larger screens, panel might be part of layout.
      >
        {/* Placeholder for Menu/Close Icon */}
        {isSidePanelOpen ? 
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg> :
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        }
        <span className="sr-only">{isSidePanelOpen ? 'Close Panel' : 'Open Panel'}</span>
      </button>

      {/* SidePanel */}
      <div 
        className={`bg-white border-l border-gray-200 p-4 transition-all duration-300 ease-in-out overflow-y-auto
                    ${isSidePanelOpen ? 'w-64 sm:w-72' : 'w-0 p-0 border-0'} `}
        // style={{ width: isSidePanelOpen ? '288px' : '0px' }} // Control width with JS/state if precise pixel values needed beyond Tailwind's w-* classes
      >
        {isSidePanelOpen && ( // Only render content when open to avoid issues with p-0 on hidden state
          <>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Table of Contents</h4>
            <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside mb-4">
              <li>Chapter 1: The Beginning</li>
              <li>Chapter 2: A New Idea</li>
              <li>Chapter 3: The Challenge</li>
            </ul>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Bookmarks</h4>
            <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside mb-4">
              <li>Page 5: The Turning Point</li>
              <li>Page 12: Interesting Quote</li>
            </ul>
            <h4 className="text-lg font-semibold text-gray-700 mb-3">Notes</h4>
            <ul className="space-y-1 text-sm text-gray-600 list-disc list-inside">
              <li>My thought on page 3...</li>
              <li>Connection to another book...</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default ReadingContent;
