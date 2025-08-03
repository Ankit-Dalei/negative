import { FaRocket, FaUsers, FaLightbulb, FaShieldAlt, FaChartLine } from 'react-icons/fa';
import { IoMdGlobe } from 'react-icons/io';
export const stats = [
  { value: '10K+', label: 'Active Users', icon: <FaUsers className="text-3xl" /> },
  { value: '99.9%', label: 'Uptime', icon: <FaShieldAlt className="text-3xl" /> },
  { value: '50+', label: 'Countries', icon: <IoMdGlobe className="text-3xl" /> },
  { value: '24/7', label: 'Support', icon: <FaChartLine className="text-3xl" /> }
];

export const features = [
  {
    icon: <FaRocket className="text-4xl" />,
    title: "Innovation Driven",
    description: "We constantly push boundaries to deliver cutting-edge solutions"
  },
  {
    icon: <FaLightbulb className="text-4xl" />,
    title: "Creative Solutions",
    description: "Unique approaches to complex problems"
  },
  {
    icon: <FaShieldAlt className="text-4xl" />,
    title: "Secure By Design",
    description: "Security embedded in everything we build"
  }
];

export const team = [
  {
    name: "Alex Morgan",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in tech innovation",
    img: "/team/alex.jpg" // Replace with actual image path
  },
  {
    name: "Jordan Taylor",
    role: "CTO",
    bio: "Architect of our core technology platform",
    img: "/team/jordan.jpg"
  },
  {
    name: "Casey Smith",
    role: "Lead Developer",
    bio: "Makes the impossible possible with code",
    img: "/team/casey.jpg"
  },
  {
    name: "Riley Kim",
    role: "Design Director",
    bio: "Crafts intuitive, beautiful user experiences",
    img: "/team/riley.jpg"
  }
];