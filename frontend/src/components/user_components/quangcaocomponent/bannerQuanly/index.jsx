import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';
import EditQuangCaoModal from './update';

const BannerQuangCao = () => {
    const [adver, setAdver] = useState([]);
    const [selectedAd, setSelectedAd] = useState(null);
    useEffect(() => {
        const loadData = async () => {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            console.log(current.token);
            try {
                const resp = await authService.loadQuangcaoByPatner(current.token);
                console.log(resp.data);
                setAdver(resp.data);
            } catch (error) {
                console.log(error);
            }
        };
        loadData();
    }, []);
    // Dữ liệu quảng cáo mới
    const [advertisements] = useState([
        {
            quangcaoId: '3',
            tieude: 'Quảng cáo 30 ngày',
            url: null,
            link: 'https://www.google.com',
            luotxem: '28',
            luotclick: '0',
            goiquangcao: 'Gói Quảng Cáo 1',
            ngaybd: '12:00:00 15-12-2024',
            ngaykt: '12:00:00 14-01-2025',
            status: '1',
        },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case '2':
                return 'bg-green-100 text-green-800';
            case '1':
                return 'bg-orange-100 text-orange-800';
            case '0':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case '2':
                return 'Hoạt động';
            case '1':
                return 'Chờ duyệt';
            case '0':
                return 'Hết hạn';
            default:
                return 'Không xác định';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Quản lý Quảng cáo</h1>
                    <p className="text-gray-600 mt-1">Danh sách chiến dịch quảng cáo</p>
                </div>

                {/* Danh sách quảng cáo */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">Danh sách Quảng cáo</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tiêu đề
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Gói Quảng Cáo
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Liên kết
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lượt xem
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lượt click
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày bắt đầu
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Ngày kết thúc
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {adver.map((ad) => (
                                    <tr key={ad.quangcaoId}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {ad.tieude}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {ad.goiquangcao}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                                            <a
                                                href={ad.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="hover:underline"
                                            >
                                                {ad.link ? 'Xem liên kết' : 'Không có liên kết'}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ad.status)}`}
                                            >
                                                {getStatusText(ad.status)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {ad.luotxem}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {ad.luotclick}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {ad.ngaybd.split(' ')[1]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {ad.ngaykt.split(' ')[1]}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => setSelectedAd(ad)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    Chỉnh sửa
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {selectedAd && (
                <EditQuangCaoModal
                    advertisement={selectedAd}

                    onClose={() => setSelectedAd(null)}
                />
            )}
        </div>
    );
};

export default BannerQuangCao;
