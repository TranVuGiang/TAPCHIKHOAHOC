import { authService } from '@/utils/authService';
import { BookmarkPlus, ChevronRight, Eye, History, Lock, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const url_avatar = import.meta.env.VITE_URL_AVATAR;

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [userDetail, setUserDetail] = useState([]);
    
    useEffect(() => {
        loadDataUser();
    }, []);
    useEffect(() => {
        console.log(userDetail);
    }, [userDetail]);
    const loadDataUser = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            //console.log(token);
            
            const fetchData = await authService.getUserDetails(token);
            const informationUser = fetchData.data.user;
            setUserDetail(informationUser);
        } catch (error) {
            console.log(error.message || 'Lỗi nớ');
        }
    };
    const menuItems = [
        { id: 'profile', title: 'Hồ sơ của tôi', icon: User },
        { id: 'saved', title: 'Bài viết đã lưu', icon: BookmarkPlus },
        { id: 'history', title: 'Lịch sử đọc', icon: History },
        { id: 'viewed', title: 'Bài viết đã xem', icon: Eye },
        { id: 'security', title: 'Bảo mật tài khoản', icon: Lock },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden shadow-lg">
                                <img onError={(e) => e.target.src = url_avatar} src={userDetail.url == null || userDetail.url.trim().length == 0 ? url_avatar : (userDetail.url.trim())} alt="Avatar" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{userDetail.fullname}</h3>
                                <p className="text-gray-500">{userDetail.email}</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
                            <h3 className="text-lg font-semibold mb-4 text-gray-800">Thông tin cá nhân</h3>
                            <div className="space-y-3 text-gray-600">
                                <div className="flex justify-between pb-3 border-b">
                                    <span className="font-medium">Tài khoản:</span>
                                    <span>{userDetail.username}</span>
                                </div>
                                <div className="flex justify-between pb-3 border-b">
                                    <span className="font-medium">Số điện thoại:</span>
                                    <span>{userDetail.phone == null || userDetail.phone.trim().length == 0 ? 'Vui lòng cập nhật số điện thoại' : userDetail.phone}</span>
                                </div>
                                <div className="flex justify-between pb-3 border-b">
                                <span className="font-medium">Vai trò của bạn: </span>
                                    {userDetail.roles != null ? Object.values(userDetail.roles).join(', ') : 'Không có vai trò'}
                                   
                                </div>
                                <div className="flex justify-between pb-3 border-b">
                                    <span className="font-medium">Ngày tham gia:</span>
                                    <span>{userDetail.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'saved':
            case 'history':
            case 'viewed':
                return (
                    <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow flex justify-between items-center border border-gray-100"
                            >
                                <div>
                                    <h4 className="font-semibold text-gray-800">Bài viết #{item}</h4>
                                    <p className="text-sm text-gray-500">Ngày: 01/0{item}/2024</p>
                                </div>
                                <ChevronRight className="text-gray-400" />
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-4 space-y-4 shadow-md">
                <div className="space-y-2">
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
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
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-8">
                <header className="flex items-center justify-between mb-8">
                    <nav className="text-2xl font-bold space-x-2">
                        <Link to="/" className="text-blue-600 hover:underline">
                            Home
                        </Link>
                        <span>/</span>
                        <Link to="/user-dashboard" className="text-blue-600 hover:underline">
                            User Dashboard
                        </Link>
                    </nav>
                </header>
                <div className="bg-white rounded-lg shadow-md p-6">{renderContent()}</div>
            </div>
        </div>
    );
};

export default UserDashboard;
