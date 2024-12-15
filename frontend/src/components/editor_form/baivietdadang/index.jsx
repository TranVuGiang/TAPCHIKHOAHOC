import ArticleDetailModal from '@/components/chitietbaibao';
import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

function Editor_BaiVietDaDang() {
    const [baibaodadang, setBaibaodadang] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        loadBaiBaoDaDang();
    }, []);

    const loadBaiBaoDaDang = async () => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        const token = current.token;
        try {
            setLoading(true);
            const response = await authService.loadBaibaoForEditor(token);
            const baibaoStatus = response.data.baibaos.filter((item) => item.status === 4); 
            setBaibaodadang(baibaoStatus);
        } catch (error) {
            throw new Error(error.message || 'Load bài báo lỗi');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Chưa xác định';
        return new Date(dateString).toLocaleDateString('vi-VN');
    };

    const handleXemChiTiet = (item) => {
        // Mở file PDF hoặc xem chi tiết bài viết
        window.open(item.file, '_blank');
    };

    const handleSua = (item) => {
        // Chức năng sửa bài viết
        console.log('Sửa bài viết:', item);
    };

    const handleXoa = (item) => {
        // Chức năng xóa bài viết
        console.log('Xóa bài viết:', item);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm">
            {/* {loading && <LoadingSpinner />} */}
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-800">Danh sách bài viết đã đăng</h2>
                    <div className="flex space-x-2">
                        <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                            <option>Tất cả</option>
                            <option>Tuần này</option>
                            <option>Tháng này</option>
                        </select>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Xuất PDF
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tiêu đề
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tác giả
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Từ khóa
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày đăng
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Chi tiết
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {baibaodadang.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">{item.tieude}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">{item.taikhoans.hovaten}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500">{item.tukhoa}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {!formatDate(item.ngaydang) ? 'Không có' : item.ngaydang}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex space-x-3">
                                            <button
                                                onClick={() => setSelectedArticle(item)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Xem
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex items-center justify-between mt-6">
                    <div className="text-sm text-gray-500">Hiển thị {baibaodadang.length} bài viết</div>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Trước</button>
                        <button className="px-4 py-2 border rounded-lg bg-indigo-600 text-white">1</button>
                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Sau</button>
                    </div>
                </div>
            </div>
            {selectedArticle && (
                <ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            )}
        </div>
    );
}

export default Editor_BaiVietDaDang;
