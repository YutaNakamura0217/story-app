import React, { useState } from 'react';
import Tabs, { Tab } from '../ui/Tabs';
import Button from '../ui/Button';
import { ReadingPageBookmark, ReadingPageNote, BookTableOfContentsItem } from '../../types';
import { XIcon, BookmarkAltIcon, PencilSquareIcon, ListBulletIcon, TrashIcon } from '../../assets/icons';

type SidePanelTabId = 'toc' | 'bookmarks' | 'notes';

interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: SidePanelTabId;
  onTabChange: (tabId: SidePanelTabId) => void;
  tableOfContents: BookTableOfContentsItem[];
  bookmarks: Set<ReadingPageBookmark>;
  notes: ReadingPageNote[];
  onAddNote: (text: string) => void;
  onDeleteNote: (noteDate: string) => void;
  onGoToPage: (pageNumber: number) => void;
  currentPage: number;
}

const SidePanel: React.FC<SidePanelProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  tableOfContents,
  bookmarks,
  notes,
  onAddNote,
  onDeleteNote,
  onGoToPage,
  currentPage
}) => {
  const [noteText, setNoteText] = useState('');

  const handleAddNote = () => {
    if (noteText.trim()) {
      onAddNote(noteText);
      setNoteText('');
    }
  };

  const sortedBookmarks = Array.from(bookmarks).sort((a, b) => a - b);

  if (!isOpen) return null;

  return (
    <aside className="fixed top-0 right-0 h-full w-full sm:w-80 bg-gray-800 text-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">
          {activeTab === 'toc' && '目次'}
          {activeTab === 'bookmarks' && 'ブックマーク'}
          {activeTab === 'notes' && `メモ (P.${currentPage})`}
        </h2>
        <Button variant="ghost" onClick={onClose} className="!p-2 !text-gray-300 hover:!bg-gray-700">
          <XIcon className="w-6 h-6" />
        </Button>
      </div>

      <Tabs 
        initialTab={activeTab === 'toc' ? 0 : activeTab === 'bookmarks' ? 1 : 2}
        onTabChange={(index) => onTabChange(index === 0 ? 'toc' : index === 1 ? 'bookmarks' : 'notes')}
        className="flex-grow flex flex-col"
        tabListClassName="!px-2 !pt-2 !border-gray-700"
        tabPanelClassName="flex-grow overflow-y-auto !p-0"
      >
        <Tab 
            label="目次" 
            className="!text-sm !py-2" 
            activeClassName="!border-amber-500 !text-amber-400" 
            inactiveClassName="!border-transparent !text-gray-300 hover:!text-white hover:!border-gray-500"
        >
          <div className="p-4 space-y-2">
            {tableOfContents.length > 0 ? (
              tableOfContents.map((item) => (
                <button
                  key={item.pageNumber}
                  onClick={() => onGoToPage(item.pageNumber)}
                  className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition-colors text-sm ${currentPage === item.pageNumber ? 'text-amber-400 font-semibold' : 'text-gray-200'}`}
                >
                  {item.title} <span className="text-xs text-gray-400">- P.{item.pageNumber}</span>
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">この本には目次がありません。</p>
            )}
          </div>
        </Tab>
        <Tab 
            label="ブックマーク" 
            className="!text-sm !py-2"
            activeClassName="!border-amber-500 !text-amber-400" 
            inactiveClassName="!border-transparent !text-gray-300 hover:!text-white hover:!border-gray-500"
        >
          <div className="p-4 space-y-2">
            {sortedBookmarks.length > 0 ? (
              sortedBookmarks.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => onGoToPage(pageNumber)}
                  className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700 transition-colors text-sm flex items-center justify-between ${currentPage === pageNumber ? 'text-amber-400 font-semibold' : 'text-gray-200'}`}
                >
                  <span>ページ {pageNumber}</span>
                  <BookmarkAltIcon className="w-4 h-4 text-amber-400" solid />
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center py-4">ブックマークはありません。</p>
            )}
          </div>
        </Tab>
        <Tab 
            label="メモ" 
            className="!text-sm !py-2"
            activeClassName="!border-amber-500 !text-amber-400" 
            inactiveClassName="!border-transparent !text-gray-300 hover:!text-white hover:!border-gray-500"
        >
          <div className="p-4 flex flex-col h-full">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder={`ページ ${currentPage} のメモを入力...`}
              className="w-full h-28 p-2 text-sm bg-gray-700 border border-gray-600 rounded-md mb-2 focus:ring-amber-500 focus:border-amber-500 resize-none text-gray-100"
            />
            <Button onClick={handleAddNote} variant="primary" size="sm" className="w-full mb-4 rounded-md">メモを追加</Button>
            <div className="space-y-3 overflow-y-auto flex-grow">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <div key={note.date} className="bg-gray-700 p-3 rounded-md shadow">
                    <p className="text-xs text-gray-300 mb-1">
                      {new Date(note.date).toLocaleString('ja-JP', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p className="text-sm text-gray-100 whitespace-pre-wrap">{note.text}</p>
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => onDeleteNote(note.date)}
                        className="!text-red-400 hover:!bg-red-500/20 mt-1 !p-1 float-right"
                        aria-label="メモを削除"
                    >
                        <TrashIcon className="w-4 h-4"/>
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">このページのメモはありません。</p>
              )}
            </div>
          </div>
        </Tab>
      </Tabs>
    </aside>
  );
};

export default SidePanel;