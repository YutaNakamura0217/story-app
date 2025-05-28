import React from 'react';

const StatCard = ({ title, value, icon, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
  };

  return (
    <div className={`p-6 rounded-lg shadow-lg text-white ${colors[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-sm uppercase tracking-wider">{title}</p>
        </div>
        <div className="text-4xl opacity-80">{icon}</div>
      </div>
      {/* Optional: Add a link like "View Details ->" */}
    </div>
  );
};

function StatsOverview() {
  const stats = [
    { title: "Total Users", value: "1,234", icon: "👥", color: "blue" },
    { title: "Active Subscriptions", value: "567", icon: "✅", color: "green" },
    { title: "Total Books", value: "250", icon: "📚", color: "purple" },
    { title: "Pending Approvals", value: "12", icon: "⏳", color: "yellow" },
    // { title: "Monthly Revenue", value: "$5,890", icon: "💰", color: "red" }, // Example
  ];

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Key Statistics</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
        ))}
      </div>
    </section>
  );
}

export default StatsOverview;
