import { authService } from '@/utils/authService';
import { AlertCircle, Calendar, Check, DollarSign, FileCodeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChiTietQuangCao() {
    const location = useLocation();
    const navigate = useNavigate();
    const [quangcao, setQuangcao] = useState(null);
    const [nguoiDung, setNguoiDung] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        // Kiểm tra nếu không có dữ liệu từ navigation state
        if (!location.state?.quangcao) {
            // Quay lại trang trước hoặc trang chủ
            navigate('/home/option_advertisement');
            return;
        }

        // Lấy thông tin quảng cáo từ navigation state
        setQuangcao(location.state.quangcao);

        // Lấy thông tin người dùng từ localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            setNguoiDung(currentUser);
        }
    }, [location, navigate]);


    const taohopdong = async(bgqcid) => {
        try {
            const resp = authService.taoHopDong(bgqcid)
            console.log(resp)   
        } catch (error) {
            console.log(error)
        }
    }

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
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Tiêu đề và thông tin chung */}
                <div className="bg-indigo-600 text-white p-6">
                    {console.log(quangcao)}
                    <h1 className="text-3xl font-bold">{quangcao.tengoi}</h1>
                    <div className="flex items-center mt-2">
                        <Calendar className="mr-2" size={20} />
                        <span>Thời hạn: {quangcao.songay} ngày</span>
                    </div>
                </div>

                {/* Thông tin chi tiết */}
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <DollarSign className="mr-2 text-green-600" size={24} />
                        <p className="text-2xl font-bold text-indigo-700">
                            {quangcao.giatien.toLocaleString()}₫
                        </p>
                    </div>

                    {/* Các tính năng của gói */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-indigo-800">Quyền lợi gói</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Check className="mr-2 text-green-500" size={20} />
                                <span>Quảng cáo cho {quangcao.songay} ngày</span>
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 text-green-500" size={20} />
                                <span>Hiển thị quảng cáo trên hệ thống</span>
                            </li>
                            <li className="flex items-center">
                                <Check className="mr-2 text-green-500" size={20} />
                                <span>Đủ điều kiện chiến dịch quảng cáo</span>
                            </li>
                        </ul>
                    </div>

                    {/* Nút tạo hợp đồng */}
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