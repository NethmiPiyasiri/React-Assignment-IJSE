import React, { useState } from "react";
import { X } from "lucide-react";

type MarkAsReceivedModalProps = {
  item: {
    id: number;
    title: string;
    description: string;
    date: string;
    location: string;
  };
  onClose: () => void;
};

const MarkAsReceivedModal: React.FC<MarkAsReceivedModalProps> = ({ item, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    remarks: "",
  });


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Mark as received:", { ...formData, item });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Mark "{item.title}" as Received
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Receiver Name
            </label>
            <input
              type="text"
              required
              className="w-full mt-1 p-2 border border-gray-200 rounded-md"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIC / ID Number
            </label>
            <input
              type="text"
              required
              className="w-full mt-1 p-2 border border-gray-200 rounded-md"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, id: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Remarks (optional)
            </label>
            <textarea
              rows={3}
              className="w-full mt-1 p-2 border border-gray-200 rounded-md"
              value={formData.remarks}
              onChange={(e) =>
                setFormData({ ...formData, remarks: e.target.value })
              }
            />
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Confirm & Mark as Received
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkAsReceivedModal;