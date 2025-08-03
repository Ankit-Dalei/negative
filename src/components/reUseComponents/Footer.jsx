import { useState } from 'react';
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, 
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaUserCircle 
} from 'react-icons/fa';
// import { useAuth } from './AuthContext'; // Assume you have an auth context

const Footer = () => {
  const [email, setEmail] = useState('');
  const { isLoggedIn, setisLoggedIn } = useState(false); // Get auth state from context
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
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
            <p className="text-gray-400">
              Challenging conventions through innovative design and technology solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  Portfolio
                </a>
              </li>
              {isLoggedIn && (
                <li>
                  <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                    Dashboard
                  </a>
                </li>
              )}
              <li>
                <a href="#" className="text-gray-400 hover:text-red-400 transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-3 text-red-500" />
                <p className="text-gray-400">
                  123 Edge Street<br />
                  Dark District, NY 10001
                </p>
              </div>
              <div className="flex items-center">
                <FaPhone className="mr-3 text-red-500" />
                <a href="tel:+11234567890" className="text-gray-400 hover:text-red-400 transition-colors">
                  +1 (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-red-500" />
                <a href="mailto:contact@negative.com" className="text-gray-400 hover:text-red-400 transition-colors">
                  contact@negative.com
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter & Auth Status */}
          <div className="space-y-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <FaUserCircle className="w-10 h-10 text-red-500" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Welcome Back</h3>
                  <p className="text-gray-400 text-sm">You're logged in to NEGATIVE</p>
                  <a 
                    href="/account" 
                    className="text-red-400 hover:text-red-300 text-sm transition-colors"
                  >
                    Manage Account →
                  </a>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-white">Dark Newsletter</h3>
                <p className="text-gray-400">
                  Subscribe to our underground updates and exclusive offers.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Subscribe
                  </button>
                </form>
                <div className="flex space-x-2 text-sm">
                  <span className="text-gray-500">Already a member?</span>
                  <a href="/login" className="text-red-400 hover:text-red-300">
                    Sign In
                  </a>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} NEGATIVE. All rights reversed.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-500 hover:text-red-400 text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-red-400 text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-red-400 text-sm transition-colors">
                Dark Mode
              </a>
              {isLoggedIn && (
                <a href="/logout" className="text-gray-500 hover:text-red-400 text-sm transition-colors">
                  Sign Out
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;