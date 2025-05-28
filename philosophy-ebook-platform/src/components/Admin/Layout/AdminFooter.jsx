import React from 'react';

function AdminFooter() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 p-4 text-center text-sm text-gray-600">
      <p>&copy; {new Date().getFullYear()} Philosophy Ebook Platform - Admin Panel</p>
    </footer>
  );
}
export default AdminFooter;
