import { useState } from "react";
import { MapPin, CheckCircle } from "lucide-react";
import MarkAsReceivedModal from "../../components/MarkAsReceivedModal/MarkAsReceivedModal";

const sampleFoundItems = [
  {
    id: 1,
    title: "USB Drive",
    description: "Red 32GB Kingston drive found in Lab 3",
    date: "2025-07-22",
    location: "IT Department Office",
  },
  {
    id: 2,
    title: "Umbrella",
    description: "Black umbrella found near library steps",
    date: "2025-07-25",
    location: "Main Admin Desk",
  },
];

const FoundItems = () => {
  const [selectedItem, setSelectedItem] = useState<null | typeof sampleFoundItems[0]>(null);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-gray-100 px-6 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Found Items
        </h1>
        <p className="text-gray-600">
          These items have been submitted and are available for collection.
        </p>
      </div>

      {selectedItem && (
        <MarkAsReceivedModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-6">
        {sampleFoundItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="text-gray-400 text-xs mb-1">
                Found on: {item.date}
              </p>
              <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Available at: {item.location}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedItem(item)}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Received
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundItems;
