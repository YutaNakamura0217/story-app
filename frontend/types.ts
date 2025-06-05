
import React from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  tier?: 'Free' | 'Premium' | 'Creator';
}

export interface Child {
  id: string;
  name: string;
  age: number;
  avatarUrl?: string;
  interests?: string[];
  progress?: number; // 0-100
  recentActivity?: string;
}

export type ThemeCategory = 'all' | 'self' | 'others' | 'world' | 'thinking';

export interface PhilosophyTheme {
  id: string;
  name: string;
  iconElement?: React.ReactElement<{ className?: string }>; 
  ageRange: string;
  bookCount: number;
  description?: string;
  color?: string; // for theme card background
  // New properties for ThemesPage
  category: ThemeCategory;
  question?: string;
  coverImageUrl?: string; 
}

export interface BookPageItem {
  pageNumber: number;
  imageUrl: string;
  questionId?: string; // Link to a PhilosophyQuestionItem
  audioUrl?: string; // For TTS or narration
}

export interface BookTableOfContentsItem {
    title: string;
    pageNumber: number;
}

export interface Book {
  id: string;
  title: string;
  authorName: string;
  coverUrl: string;
  description: string;
  longDescription?: string;
  readingTime: string;
  ageRange: string; // e.g., "3-5歳"
  publisher?: string;
  publishDate?: string;
  tags?: string[]; // Can be used for philosophy themes for now
  isPremium?: boolean;
  isFree?: boolean; // Added to distinguish free from default (paid but not premium)
  learningObjectives?: string[];
  relatedBookIds?: string[]; 
  popularityScore?: number; // For sorting
  releaseDate?: string; // For sorting by newness (use publishDate if specific releaseDate is not available)

  // For ReadingPage
  totalPages?: number;
  pages?: BookPageItem[];
  tableOfContents?: BookTableOfContentsItem[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  rating: number; // 1-5
  text: string;
  date: string;
}

export interface PhilosophyQuestionItem {
  id: string;
  text: string;
  type: 'MultipleChoice' | 'OpenEnded';
  difficulty: 'Easy' | 'Hard';
  options?: string[];
}

// For Discussion Feature
export interface DiscussionPost {
  id: string;
  discussionId: string;
  userId: string; // Corresponds to User.id
  userName: string;
  userAvatarUrl?: string;
  timestamp: string; // ISO date string
  text: string;
  // repliesTo?: string; // For threaded replies, optional for now
}

export interface DiscussionSummary {
  id: string;
  bookId: string;
  title: string;
  participantCount: number;
  latestCommentPreview?: string; // e.g., "佐藤さん: それは面白い視点ですね..."
  firstFewLines?: string; // Preview of the initial post
  lastActivity: string; // ISO date string or human-readable like "2時間前"
  createdByUserId: string;
  createdByUserName: string;
}


export enum RoutePath {
  Home = '/',
  Login = '/login',
  Register = '/register', 
  ResetPassword = '/reset-password',
  ChangePassword = '/change-password', 
  Dashboard = '/dashboard',
  Books = '/books', 
  BookDetail = '/books/:id', 
  BookRead = '/books/:id/read',
  BookDiscussions = '/books/:id/discussions', 
  QuestionAnswer = '/books/:bookId/questions/:questionId/answer', // Added for question answering
  Themes = '/themes', 
  ThemeBooks = '/themes/:id/books', 
  Search = '/search', 
  Favorites = '/favorites',
  // User Management Settings Pages
  Profile = '/profile', 
  ChildrenManage = '/children', 
  ChildAdd = '/children/add', 
  ChildEdit = '/children/:id/edit', 
  ChildDetail = '/children/:id', 
  LearningHistory = '/learning-history', 
  Settings = '/settings', 
  // Static Pages
  Terms = '/terms',
  Privacy = '/privacy',
  Help = '/help',
  Contact = '/contact',
}

export interface NavLink {
  label: string;
  path: RoutePath | string;
  icon?: React.ReactElement<{ className?: string }>;
  isProtected?: boolean;
  children?: NavLink[]; 
}

// For Book List Page
export enum BookSortOption {
  Popularity = 'popularity',
  Newest = 'newest',
  Recommended = 'recommended', 
  TitleAsc = 'titleAsc',
  TitleDesc = 'titleDesc',
}

export enum BookTypeFilterOption {
  All = 'all',
  Subscription = 'subscription', 
  Premium = 'premium',
  Free = 'free',
}

export interface BookFilters {
  searchQuery: string;
  themeId: string; 
  minAge: number | null;
  maxAge: number | null;
  type: BookTypeFilterOption;
}

export interface SelectOption {
  value: string;
  label: string;
}

// For ReadingPage
export type ReadingPageBookmark = number; // Page number

export interface ReadingPageNote {
  pageNumber: number;
  text: string;
  date: string; // ISO date string
}

// Progress data from backend
export interface UserBookBookmark {
  id: string;
  pageNumber: number;
}

export interface UserBookNote {
  id: string;
  pageNumber: number;
  text: string;
  date: string; // created_at
}

export interface UserBookProgress {
  currentPage: number;
  bookmarks: UserBookBookmark[];
  notes: UserBookNote[];
  lastReadAt: string;
}

// For User Management
export interface LearningActivity {
    id: string;
    date: string; // ISO date string
    childId?: string; 
    childName?: string; 
    childAvatarUrl?: string; 
    activityType: 'book_read' | 'question_answered' | 'badge_earned' | 'note_taken';
    description: string; 
    link?: string; 
}

// For Question Answer Page
export interface UserTextAnswer {
  bookId: string;
  questionId: string;
  userId: string;
  answerText: string;
  timestamp: string; // ISO date string
}
