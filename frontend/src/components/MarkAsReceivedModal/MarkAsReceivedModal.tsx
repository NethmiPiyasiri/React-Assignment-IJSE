import React, { useState } from "react";
import { X } from "lucide-react";
import { BASE_URL } from "../../utils/app.constants";
import { axiosPrivateInstance } from "../../utils/axios.instance";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

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

const validationSchema = Yup.object().shape({
  receivers_name: Yup.string().required("Receiver name is required"),
  id: Yup.string()
    .matches(/^[0-9]{9}[vVxX]|[0-9]{12}$/, "Invalid NIC/ID format")
    .required("NIC / ID number is required"),
  receive_remark: Yup.string().optional(),
});

const MarkAsReceivedModal: React.FC<MarkAsReceivedModalProps> = ({ item, onClose }) => {
  const [formData, setFormData] = useState({
    receivers_name: "",
    id: "",
    receive_remark: "",
  });

  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onTouched",
  });

  const onSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    try {
      await axiosPrivateInstance.put(`${BASE_URL}/api/lost/${item.id}`, {
        ...formData,
      });
    } catch (err) {
      console.error("Failed to mark item as received:", err);
    }

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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Receiver Name
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-200 rounded-md"
              value={formData.receivers_name}
              onChange={(e) =>
                setFormData({ ...formData, receivers_name: e.target.value })
              }
            />
            {errors.receivers_name && (
              <p className="text-red-500 text-sm mt-1">{errors.receivers_name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIC / ID Number
            </label>
            <input
              type="text"
              className="w-full mt-1 p-2 border border-gray-200 rounded-md"
              value={formData.id}
              onChange={(e) =>
                setFormData({ ...formData, id: e.target.value })
              }
            />
            {errors.id && (
              <p className="text-red-500 text-sm mt-1">{errors.id.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Remarks (optional)
            </label>
            <textarea
              rows={3}
              className="w-full mt-1 p-2 border border-gray-200 rounded-md"
              value={formData.receive_remark}
              onChange={(e) =>
                setFormData({ ...formData, receive_remark: e.target.value })
              }
            />
            {errors.receive_remark && (
              <p className="text-red-500 text-sm mt-1">{errors.receive_remark.message}</p>
            )}
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