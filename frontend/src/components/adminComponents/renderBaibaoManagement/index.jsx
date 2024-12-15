import ArticleDetailModal from '@/components/chitietbaibao';
import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

export const RenderArticleManagement = ({ token }) => {
    const [baibaos, setBaibaos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        loadBaibao();
    }, []);

    const loadBaibao = async () => {
        setIsLoading(true);
        try {
            const resp = await authService.loadBaibaoByAdmin(token);
            const resp2 = resp.data.data.filter((baibao) => baibao.status === '7' || baibao.status === '0');
            setBaibaos(resp2);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (baibaoId, currentStatus) => {
        setIsLoading(true);
        try {
            // Chuyển đổi trạng thái giữa 0 và 7
            const newStatus = currentStatus === '7' ? '0' : '7';

            // Gọi API để cập nhật trạng thái
            const resp = await authService.updateStatusBaiBaoByAdmin(token, baibaoId, newStatus);
            console.log(resp);
            loadBaibao();
        } catch (error) {
            console.error('Lỗi khi thay đổi trạng thái:', error);
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

    const STATUS_CONFIG = {
        0: { text: 'Không Hoạt Động', color: 'bg-red-100 text-red-800' },
        7: { text: 'Hoạt Động', color: 'bg-green-100 text-green-800' },
    };

    return (
        <div className="p-6">
            {isLoading && <LoadingSpinner />}
            <h2 className="text-2xl font-bold mb-6">Quản Lý Bài Báo</h2>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Tiêu Đề</th>
                            <th className="p-3 text-left">Tác giả</th>
                            <th className="p-3 text-left">Ngày Tạo</th>
                            <th className="p-3 text-left">Ngày Đăng</th>
                            <th className="p-3 text-left">Trạng Thái</th>
                            <th className="p-3 text-center">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {baibaos.map((article) => {
                            const statusKey = article.status.toString();
                            const statusConfig = STATUS_CONFIG[statusKey] || {
                                text: 'Không xác định',
                                color: 'bg-gray-100 text-gray-800',
                            };

                            return (
                                <tr key={article.baibaoId} className="border-b hover:bg-gray-50">
                                    <td className="p-3">{article.baibaoId}</td>
                                    <td className="p-3">{article.tieude}</td>
                                    <td className="p-3 truncate max-w-xs">{article.taikhoan.hovaten}</td>
                                    <td className="p-3">{article.ngaytao}</td>
                                    <td className="p-3">
                                        {article.ngaydang === 'null' ? 'Chưa phát hành' : article.ngaydang}
                                    </td>
                                    <td className="p-3">
                                        {console.log(article)}
                                        <button
                                            onClick={() => handleStatusChange(article.baibaoId, article.status)}
                                            className={`px-3 py-1 rounded-full text-sm ${
                                                article.status === '7'
                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                    : 'bg-red-100 text-red-800 hover:bg-red-200'
                                            }`}
                                        >
                                            {article.status === '7' ? 'Đã đăng' : 'Bị hạn chế'}
                                        </button>
                                    </td>
                                    <td className="p-3 flex justify-center space-x-2">
                                        <button
                                            className="text-green-500 hover:text-green-700 flex"
                                            onClick={() => setSelectedArticle(article)}
                                        >
                                            Xem chi tiết
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {selectedArticle && (
                    <ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
                )}
            </div>
        </div>
    );
};
