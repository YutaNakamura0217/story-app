import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

function AdminSidebar({ isSidebarOpen, toggleSidebar }) { // Added toggleSidebar to close on nav
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: "📊" },
    { name: "Books Management", href: "/admin/books", icon: "📚" }, // Placeholder route
    { name: "Users Management", href: "/admin/users", icon: "👥" }, // Placeholder route
    { name: "Workshops Management", href: "/admin/workshops", icon: "🛠️" }, // Placeholder route
    { name: "Analytics", href: "/admin/analytics", icon: "📈" }, // Placeholder route
    { name: "Settings", href: "/admin/settings", icon: "⚙️" }, // Placeholder route
  ];

  const handleLinkClick = () => {
    if (isSidebarOpen && toggleSidebar) { // Check if toggleSidebar is provided (it might not be on larger screens)
      toggleSidebar();
    }
  };

  return (
    <aside 
      className={`fixed inset-y-0 left-0 bg-gray-900 text-gray-300 w-64 p-4 space-y-2 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen z-30 transition-transform duration-300 ease-in-out shadow-lg`}
    >
      <h2 className="text-lg font-semibold text-white py-2 mb-2 border-b border-gray-700">Navigation</h2>
      <nav>
        {navItems.map(item => (
          <Link 
            key={item.name} 
            to={item.href} 
            onClick={handleLinkClick} // Close sidebar on link click (mobile)
            className="flex items-center py-2.5 px-4 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-150"
            // Add active link styling here if needed, e.g., using NavLink from react-router-dom
          >
            <span className="mr-3 text-lg">{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
export default AdminSidebar;
