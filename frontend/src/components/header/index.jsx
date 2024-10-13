import useMediaQuery from '@/hooks/useMediaQuery';
import { Bars3Icon, MagnifyingGlassIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)');
    const textNavbar = `text-white transition-colors duration-400 px-3 py-4 rounded-none text-base font-montserrat relative inline-block before:absolute before:bottom-3 before:left-1/2 before:translate-x-[-50%] before:w-0 before:h-[2px] before:bg-space-800 before:transition-all before:duration-300 hover:before:w-11/12`;
    const textTitle = `text-3xl font-bold text-space-200`;

    return (
        <header className="relative">
            {/* Logo/Title Section */}
            <div className="py-6 text-center">
                <h2 className={`${textTitle}`}>TẠP CHÍ</h2>
                <h2 className={`${textTitle}`}>KHOA HỌC VÀ CÔNG NGHỆ</h2>
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
                                    <Link to="/gioi-thieu" className={`${textNavbar}`}>
                                        Giới thiệu
                                    </Link>
                                    <Link to="/quy-dinh" className={`${textNavbar}`}>
                                        Quy định - Hướng dẫn
                                    </Link>
                                    <Link to="/hoi-dong" className={`${textNavbar}`}>
                                        Hội đồng biên tập
                                    </Link>
                                    <Link to="/submitForm" className={`${textNavbar}`}>
                                        Gửi bài Online
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

                            {/* User Icon */}
                            <Link to="/login" className="text-white hover:text-space-200 transition-colors">
                                <UserIcon className="h-6 w-6 text-white hover:text-space-200 transition duration-300" />
                            </Link>
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
                        <Link to="/gioi-thieu" className="text-white hover:text-space-200 text-lg">
                            Giới thiệu
                        </Link>
                        <Link to="/quy-dinh" className="text-white hover:text-space-200 text-lg">
                            Quy định - Hướng dẫn
                        </Link>
                        <Link to="/hoi-dong" className="text-white hover:text-space-200 text-lg">
                            Hội đồng biên tập
                        </Link>
                        <Link to="/gui-bai" className="text-white hover:text-space-200 text-lg">
                            Gửi bài Online
                        </Link>
                        <Link to="/tin-tuc" className="text-white hover:text-space-200 text-lg">
                            Tin tức
                        </Link>
                        <Link to="/lien-he" className="text-white hover:text-space-200 text-lg">
                            Liên hệ
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
