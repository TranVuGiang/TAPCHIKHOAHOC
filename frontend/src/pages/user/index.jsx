import LoadingComponent from '@/components/loading/Loading';
import { BaiVietDaXem } from '@/components/user_components/bvdacomment';
import { BaiVietDaThich } from '@/components/user_components/bvdathich';
import FromBaoMatTaiKhoan from '@/components/user_components/security';
import { authService } from '@/utils/authService';
import { BookmarkPlus, History, Lock, Menu, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const url_avatar = import.meta.env.VITE_URL_AVATAR;

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userDetail, setUserDetail] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        loadDataUser();
    }, []);

    const loadDataUser = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            if(current === null || undefined ) {
                navigate('/home/login')
            }
            const token = current.token;
            const fetchData = await authService.getUserDetails(token);
            const informationUser = fetchData.data.user;
            setUserDetail(informationUser);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message || 'Lỗi nớ');
            setIsLoading(false);
        }
    };

    const menuItems = [
        { id: 'profile', title: 'Hồ sơ của tôi', icon: User },
        { id: 'saved', title: 'Bài viết đã thích', icon: BookmarkPlus },
        { id: 'history', title: 'Bài viết đã xem', icon: History },
        { id: 'security', title: 'Bảo mật tài khoản', icon: Lock },
    ];

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setIsSidebarOpen(false); // Đóng sidebar trên mobile khi chọn tab
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden shadow-lg mx-auto md:mx-0">
                                <img
                                    onError={(e) => (e.target.src = url_avatar)}
                                    src={
                                        userDetail.url == null || userDetail.url.trim().length == 0
                                            ? url_avatar
                                            : userDetail.url.trim()
                                    }
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-xl font-bold">{userDetail.fullname}</h3>
                                <p className="text-gray-500">{userDetail.email}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin cá nhân</h3>
                            <div className="space-y-3 text-gray-600">
                                <div className="flex flex-col md:flex-row justify-between pb-3 border-b space-y-2 md:space-y-0">
                                    <span className="font-medium">Tài khoản:</span>
                                    <span>{userDetail.username}</span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between pb-3 border-b space-y-2 md:space-y-0">
                                    <span className="font-medium">Số điện thoại:</span>
                                    <span>
                                        {userDetail.phone == null || userDetail.phone.trim().length == 0
                                            ? 'Vui lòng cập nhật số điện thoại'
                                            : userDetail.phone}
                                    </span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between pb-3 border-b space-y-2 md:space-y-0">
                                    <span className="font-medium">Vai trò của bạn:</span>
                                    <span>
                                        {userDetail.roles != null
                                            ? Object.values(userDetail.roles).join(', ')
                                            : 'Không có vai trò'}
                                    </span>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between pb-3 border-b space-y-2 md:space-y-0">
                                    <span className="font-medium">Ngày tham gia:</span>
                                    <span>{userDetail.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'saved':
                return <BaiVietDaThich />;
            case 'history':
                return <BaiVietDaXem />; 
            case 'security':
                return <FromBaoMatTaiKhoan userDetail={userDetail} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-montserrat">
            {/* Mobile Menu Button */}
            <div className="md:hidden fixed top-4 left-4 z-30">
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 bg-gray-900 rounded-lg text-white"
                >
                    {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex flex-col md:flex-row">
                {/* Sidebar */}
                <aside
                    className={`
                    fixed md:static w-64 bg-gray-900 text-white h-screen z-30
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}
                >
                    <div className="p-4 space-y-4">
                        <div className="space-y-2">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => handleTabClick(item.id)}
                                        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all
                                            ${
                                                activeTab === item.id
                                                    ? 'bg-blue-600 text-white'
                                                    : 'hover:bg-gray-800 text-gray-300'
                                            }`}
                                    >
                                        <Icon size={20} />
                                        <span>{item.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-8 md:ml-0 mt-16 md:mt-0">
                    <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                        <nav className="text-xl md:text-2xl font-bold space-x-2">
                            <Link to="/" className="text-blue-600 hover:underline">
                                Home
                            </Link>
                            <span>/</span>
                            <Link to="/user-dashboard" className="text-blue-600 hover:underline">
                                User Dashboard
                            </Link>
                        </nav>
                    </header>
                    {isLoading ? (
                        <LoadingComponent />
                    ) : (
                        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">{renderContent()}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
