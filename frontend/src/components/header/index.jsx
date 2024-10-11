import useMediaQuery from "@/hooks/useMediaQuery";
import { Bars3Icon, MagnifyingGlassIcon, UserIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from 'react';
import { Link } from 'react-router-dom';


function Header() {
    const [showSearch, setShowSearch] = useState(false);
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");
    const textNavbar = `text-white hover:text-space-200 hover:bg-space-400 transition-colors duration-400 px-3 py-4 rounded-none text-xl font-montserrat`;
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
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Main Navigation Links - Desktop */}
                        {isAboveMediumScreens ? (
                            <div className={`flex-1 flex ${!showSearch ? 'items-center justify-center' : 'items-center justify-start'}`}>
                                <div className={`flex ${showSearch ? 'space-x-2' : 'space-x-4'}`}>
                                    <Link className={`${textNavbar}`}>Trang chủ</Link>
                                    <Link className={`${textNavbar}`}>Giới thiệu</Link>
                                    <Link className={`${textNavbar}`}>Tạp chí</Link>
                                    <Link className={`${textNavbar}`}>Tin tức</Link>
                                    <Link className={`${textNavbar}`}>Liên hệ</Link>
                                    <Link className={`${textNavbar}`}>Hướng dẫn</Link>
                                </div>
                            </div>
                        ) : (
                            <button
                                className="rounded-full p-2"
                                onClick={() => setIsMenuToggled(!isMenuToggled)}
                            >
                                <Bars3Icon className="h-7 w-7 text-white" />
                            </button>
                        )}

                        {/* Search and Login */}
                        <div className="flex items-center space-x-5">
                            <div className="relative flex items-center  justify-center">
                                <button 
                                    onClick={() => setShowSearch(!showSearch)}
                                    className="text-white hover:text-gray-200 transition-colors z-10"
                                >
                                    {!showSearch ? (
                                        <MagnifyingGlassIcon className="h-7 w-7 text-white hover:text-space-200 transition duration-300 border-none"/>
                                    ) : (
                                        <XMarkIcon className="mr-2 h-5 w-5 text-space-200 hover:text-space-200" />
                                    )}
                                </button>
                                
                                {/* Search Input */}
                                <div className={`
                                    absolute right-0 
                                    transition-all duration-300 ease-in-out
                                    ${showSearch ? 'w-64 opacity-100' : 'w-0 opacity-0'}
                                `}>
                                    <input
                                        type="text"
                                        placeholder="Tìm kiếm..."
                                        className={`
                                            w-full pl-10 pr-4 py-2 
                                            text-gray-700 
                                            bg-white 
                                            border border-gray-300 
                                            rounded-lg 
                                            focus:outline-none 
                                            focus:border-space-200
                                            ${showSearch ? 'block' : 'hidden'}
                                        `}
                                    />
                                    <MagnifyingGlassIcon 
                                        className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                                    />
                                </div>
                            </div>

                            <Link to="/login" className="text-white transition-colors">
                                <UserIcon className="h-7 w-7 text-white hover:text-space-200 transition duration-300" />
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Modal */}
            {!isAboveMediumScreens && isMenuToggled && (
                <div className="fixed right-0 bottom-0 z-40 h-full w-1/2 bg-space-300 drop-shadow-xl">
                    {/* Close Icon */}
                    <div className="flex justify-end p-12">
                        <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                            <XMarkIcon className="h-6 w-6 text-white" />
                        </button>
                    </div>

                    {/* Menu Items */}
                    <div className="ml-[25%] flex flex-col gap-8 text-2xl font-montserrat">
                        <Link className="text-white hover:text-space-200">Trang chủ</Link>
                        <Link className="text-white hover:text-space-200">Giới thiệu</Link>
                        <Link className="text-white hover:text-space-200">Tạp chí</Link>
                        <Link className="text-white hover:text-space-200">Tin tức</Link>
                        <Link className="text-white hover:text-space-200">Liên hệ</Link>
                        <Link className="text-white hover:text-space-200">Hướng dẫn</Link>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;