import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

const Editor_Notification = () => {
    const [baibaos, setBaibao] = useState([]);

    useEffect(() => {
        loadDataUser();
    }, []);

    const loadDataUser = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.loadBaibaoForEditor(token);
            console.log(response)
            setBaibao(response.data.baibaos);
        } catch (error) {
            console.log(error.message || 'Lỗi khi tải bài viết');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 0:
                return 'bg-blue-600'; // Đã gửi - Xanh dương
            case 1:
                return 'bg-yellow-500'; // Chờ xử lý - Vàng
            case 2:
                return 'bg-green-600'; // Đã nhận - Xanh lá đậm
            case 3:
                return 'bg-purple-600'; // Đang kiểm duyệt - Tím đậm
            case 4:
                return 'bg-green-700'; // Đã kiểm duyệt - Xanh lá đậm hơn
            default:
                return 'bg-gray-500'; // Mặc định - Xám
        }
    };
    
    const getStatusBackground = (status) => {
        switch (status) {
            case 0:
                return 'bg-blue-100'; // Đã gửi - Xanh dương nhạt
            case 1:
                return 'bg-yellow-100'; // Chờ xử lý - Vàng nhạt
            case 2:
                return 'bg-green-100'; // Đã nhận - Xanh lá nhạt
            case 3:
                return 'bg-purple-100'; // Đang kiểm duyệt - Tím nhạt
            case 4:
                return 'bg-green-100'; // Đã kiểm duyệt - Xanh lá nhạt
            default:
                return 'bg-gray-100'; // Mặc định - Xám nhạt
        }
    };
    

    const getNotificationMessage = (item) => {
        switch (item.status) {
            case 0:
                return `Bài báo "${item.tieude}" đã được gửi bởi tác giả ${item.taikhoan.hovaten}`;
            case 1:
                return `Bài báo "${item.tieude}" đang chờ xử lý`;
            case 2:
                return `Bài báo "${item.tieude}" đã được tiếp nhận`;
            case 3:
                return `Bài báo "${item.tieude}" đang trong quá trình kiểm duyệt`;
            case 4:
                return `Bài báo "${item.tieude}" đã được kiểm duyệt xong`;
            default:
                return `Cập nhật về bài báo "${item.tieude}"`;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getRelevantDate = (item) => {
        if (item.status === 4 && item.ngaykiemduyet) {
            return formatDate(item.ngaykiemduyet);
        }
        return formatDate(item.ngaytao);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Thông báo gần đây</h2>
                <div className="space-y-4">
                    {baibaos.map((item) => (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between p-4 rounded-lg ${getStatusBackground(item.status)}`}
                        >
                            <div className="flex items-center space-x-4">
                                <div
                                    className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`}
                                ></div>
                                <div className="flex flex-col">
                                    <span className="text-gray-700">{getNotificationMessage(item)}</span>
                                </div>
                            </div>
                            <span className="text-sm text-gray-500">{getRelevantDate(item)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Editor_Notification;