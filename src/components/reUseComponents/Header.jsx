import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated auth state
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const Logo = () => (
    <div className="flex items-center">
      <svg
        className="w-8 h-8 mr-2 text-red-500"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"
          fill="currentColor"
        />
      </svg>
      <span className="text-xl font-bold text-white">NEGATIVE</span>
    </div>
  );

  const navItems = [
    { path: '/', name: 'Home' },
    { path: '/services', name: 'Services' },
    { path: '/about', name: 'About' },
    { path: '/contact', name: 'Contact' },
  ];

  useEffect(()=>{
    const auth = localStorage.getItem('authToken')
    const role = localStorage.getItem('role')
    if (role=='user' && auth) {
      setIsLoggedIn(true)
      setShowProfileDropdown(false)
    } else {
      setIsLoggedIn(false)
      setShowProfileDropdown(false)
    }
  },[])

  const handleLogout = () => {
    // In a real app, you would handle logout logic here
    setIsLoggedIn(false);
    setShowProfileDropdown(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    users.setRole('guest')
    navigate('/');
    
  };

  return (
    <header className="bg-gray-900 shadow-sm border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`px-1 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeLink === item.path
                        ? 'text-red-500 border-b-2 border-red-500'
                        : 'text-gray-300 hover:text-red-400'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center space-x-4 ml-6">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                      activeLink === '/login'
                        ? 'bg-red-600 text-white'
                        : 'text-gray-300 hover:text-red-400'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                      activeLink === '/signup'
                        ? 'bg-red-600 text-white'
                        : 'bg-red-900 text-red-300 hover:bg-red-800'
                    }`}
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                    className="flex items-center text-gray-300 hover:text-red-400 focus:outline-none"
                  >
                    <FaUserCircle className="w-8 h-8" />
                  </button>
                  {showProfileDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-100 border border-gray-700">
                      <Link
                        to="/profile"
                        onClick={() => setShowProfileDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setShowProfileDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Settings
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setShowProfileDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Your Orders
                      </Link>
                      <div
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm cursor-pointer text-gray-300 hover:bg-gray-700 hover:text-white border-t border-gray-700"
                      >
                        Sign Out
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {isLoggedIn && (
              <div className="relative mr-4">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center text-gray-300 hover:text-red-400 focus:outline-none"
                >
                  <FaUserCircle className="w-7 h-7" />
                </button>
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2  w-48 bg-gray-800 rounded-md shadow-lg py-1 z-100 border border-gray-700">
                    <Link
                      to="/profile"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => {
                        setShowProfileDropdown(false);
                        setIsMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 cursor-pointer text-sm text-gray-300 hover:bg-gray-700 hover:text-white border-t border-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-300 rounded-md hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-3">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      activeLink === item.path
                        ? 'bg-red-900 text-red-300'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            {!isLoggedIn && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeLink === '/login'
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium mt-2 ${
                    activeLink === '/signup'
                      ? 'bg-red-600 text-white'
                      : 'bg-red-900 text-red-300 hover:bg-red-800'
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;