import { useEffect, useState } from "react";
import { MapPin, CheckCircle } from "lucide-react";
import { BASE_URL } from "../../utils/app.constants";
import MarkAsReceivedModal from "../../components/MarkAsReceivedModal/MarkAsReceivedModal";
import { axiosPrivateInstance } from "../../utils/axios.instance";

interface FoundItem {
  id: number;
  title: string;
  description: string;
  created_at: string;
  hand_over_place: string;
  found_remark: string;
  is_marked_as_found: boolean;
  receivers_name?: string;
  nic?: string;
  receive_remark?: string;
}

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FoundItem | null>(null);

  const fetchFoundItems = async () => {
    try {
      const res = await axiosPrivateInstance.get<FoundItem[]>(
        `${BASE_URL}/api/lost/found`
      );
      setFoundItems(res.data);
    } catch (err) {
      console.error("Failed to fetch found items:", err);
    }
  };

  useEffect(() => {
    fetchFoundItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-gray-100 px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Found Items</h1>
        <p className="text-gray-600">
          These items were found and are waiting to be collected.
        </p>
      </div>

      {selectedItem && (
        <MarkAsReceivedModal
          item={{
            id: selectedItem.id,
            title: selectedItem.title,
            description: selectedItem.description,
            date: selectedItem.created_at,
            location: selectedItem.hand_over_place,
          }}
          onClose={() => setSelectedItem(null)}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-6">
        {foundItems.map((item) => (
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
                Found on: {new Date(item.created_at).toLocaleDateString()}
              </p>
              <div className="flex items-center text-sm text-gray-600 gap-2 mt-1">
                <MapPin className="w-4 h-4 text-green-600" />
                <span>Available at: {item.hand_over_place}</span>
              </div>
              {item.receivers_name && (
                <p className="text-gray-500 text-xs mt-2">
                  Collected by: {item.receivers_name}
                </p>
              )}
              {item.found_remark && (
                <p className="text-gray-500 text-xs mt-2 italic">
                  Remark: {item.found_remark}
                </p>
              )}
            </div>

            <button
              onClick={() => setSelectedItem(item)}
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition"
              disabled={Boolean(item.receivers_name)}
            >
              <CheckCircle className="w-4 h-4" />
              {item.receivers_name ? "Collected" : "Mark as Received"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundItems;
