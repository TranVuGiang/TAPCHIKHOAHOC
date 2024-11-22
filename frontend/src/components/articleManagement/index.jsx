import { authService } from '@/utils/authService';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmissionForm from '../submissionForm';

const QuanLyBaiViet = () => {
    const [baibaos, setBaibao] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6);
    const [pageInfo, setPageInfo] = useState({
        currentPage: 0, // Số trang hiện tại (bắt đầu từ 0)
        totalPages: 1, // Tổng số trang
        totalElements: 0, // Tổng số bài báo
        size: 6, // Số bài báo mỗi trang
        isFirst: true, // Có phải trang đầu
        isLast: true, // Có phải trang cuối
        numberOfElements: 0, // Số phần tử trong trang hiện tại
    });
    useEffect(() => {
        loadDataUser();
    }, []);

    const loadDataUser = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.loadBaibaoByUser(token);

            const data = response.data;
            setBaibao(data.content);
            setPageInfo({
                currentPage: data.number, // Số trang hiện tại (bắt đầu từ 0)
                totalPages: data.totalPages, // Tổng số trang
                totalElements: data.totalElements, // Tổng số bài báo
                size: data.size, // Số bài báo mỗi trang
                isFirst: data.first, // Có phải trang đầu
                isLast: data.last, // Có phải trang cuối
                numberOfElements: data.numberOfElements, // Số phần tử trong trang hiện tại
            });
        } catch (error) {
            console.log(error.message || 'Lỗi khi tải bài viết');
        }
    };

    // Cập nhật cấu hình trạng thái với đầy đủ các trạng thái mới
    const STATUS_CONFIG = {
        0: { text: 'Đã gửi', color: 'bg-blue-100 text-blue-800' },
        1: { text: 'Chờ xử lý', color: 'bg-orange-100 text-orange-800' },
        2: { text: 'Đang duyệt', color: 'bg-yellow-100 text-yellow-800' },
        3: { text: 'Đã duyệt', color: 'bg-green-100 text-green-800' },
        4: { text: 'Đã đăng', color: 'bg-purple-100 text-purple-800' },
    };

    // Cập nhật danh sách options cho select
    const STATUS_OPTIONS = [
        { value: 'all', label: 'Tất cả' },
        { value: '0', label: 'Đã gửi' },
        { value: '1', label: 'Chờ xử lý' },
        { value: '2', label: 'Đã nhận' },
        { value: '3', label: 'Đang duyệt' },
        { value: '4', label: 'Đã duyệt' },
        { value: '5', label: 'Đã đăng' },
    ];

    // Lọc bài viết theo trạng thái
    const filteredArticles = useMemo(() => {
        if (selectedStatus === 'all') return baibaos;
        return baibaos.filter((article) => article.status === parseInt(selectedStatus));
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


    // Lấy thông tin trạng thái
    const getStatusText = (status) => {
        return STATUS_CONFIG[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    };

    const navigate = useNavigate()
    const handleUpdate = (item) => {        
        navigate('/home/TacGiaDashboard/submission',  {state : {baibao: item}})
        return(
            <SubmissionForm />
        )
    }

    // Component phân trang
    const Pagination = () => (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between items-center">
                <div>
                    <p className="text-sm text-gray-700">
                        Hiển thị <span className="font-medium">{pageInfo.numberOfElements}</span> trong{' '}
                        <span className="font-medium">{pageInfo.totalElements}</span> kết quả
                    </p>
                </div>
                {pageInfo.totalPages > 1 && (
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                                onClick={() => loadDataUser(pageInfo.currentPage - 1)}
                                disabled={pageInfo.isFirst}
                                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                    pageInfo.isFirst ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <span className="sr-only">Trang trước</span>←
                            </button>

                            {[...Array(pageInfo.totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => loadDataUser(index)}
                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                        pageInfo.currentPage === index
                                            ? 'bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                            : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => loadDataUser(pageInfo.currentPage + 1)}
                                disabled={pageInfo.isLast}
                                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                                    pageInfo.isLast ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <span className="sr-only">Trang sau</span>→
                            </button>
                        </nav>
                    </div>
                )}
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
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                ID
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Tiêu đề
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Ngày tạo
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Ngày đăng
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Trạng thái
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Tệp PDF
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                                Chỉnh sửa
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {currentItems.map((article) => {
                            const status = getStatusText(article.status);
                            console.log(article);
                            
                            return (
                                <tr key={article.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{article.id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-900">{article.tieude}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {article.ngaytao?.trim() || 'Không có ngày tạo'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {article.ngaydang?.trim() || 'Chưa phát hành'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}
                                        >
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
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <button
                                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer hover:text-space-300`}
                                            onClick={() => handleUpdate(article)}
                                        >
                                            Chỉnh sửa
                                        </button>
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
