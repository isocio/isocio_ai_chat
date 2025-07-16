
import React from 'react';

export const SubscriptionStats: React.FC = () => {
  // Dummy data for demonstration
  const stats = {
    freeUsers: 2,
    proUsers: 2,
    totalRevenue: 40,
  };

  const StatCard: React.FC<{title: string; value: string | number}> = ({ title, value }) => (
    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard title="Free Users" value={stats.freeUsers} />
      <StatCard title="Pro Users" value={stats.proUsers} />
      <StatCard title="Total Monthly Revenue" value={`$${stats.totalRevenue}`} />
    </div>
  );
};
