import { useState } from "react";
import { PlusCircle, CheckCircle } from "lucide-react";
import AddLostItemModal from "../../components/AddLostItemModal/AddLostItemModal";
import MarkAsFoundModal from "../../components/MarkAsFoundModal/MarkAsFoundModal";

const sampleLostItems = [
  {
    id: 1,
    title: "Black Wallet",
    description: "Lost near cafeteria, contains ID and cards",
    date: "2025-07-20",
  },
  {
    id: 2,
    title: "Water Bottle",
    description: "Blue bottle with stickers, left in lecture hall",
    date: "2025-07-25",
  },
];

const LostItems = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [foundModalItem, setFoundModalItem] = useState<null | typeof sampleLostItems[0]>(null);

  const handleFoundSubmit = (info: { location: string; remark: string }) => {
    console.log("Marked as Found:", {
      item: foundModalItem,
      location: info.location,
      remark: info.remark,
    });
    setFoundModalItem(null);
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

      {isAddModalOpen && (
        <AddLostItemModal onClose={() => setIsAddModalOpen(false)} />
      )}

      {foundModalItem && (
        <MarkAsFoundModal
          onClose={() => setFoundModalItem(null)}
          itemTitle={foundModalItem.title}
          onSubmit={handleFoundSubmit}
        />
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-10">
        {sampleLostItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-2">{item.description}</p>
              <p className="text-gray-400 text-xs">
                Reported on: {item.date}
              </p>
            </div>
            <button
              className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-1.5 text-sm bg-green-500 hover:bg-green-600 text-white rounded-full transition"
              onClick={() => setFoundModalItem(item)}
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Found
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LostItems;