
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; 
import ResetPasswordPage from './pages/ResetPasswordPage';
import ChangePasswordPage from './pages/ChangePasswordPage'; 
import DashboardPage from './pages/DashboardPage';
import BookDetailPage from './pages/BookDetailPage';
import BooksPage from './pages/BooksPage';
import ThemesPage from './pages/ThemesPage';
import ThemeBooksPage from './pages/ThemeBooksPage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';
import ReadingPage from './pages/ReadingPage';
import BookDiscussionsPage from './pages/BookDiscussionsPage';
import QuestionAnswerPage from './pages/QuestionAnswerPage'; // Import QuestionAnswerPage
import NotFoundPage from './pages/NotFoundPage';
import { AuthProvider, useAuth } from './hooks/useAuth'; 
import { FavoritesProvider } from './hooks/useFavorites';
import { RoutePath } from './types';

// Settings Page Imports
import SettingsLayout from './components/layout/SettingsLayout';
import ProfileSettingsPage from './pages/settings/ProfileSettingsPage';
import ChildrenManagementPage from './pages/settings/ChildrenManagementPage';
import AddChildPage from './pages/settings/AddChildPage';
import EditChildPage from './pages/settings/EditChildPage';
import ChildDetailPage from './pages/settings/ChildDetailPage';
import LearningHistoryPage from './pages/settings/LearningHistoryPage';
import AccountSettingsPage from './pages/settings/AccountSettingsPage';


interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); 
  
  if (loading) { 
    return (
      <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={RoutePath.Login} replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FavoritesProvider> 
        <HashRouter>
          <Routes>
            {/* Public Routes */}
            <Route path={RoutePath.Login} element={<LoginPage />} />
            <Route path={RoutePath.Register} element={<RegisterPage />} /> 
            <Route path={RoutePath.ResetPassword} element={<ResetPasswordPage />} />
            <Route path={RoutePath.ChangePassword} element={<ChangePasswordPage />} /> 
            <Route path={RoutePath.Themes} element={<ThemesPage />} />
            <Route path={RoutePath.ThemeBooks} element={<ThemeBooksPage />} />
            <Route path={RoutePath.Books} element={<BooksPage />} /> 
            <Route path={RoutePath.Search} element={<SearchPage />} /> 

            {/* Protected Routes - Main App */}
            <Route 
              path={RoutePath.Dashboard} 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={RoutePath.BookDetail} // e.g., /books/:id
              element={
                <ProtectedRoute>
                  <BookDetailPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path={RoutePath.BookRead}  // e.g., /books/:id/read
              element={
                <ProtectedRoute>
                  <ReadingPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path={RoutePath.BookDiscussions} // e.g., /books/:id/discussions
              element={
                <ProtectedRoute>
                  <BookDiscussionsPage />
                </ProtectedRoute>
              }
            />
             <Route 
              path={RoutePath.QuestionAnswer} // e.g., /books/:bookId/questions/:questionId/answer
              element={
                <ProtectedRoute>
                  <QuestionAnswerPage />
                </ProtectedRoute>
              }
            />
            <Route 
              path={RoutePath.Favorites} 
              element={
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Routes - User Management / Settings */}
            <Route 
              element={ // Parent route for settings layout
                <ProtectedRoute>
                  <SettingsLayout />
                </ProtectedRoute>
              }
            >
              <Route path={RoutePath.Profile} element={<ProfileSettingsPage />} />
              <Route path={RoutePath.ChildrenManage} element={<ChildrenManagementPage />} />
              <Route path={RoutePath.ChildAdd} element={<AddChildPage />} />
              <Route path={RoutePath.ChildEdit} element={<EditChildPage />} /> 
              <Route path={RoutePath.ChildDetail} element={<ChildDetailPage />} /> 
              <Route path={RoutePath.LearningHistory} element={<LearningHistoryPage />} />
              <Route path={RoutePath.Settings} element={<AccountSettingsPage />} />
            </Route>

            {/* Redirect root */}
            <Route 
              path={RoutePath.Home} 
              element={
                <AuthRedirector />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </HashRouter>
      </FavoritesProvider>
    </AuthProvider>
  );
};

const AuthRedirector: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-amber-50">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return isAuthenticated ? <Navigate to={RoutePath.Dashboard} replace /> : <Navigate to={RoutePath.Login} replace />;
}

export default App;
