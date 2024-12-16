import UserPermissionManagement from '@/components/adminComponents/capquyen';
import { RenderArticleManagement } from '@/components/adminComponents/renderBaibaoManagement';
import AdsManagement from '@/components/adminComponents/renderQuangcaoManagement';
import { RenderUserManagement } from '@/components/adminComponents/renderUserManagement';
import { RenderDashboard } from '@/components/adminComponents/thongke';
import {
    BarChart2,
    Bell,
    DollarSign,
    FileText,
    LogOut,
    Menu,
    Radio,
    Settings,
    Users,
    X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        loadToken();
    }, []);

    const loadToken = () => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        if (current === null || undefined) {
            navigate('/home/login');
        }
        setToken(current.token);
    };

    // Sample data with expanded fields
    const [users, setUsers] = useState([
        {
            id: 1,
            username: 'nhan_admin',
            password: '********',
            fullName: 'Nguyễn Thành Nhân',
            phone: '0123456789',
            email: 'tnhan123@gmail.com',
            role: 'ADMIN',
        },
        {
            id: 2,
            username: 'giang_editor',
            password: '********',
            fullName: 'Trần Vũ Giang',
            phone: '0987654321',
            email: 'vgiang123@gmail.com',
            role: 'EDITOR',
        },
    ]);

    const [articles, setArticles] = useState([
        {
            id: 1,
            title: 'Khám phá khoa học mới',
            content: 'Lorem ipsum dolor sit amet...',
            createdDate: '2024-01-01',
            publishedDate: '2024-01-02',
            file: 'science_article.pdf',
            status: 'PUBLISHED',
        },
        {
            id: 2,
            title: 'Tin nóng thể thao',
            content: 'Consectetur adipiscing elit...',
            createdDate: '2024-01-03',
            publishedDate: null,
            file: 'sports_news.docx',
            status: 'DRAFT',
        },
    ]);

    const [ads, setAds] = useState({
        pending: [
            {
                id: 1,
                title: 'Quảng cáo du lịch',
                description: 'Tour du lịch hè',
                submissionDate: '2024-01-01',
            },
        ],
        approved: [
            {
                id: 2,
                title: 'Khuyến mãi điện thoại',
                description: 'Giảm giá đến 50%',
                approvalDate: '2024-01-02',
            },
        ],
        published: [
            {
                id: 3,
                title: 'Sự kiện công nghệ',
                description: 'Triển lãm công nghệ mới',
                publishDate: '2024-01-03',
            },
        ],
    });

    const [revenue, setRevenue] = useState([
        { id: 1, source: 'Quảng cáo du lịch', amount: 1000, date: '2024-01-01' },
        { id: 2, source: 'Khuyến mãi điện thoại', amount: 1500, date: '2024-01-02' },
    ]);

    const RoleSelect = ({ currentRole, onChange }) => (
        <select className="w-full p-2 border rounded-md" value={currentRole} onChange={(e) => onChange(e.target.value)}>
            {['CUSTOMER', 'ADMIN', 'AUTHOR', 'EDITOR', 'CENSOR', 'PARTNER'].map((role) => (
                <option key={role} value={role}>
                    {role}
                </option>
            ))}
        </select>
    );

 

    const renderRevenueManagement = () => (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Quản Lý Doanh Thu</h2>
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-3 text-left">Nguồn</th>
                            <th className="p-3 text-left">Số Tiền</th>
                            <th className="p-3 text-left">Ngày</th>
                        </tr>
                    </thead>
                    <tbody>
                        {revenue.map((rev) => (
                            <tr key={rev.id} className="border-b hover:bg-gray-50">
                                <td className="p-3">{rev.source}</td>
                                <td className="p-3 font-bold text-green-600">${rev.amount}</td>
                                <td className="p-3">{rev.date}</td>
                            </tr>
                        ))}
                        <tr className="bg-gray-50 font-bold">
                            <td className="p-3">Tổng Cộng</td>
                            <td className="p-3 text-green-700">${revenue.reduce((sum, rev) => sum + rev.amount, 0)}</td>
                            <td className="p-3"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <RenderDashboard />;
            case 'capquyen':
                return <UserPermissionManagement />;
            case 'users':
                return <RenderUserManagement />;
            case 'articles':
                return <RenderArticleManagement token={token}/>;
            case 'ads':
                return <AdsManagement />;
            case 'revenue':
                return renderRevenueManagement();
            default:
                return null;
        }
    };

    const Sidebar = ({ isOpen, onClose }) => (
        <div
            className={`
      fixed inset-y-0 left-0 transform 
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
      lg:relative lg:translate-x-0 
      transition-transform duration-300 ease-in-out 
      z-30 w-72 bg-gray-800 h-full
    `}
        >
            <div className="flex items-center justify-between h-16 bg-gray-900 px-4">
                <span className="text-white text-xl font-montserrat">Quản Trị Viên</span>
                <button onClick={onClose} className="lg:hidden text-white">
                    <X className="w-6 h-6" />
                </button>
            </div>
            <nav className="mt-6">
                <div className="px-4 space-y-2">
                    {[
                        { id: 'dashboard', icon: BarChart2, label: 'Thống Kê' },
                        { id: 'capquyen', icon: Bell, label: 'Cấp quyền' },
                        { id: 'users', icon: Users, label: 'Quản Lý Người Dùng' },
                        { id: 'articles', icon: FileText, label: 'Quản Lý Bài Báo' },
                        { id: 'ads', icon: Radio, label: 'Quản Lý Quảng Cáo' },
                        { id: 'revenue', icon: DollarSign, label: 'Doanh Thu' },
                    ].map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            className={`
                flex items-center w-full px-4 py-2 rounded-lg 
                ${activeTab === id ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700'}
              `}
                            onClick={() => {
                                setActiveTab(id);
                                onClose();
                            }}
                        >
                            <Icon className="w-5 h-5 mr-3" />
                            {label}
                        </button>
                    ))}
                    <button
                        className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
                        onClick={logout}
                    >
                        <LogOut className="w-5 h-5 mr-3" />
                        Đăng Xuất
                    </button>
                </div>
            </nav>
        </div>
    );

    // ... (previous rendering methods from the previous artifact remain the same)
    const logout = () => {
        localStorage.removeItem('currentUser');
        navigate('/home/login');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-montserrat">
            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow-md">
                    <div className="flex items-center justify-between px-6 py-4">
                        <div className="flex items-center">
                            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden mr-4">
                                <Menu className="w-6 h-6" />
                            </button>
                            <h1 className="text-2xl font-bold text-gray-800">
                                {['dashboard', 'users', 'articles', 'ads', 'revenue'].find(
                                    (tab) => tab === activeTab,
                                ) === activeTab
                                    ? {
                                          dashboard: 'Thống Kê',
                                          users: 'Quản Lý Người Dùng',
                                          articles: 'Quản Lý Bài Báo',
                                          ads: 'Quản Lý Quảng Cáo',
                                          revenue: 'Doanh Thu',
                                      }[activeTab]
                                    : 'Quản Trị Viên'}
                            </h1>
                        </div>
                        <div className="flex items-center">
                            <Settings className="w-6 h-6 text-gray-600 mr-4" />
                            <span className="hidden md:inline text-gray-600">Cài Đặt</span>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <main className="flex-1 overflow-y-auto p-4">{renderContent()}</main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
