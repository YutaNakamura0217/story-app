import React from 'react';
import { 
  PlayIcon, PauseIcon, BookmarkAltIcon, PencilSquareIcon, ListBulletIcon, 
  SpeakerWaveIcon, SpeakerXMarkIcon 
} from '../../assets/icons';

interface ReadingToolsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenNotes: () => void;
  onToggleSidePanel: () => void;
  isSidePanelOpen: boolean;
}

const ReadingTools: React.FC<ReadingToolsProps> = ({
  isPlaying,
  onTogglePlay,
  isBookmarked,
  onToggleBookmark,
  onOpenNotes,
  onToggleSidePanel,
  isSidePanelOpen
}) => {
  return (
    <footer className="bg-gray-800/80 backdrop-blur-sm text-white p-3 shadow-md fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-16">
      <button
        onClick={onTogglePlay}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors flex flex-col items-center text-xs"
        aria-label={isPlaying ? "音声を一時停止" : "音声を再生"}
      >
        {isPlaying ? <PauseIcon className="w-6 h-6 mb-0.5" /> : <PlayIcon className="w-6 h-6 mb-0.5" />}
        {/* {isPlaying ? '一時停止' : '再生'} */}
      </button>
      <button
        onClick={onToggleBookmark}
        className={`p-2 rounded-full hover:bg-gray-700 transition-colors flex flex-col items-center text-xs ${isBookmarked ? 'text-amber-400' : ''}`}
        aria-label={isBookmarked ? "ブックマークを削除" : "ブックマーク"}
      >
        <BookmarkAltIcon className="w-6 h-6 mb-0.5" solid={isBookmarked} />
        {/* {isBookmarked ? '保存済' : '保存'} */}
      </button>
      <button
        onClick={onOpenNotes}
        className="p-2 rounded-full hover:bg-gray-700 transition-colors flex flex-col items-center text-xs"
        aria-label="メモを開く"
      >
        <PencilSquareIcon className="w-6 h-6 mb-0.5" />
        {/* メモ */}
      </button>
      <button
        onClick={onToggleSidePanel}
        className={`p-2 rounded-full hover:bg-gray-700 transition-colors flex flex-col items-center text-xs ${isSidePanelOpen ? 'bg-gray-700' : ''}`}
        aria-label={isSidePanelOpen ? "サイドパネルを閉じる" : "サイドパネルを開く"}
      >
        <ListBulletIcon className="w-6 h-6 mb-0.5" />
        {/* 目次 */}
      </button>
    </footer>
  );
};

export default ReadingTools;