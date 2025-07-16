
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserTable } from "../components/Admin/UserTable";
import { SubscriptionStats } from "../components/Admin/SubscriptionStats";
import type { User } from "../types/User";
import { ArrowLeftIcon } from "../components/icons";

interface AdminDashboardProps {}

const AdminDashboard: React.FC<AdminDashboardProps> = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, this would be an API call to fetch users from a database.
    const dummyUsers: User[] = [
      {
        id: "1",
        name: "أحمد",
        email: "ahmed@example.com",
        totalTokensUsed: 1243,
        subscriptionType: "pro",
        isActive: true,
      },
      {
        id: "2",
        name: "سارة",
        email: "sara@example.com",
        totalTokensUsed: 120,
        subscriptionType: "free",
        isActive: true,
      },
       {
        id: "3",
        name: "John Doe",
        email: "john.doe@example.com",
        totalTokensUsed: 5600,
        subscriptionType: "pro",
        isActive: true,
      },
      {
        id: "4",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        totalTokensUsed: 89,
        subscriptionType: "free",
        isActive: false,
      },
    ];

    setUsers(dummyUsers);
  }, []);

  const handleBack = () => navigate(-1);

  return (
    <div className="flex flex-col h-screen">
       <header className="flex items-center justify-start p-4 border-b border-isocio-gray-200 dark:border-isocio-gray-800 flex-shrink-0">
            <button onClick={handleBack} className="p-2 rounded-md hover:bg-isocio-gray-100 dark:hover:bg-isocio-gray-800 me-4">
                <ArrowLeftIcon className="w-6 h-6" />
            </button>
        <h1 className="text-xl font-bold">لوحة تحكم الأدمن</h1>
      </header>
      <main className="flex-grow overflow-y-auto p-6 md:p-8">
        <SubscriptionStats />
        <h2 className="text-lg font-semibold mb-4">Users</h2>
        <UserTable users={users} />
      </main>
    </div>
  );
}

export default AdminDashboard;
