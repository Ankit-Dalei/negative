import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const TeamMember = ({ name, role, bio, img }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-400/50 transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden">
        {/* Replace with actual image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
          <span className="text-gray-500">Team member photo</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent flex items-end p-6">
          <div>
            <h3 className="text-2xl font-bold text-white">{name}</h3>
            <p className="text-cyan-400">{role}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-400 mb-4">{bio}</p>
        <div className="flex gap-3">
          <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
            <FaTwitter className="text-xl" />
          </a>
          <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
            <FaLinkedin className="text-xl" />
          </a>
          <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;