import img4 from '@/assets/1.png';
import { useEffect, useState } from 'react';

const AdPopup = ({ quangcao3 }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [qc1, setQc1] = useState([]);

    useEffect(() => {
        // Kiểm tra và load quảng cáo
        if (quangcao3 && quangcao3.length > 0) {
            loadQuangCao();
        }
    }, [quangcao3]);

    const loadQuangCao = async () => {
        try {
            const quangcao = quangcao3.filter((item) => item.bgqcId === '2'); // Lọc quảng cáo theo bgqcId
            setQc1(quangcao); // Cập nhật vào state
        } catch (error) {
            console.log('Error loading ads:', error);
        }
    };


    useEffect(() => {
      // Lấy currentUser từ localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Parse JSON từ localStorage
      const lastPopupTime = localStorage.getItem('lastPopupTime'); // Lấy thời gian popup cuối
      const now = Date.now(); // Thời gian hiện tại

      // Kiểm tra nếu currentUser có roles bao gồm CUSTOMER và đã qua 5 phút từ lần hiển thị trước
      if (
          currentUser?.roles && Array.isArray(currentUser.roles) && // Kiểm tra roles là mảng
          currentUser.roles.some(roleArray => Array.isArray(roleArray) && roleArray.includes('CUSTOMER')) &&  // Kiểm tra nếu bất kỳ mảng con nào có chứa CUSTOMER
          (!lastPopupTime || now - parseInt(lastPopupTime) > 5 * 60 * 1000)
      ) {
          setShowPopup(true);
          localStorage.setItem('lastPopupTime', now.toString()); // Lưu thời gian hiển thị vào localStorage
      }
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
                {qc1.length > 0 ? (
                    qc1.map((item, index) => (
                        <a key={index} className="mb-4 cursor-pointer">
                            <img
                                src={item.url ? item.url : img4}
                                alt="Advertisement"
                                className="w-full h-auto rounded-lg shadow-md object-cover"
                            />
                        </a>
                    ))
                ) : (
                    <img src={img4} alt="Advertisement" className="w-full h-auto rounded-lg shadow-md object-cover" />
                )}

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
