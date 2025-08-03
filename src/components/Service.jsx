import { useRef } from 'react';
import { services } from '../data/ServiceData';

const Service = () => {
  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Smoother angle calculation with reduced sensitivity
    const angleY = (x - centerX) / 25;  // Reduced from 20 to 25
    const angleX = (centerY - y) / 15;  // Reduced from 10 to 15

    // Smoother transform with will-change optimization
    card.style.willChange = 'transform, box-shadow';
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    
    // More subtle glow effect
    const glowX = (x - centerX) / 8;  // Reduced from 5 to 8
    const glowY = (y - centerY) / 8;
    card.style.boxShadow = `
      ${-angleY * 1.5}px ${angleX}px 20px rgba(0,0,0,0.2),
      ${glowX}px ${glowY}px 30px rgba(59, 130, 246, 0.2)
    `;
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (card) {
      card.style.willChange = 'auto';
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      card.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
            Our Services
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Comprehensive solutions tailored to your business needs with cutting-edge technology
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => cardRefs.current[index] = el}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-8 transition-all duration-500 ease-out hover:border-${service.gradient.split(' ')[0]}/50 relative overflow-hidden`}
              style={{ 
                transformStyle: 'preserve-3d',
                transition: 'transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.28), box-shadow 0.5s ease-out, border-color 0.3s ease'
              }}
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              <div className="relative z-10 h-full flex flex-col">
                <div className="mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-400 flex-grow">{service.description}</p>
                <button 
                  className={`mt-6 px-6 py-2 bg-gradient-to-r ${service.gradient} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 self-start`}
                  style={{
                    boxShadow: `0 4px 15px ${service.gradient.split(' ')[0] === 'from-cyan-500' ? 'rgba(6, 182, 212, 0.3)' : 
                              service.gradient.split(' ')[0] === 'from-purple-500' ? 'rgba(168, 85, 247, 0.3)' :
                              'rgba(245, 158, 11, 0.3)'}`
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto mt-24 text-center">
        <div 
          className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 rounded-2xl p-12 backdrop-blur-sm"
          style={{
            boxShadow: '0 8px 32px rgba(6, 182, 212, 0.2)',
            border: '1px solid rgba(8, 145, 178, 0.3)'
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your business?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Let's discuss how we can help you achieve your goals with our custom solutions.
          </p>
          <button 
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Get a Free Consultation</span>
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Service;