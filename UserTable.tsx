
import React from 'react';
import type { User } from '../../types/User';

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-isocio-gray-200 dark:border-isocio-gray-700">
      <table className="min-w-full divide-y divide-isocio-gray-200 dark:divide-isocio-gray-700">
        <thead className="bg-isocio-gray-50 dark:bg-isocio-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-isocio-gray-500 uppercase tracking-wider">اسم</th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-isocio-gray-500 uppercase tracking-wider">إيميل</th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-isocio-gray-500 uppercase tracking-wider">توكن</th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-isocio-gray-500 uppercase tracking-wider">اشتراك</th>
            <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-isocio-gray-500 uppercase tracking-wider">الحالة</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-isocio-gray-900 divide-y divide-isocio-gray-200 dark:divide-isocio-gray-700">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-isocio-gray-50 dark:hover:bg-isocio-gray-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-isocio-gray-900 dark:text-white">{u.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-isocio-gray-500 dark:text-isocio-gray-300">{u.email}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-isocio-gray-500 dark:text-isocio-gray-300">{u.totalTokensUsed}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    u.subscriptionType === 'pro' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                    : 'bg-isocio-gray-100 text-isocio-gray-800 dark:bg-isocio-gray-700 dark:text-isocio-gray-200'
                }`}>
                    {u.subscriptionType}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-isocio-gray-500">{u.isActive ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
