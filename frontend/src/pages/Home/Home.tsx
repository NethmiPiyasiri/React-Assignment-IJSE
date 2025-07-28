import { useNavigate } from "react-router-dom";
import {
  Search,
  ArchiveRestore,
  ShieldCheck,
  Users,
  Rocket,
  ArrowRight,
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: "Lost Items",
      icon: <Search className="w-12 h-12 text-yellow-600" />,
      description: "Report and browse belongings lost on campus.",
      route: "/lost",
      bgColor: "bg-green-300",
    },
    {
      title: "Found Items",
      icon: <ArchiveRestore className="w-12 h-12 text-yellow-600" />,
      description: "See what items have been found and submitted.",
      route: "/found",
      bgColor: "bg-green-300",
    },
  ];

  const features = [
    {
      title: "Verified Reports",
      description: "All submissions are verified by staff before being listed.",
      icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
    },
    {
      title: "Community Driven",
      description: "Built for and by students and staff for trust and speed.",
      icon: <Users className="w-8 h-8 text-indigo-600" />,
    },
    {
      title: "Fast & Easy",
      description: "Submit or check for items in seconds.",
      icon: <Rocket className="w-8 h-8 text-indigo-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Campus Lost & Found
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Easily report and search for items that are lost or found within your
          educational institute.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/103/103226.png"
          alt="Lost and Found"
          className="w-32 h-32 mx-auto my-8"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {features.map((feat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md p-6">
            <div className="flex justify-center mb-4">{feat.icon}</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {feat.title}
            </h3>
            <p className="text-gray-600">{feat.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center py-8 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Start by selecting an option below
        </h2>
        <p className="text-gray-600">
          Whether you lost something or found something, we’re here to help.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            onClick={() => navigate(card.route)}
            className={`rounded-2xl shadow-lg p-8 cursor-pointer transform hover:scale-105 transition duration-300 ${card.bgColor}`}
          >
            <div className="flex items-center justify-center mb-6">
              {card.icon}
            </div>
            <h2 className="text-xl font-semibold text-gray-700 text-center mb-2">
              {card.title}
            </h2>
            <p className="text-center text-gray-600 mb-4">{card.description}</p>

            <div className="flex justify-center items-center text-sm text-gray-700 font-medium gap-2 hover:gap-3 transition-all duration-200">
              <span>Explore</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
