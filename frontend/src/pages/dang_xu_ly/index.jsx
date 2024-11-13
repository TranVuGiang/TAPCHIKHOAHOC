import Editor_AddDanhMuc from '@/components/editor_form/add_danhmuc';
import Editor_BaiVietDaDang from '@/components/editor_form/baivietdadang';
import Editor_DangBaiBao from '@/components/editor_form/dangbaibao';
import Editor_Editing from '@/components/editor_form/editing';
import Editor_Notification from '@/components/editor_form/notification';
import { Bell, BookOpen, Check, FileText, Plus, Search } from 'lucide-react';
import { useState } from 'react';

function DangXuLy() {
    const [activeTab, setActiveTab] = useState("Thông báo");

    // Dummy data for each section
    const thongBaoData = [
        { id: 1, message: "Bài báo của bạn A đã được đăng.", time: "2024-11-01", type: "success" },
        { id: 2, message: "Bài báo của bạn B đã hết hạn.", time: "2024-11-05", type: "warning" },
    ];

    const dangBienTapData = [
        { id: 1, title: "Bài báo về Công nghệ A", author: "Nguyễn Văn A", status: "Đang xử lý", time: "2024-10-30" },
        { id: 2, title: "Bài báo về Khoa học B", author: "Trần Thị B", status: "Đang biên tập", time: "2024-11-01" },
    ];

    const baiVietDaDangData = [
        { id: 1, title: "Bài báo Công nghệ mới", author: "Nguyễn Văn A", status: "Đã đăng", time: "2024-10-25" },
        { id: 2, title: "Khám phá vũ trụ", author: "Trần Thị B", status: "Đã đăng", time: "2024-10-29" },
    ];

    const tabs = [
        { name: "Thông báo", icon: Bell },
        { name: "Đang biên tập", icon: FileText },
        { name: "Thêm danh mục", icon: Plus },
        { name: "Đăng bài báo", icon: BookOpen },
        { name: "Bài viết đã đăng", icon: Check }
    ];

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
                                onClick={() => setActiveTab(tab.name)}
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

                    {/* Content Display */}
                    {activeTab === "Thông báo" && (
                       <Editor_Notification thongBaoData={thongBaoData}/>
                    )}

                    {activeTab === "Đang biên tập" && (
                       <Editor_Editing dangBienTapData={dangBienTapData} />
                    )}

                    {activeTab === "Thêm danh mục" && (
                        <Editor_AddDanhMuc />
                    )}

                    {activeTab === "Đăng bài báo" && (
                       <Editor_DangBaiBao />
                    )}

                    {activeTab === "Bài viết đã đăng" && (
                       <Editor_BaiVietDaDang baiVietDaDangData={baiVietDaDangData} />
                    )}
                </div>
            </main>
        </div>
    );
}

export default DangXuLy;