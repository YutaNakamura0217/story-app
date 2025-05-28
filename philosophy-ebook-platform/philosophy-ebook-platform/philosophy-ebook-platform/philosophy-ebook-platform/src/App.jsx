import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import Page Components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookDetailPage from './pages/BookDetailPage';
import ReadingPage from './pages/ReadingPage';
import ChildDetailPage from './pages/ChildDetailPage';
import PricingPage from './pages/PricingPage';
import WorkshopsPage from './pages/WorkshopsPage';
import AdminDashboardPage from './pages/AdminDashboardPage'; 
// Assuming AdminDashboardPage.jsx is directly in pages for now
// If it's in pages/Admin/AdminDashboardPage.jsx, the path would need adjustment.
// For now, using the path that was created in previous subtasks.

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route redirects to dashboard. Consider LoginPage if auth is implemented first. */}
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        
        {/* Book-related routes */}
        <Route path="/books/:bookId" element={<BookDetailPage />} />
        <Route path="/books/:bookId/read" element={<ReadingPage />} />
        
        {/* Child-related routes */}
        <Route path="/children/:childId" element={<ChildDetailPage />} />
        
        {/* Other main pages */}
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/workshops" element={<WorkshopsPage />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboardPage />} />
        {/* Example for future admin sub-routes:
        <Route path="/admin/books" element={<AdminBookManagementPage />} />
        <Route path="/admin/users" element={<AdminUserManagementPage />} /> 
        */}

        {/* Catch-all for 404 Not Found (Optional) */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
            <h1 className="text-6xl font-bold text-indigo-600 mb-4">404</h1>
            <p className="text-2xl mb-2">Page Not Found</p>
            <p className="text-md mb-8">Sorry, the page you are looking for does not exist.</p>
            <a href="/" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Go Home
            </a>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
