import img4 from '@/assets/1.png';
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
        {/* Tiêu đề */}
        <h2 className="text-2xl font-bold mb-4">Quảng cáo</h2>
        
        {/* Hình ảnh quảng cáo */}
        <a className="mb-4 cursor-pointer">
          <img 
            src={img4}
            alt="Advertisement" 
            className="w-full h-auto rounded-lg shadow-md object-cover"
          />
        </a>
        

        {/* Nút đóng */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold focus:outline-none"
        >
          ×
        </button>
        
     
      </div>
    </div>
  );
};

export default AdPopup;
