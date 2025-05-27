export interface Book {
  id: string;
  title: string;
  imageUrl: string;
  author?: string;
  description?: string;
  ageRange?: string;
  publisher?: string;
  publishDate?: string;
  language?: string;
  pages?: string;
  // For simplicity in mock data, direct values. Could be calculated.
  averageRating?: number; 
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Material icon name, or path to custom icon
  href: string;
}

export interface ReviewAuthor {
  name: string;
  imageUrl?: string;
}

export interface Review {
  id: string;
  author: ReviewAuthor;
  date: string;
  rating: number; // 1-5
  text: string;
  likes?: number;
  dislikes?: number;
}