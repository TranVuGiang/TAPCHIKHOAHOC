import useMediaQuery from '@/hooks/useMediaQuery';
import { Bars3Icon, MagnifyingGlassIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
    const textNavbar = `text-white transition-colors duration-400 px-3 py-4 rounded-none text-base font-montserrat relative inline-block before:absolute before:bottom-3 before:left-1/2 before:translate-x-[-50%] before:w-0 before:h-[2px] before:bg-space-800 before:transition-all before:duration-300 hover:before:w-11/12`;
    const textTitle = `text-2xl font-bold text-space-300 font-montserrat`;

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // Role constants
    const ROLES = {
        CUSTOMER: 'CUSTOMER',
        AUTHOR: 'AUTHOR',
        ADMIN: 'ADMIN',
        EDITOR: 'EDITOR',
        CENSOR: 'CENSOR',
        PARTNER: 'PARTNER',
    };

    const getRoleName = (roles) => {
        if (!roles || !Array.isArray(roles)) return 'Không xác định';

        // Ưu tiên hiển thị role cao nhất
        const roleNames = {
            ADMIN: 'Quản trị viên',
            EDITOR: 'Biên tập viên',
            CENSOR: 'Kiểm duyệt',
            PARTNER: 'Đối tác quảng cáo',
            AUTHOR: 'Tác giả',
            CUSTOMER: 'Người dùng',
        };

        // Tìm role cao nhất trong array roles
        for (const roleKey of Object.keys(roleNames)) {
            if (roles.includes(roleKey)) {
                return roleNames[roleKey];
            }
        }
        return 'Khong xac dinh';
    };

    const getMenuNavbar = (roles) => {
        if (!roles || !Array.isArray(roles)) return [];

        if (roles.includes(ROLES.PARTNER)) {
            return [{ label: 'Quảng cáo', path: '/home/adver_dashboard' }];
        }
        if (roles.includes(ROLES.CENSOR)) {
            return [{ label: 'Kiểm duyệt', path: '/home/censor_dashboard' }];
        }
        if (roles.includes(ROLES.ADMIN)) {
            return [{ label: 'Quản trị viên', path: '/home/admin' }];
        }
        if (roles.includes(ROLES.EDITOR)) {
            return [{ label: 'Biên tập viên', path: '/home/editor_dashboard' }];
        }
        if (roles.includes(ROLES.AUTHOR)) {
            return [{ label: 'Gửi bài Online', path: '/home/TacGiaDashboard/' }];
        }
    };

    const getMenuItems = (roles) => {
        if (!roles || !Array.isArray(roles)) return [];

        // Kiểm tra role cao nhất
        if (roles.includes(ROLES.ADMIN)) {
            return [
                { label: 'Admin Dashboard', path: '/home/admin' },
                { label: 'Hồ sơ của tôi', path: '/home/profile_user' },
                { label: 'Bài viết đã lưu', path: '/saved-posts' },
                { label: 'Lịch sử đọc', path: '/reading-history' },
            ];
        }
        if (roles.includes(ROLES.EDITOR)) {
            return [
                { label: 'Bài viết mới', path: '/home/editor_dashboard' },
                { label: 'Bài viết đang xử lý', path: '/home/editor_dashboard/bai-viet-dang-xu-ly' },
                { label: 'Thông báo', path: '/home/editor_dashboard/thong-bao' },
                { label: 'Hồ sơ của tôi', path: '/home/profile_user' },
                { label: 'Bài viết đã lưu', path: '/saved-posts' },
                { label: 'Lịch sử đọc', path: '/reading-history' },
            ];
        }
        if (roles.includes(ROLES.AUTHOR)) {
            return [
                { label: 'Bài viết của tôi', path: '/home/TacGiaDashboard/management' },
                { label: 'Tạo bài viết mới', path: '/home/TacGiaDashboard/submission' },
                { label: 'Thông báo phản biện', path: '/home/TacGiaDashboard/notifications' },
                { label: 'Hồ sơ của tôi', path: '/home/profile_user' },
                { label: 'Bài viết đã lưu', path: '/saved-posts' },
                { label: 'Lịch sử đọc', path: '/reading-history' },
            ];
        }
        // Default menu for USER role
        return [
            { label: 'Hồ sơ của tôi', path: '/home/profile_user' },
            { label: 'Bài viết đã lưu', path: '/home/profile_user' },
            { label: 'Lịch sử đọc', path: '/home/profile_user' },
        ];
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser !== null) {
            const parsedUser = JSON.parse(storedUser);

            // Chuyển đổi roles object thành array
            const rolesArray = Object.values(parsedUser.roles);
            setUser({
                ...parsedUser,
                roles: rolesArray, // Lưu roles dưới dạng array
            });
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        navigate('/home/login');
    };

    const handleNavigation = (path) => {
        if (!user) {
            alert('Vui lòng đăng nhập để tiếp tục!');
            return;
        }
        navigate(path);
    };
    return (
        <header className="relative">
            {/* Logo/Title Section */}
            <div className="py-6 text-center">
                <h2 className="text-4xl font-bold font-montserrat text-space-200">TẠP CHÍ</h2>
                <h2 className={`${textTitle}`}>KHOA HỌC & CÔNG NGHỆ</h2>
            </div>
            {/* Navigation Bar */}
            <nav className="bg-space-300 shadow-lg">
                <div className="flex items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
                    <div className="flex items-center justify-between w-full">
                        {/* Main Navigation Links - Desktop */}
                        {isAboveMediumScreens ? (
                            <div
                                className={`flex-1 flex ${!showSearch ? 'items-center justify-center' : 'items-center justify-center'}`}
                            >
                                <div className={`flex ${showSearch ? 'space-x-4' : 'space-x-4'}`}>
                                    <Link to="/" className={`${textNavbar}`}>
                                        Trang chủ
                                    </Link>
                                    <Link to="/home/introduce" className={`${textNavbar}`}>
                                        Giới thiệu
                                    </Link>
                                    <Link to="/home/danhmuc" className={`${textNavbar}`}>
                                        Danh mục
                                    </Link>
                                    {user &&
                                        getMenuNavbar(user.roles).map((item, index) => (
                                            <Link key={index} to={item.path} className={`${textNavbar}`}>
                                                {item.label}
                                            </Link>
                                        ))}
                                    <Link
                                        to={user ? '/home/option_advertisement' : '#'}
                                        className={`${textNavbar}`}
                                        onClick={() => {
                                            handleNavigation('/home/option_advertisement');
                                        }}
                                    >
                                        Khác
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <button className="rounded-full p-2" onClick={() => setIsMenuToggled(!isMenuToggled)}>
                                <Bars3Icon className="h-7 w-7 text-white" />
                            </button>
                        )}

                        {/* Search and Login */}
                        <div className="flex items-center space-x-3">
                            {/* Search Icon */}
                            <div className="relative flex justify-center items-center">
                                <button
                                    onClick={() => setShowSearch(!showSearch)}
                                    className="text-white hover:text-gray-200 transition-colors z-10"
                                >
                                    {!showSearch ? (
                                        <MagnifyingGlassIcon className="h-6 w-6 text-white hover:text-space-200 transition duration-300" />
                                    ) : (
                                        <XMarkIcon className="h-6 w-6 text-space-200 hover:text-space-200" />
                                    )}
                                </button>

                                {/* Search Input */}
                                {showSearch && (
                                    <div className="absolute right-0 w-48">
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm..."
                                            className="w-full pl-10 pr-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-space-200"
                                        />
                                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                    </div>
                                )}
                            </div>

                            {/* User Icon with Dropdown */}
                            <div className="group relative">
                                {/* User Icon */}
                                {user ? (
                                    <div className="flex items-center space-x-2 cursor-pointer">
                                        <UserIcon className="h-6 w-6 text-white group-hover:text-space-200 transition duration-300" />
                                        <span className="text-white group-hover:text-space-200 transition duration-300">
                                            {user.fullname}
                                        </span>
                                    </div>
                                ) : (
                                    <Link
                                        to="/home/login"
                                        className="flex items-center space-x-2 group-hover:text-space-200 transition duration-300"
                                    >
                                        <UserIcon className="h-6 w-6 text-white group-hover:text-space-200 transition duration-300" />
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                {user && (
                                    <div
                                        className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-xl z-50 
                                            invisible transform scale-95 translate-y-2 
                                            group-hover:visible group-hover:translate-y-0 group-hover:scale-100
                                            transition-all duration-200 ease-in-out"
                                    >
                                        {/* User Info Section */}
                                        <div className="px-4 py-2 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-700">{user.fullname}</p>
                                            <p className="text-xs text-gray-500">{getRoleName(user.roles)}</p>
                                        </div>

                                        {/* Menu Items Based on Role */}
                                        <div className="py-1">
                                            {getMenuItems(user.roles).map((item, index) => (
                                                <Link
                                                    key={index}
                                                    to={item.path}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-space-200 
                                                                hover:text-white transition-colors duration-150 
                                                                    font-montserrat"
                                                >
                                                    {item.label}
                                                </Link>
                                            ))}
                                        </div>

                                        {/* Logout Button */}
                                        <div className="border-t border-gray-100">
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 
                                                    hover:bg-red-50 transition-colors duration-150"
                                            >
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Modal */}
            {!isAboveMediumScreens && isMenuToggled && (
                <div className="fixed right-0 bottom-0 z-40 h-full w-3/4 bg-space-300 drop-shadow-xl transition-transform transform">
                    {/* Close Icon */}
                    <div className="flex justify-end p-4">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            <XMarkIcon className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="flex flex-col gap-6 pl-6">
                        <Link to="/" className="text-white hover:text-space-200 text-lg">
                            Trang chủ
                        </Link>
                        <Link to="/home/introduce" className="text-white hover:text-space-200 text-lg">
                            Giới thiệu
                        </Link>
                        <Link to="/home/danhmuc" className="text-white hover:text-space-200 text-lg">
                            Danh mục
                        </Link>
                        {user &&
                            getMenuNavbar(user.roles).map((item, index) => (
                                <Link key={index} to={item.path} className={`${textNavbar}`}>
                                    {item.label}
                                </Link>
                            ))}
                        <Link to="/advertisement" className="text-white hover:text-space-200 text-lg">
                            Khác
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
