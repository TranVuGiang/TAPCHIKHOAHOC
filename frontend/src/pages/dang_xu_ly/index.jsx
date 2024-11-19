import Editor_AddDanhMuc from '@/components/editor_form/add_danhmuc';
import Editor_BaiVietDaDang from '@/components/editor_form/baivietdadang';
import Editor_DangBaiBao from '@/components/editor_form/dangbaibao';
import Editor_Editing from '@/components/editor_form/editing';
import Editor_Notification from '@/components/editor_form/notification';
import { Bell, BookOpen, Check, FileText, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function DangXuLy() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { name: "Thông báo", icon: Bell, path: '/home/editor_dashboard/notifications', component: Editor_Notification },
        { name: "Đang biên tập", icon: FileText, path: '/home/editor_dashboard/editing', component: Editor_Editing },
        { name: "Thêm danh mục", icon: Plus, path: '/home/editor_dashboard/add-category', component: Editor_AddDanhMuc },
        { name: "Đăng bài báo", icon: BookOpen, path: '/home/editor_dashboard/publish-article', component: Editor_DangBaiBao },
        { name: "Bài viết đã đăng", icon: Check, path: '/home/editor_dashboard/published-articles', component: Editor_BaiVietDaDang }
    ];

    const [activeTab, setActiveTab] = useState(tabs.find(tab => location.pathname.includes(tab.path))?.name || "Thông báo");

    const renderContent = () => {
        const currentTab = tabs.find(tab => location.pathname.includes(tab.path));
        
        if (currentTab) {
            const Component = currentTab.component;
            return <Component />;
        }
        
        return (
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Chào mừng bạn đến với trang tác giả</h1>
                <p className="text-gray-600">
                    Bạn có thể gửi bài viết mới, quản lý bài viết hiện có hoặc xem thông báo từ menu bên trái.
                </p>
            </div>
        );
    };
   
    const handleTabClick = (tabName) => {
        const selectedTab = tabs.find(tab => tab.name === tabName);
        if (selectedTab) {
            setActiveTab(tabName);
            navigate(selectedTab.path);
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 font-montserrat">
            {/* Sidebar */}
            <aside className="w-64 bg-indigo-800 text-white">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-8 flex items-center">
                        <BookOpen className="mr-2" />
                        Tạp chí
                    </h2>
                    <nav className="space-y-2">
                        {tabs.map(tab => (
                            <button
                                key={tab.name}
                                className={`flex items-center w-full px-4 py-3 rounded-lg transition-all ${
                                    activeTab === tab.name 
                                    ? "bg-indigo-600 text-white" 
                                    : "text-indigo-100 hover:bg-indigo-700"
                                }`}
                                onClick={() => handleTabClick(tab.name)}
                            >
                                <tab.icon className="w-5 h-5 mr-3" />
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">{activeTab}</h1>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                            </div>
                        </div>
                    </header>

                    {renderContent()}
                </div>
            </main>
        </div>
    );
}

export default DangXuLy;