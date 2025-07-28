// src/components/MarkAsFoundModal/MarkAsFoundModal.tsx
import React, { useState } from "react";

type MarkAsFoundModalProps = {
  onClose: () => void;
  onSubmit: (info: { location: string; remark: string }) => void;
  itemTitle: string;
};

const MarkAsFoundModal: React.FC<MarkAsFoundModalProps> = ({
  onClose,
  onSubmit,
  itemTitle,
}) => {
  const [location, setLocation] = useState("");
  const [remark, setRemark] = useState("");

  const handleSubmit = () => {
    onSubmit({ location, remark });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Mark "{itemTitle}" as Found
        </h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Where is it handed over to?
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            placeholder="e.g., Admin Office, Security Desk"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Remark
          </label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-400"
            placeholder="Any additional details..."
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-green-500 hover:bg-green-600 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkAsFoundModal;