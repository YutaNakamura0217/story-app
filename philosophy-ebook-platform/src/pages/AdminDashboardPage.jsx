import React, { useState } from 'react';
import AdminHeader from '../components/Admin/Layout/AdminHeader';
import AdminSidebar from '../components/Admin/Layout/AdminSidebar';
import AdminFooter from '../components/Admin/Layout/AdminFooter';
import StatsOverview from '../components/Admin/Dashboard/StatsOverview'; // Import new component
import ChartsSection from '../components/Admin/Dashboard/ChartsSection'; // Import new component

// Placeholder components for other dashboard content - can remain as simple divs for now
const RecentActivity = () => <div className="p-6 bg-white rounded-lg shadow mb-6"><h3 className="text-xl font-semibold">Recent Activity (Placeholder)</h3><ul className="list-disc list-inside text-gray-600 mt-2 space-y-1 text-sm"><li>User John Doe registered.</li><li>Book 'The Little Prince' added.</li><li>Workshop 'Intro to Ethics' updated.</li></ul></div>;
const QuickActions = () => <div className="p-6 bg-white rounded-lg shadow mb-6"><h3 className="text-xl font-semibold">Quick Actions (Placeholder)</h3><div className="mt-2 space-x-2"><button className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 text-sm">Add New Book</button><button className="bg-green-500 text-white py-2 px-3 rounded hover:bg-green-600 text-sm">Manage Users</button></div></div>;
const SystemAlerts = () => <div className="p-6 bg-yellow-100 text-yellow-800 rounded-lg shadow mb-6 border border-yellow-300"><h3 className="text-xl font-semibold">System Alerts (Placeholder)</h3><p className="mt-2 text-sm">Important system notifications or alerts will be shown here.</p></div>;


function AdminDashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar isSidebarOpen={isSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Dashboard Overview</h2>
          
          {/* Use the imported components */}
          <StatsOverview />
          <ChartsSection />
          
          <div className="grid md:grid-cols-2 gap-6">
            <RecentActivity />
            <QuickActions />
          </div>
          <SystemAlerts />
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
export default AdminDashboardPage;
