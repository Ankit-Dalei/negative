import { useState } from 'react';
import { FaEnvelope, FaArrowRight, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Password reset logic here
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 relative overflow-hidden">
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
            <h1 className="text-3xl font-bold text-white mb-2">
              {isSubmitted ? 'Check Your Darkness' : 'Lost in the Shadows'}
            </h1>
            <p className="text-gray-400">
              {isSubmitted
                ? 'We sent a recovery link to your email'
                : 'Enter your email to recover your password'}
            </p>
          </div>

          {!isSubmitted ? (
            <>
              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="px-8 pb-8">
                <div className="space-y-5">
                  {/* Email Field */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
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
                        Sending darkness...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Recover Password <FaArrowRight className="ml-2" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="px-8 pb-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-red-900 bg-opacity-30 flex items-center justify-center">
                  <FaCheck className="text-red-500 text-2xl" />
                </div>
              </div>
              <p className="text-gray-300 mb-6">
                We've sent password recovery instructions to <span className="text-red-400">{email}</span>.
                Check your email and follow the link to reset your password.
              </p>
              <p className="text-gray-400 text-sm">
                Didn't receive the email?{' '}
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-red-400 hover:text-red-300 font-medium"
                >
                  Try again
                </button>
              </p>
            </div>
          )}

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-900 bg-opacity-50 text-center">
            <p className="text-gray-400 text-sm">
              Remembered your password?{' '}
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

export default ForgotPasswordPage;