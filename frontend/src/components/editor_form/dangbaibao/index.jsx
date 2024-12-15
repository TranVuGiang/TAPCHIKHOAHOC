import ArticleDetailModal from '@/components/chitietbaibao';
import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

const Editor_DangBaiBao = () => {
    const [baibaos, setBaibao] = useState([]);
    const [reviewers, setReviewers] = useState([]);
    const [selectedBaibao, setSelectedBaibao] = useState(null);
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [selectedDanhMuc, setSelectedDanhMuc] = useState('');
    const [danhmucs, setDanhmucs] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);

    const STATUS_CONFIG = {
        0: { text: 'Đã gửi', color: 'bg-blue-100 text-blue-800' },
        1: { text: 'Chờ xử lý', color: 'bg-blue-100 text-blue-800' },
        2: { text: 'Đang duyệt', color: 'bg-orange-100 text-orange-800' },
        3: { text: 'Đã duyệt', color: 'bg-yellow-100 text-yellow-800' },
        4: { text: 'Chờ đăng', color: 'bg-indigo-100 text-green-800' },
        5: { text: 'Đã đăng', color: 'bg-green-100 text--800' },
    };

    // Chỉ lọc các bài báo có status = 3
    const filteredBaibaos = baibaos.filter((baibao) => baibao.status === 4);

    const getStatusText = (status) => {
        return STATUS_CONFIG[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    };

    useEffect(() => {
        loadDataUser();
        loadReviewers();
        loadComboboxDanhMuc();
    }, []);

    const loadComboboxDanhMuc = async () => {
        try {
            const response = await authService.getAllDanhMuc({});
            setDanhmucs(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loadDataUser = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.loadBaibaoForEditor(token);
            setBaibao(response.data.baibaos);
        } catch (error) {
            console.log(error.message || 'Lỗi khi tải bài viết');
        }
    };

    const loadReviewers = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.getUserKiemDuyet(token);
            setReviewers(response.data);
        } catch (error) {
            console.log('Lỗi khi tải danh sách phản biện:', error);
        }
    };

    const handlePublish = async () => {
        console.log(selectedDanhMuc);

        if (!selectedDanhMuc) {
            alert('Vui lòng chọn danh mục!');
            return;
        }
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            await authService.dangBai({
                token: token,
                baibaoId: selectedBaibao.id,
                danhmucId: selectedDanhMuc,
            });
            setShowPublishModal(false);
            loadDataUser(); // Reload danh sách sau khi đăng
        } catch (error) {
            console.log('Lỗi khi đăng bài:', error);
            alert('Có lỗi xảy ra khi đăng bài');
        }
    };

    const handleViewPdf = ({ file }) => {
        if (file) {
            window.open(file, '_blank');
        } else {
            console.log('File không hợp lệ hoặc không có');
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md">
            <div className="p-10">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tiêu đề
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày đăng
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày tạo
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Chi tiết
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBaibaos.map((item) => {
                                const status = getStatusText(item.status);
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{item.tieude}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.ngaydang?.trim() || 'Chưa phát hành'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {item.ngaytao?.trim() || 'Không có ngày tạo'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => setSelectedArticle(item)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Xem
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}
                                            >
                                                {status.text}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <button
                                                className="text-blue-600 hover:text-blue-900 font-medium"
                                                onClick={() => {
                                                    setSelectedBaibao(item);
                                                    setShowPublishModal(true);
                                                }}
                                            >
                                                Đăng bài
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Modal without shadcn/ui */}
            {showPublishModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">Đăng bài viết</h3>
                            <button
                                onClick={() => setShowPublishModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Chọn danh mục</label>
                            <select
                                value={selectedDanhMuc}
                                onChange={(e) => setSelectedDanhMuc(e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Chọn danh mục</option>
                                {danhmucs.map((danhmuc) => (
                                    <option key={danhmuc.danhmucId} value={danhmuc.danhmucId}>
                                        {danhmuc.tieude}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowPublishModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handlePublish}
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                            >
                                Đăng bài
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {selectedArticle && (
                <ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            )}
        </div>
    );
};

export default Editor_DangBaiBao;
