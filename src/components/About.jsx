import TeamMember from '../TeamMember';
import { team, stats, features } from '../data.jsx/AboutData';
import { useState, useRef } from 'react';

const About = () => {
  const [activeCard, setActiveCard] = useState(null);
  const cardRefs = useRef([]);

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

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/30 to-gray-900/40 z-0"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                About Negative
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10">
              Redefining technology through innovative solutions and uncompromising quality
            </p>
          </div>
        </div>
      </section>

      {/* Our Story with Tilt Effect */}
      <section className="py-16 md:py-24 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Our Story
                </span>
              </h2>
              <div className="space-y-6 text-gray-300">
                <p>
                  Founded in 2020, Negative began as a bold vision to challenge the status quo in technology development.
                  We saw an industry saturated with mediocre solutions and set out to create something different.
                </p>
                <p>
                  What started as a small team of passionate developers has grown into an industry leader, serving clients
                  across the globe with innovative SaaS solutions and developer tools.
                </p>
                <p>
                  Our name reflects our philosophy - we don't accept "no" or "can't" as answers. We turn negatives into
                  possibilities.
                </p>
              </div>
            </div>
            <div 
              className="relative group"
              ref={el => cardRefs.current[0] = el}
              onMouseMove={(e) => handleMouseMove(e, 0)}
              onMouseLeave={() => handleMouseLeave(0)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-cyan-500/10 to-purple-500/20 rounded-2xl p-1 group-hover:-translate-y-1 transition-transform duration-300">
                <div className="bg-gray-800/80 rounded-xl overflow-hidden">
                  <div className="h-80 md:h-96 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <span className="text-gray-500">Our team working</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats with Tilt Effect */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-gray-900 to-gray-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                ref={el => cardRefs.current[index + 1] = el}
                className="relative group text-center p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300"
                onMouseMove={(e) => handleMouseMove(e, index + 1)}
                onMouseLeave={() => handleMouseLeave(index + 1)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="relative z-10">
                  <div className="text-cyan-400 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach with Tilt Effect */}
      <section className="py-16 md:py-24 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-orange-500">
              Our Approach
            </span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                ref={el => cardRefs.current[index + 1 + stats.length] = el}
                className="relative group p-8 bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-300"
                onMouseMove={(e) => handleMouseMove(e, index + 1 + stats.length)}
                onMouseLeave={() => handleMouseLeave(index + 1 + stats.length)}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 mb-6 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-600/10 flex items-center justify-center text-cyan-400 group-hover:bg-gradient-to-r group-hover:from-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Meet The Team
            </span>
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                <div className="relative group-hover:-translate-y-1 transition-transform duration-300">
                  <TeamMember 
                    name={member.name}
                    role={member.role}
                    bio={member.bio}
                    img={member.img}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-cyan-900/40 to-blue-900/40">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to work with us?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Join thousands of satisfied clients who trust Negative for their technology needs.
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;