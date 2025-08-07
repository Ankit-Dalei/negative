import React, { useState } from 'react';
import { 
  FiSettings, 
  FiUser, 
  FiLogOut, 
  FiGrid, 
  FiBarChart2,
  FiDatabase,
  FiCode,
  FiCloud,
  FiShield,
  FiBell
} from 'react-icons/fi';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { UserContextPro } from '../contestApi/UserContextProvider';

const UserPanel = () => {
  const [notifications] = useState(3);
  const navigate = useNavigate();
  const location = useLocation(); // Get current location
  const Users = UserContextPro()

  const tools = [
    { id: 'dashboard', icon: <FiGrid />, name: 'Dashboard', path: '/home' },
    { id: 'analytics', icon: <FiBarChart2 />, name: 'Analytics', path: '/home/analytics' },
    { id: 'database', icon: <FiDatabase />, name: 'Database', path: '/home/database' },
    { id: 'api', icon: <FiCode />, name: 'API Manager', path: '/home/api' },
    { id: 'storage', icon: <FiCloud />, name: 'Cloud Storage', path: '/home/storage' },
    { id: 'security', icon: <FiShield />, name: 'Security', path: '/home/security' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    Users.setRole('guest')
    navigate('/');
  };

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/home' && location.pathname.startsWith(path));
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-indigo-600">NEGATIVE</h1>
          <p className="text-sm text-gray-500">Developer Tools</p>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          {tools.map(tool => (
            <Link
              key={tool.id}
              to={tool.path}
              className={`flex items-center w-full p-3 rounded-lg transition-all ${
                isActive(tool.path)
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{tool.icon}</span>
              {tool.name}
            </Link>
          ))}
        </nav>
        
        {/* User Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mr-3">
              <FiUser />
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500">Admin</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-100 text-red-500 cursor-pointer"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area with Header and Outlet */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold capitalize">
            {tools.find(t => isActive(t.path))?.name || 'Dashboard'}
          </h2>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-100">
              <FiBell />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FiSettings />
            </button>
          </div>
        </header>

        {/* Outlet for Child Components */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserPanel;