import imgnull from '@/assets/ads.png';
import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

function MobileAdverTop({ quangcao1 }) {
    const [qc1, setQc1] = useState([]);

    useEffect(() => {
        // Kiểm tra xem quangcao1 có tồn tại trước khi load
        if (quangcao1 && quangcao1.length > 0) {
            loadQuangCao();
        }
    }, [quangcao1]); // Lắng nghe thay đổi của quangcao1

    const loadQuangCao = async () => {
        try {
            const quangcao = quangcao1.filter((item) => item.bgqcId === '1'); // Lọc dữ liệu với bgqcId === '1'
            setQc1(quangcao); // Cập nhật vào state qc1
        } catch (error) {
            console.log('Error loading ads:', error);
        }
    };

    const handleClickBanner = async (e, quangcaoId) => {
        e.preventDefault();
        try {
            const resp = await authService.clickQuangCao(quangcaoId);
            console.log(resp);
        } catch (error) {
            console.log(error);
        }
    };
    const defaultId = qc1.length > 0 ? qc1[0].quangcaoId : null;

    return (
        <div className="w-full mb-6">
            <div
                onClick={(e) => handleClickBanner(e, defaultId)}
                className="relative h-[100px] bg-slate-100 rounded-lg overflow-hidden shadow-lg cursor-pointer"
            >
                {/* Hiển thị hình ảnh */}
                {qc1.length > 0 ? (
                    qc1.map((item, index) => (
                        <div key={index}>
                            <div>
                                <img
                                    src={item.url ? item.url : imgnull}
                                    alt={`Banner ${index}`}
                                    className="h-full w-full object-cover rounded-lg transition-opacity duration-1000 ease-in-out"
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                        <span>Loading...</span> {/* Placeholder nếu chưa có dữ liệu */}
                    </div>
                )}

                {/* Lớp phủ tối nhẹ */}
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
            </div>
        </div>
    );
}

export default MobileAdverTop;
