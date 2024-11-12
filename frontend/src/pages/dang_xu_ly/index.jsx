import React, { useState } from 'react';

function DangXuLy() {
    const [activeTab, setActiveTab] = useState("Thông báo");

    // Dummy data for each section
    const thongBaoData = [
        { id: 1, message: "Bài báo của bạn A đã được đăng.", time: "2024-11-01" },
        { id: 2, message: "Bài báo của bạn B đã hết hạn.", time: "2024-11-05" },
    ];

    const dangBienTapData = [
        { id: 1, title: "Bài báo về Công nghệ A", author: "Nguyễn Văn A", status: "Đang xử lý", time: "2024-10-30" },
        { id: 2, title: "Bài báo về Khoa học B", author: "Trần Thị B", status: "Đang biên tập", time: "2024-11-01" },
    ];

    const baiVietDaDangData = [
        { id: 1, title: "Bài báo Công nghệ mới", author: "Nguyễn Văn A", status: "Đã đăng", time: "2024-10-25" },
        { id: 2, title: "Khám phá vũ trụ", author: "Trần Thị B", status: "Đã đăng", time: "2024-10-29" },
    ];

    const tabs = ["Thông báo", "Đang biên tập", "Thêm danh mục", "Đăng bài báo", "Bài viết đã đăng"];

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-1/5 bg-indigo-800 text-white p-6">
                <h2 className="text-xl font-bold mb-8">Tạp chí</h2>
                <nav className="space-y-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            className={`block w-full text-left p-3 rounded-lg hover:bg-indigo-600 ${
                                activeTab === tab ? "bg-indigo-600" : ""
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-semibold text-indigo-700 mb-6">{activeTab}</h1>

                {/* Content Display */}
                {activeTab === "Thông báo" && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Thông báo gần đây</h2>
                        <ul className="space-y-4">
                            {thongBaoData.map(item => (
                                <li key={item.id} className="flex justify-between p-4 bg-gray-100 rounded-lg">
                                    <span className="text-gray-700">{item.message}</span>
                                    <span className="text-gray-500 text-sm">{item.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {activeTab === "Đang biên tập" && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Bài báo đang biên tập</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-gray-600">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="p-4">Tiêu đề</th>
                                        <th className="p-4">Tác giả</th>
                                        <th className="p-4">Trạng thái</th>
                                        <th className="p-4">Thời gian</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dangBienTapData.map(item => (
                                        <tr key={item.id} className="border-b border-gray-200">
                                            <td className="p-4">{item.title}</td>
                                            <td className="p-4">{item.author}</td>
                                            <td className="p-4 text-yellow-600 font-semibold">{item.status}</td>
                                            <td className="p-4">{item.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "Bài viết đã đăng" && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Danh sách bài viết đã đăng</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-gray-600">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="p-4">Tiêu đề</th>
                                        <th className="p-4">Tác giả</th>
                                        <th className="p-4">Trạng thái</th>
                                        <th className="p-4">Thời gian</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {baiVietDaDangData.map(item => (
                                        <tr key={item.id} className="border-b border-gray-200">
                                            <td className="p-4">{item.title}</td>
                                            <td className="p-4">{item.author}</td>
                                            <td className="p-4 text-green-600 font-semibold">{item.status}</td>
                                            <td className="p-4">{item.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "Thêm danh mục" && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Thêm danh mục mới</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Tiêu đề</label>
                                <input type="text" className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Mô tả</label>
                                <textarea className="w-full p-2 border rounded-lg"></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700">URL</label>
                                <input type="text" className="w-full p-2 border rounded-lg" />
                            </div>
                            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-500">Lưu</button>
                        </form>
                    </div>
                )}

                {activeTab === "Đăng bài báo" && (
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Đăng bài báo mới</h2>
                        <form className="space-y-4">
                            <div>
                                <label className="block text-gray-700">Tiêu đề</label>
                                <input type="text" className="w-full p-2 border rounded-lg" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Nội dung</label>
                                <textarea className="w-full p-2 border rounded-lg"></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-700">URL</label>
                                <input type="text" className="w-full p-2 border rounded-lg" />
                            </div>
                            <button type="submit" className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-500">Đăng bài</button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}

export default DangXuLy;
