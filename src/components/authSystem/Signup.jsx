import { useState } from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number and special character';
      isValid = false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      // Simulate API call
      const response = true

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Show success popup
      setShowSuccess(true);
      
      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: error.message || 'Registration failed. Please try again.'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Success Popup */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4 border border-green-500">
            <div className="flex flex-col items-center text-center">
              <FaCheckCircle className="text-green-500 text-5xl mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
              <p className="text-gray-300 mb-6">
                You've successfully joined the darkness. Redirecting to login...
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full animate-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500 rounded-full filter blur-3xl opacity-10 animate-float"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500 rounded-full filter blur-3xl opacity-10 animate-float-delay"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-10 animate-float-delay-2"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
          {/* Header */}
          <div className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <svg
                className="w-12 h-12 text-red-500"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Join the Darkness</h1>
            <p className="text-gray-400">Become part of NEGATIVE</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8">
            {errors.general && (
              <div className="mb-4 p-3 bg-red-900 bg-opacity-50 text-red-300 rounded-lg text-sm">
                {errors.general}
              </div>
            )}

            <div className="space-y-5">
              {/* Name Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  type="text"
                  name="name"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${
                    errors.name ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`w-full pl-10 pr-12 py-3 bg-gray-700 border ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400 hover:text-red-400" />
                  ) : (
                    <FaEye className="text-gray-400 hover:text-red-400" />
                  )}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-700 border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent`}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-600 rounded bg-gray-700"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="#" className="text-red-400 hover:text-red-300">
                    Terms of Darkness
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-red-400 hover:text-red-300">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Embracing the darkness...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Become Negative <FaArrowRight className="ml-2" />
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 text-center">
            <p className="text-gray-400 text-sm">
              Already part of the darkness?{' '}
              <Link to="/login" className="text-red-400 hover:text-red-300 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;