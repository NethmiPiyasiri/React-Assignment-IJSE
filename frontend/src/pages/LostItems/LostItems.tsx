import { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/app.constants";
import { PlusCircle, CheckCircle, Trash2 } from "lucide-react";
import AddLostItemModal from "../../components/AddLostItemModal/AddLostItemModal";
import MarkAsFoundModal from "../../components/MarkAsFoundModal/MarkAsFoundModal";
import { axiosPrivateInstance } from "../../utils/axios.instance";

// Interfaces (Put at top for reuse)
interface LostItem {
  id: number;
  title: string;
  description: string;
  created_at: string;
  is_marked_as_found: boolean;
  hand_over_place?: string;
  found_remark?: string;
  receivers_name?: string;
  nic?: string;
  receive_remark?: string;
}

interface FoundSubmitInfo {
  location: string;
  remark: string;
}

const LostItems = () => {
  const [lostItems, setLostItems] = useState<LostItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [foundModalItem, setFoundModalItem] = useState<LostItem | null>(null);

  // Fetch all lost items
  const fetchLostItems = async () => {
    try {
      const res = await axiosPrivateInstance.get<LostItem[]>(`${BASE_URL}/api/lost/lost`);
      setLostItems(res.data);
    } catch (err) {
      console.error("Failed to fetch lost items:", err);
    }
  };

  useEffect(() => {
    fetchLostItems();
  }, []);

  // Mark as found
  const handleFoundSubmit = async (info: FoundSubmitInfo): Promise<void> => {
    if (!foundModalItem) return;
    try {
      await axiosPrivateInstance.put(`${BASE_URL}/api/lost/${foundModalItem.id}`, {
        is_marked_as_found: true,
        hand_over_place: info.location,
        found_remark: info.remark,
      });
      setFoundModalItem(null);
      fetchLostItems();
    } catch (err) {
      console.error("Failed to mark item as found:", err);
      alert("Failed to mark item as found. Please try again.");
    }
  };

  // Delete item
  const handleDelete = async (id: number): Promise<void> => {
    try {
      await axiosPrivateInstance.delete(`${BASE_URL}/api/lost/${id}`);
      fetchLostItems();
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-200 to-gray-100 px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Did you lose something?
        </h1>
        <p className="text-gray-600">
          Submit your lost item here so others can help you find it.
        </p>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-yellow-500 text-white font-medium rounded-full hover:bg-yellow-600 transition"
        >
          <PlusCircle className="w-5 h-5" />
          Add Lost Item
        </button>
      </div>

      {/* Modal: Add Lost Item */}
      {isAddModalOpen && (
        <AddLostItemModal
          onClose={() => setIsAddModalOpen(false)}
        />
      )}

      {/* Modal: Mark as Found */}
      {foundModalItem && (
        <MarkAsFoundModal
          onClose={() => setFoundModalItem(null)}
          itemTitle={foundModalItem.title}
          onSubmit={handleFoundSubmit}
        />
      )}

      {/* Lost Items Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-10">
        {lostItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between relative"
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            {/* Item Details */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="text-gray-400 text-xs">
                Reported on:{" "}
                {new Date(item.created_at).toLocaleDateString()}
              </p>
            </div>

            {/* Mark as Found Button */}
            <button
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-full transition"
              onClick={() => setFoundModalItem(item)}
              disabled={item.is_marked_as_found}
            >
              <CheckCircle className="w-4 h-4" />
              {item.is_marked_as_found ? "Already Found" : "Mark as Found"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostItems;