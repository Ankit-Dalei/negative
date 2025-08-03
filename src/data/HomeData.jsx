import { 
  FaRocket, FaCode, FaServer, FaChartLine, 
  FaShieldAlt, FaTools
} from 'react-icons/fa';
export const features = [
  { icon: <FaChartLine className="text-red-500 text-4xl" />, title: "Analytics", description: "Real-time insights" },
  { icon: <FaShieldAlt className="text-purple-500 text-4xl" />, title: "Security", description: "Zero-trust architecture" },
  { icon: <FaTools className="text-indigo-500 text-4xl" />, title: "DevOps", description: "Automated pipelines" },
  { icon: <FaCode className="text-red-500 text-4xl" />, title: "AI Coding", description: "Context-aware assistance" },
  { icon: <FaServer className="text-purple-500 text-4xl" />, title: "Edge", description: "Global low-latency" },
  { icon: <FaRocket className="text-indigo-500 text-4xl" />, title: "Deployment", description: "One-click scaling" }
];

export const stats = [
  { value: "10K+", label: "Developers" },
  { value: "99.9%", label: "Uptime" },
  { value: "50ms", label: "Latency" },
  { value: "24/7", label: "Support" }
];

export const testimonials = [
  { quote: "Changed how we build software", author: "Tech Lead, Fortune 500" },
  { quote: "Unmatched performance", author: "CTO, Startup" },
  { quote: "Essential to our workflow", author: "Senior Developer" }
];

export const pricingTiers = [
  { name: "Starter", price: "$29", features: ["5 projects", "Basic tools"] },
  { name: "Pro", price: "$99", features: ["Unlimited projects", "Advanced tools"] },
  { name: "Enterprise", price: "Custom", features: ["Dedicated support", "Custom SLAs"] }
];