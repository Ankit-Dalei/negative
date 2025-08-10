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
  FiBell,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { UserContextPro } from '../contestApi/UserContextProvider';

const UserPanel = () => {
  const [notifications] = useState(3);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const Users = UserContextPro();

  const tools = [
    { id: 'CloudStorage', icon: <FiGrid />, name: 'Cloud Storage', path: '/home' },
    // { id: 'analytics', icon: <FiBarChart2 />, name: 'Analytics', path: '/home/analytics' },
    // { id: 'database', icon: <FiDatabase />, name: 'Database', path: '/home/database' },
    // { id: 'api', icon: <FiCode />, name: 'API Manager', path: '/home/api' },
    // { id: 'storage', icon: <FiCloud />, name: 'Cloud Storage', path: '/home/storage' },
    // { id: 'security', icon: <FiShield />, name: 'Security', path: '/home/security' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    Users.setRole('guest');
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path || 
           (path !== '/home' && location.pathname.startsWith(path));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-gray-200">
      {/* Mobile Header */}
      <header className="md:hidden bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-400">NEGATIVE</h1>
        <button 
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </header>

      {/* Sidebar Navigation - Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 border-b border-gray-700">
          <nav className="p-4 space-y-2">
            {tools.map(tool => (
              <Link
                key={tool.id}
                to={tool.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center w-full p-3 rounded-lg transition-all ${
                  isActive(tool.path)
                    ? 'bg-indigo-900 text-indigo-300' 
                    : 'hover:bg-gray-700'
                }`}
              >
                <span className="mr-3">{tool.icon}</span>
                {tool.name}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 mr-3">
                <FiUser />
              </div>
              <div>
                <p className="font-medium">John Doe</p>
                <p className="text-sm text-gray-400">Admin</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 text-red-400 cursor-pointer"
            >
              <FiLogOut className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Navigation - Desktop */}
      <div className="hidden md:flex md:w-64 bg-gray-800 border-r border-gray-700 flex-col">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-indigo-400">NEGATIVE</h1>
          <p className="text-sm text-gray-400">Developer Tools</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {tools.map(tool => (
            <Link
              key={tool.id}
              to={tool.path}
              className={`flex items-center w-full p-3 rounded-lg transition-all ${
                isActive(tool.path)
                  ? 'bg-indigo-900 text-indigo-300' 
                  : 'hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{tool.icon}</span>
              {tool.name}
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-indigo-900 flex items-center justify-center text-indigo-300 mr-3">
              <FiUser />
            </div>
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-400">Admin</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 text-red-400 cursor-pointer"
          >
            <FiLogOut className="mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 p-4 flex justify-between items-center">
          <div className="flex items-center">
            {/* <button 
              onClick={toggleMobileMenu}
              className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <FiMenu />
            </button> */}
            <h2 className="text-xl font-semibold capitalize">
              {tools.find(t => isActive(t.path))?.name || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 rounded-full hover:bg-gray-700">
              <FiBell />
              {notifications > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700">
              <FiSettings />
            </button>
          </div>
        </header>

        {/* Outlet for Child Components */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-900">
          <div className="max-w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserPanel;