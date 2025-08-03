import { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane, FaClock, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import { MdOutlineSupportAgent } from 'react-icons/md';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              Get In Touch
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions or want to discuss a project? Reach out to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
              <FaPaperPlane className="text-cyan-400" />
              Send Us a Message
            </h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-900/50 border border-green-700 rounded-lg flex items-start gap-3">
                <FaCheck className="text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-green-100">Message Sent!</h3>
                  <p className="text-green-300 text-sm mt-1">
                    We've received your message and will get back to you soon.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-900/50 border border-red-700 rounded-lg flex items-start gap-3">
                <FaExclamationTriangle className="text-red-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-red-100">Submission Failed</h3>
                  <p className="text-red-300 text-sm mt-1">
                    There was an error sending your message. Please try again.
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700/50 border ${errors.name ? 'border-red-500' : 'border-gray-600/50'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500`}
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <FaExclamationTriangle className="flex-shrink-0" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-700/50 border ${errors.email ? 'border-red-500' : 'border-gray-600/50'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                      <FaExclamationTriangle className="flex-shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700/50 border ${errors.subject ? 'border-red-500' : 'border-gray-600/50'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500`}
                  placeholder="How can we help?"
                />
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <FaExclamationTriangle className="flex-shrink-0" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-700/50 border ${errors.message ? 'border-red-500' : 'border-gray-600/50'} rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-500`}
                  placeholder="Tell us about your project..."
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400 flex items-center gap-1">
                    <FaExclamationTriangle className="flex-shrink-0" />
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 flex items-center justify-center ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 md:space-y-8">
            {/* Contact Cards */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2">
                <MdOutlineSupportAgent className="text-purple-400" />
                Contact Information
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 flex-shrink-0">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Our Location</h3>
                    <p className="text-gray-400">123 Dark Avenue, Suite 456<br />Tech District, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 flex-shrink-0">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Phone Number</h3>
                    <p className="text-gray-400">
                      <a href="tel:+11234567890" className="hover:text-cyan-400 transition-colors">
                        +1 (123) 456-7890
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 flex-shrink-0">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Email Address</h3>
                    <p className="text-gray-400">
                      <a href="mailto:contact@negative.com" className="hover:text-cyan-400 transition-colors">
                        contact@negative.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-lg text-amber-400 flex-shrink-0">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Working Hours</h3>
                    <p className="text-gray-400">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-700/50 shadow-xl">
              <h2 className="text-xl sm:text-2xl font-bold mb-6">Connect With Us</h2>
              <div className="flex flex-wrap gap-3">
                {[
                  { name: 'Twitter', color: 'bg-blue-400/10 hover:bg-blue-400/20', iconColor: 'text-blue-400' },
                  { name: 'GitHub', color: 'bg-gray-400/10 hover:bg-gray-400/20', iconColor: 'text-gray-400' },
                  { name: 'LinkedIn', color: 'bg-blue-500/10 hover:bg-blue-500/20', iconColor: 'text-blue-500' },
                  { name: 'Discord', color: 'bg-purple-500/10 hover:bg-purple-500/20', iconColor: 'text-purple-500' },
                  { name: 'Instagram', color: 'bg-pink-500/10 hover:bg-pink-500/20', iconColor: 'text-pink-500' },
                  { name: 'YouTube', color: 'bg-red-500/10 hover:bg-red-500/20', iconColor: 'text-red-500' },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-12 h-12 flex items-center justify-center ${social.color} ${social.iconColor} rounded-lg hover:scale-105 transition-all duration-300`}
                    aria-label={social.name}
                  >
                    <span className="text-xl">#{social.name[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl overflow-hidden">
          <div className="h-64 sm:h-80 w-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
            <div className="text-center p-4">
              <FaMapMarkerAlt className="mx-auto text-4xl text-red-500 mb-4" />
              <p className="text-gray-400">Interactive Map Would Appear Here</p>
              <p className="text-sm text-gray-500 mt-2">(Replace with actual map component)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;