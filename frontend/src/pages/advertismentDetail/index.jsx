import { authService } from '@/utils/authService';
import { AlertCircle, Calendar, Check, FileCodeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChiTietQuangCao() {
    const location = useLocation();
    const navigate = useNavigate();
    const [quangcao, setQuangcao] = useState(null);
    const [nguoiDung, setNguoiDung] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Mapping of ad placement details
    const adPlanDetails = {
        '1': {
            fullName: 'Vị trí Quảng Cáo Cuối Trang',
            benefits: [
                'Quảng cáo hiển thị tại vị trí cuối trang',
                'Tiếp cận người dùng sau khi xem nội dung',
                'Vị trí hiển thị ổn định'
            ]
        },
        '2': {
            fullName: 'Vị trí Quảng Cáo Popup',
            benefits: [
                'Quảng cáo hiển thị dạng popup',
                'Thu hút chú ý người dùng',
                'Hiệu ứng xuất hiện nổi bật'
            ]
        },
        '3': {
            fullName: 'Vị trí Quảng Cáo Đầu Trang',
            benefits: [
                'Quảng cáo hiển thị ngay đầu trang',
                'Tiếp cận người dùng ngay khi vào trang',
                'Vị trí ưu tiên nhất'
            ]
        }
    };

    useEffect(() => {
        // Check if there's data passed from navigation state
        if (!location.state?.quangcao) {
            // Redirect back to advertisement selection page
            navigate('/home/option_advertisement');
            return;
        }

        // Get advertisement information from navigation state
        const advertisementData = location.state.quangcao;
        
        // Enhance the advertisement data with full details
        const enhancedQuangcao = {
            ...advertisementData,
            fullName: adPlanDetails[advertisementData.bgqcId]?.fullName || advertisementData.tengoi,
            benefits: adPlanDetails[advertisementData.bgqcId]?.benefits || []
        };

        setQuangcao(enhancedQuangcao);

        // Get user information from localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            setNguoiDung(currentUser);
        }
    }, [location, navigate]);

    const taohopdong = async (bgqcid) => {
        setIsLoading(true);
        try {
            const resp = await authService.taoHopDong({
                token: nguoiDung.token,
                bgqcid: bgqcid,
            });
            if (resp.data && resp.data.bgqc) {
                resp.data.bgqc.forEach((item) => {
                    taoThanhToan(
                        'ADS - ' + item.songay + ' Days',
                        item.tengoi,
                        item.giatien,
                        resp.data.hopdong_id,
                        nguoiDung.token
                    );
                });
            }
        } catch (error) {
            console.error('Lỗi tạo hợp đồng:', error);
            setError('Không thể tạo hợp đồng. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const taoThanhToan = async (productName, description, price, hopdong_id, token) => {
        setIsLoading(true);
        try {
            const resp = await authService.taoThanhToan(productName, description, price, hopdong_id, token);
            window.location.href = resp.data.checkoutData.checkoutUrl;
        } catch (error) {
            console.error('Lỗi tạo thanh toán:', error);
            setError('Không thể tạo thanh toán. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    // Loading spinner component
    const LoadingSpinner = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
        </div>
    );

    if (!quangcao) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                    <p className="mt-4 text-lg text-gray-700">Không tìm thấy thông tin quảng cáo</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            {isLoading && <LoadingSpinner />}
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Title and General Information */}
                <div className="bg-indigo-600 text-white p-6">
                    <h1 className="text-3xl font-bold">{quangcao.fullName}</h1>
                    <div className="flex items-center mt-2">
                        <Calendar className="mr-2" size={20} />
                        <span>Thời hạn: {quangcao.songay} ngày</span>
                    </div>
                </div>

                {/* Detailed Information */}
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <p className="text-2xl font-bold text-indigo-700">{quangcao.giatien}</p>
                    </div>

                    {/* Package Benefits */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-indigo-800">Quyền lợi gói</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Check className="mr-2 text-green-500" size={20} />
                                <span>Quảng cáo cho {quangcao.songay} ngày</span>
                            </li>
                            {quangcao.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center">
                                    <Check className="mr-2 text-green-500" size={20} />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Create Contract Button */}
                    <div className="mt-6">
                        {error && (
                            <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded mb-4 flex items-center">
                                <AlertCircle className="mr-2 text-red-500" size={20} />
                                <span>{error}</span>
                            </div>
                        )}
                        <button
                            className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                            onClick={() => taohopdong(quangcao.banggiaqc_id)}
                        >
                            <FileCodeIcon className="mr-2" size={20} />
                            Tạo Hợp Đồng Quảng Cáo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}