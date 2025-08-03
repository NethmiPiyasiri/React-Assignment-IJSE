import React, { useState } from "react";
import { X } from "lucide-react";
import { BASE_URL } from "../../utils/app.constants";
import { axiosPrivateInstance } from "../../utils/axios.instance";

const AddLostItemModal = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [formErrors, setFormErrors] = useState({
    title: "",
    description: "",
  });

  const validate = () => {
    const errors: { title: string; description: string } = {
      title: "",
      description: "",
    };

    if (!formData.title.trim()) {
      errors.title = "Title is required.";
    } else if (formData.title.length < 3) {
      errors.title = "Title must be at least 3 characters.";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    } else if (formData.description.length < 10) {
      errors.description = "Description must be at least 10 characters.";
    }

    setFormErrors(errors);
    return !errors.title && !errors.description;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await axiosPrivateInstance.post(`${BASE_URL}/api/lost`, formData);
      console.log("Lost item added:", response.data);
      onClose();
    } catch (error) {
      console.error("Failed to add lost item:", error);
    }
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
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add Lost Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className={`w-full mt-1 p-2 border rounded-md ${
                formErrors.title ? "border-red-500" : "border-gray-200"
              }`}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
            {formErrors.title && (
              <p className="text-sm text-red-500 mt-1">{formErrors.title}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              className={`w-full mt-1 p-2 border rounded-md ${
                formErrors.description ? "border-red-500" : "border-gray-200"
              }`}
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            {formErrors.description && (
              <p className="text-sm text-red-500 mt-1">
                {formErrors.description}
              </p>
            )}
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLostItemModal;