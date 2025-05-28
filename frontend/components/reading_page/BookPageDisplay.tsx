import React from 'react';

interface BookPageDisplayProps {
  imageUrl: string;
  altText?: string;
}

const BookPageDisplay: React.FC<BookPageDisplayProps> = ({ imageUrl, altText = "絵本のページ" }) => {
  if (!imageUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-700">
        <p className="text-gray-400">ページの読み込みに失敗しました。</p>
      </div>
    );
  }
  return (
    <img 
      src={imageUrl} 
      alt={altText} 
      className="max-w-full max-h-full object-contain shadow-lg"
    />
  );
};

export default BookPageDisplay;