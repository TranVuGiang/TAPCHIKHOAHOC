import { SuccessDialog } from '@/components/modalDialog';
import { authService } from '@/utils/authService';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { AlertCircle, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import PermissionManagementPopup from './capquyen';

export const RenderUserManagement = () => {
    const [users, setUsers] = useState([]);
    const [users2, setUsers2] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [isListening, setIsListening] = useState(false);
    const [pagination, setPagination] = useState({
        pageNumber: 0,
        totalPage: 0,
        pageSize: 6,
        totalElements: 0,
    });
    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        if (current === null || undefined) {
            return;
        }
        const token = current.token;
        setIsLoading(true);
        setErrorMessage('');
        try {
            const resp = await authService.loadUserByAdmin({ token: token });
            const resp2 = await authService.loadUserByAdminPhanTrang(token, 0, resp.data.phantrang.totalElements);
            setUsers(resp.data.data);
            setUsers2(resp2.data.data);
            setPagination({
                ...resp.data.phantrang,
                pageNumber: 0,
            });
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message || 'Đã có lỗi xảy ra khi tải danh sách người dùng');
        } finally {
            setIsLoading(false);
        }
    };

    const loadUserPhanTrang = async (page, size) => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        if (current === null || undefined) {
            return;
        }
        const token = current.token;
        setIsLoading(true);
        setErrorMessage('');
        try {
            const response = await authService.loadUserByAdminPhanTrang(token, page, size);
            setUsers(response.data.data);
            setPagination((prevState) => ({
                ...prevState,
                pageNumber: page,
            }));
        } catch (error) {
            setErrorMessage(error.message || 'Đã có lỗi xảy ra khi tải trang');
        } finally {
            setIsLoading(false);
        }
    };


    const handleUpadteStatusUser = async (status, taikhoanId) => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        if (!current) {
            return;
        }
        const token = current.token;

        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await authService.updateStatusUser({
                token: token,
                status: status,
                taikhoanId: taikhoanId,
            });

            setUsers((prevUsers) =>
                prevUsers.map((user) => (user.taikhoanId === taikhoanId ? { ...user, status } : user)),
            );

            setSuccessMessage('Cập nhật trạng thái người dùng thành công');
            setIsSuccess(true);
        } catch (error) {
            setErrorMessage(error.message || 'Không thể cập nhật trạng thái người dùng');
        } finally {
            setIsLoading(false);
        }
    };

    const StatusSelect = ({ currentStatus, onChange }) => {
        // Nếu status khác 0, chỉ hiển thị 2 trạng thái
        const statusOptions =
            currentStatus === '0'
                ? [
                      { value: '0', label: 'Chờ xét duyệt', color: 'bg-yellow-100 text-yellow-800' },
                      { value: '1', label: 'Đang hoạt động', color: 'bg-green-100 text-green-800' },
                      { value: '-1', label: 'Không hoạt động', color: 'bg-red-100 text-red-800' },
                  ]
                : [
                      { value: '1', label: 'Đang hoạt động', color: 'bg-green-100 text-green-800' },
                      { value: '-1', label: 'Không hoạt động', color: 'bg-red-100 text-red-800' },
                  ];

        return (
            <select
                className={`w-48 p-2 border rounded-full 
                    ${statusOptions.find((opt) => opt.value === currentStatus)?.color || ''}`}
                value={currentStatus}
                onChange={(e) => onChange(e.target.value)}
            >
                {statusOptions.map((status) => (
                    <option key={status.value} value={status.value} className={status.color}>
                        {status.label}
                    </option>
                ))}
            </select>
        );
    };

    const LoadingSpinner = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
            </div>
        );
    };

    const handlePreviousPage = () => {
        if (pagination.pageNumber > 0) {
            loadUserPhanTrang(pagination.pageNumber - 1, '6');
        }
    };

    const handleNextPage = () => {
        if (pagination.pageNumber < pagination.totalPage - 1) {
            loadUserPhanTrang(pagination.pageNumber + 1, '6');
        }
    };

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [permissions, setPermissions] = useState([]);

    // const handleRemovePermission = (permissionToRemove) => {
    //     setPermissions(permissions.filter((p) => p.code !== permissionToRemove.code));
    // };

    const filteredUsers = searchQuery
        ? users2.filter((user) => {
              const matchesSearch =
                  user.hovaten.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  user.email.toLowerCase().includes(searchQuery.toLowerCase());
              return matchesSearch;
          })
        : users;

    const handleVoiceSearch = () => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'vi-VN';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.start();
            setIsListening(true);

            recognition.onresult = (event) => {
                const result = event.results[0][0].transcript;
                setSearchQuery(result);
                setIsListening(false);
            };

            recognition.onerror = (error) => {
                console.error('Speech recognition error:', error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };
        } else {
            alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói!');
        }
    };

    return (
        <div className="p-6">
            {isLoading && <LoadingSpinner />}
            <PermissionManagementPopup
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                currentPermissions={permissions}
            />
            <SuccessDialog
                isOpen={isSuccess}
                onClose={() => {
                    setIsSuccess(false);
                    setSuccessMessage('');
                }}
                title={successMessage || 'Thay đổi thành công'}
                titleButton={'Tiếp tục'}
            />

            {/* Error Dialog */}
            {errorMessage && (
                <div className="absolute top-0 right-0 m-4 z-50">
                    <div
                        className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative flex items-center"
                        role="alert"
                    >
                        <AlertCircle className="mr-3 text-red-500" size={24} />
                        <span className="block sm:inline">{errorMessage}</span>
                        <button onClick={() => setErrorMessage('')} className="ml-4 text-red-500 hover:text-red-700">
                            <span className="text-2xl">&times;</span>
                        </button>
                    </div>
                </div>
            )}
            <div className="relative flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                {/* Icon tìm kiếm */}
                <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />

                {/* Ô tìm kiếm */}
                <input
                    type="text"
                    placeholder="Tìm kiếm tiêu đề hoặc mô tả..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    className="w-full pl-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                />

                {/* Nút voice search */}
                <button
                    onClick={handleVoiceSearch}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                        isListening ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
                    } text-white shadow-md`}
                    disabled={isListening}
                >
                    {isListening ? <MicrophoneIcon className="w-5 h-5" /> : <MicrophoneIcon className="w-5 h-5" />}
                </button>
            </div>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Tên Đăng Nhập</th>
                            <th className="p-3 text-left">Họ Và Tên</th>
                            <th className="p-3 text-left">Số Điện Thoại</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-center">Cấp quyền</th>
                            <th className="p-3 text-center">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers
                            .slice() // Tạo một bản sao để tránh sửa đổi trực tiếp mảng ban đầu
                            .sort((a, b) => a.taikhoanId - b.taikhoanId) // Sắp xếp theo taikhoanId tăng dần
                            .map((user) =>
                                user.roles.some((current) => current.roles !== 'ADMIN') ? (
                                    <tr key={user.taikhoanId} className="border-b hover:bg-gray-50">
                                        <td className="p-3">{user.taikhoanId}</td>
                                        <td className="p-3">{user.username}</td>
                                        <td className="p-3">{user.hovaten}</td>
                                        <td className="p-3">{user.sdt}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => {
                                                    setIsPopupOpen(true);
                                                    setPermissions(user);
                                                }}
                                            >
                                                Xem
                                            </button>
                                        </td>

                                        <td className="p-3">
                                            <StatusSelect
                                                currentStatus={user.status}
                                                onChange={(newStatus) => {
                                                    handleUpadteStatusUser(newStatus, user.taikhoanId);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                ) : null,
                            )}
                    </tbody>
                </table>

                {/* Phân trang */}
                <div className="flex justify-center items-center space-x-2 p-4">
                    {/* Nút Previous */}
                    <button
                        onClick={handlePreviousPage}
                        disabled={isLoading || pagination.pageNumber === 0}
                        className={`
                            p-2 border rounded-l 
                            transition duration-200 ease-in-out
                            flex items-center justify-center
                            ${
                                pagination.pageNumber === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-blue-500 hover:bg-blue-100'
                            }
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Các nút số trang */}
                    {[...Array(parseInt(pagination.totalPage))].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => loadUserPhanTrang(index, '6')}
                            disabled={isLoading}
                            className={`
                                px-4 py-2 border 
                                transition duration-200 ease-in-out 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                active:scale-95 active:bg-blue-600 active:text-white
                                ${
                                    // Modify this condition to explicitly check for page 0 on initial load
                                    pagination.pageNumber === index
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'bg-white text-blue-500 hover:bg-blue-100 hover:shadow-sm'
                                }
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Nút Next */}
                    <button
                        onClick={handleNextPage}
                        disabled={isLoading || pagination.pageNumber === pagination.totalPage - 1}
                        className={`
                            p-2 border rounded-r 
                            transition duration-200 ease-in-out
                            flex items-center justify-center
                            ${
                                pagination.pageNumber === pagination.totalPage - 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-blue-500 hover:bg-blue-100'
                            }
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};
