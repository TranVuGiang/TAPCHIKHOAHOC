import { useEffect, useState } from 'react';

const AdPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Hiển thị popup khi trang được tải lần đầu
    setShowPopup(true);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative max-w-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">Special Advertisement!</h2>
        <p className="text-gray-700 mb-4">
          This is your advertisement content. It grabs the user's attention!
        </p>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold focus:outline-none"
        >
          ×
        </button>
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AdPopup;
