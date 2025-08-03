import { FaCode, FaServer, FaMobileAlt, FaCloud, FaChartLine, FaShieldAlt } from 'react-icons/fa';
export const services = [
    {
      icon: <FaCode className="text-4xl text-cyan-400" />,
      title: "Web Development",
      description: "Custom, responsive websites built with modern frameworks like React and Next.js for optimal performance.",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      icon: <FaMobileAlt className="text-4xl text-purple-400" />,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications using React Native for both iOS and Android platforms.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <FaServer className="text-4xl text-amber-400" />,
      title: "Backend Services",
      description: "Scalable backend systems with Node.js, Django, or .NET Core for your business logic needs.",
      gradient: "from-amber-500 to-orange-600"
    },
    {
      icon: <FaCloud className="text-4xl text-blue-400" />,
      title: "Cloud Solutions",
      description: "AWS, Azure, and GCP implementations with CI/CD pipelines and infrastructure as code.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: <FaChartLine className="text-4xl text-green-400" />,
      title: "Data Analytics",
      description: "Business intelligence solutions with Power BI, Tableau, and custom data visualization.",
      gradient: "from-green-500 to-teal-600"
    },
    {
      icon: <FaShieldAlt className="text-4xl text-red-400" />,
      title: "Security",
      description: "Comprehensive security audits, penetration testing, and compliance solutions.",
      gradient: "from-red-500 to-pink-600"
    }
];