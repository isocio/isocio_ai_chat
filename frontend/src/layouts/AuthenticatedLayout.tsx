import React from 'react';
import { Outlet } from 'react-router-dom';

const env: React.FC = () => {
  return (
    <div className="p-4">
      {/* يمكنك إضافة Sidebar أو Header هنا لاحقًا */}
      <Outlet />
    </div>
  );
};

export default env;
