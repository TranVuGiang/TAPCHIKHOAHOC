import { authService } from '@/utils/authService';
import { AlertCircle, CheckCircle2, Link as LinkIcon, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AdsManagement() {
    const [quangcaoList, setQuangcaoList] = useState([]);
    const [selectedQuangcao, setSelectedQuangcao] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // Mock data (you'll replace this with actual API call)
    useEffect(() => {
        loadQuangCao();
    }, []);

    const loadQuangCao = async () => {
        setIsLoading(true);
        const current = JSON.parse(localStorage.getItem('currentUser'));
        const token = current.token;
        try {
            const resp = await authService.quangcaoAdmin(token);
            console.log(resp.data.data);
            setQuangcaoList(resp.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Status mapping
    const getStatusInfo = (status) => {
        switch (status) {
            case '0':
                return {
                    text: 'Hết hạn',
                    icon: <XCircle className="text-red-500" />,
                    color: 'text-red-500',
                };
            case '1':
                return {
                    text: 'Chờ duyệt',
                    icon: <AlertCircle className="text-yellow-500" />,
                    color: 'text-yellow-500',
                };
            case '2':
                return {
                    text: 'Hoạt động',
                    icon: <CheckCircle2 className="text-green-500" />,
                    color: 'text-green-500',
                };
            default:
                return {
                    text: 'Không Xác Định',
                    icon: <AlertCircle className="text-gray-500" />,
                    color: 'text-gray-500',
                };
        }
    };

    // Open detail modal
    const handleViewDetail = (quangcao) => {
        setSelectedQuangcao(quangcao);
    };

    const handleUpdateQuangCao = async (quangcaoId, status) => {
        setIsLoading(true);
        const current = JSON.parse(localStorage.getItem('currentUser'));
        const token = current.token;
        try {
            const resp = await authService.updateQuangcaoAdmin(token, quangcaoId, status);
            console.log(resp);
            loadQuangCao();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const LoadingSpinner = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
            </div>
        );
    };

    return (
        <div className="w-full mx-auto p-6 bg-gray-50 min-h-screen">
            {isLoading && <LoadingSpinner />}
            <h1 className="text-3xl font-bold mb-6 text-indigo-800">Quản Lý Quảng Cáo</h1>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-indigo-100">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Tiêu Đề</th>
                            <th className="p-3 text-left">Người Đăng</th>
                            <th className="p-3 text-left">Gói QC</th>
                            <th className="p-3 text-left">Trạng Thái</th>
                            <th className="p-3 text-center">Chi tiết</th>
                            <th className="p-3 text-center">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quangcaoList.map((quangcao) => {
                            const statusInfo = getStatusInfo(quangcao.status);
                            return (
                                <tr key={quangcao.quangcaoId} className="border-b hover:bg-gray-100">
                                    <td className="p-3">{quangcao.quangcaoId}</td>
                                    <td className="p-3">{quangcao.tieude}</td>
                                    <td className="p-3">{quangcao.taikhoan.hovaten}</td>
                                    <td className="p-3">{quangcao.bgqc.tengoi}</td>
                                    <td className="p-3">
                                        <div className="flex items-center">
                                            {statusInfo.icon}
                                            <span className={`ml-2 ${statusInfo.color}`}>{statusInfo.text}</span>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                onClick={() => handleViewDetail(quangcao)}
                                                className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                                                title="Xem Chi Tiết"
                                            >
                                                Xem
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        {quangcao.status === "1" && (
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleUpdateQuangCao(quangcao.quangcaoId, '2')}
                                                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                                                    title="Xem Chi Tiết"
                                                >
                                                    Kích hoạt
                                                </button>
                                            </div>
                                        )}
                                        {quangcao.status === "2" && (
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleUpdateQuangCao(quangcao.quangcaoId, '0')}
                                                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                                                    title="Xem Chi Tiết"
                                                >
                                                    Hết hạn
                                                </button>
                                            </div>
                                        )}
                                        {quangcao.status === "0" && (
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleUpdateQuangCao(quangcao.quangcaoId, '1')}
                                                    className="text-blue-500 hover:bg-blue-50 p-2 rounded-full"
                                                    title="Xem Chi Tiết"
                                                >
                                                    Chờ duyệt
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Chi Tiết Quảng Cáo Modal */}
            {selectedQuangcao && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-indigo-800">Chi Tiết Quảng Cáo</h2>
                            <button
                                onClick={() => setSelectedQuangcao(null)}
                                className="text-gray-500 hover:text-red-500"
                            >
                                <XCircle />
                            </button>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center">
                                <span className="font-semibold w-1/3">Tiêu Đề:</span>
                                <span>{selectedQuangcao.tieude}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-1/3">Người Đăng:</span>
                                <span>{selectedQuangcao.taikhoan.hovaten}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-1/3">Gói Quảng Cáo:</span>
                                <span>{selectedQuangcao.bgqc.tengoi}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-1/3">Giá Gói:</span>
                                <span>{selectedQuangcao.bgqc.giagoi}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-1/3">Ngày Bắt Đầu:</span>
                                <span>{selectedQuangcao.ngaybd}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-1/3">Ngày Kết Thúc:</span>
                                <span>{selectedQuangcao.ngaykt}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="font-semibold w-1/3">Trạng Thái:</span>
                                <span>{getStatusInfo(selectedQuangcao.status).text}</span>
                            </div>
                            {selectedQuangcao.link && (
                                <div className="flex items-center">
                                    <span className="font-semibold w-1/3">Liên Kết:</span>
                                    <a
                                        href={selectedQuangcao.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline flex items-center"
                                    >
                                        <LinkIcon className="mr-2" size={16} />
                                        Mở Liên Kết
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
