import { useState, useRef } from 'react';
import { 
  FaGlobe,FaLightbulb, FaCog, FaLock
} from 'react-icons/fa';
import { features, stats, testimonials, pricingTiers } from '../data.jsx/homeData';

export default function Home() {
  const [activeCard, setActiveCard] = useState(null);
  const cardRefs = useRef([]);

  // Enhanced color palette
  const colors = {
    primary: 'from-cyan-400 to-blue-600',
    secondary: 'from-purple-500 to-pink-600',
    accent: 'from-amber-400 to-orange-500',
    dark: 'from-gray-800 to-gray-900',
    light: 'from-gray-100 to-gray-300'
  };

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const angleY = (x - centerX) / 20;
    const angleX = (centerY - y) / 10;

    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    
    // Dynamic glow effect
    const glowX = (x - centerX) / 5;
    const glowY = (y - centerY) / 5;
    card.style.boxShadow = `
      ${-angleY * 2}px ${angleX}px 30px rgba(0,0,0,0.3),
      ${glowX}px ${glowY}px 40px rgba(59, 130, 246, 0.3)
    `;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      card.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
    }
    setActiveCard(null);
  };

  // ... (keep your existing data arrays

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100 min-h-screen">
      {/* 1. Hero Section - Vibrant Gradient */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-purple-900/40 to-gray-900/50"></div>
        <div className="container mx-auto px-6 py-24 z-10">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${colors.primary} animate-gradient`}>
                NEGATIVE
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12">
              Redefining developer tools with cutting-edge SaaS solutions
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                className={`px-8 py-4 bg-gradient-to-r ${colors.primary} text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/40 relative overflow-hidden group`}
              >
                <span className="relative z-10">Start Building</span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
              <button 
                className="px-8 py-4 bg-transparent border-2 border-cyan-400/50 hover:border-cyan-400 text-white font-medium rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/20"
              >
                Explore Tools
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Features Section - Glowing Cards */}
      <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${colors.secondary} animate-gradient`}>
              Our Powerful Features
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 transition-all duration-300 ${
                  activeCard === `feature-${index}` ? 'ring-2 ring-cyan-400' : ''
                } hover:border-cyan-400/50 hover:bg-gray-800/70 relative overflow-hidden`}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => setActiveCard(`feature-${index}`)}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.3s ease'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Stats Section - Neon Glow */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-indigo-900/80">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${colors.accent} animate-gradient`}>
              By The Numbers
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                ref={el => cardRefs.current[features.length + index] = el}
                className="text-center p-8 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/30 hover:border-amber-400/50 transition-all duration-300 group relative overflow-hidden"
                onMouseMove={(e) => handleMouseMove(e, features.length + index)}
                onMouseLeave={() => handleMouseLeave(features.length + index)}
                onClick={() => setActiveCard(`stat-${index}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xl text-gray-300 group-hover:text-white transition-colors">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Testimonials Section - Glowing Borders */}
      <section className="py-24 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className={`bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 animate-gradient`}>
              What Developers Say
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                ref={el => cardRefs.current[features.length + stats.length + index] = el}
                className="p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/30 hover:border-pink-500/50 transition-all duration-300 group relative overflow-hidden"
                onMouseMove={(e) => handleMouseMove(e, features.length + stats.length + index)}
                onMouseLeave={() => handleMouseLeave(features.length + stats.length + index)}
                onClick={() => setActiveCard(`testimonial-${index}`)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <blockquote className="text-xl italic mb-6 text-gray-300 group-hover:text-white transition-colors">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-pink-400/80 group-hover:text-pink-300 transition-colors">
                    — {testimonial.author}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ... (other sections with similar vibrant styling) ... */}
      {/* 5. Technology Stack Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-purple-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-500">
              Our Technology Stack
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <FaGlobe className="text-4xl mx-auto mb-4 text-red-500" />, title: "Global Network" },
              { icon: <FaLightbulb className="text-4xl mx-auto mb-4 text-purple-500" />, title: "AI Engine" },
              { icon: <FaCog className="text-4xl mx-auto mb-4 text-indigo-500" />, title: "Automation" },
              { icon: <FaLock className="text-4xl mx-auto mb-4 text-red-500" />, title: "Security" }
            ].map((tech, index) => (
              <div 
                key={index}
                ref={el => cardRefs.current[features.length + stats.length + testimonials.length + index] = el}
                className="p-6 bg-gray-800 rounded-lg"
                onMouseMove={(e) => handleMouseMove(e, features.length + stats.length + testimonials.length + index)}
                onMouseLeave={() => handleMouseLeave(features.length + stats.length + testimonials.length + index)}
                onClick={() => setActiveCard(`tech-${index}`)}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease'
                }}
              >
                {tech.icon}
                <h3 className="text-xl font-bold">{tech.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Pricing Section */}
      <section className="py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-red-500">
              Simple Pricing
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <div 
                key={index}
                ref={el => cardRefs.current[features.length + stats.length + testimonials.length + 4 + index] = el}
                className={`p-8 rounded-xl border ${index === 1 ? 'bg-gray-800 border-red-500 shadow-lg shadow-red-500/20' : 'bg-gray-800 border-gray-700'}`}
                onMouseMove={(e) => handleMouseMove(e, features.length + stats.length + testimonials.length + 4 + index)}
                onMouseLeave={() => handleMouseLeave(features.length + stats.length + testimonials.length + 4 + index)}
                onClick={() => setActiveCard(`pricing-${index}`)}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease'
                }}
              >
                <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                <div className="text-5xl font-bold mb-6">{tier.price}</div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-medium ${index === 1 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'} transition-all duration-300`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Team Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-purple-900">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-500">
              Meet The Team
            </span>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {['Founder', 'CTO', 'Lead Developer', 'Designer'].map((role, index) => (
              <div 
                key={index}
                ref={el => cardRefs.current[features.length + stats.length + testimonials.length + 7 + index] = el}
                className="p-6 bg-gray-800 rounded-lg"
                onMouseMove={(e) => handleMouseMove(e, features.length + stats.length + testimonials.length + 7 + index)}
                onMouseLeave={() => handleMouseLeave(features.length + stats.length + testimonials.length + 7 + index)}
                onClick={() => setActiveCard(`team-${index}`)}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.1s ease, box-shadow 0.1s ease'
                }}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-purple-600"></div>
                <h3 className="text-xl font-bold">{role}</h3>
                <p className="text-gray-400">Expert in their field</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA Section - Pulsing Glow */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-indigo-900/80">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join thousands of developers already building with Negative
          </p>
          <button 
            className={`px-10 py-5 bg-gradient-to-r ${colors.primary} text-white font-bold rounded-xl transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-cyan-500/40 relative overflow-hidden group animate-pulse`}
          >
            <span className="relative z-10">Get Started Today</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></span>
          </button>
        </div>
      </section>

    </div>
  )
}