import React, { useState } from 'react';
import { Search, Bell, FileText, Plus, BookOpen, Check } from 'lucide-react';

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
        <div className="flex h-screen bg-gray-50">
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
                        <div className="bg-white rounded-xl shadow-sm">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6">Thông báo gần đây</h2>
                                <div className="space-y-4">
                                    {thongBaoData.map(item => (
                                        <div 
                                            key={item.id} 
                                            className={`flex items-center justify-between p-4 rounded-lg ${
                                                item.type === 'success' ? 'bg-green-50' : 'bg-yellow-50'
                                            }`}
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className={`w-2 h-2 rounded-full ${
                                                    item.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                                                }`}></div>
                                                <span className="text-gray-700">{item.message}</span>
                                            </div>
                                            <span className="text-sm text-gray-500">{item.time}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Đang biên tập" && (
                        <div className="bg-white rounded-xl shadow-sm">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold text-gray-800 mb-6">Bài báo đang biên tập</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tiêu đề
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tác giả
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Trạng thái
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Thời gian
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Thao tác
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {dangBienTapData.map(item => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">{item.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{item.author}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.time}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                        <button className="text-indigo-600 hover:text-indigo-900">Xem</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Thêm danh mục" && (
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-xl shadow-sm">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Thêm danh mục mới</h2>
                                    <form className="space-y-6">
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Tiêu đề
                                                </label>
                                                <input
                                                    type="text"
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Nhập tiêu đề danh mục..."
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Mô tả
                                                </label>
                                                <textarea
                                                    rows="4"
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Nhập mô tả chi tiết..."
                                                ></textarea>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Tuần
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Nhập số tuần..."
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Số
                                                    </label>
                                                    <input
                                                        type="number"
                                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                        placeholder="Nhập số..."
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Link quảng cáo
                                                </label>
                                                <input
                                                    type="url"
                                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                    placeholder="Nhập link quảng cáo..."
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end space-x-4 pt-4">
                                            <button
                                                type="button"
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 border border-transparent rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Lưu danh mục
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Đăng bài báo" && (
                        <div className="max-w-3xl mx-auto">
                            <div className="bg-white rounded-xl shadow-sm">
                                <div className="p-6">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Đăng bài báo mới</h2>
                                    <form className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tiêu đề bài báo
                                            </label>
                                            <input
                                                type="text"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Nhập tiêu đề bài báo..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nội dung
                                            </label>
                                            <textarea
                                                rows="8"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Nhập nội dung bài báo..."
                                            ></textarea>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                URL
                                            </label>
                                            <input
                                                type="url"
                                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder="Nhập URL bài báo..."
                                            />
                                        </div>

                                        <div className="flex justify-end space-x-4 pt-4">
                                            <button
                                                type="button"
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                Hủy
                                            </button>
                                            <button
                                                type="submit"
                                                className="px-4 py-2 border border-transparent rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            >
                                                Đăng bài
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "Bài viết đã đăng" && (
                        <div className="bg-white rounded-xl shadow-sm">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800">Danh sách bài viết đã đăng</h2>
                                    <div className="flex space-x-2">
                                        <select className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                                            <option>Tất cả</option>
                                            <option>Tuần này</option>
                                            <option>Tháng này</option>
                                        </select>
                                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                            Xuất PDF
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full">
                                        <thead>
                                            <tr className="bg-gray-50">
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tiêu đề
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Tác giả
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Trạng thái
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Thời gian
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Thao tác
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {baiVietDaDangData.map(item => (
                                                <tr key={item.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="text-sm text-gray-500">{item.author}</div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            {item.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-500">
                                                        {item.time}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-3">
                                                            <button className="text-indigo-600 hover:text-indigo-900">Xem</button>
                                                            <button className="text-green-600 hover:text-green-900">Sửa</button>
                                                            <button className="text-red-600 hover:text-red-900">Xóa</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex items-center justify-between mt-6">
                                    <div className="text-sm text-gray-500">
                                        Hiển thị 1-10 của 20 bài viết
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Trước</button>
                                        <button className="px-4 py-2 border rounded-lg bg-indigo-600 text-white">1</button>
                                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">2</button>
                                        <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Sau</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default DangXuLy;