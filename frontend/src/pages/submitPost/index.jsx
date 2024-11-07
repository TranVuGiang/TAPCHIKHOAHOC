import QuanLyBaiviet from '@/components/articleManagement';
import NotificationComponent from '@/components/notification';
import SubmissionForm from '@/components/submissionForm';
import 'react-quill/dist/quill.snow.css';
import { Link, useLocation } from 'react-router-dom';

const TacGiaDashboard = () => {
    const location = useLocation();
    
    // Function to check if current path matches the link
    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    // Define navigation items với đường dẫn đã điều chỉnh
    const navigationItems = [
        { label: 'Tác giả', path: '/home/TacGiaDashboard' },
        { label: 'Gửi bài', path: '/home/TacGiaDashboard/submission' },
        { label: 'Quản lý bài viết', path: '/home/TacGiaDashboard/management' },
        { label: 'Thông báo', path: '/home/TacGiaDashboard/notifications' }
    ];

    const renderContent = () => {
        const path = location.pathname;
        
        if (path.includes('/submission')) {
            return <SubmissionForm />;
        } else if (path.includes('/management')) {
            return <QuanLyBaiviet />;
        } else if (path.includes('/notifications')) {
            return <NotificationComponent />;
        } else {
            return (
                <div className="p-4">
                    <h1 className="text-2xl font-bold mb-4">Chào mừng bạn đến với trang tác giả</h1>
                    <p className="text-gray-600">
                        Bạn có thể gửi bài viết mới, quản lý bài viết hiện có hoặc xem thông báo từ menu bên trái.
                    </p>
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-white font-montserrat min-h-screen">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-gray-800 text-white p-4">
                <nav>
                    <ul>
                        {navigationItems.map((item) => (
                            <li key={item.path} className="mb-2">
                                <Link 
                                    to={item.path} 
                                    className={`block p-2 rounded transition-colors duration-200
                                        ${isActiveLink(item.path) 
                                            ? 'bg-gray-700 text-white'
                                            : 'hover:bg-gray-700 hover:text-white'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Main Content với thêm transition */}
            <main className="flex-1 p-4 md:p-8 transition-all duration-300 ease-in-out">
                <div className="max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default TacGiaDashboard;