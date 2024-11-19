import { authService } from '@/utils/authService';
import { useEffect, useMemo, useState } from 'react';

const QuanLyBaiViet = () => {
    const [baibaos, setBaibao] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);

    useEffect(() => {
        loadDataUser();
    }, []); 

    const loadDataUser = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.loadBaibaoByUser(token);
            console.log(response);
            
            setBaibao(response.data.content);
        } catch (error) {
            console.log(error.message || 'Lỗi khi tải bài viết');
        }
    };

    // Cập nhật cấu hình trạng thái với đầy đủ các trạng thái mới
    const STATUS_CONFIG = {
        0: { text: 'Đã gửi', color: 'bg-blue-100 text-blue-800' },
        1: { text: 'Chờ xử lý', color: 'bg-orange-100 text-orange-800' },
        2: { text: 'Đã nhận', color: 'bg-orange-100 text-orange-800' },
        3: { text: 'Đang duyệt', color: 'bg-yellow-100 text-yellow-800' },
        4: { text: 'Đã duyệt', color: 'bg-green-100 text-green-800' },
        5: { text: 'Đã đăng', color: 'bg-purple-100 text-purple-800' }
    };

    // Cập nhật danh sách options cho select
    const STATUS_OPTIONS = [
        { value: 'all', label: 'Tất cả' },
        { value: '0', label: 'Đã gửi' },
        { value: '1', label: 'Chờ xử lý' },
        { value: '2', label: 'Đã nhận' },
        { value: '3', label: 'Đang duyệt' },
        { value: '4', label: 'Đã duyệt' },
        { value: '5', label: 'Đã đăng' }
    ];

    // Lọc bài viết theo trạng thái
    const filteredArticles = useMemo(() => {
        if (selectedStatus === 'all') return baibaos;
        return baibaos.filter(article => article.status === parseInt(selectedStatus));
    }, [baibaos, selectedStatus]);

    // Xử lý thay đổi trạng thái
    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setCurrentPage(1); // Reset về trang 1 khi thay đổi filter
    };

    // Tính toán phân trang
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredArticles.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Lấy thông tin trạng thái
    const getStatusText = (status) => {
        return STATUS_CONFIG[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    };

    // Component phân trang
    const Pagination = () => (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between items-center">
                <div>
                    <p className="text-sm text-gray-700">
                        Hiển thị <span className="font-medium">{indexOfFirstItem + 1}</span> -{' '}
                        <span className="font-medium">{Math.min(indexOfLastItem, filteredArticles.length)}</span>{' '}
                        trong <span className="font-medium">{filteredArticles.length}</span> kết quả
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <span className="sr-only">Trang trước</span>←
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => paginate(index + 1)}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                    currentPage === index + 1
                                        ? 'bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            <span className="sr-only">Trang sau</span>→
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Quản Lý Bài Viết</h2>

            {/* Status Filter */}
            <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                    Lọc theo trạng thái:
                </label>
                <select
                    id="status"
                    value={selectedStatus}
                    onChange={handleStatusChange}
                    className="mt-1 px-2 py-2 block w-48 rounded-md border-gray-300 shadow-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    {STATUS_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tiêu đề
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày tạo
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày đăng
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tệp PDF
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((article) => {
                            const status = getStatusText(article.status);
                            return (
                                <tr key={article.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{article.tieude}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {article.ngaytao?.trim() || "Không có ngày tạo"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {article.ngaydang?.trim() || 'Chưa phát hành'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                                            {status.text}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <a
                                            href={article.file}
                                            className="text-blue-600 hover:text-blue-900"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Xem
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <Pagination />
        </div>
    );
};

export default QuanLyBaiViet;