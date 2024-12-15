import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const CancelOrderPage = () => {
    const navigate = useNavigate();

    const location = useLocation();

    // Lấy các tham số từ query string
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    const id = queryParams.get('id');
    const cancel = queryParams.get('cancel');
    const status = queryParams.get('status');
    const orderCode = queryParams.get('orderCode');

    // Kiểm tra trạng thái hủy
    const isCancelled = cancel === 'true' && status === 'CANCELLED';

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-xl w-full">
                <div className="flex items-center justify-center mb-6">
                    {isCancelled ? (
                        <CheckCircleIcon className="h-16 w-16 text-green-500" />
                    ) : (
                        <XCircleIcon className="h-16 w-16 text-red-500" />
                    )}
                </div>

                <h1
                    className={`text-2xl font-bold text-center mb-4 ${isCancelled ? 'text-green-600' : 'text-red-600'}`}
                >
                    Hủy Hóa Đơn {isCancelled ? 'Thành Công' : 'Thất Bại'}
                </h1>

                {isCancelled ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                        <div className="space-y-2">
                            <p className="flex justify-between">
                                <span className="font-medium text-gray-600">Mã Hóa Đơn:</span>
                                <span className="font-bold text-gray-800">{orderCode}</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="font-medium text-gray-600">Trạng Thái:</span>
                                <span className="font-bold text-green-600">{status}</span>
                            </p>
                        </div>
                        <p className="text-green-700 text-center mt-4 font-semibold">Hủy Thành Công!</p>
                    </div>
                ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                        <p className="text-red-700 text-center font-semibold">
                            Hủy hóa đơn không thành công. Vui lòng thử lại!
                        </p>
                    </div>
                )}

                {/* Hiển thị thông tin chi tiết */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <div className="space-y-2">
                        <p className="flex justify-between">
                            <span className="text-gray-600 font-medium">Mã giao dịch:</span>
                            <span className="font-bold text-gray-800">{id}</span>
                        </p>
                        <p className="flex justify-between">
                            <span className="text-gray-600 font-medium">Mã trạng thái:</span>
                            <span className="font-bold text-gray-800">{code}</span>
                        </p>
                    </div>
                </div>
                <button
                    onClick={() => navigate('/home/option_advertisement')}
                    className="w-full bg-green-700 text-white p-3 rounded-xl mt-5 hover:bg-green-600 transition duration-500"
                >
                    Tiếp tục
                </button>
            </div>
        </div>
    );
};

export default CancelOrderPage;
