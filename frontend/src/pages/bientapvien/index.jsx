import React from 'react';

function Editor() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-1/5 bg-blue-900 text-white p-4">
                <h2 className="text-lg font-bold mb-6">Tạp chí</h2>
                <nav className="space-y-4">
                    <button className="block w-full text-left p-2 rounded-md hover:bg-blue-700">
                        Thông báo đang biên tập
                    </button>
                    <button className="block w-full text-left p-2 rounded-md hover:bg-blue-700">
                        Thêm danh mục
                    </button>
                    <button className="block w-full text-left p-2 rounded-md hover:bg-blue-700">
                        Đăng bài báo
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <h1 className="text-2xl font-semibold text-blue-700 mb-6">Biên tập viên</h1>
                <div className="bg-white rounded-lg shadow-lg p-6">
                    {/* Search and Filter */}
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            className="border border-gray-300 rounded-lg p-2 flex-1"
                        />
                        <select className="border border-gray-300 rounded-lg p-2">
                            <option>Tất cả trạng thái</option>
                            <option>Mới</option>
                            <option>Đang biên tập</option>
                            <option>Đã hoàn thành</option>
                        </select>
                        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">Thêm danh mục</button>
                        <button className="bg-blue-700 text-white px-4 py-2 rounded-lg">+ Đăng bài báo</button>
                    </div>

                    {/* Article List */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-gray-600">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="p-4">Bài viết</th>
                                    <th className="p-4">Tác giả</th>
                                    <th className="p-4">Ngày gửi</th>
                                    <th className="p-4">Trạng thái</th>
                                    <th className="p-4">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-200">
                                    <td className="p-4">Nghiên cứu về kinh tế số</td>
                                    <td className="p-4">Nguyễn Văn A</td>
                                    <td className="p-4">2024-10-15</td>
                                    <td className="p-4">
                                        <span className="text-green-500 font-semibold">Mới</span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-blue-600 hover:underline mr-4">Biên tập</button>
                                        <button className="text-blue-600 hover:underline">Xem</button>
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-200">
                                    <td className="p-4">Phát triển bền vững trong ASEAN</td>
                                    <td className="p-4">Trần Thị B</td>
                                    <td className="p-4">2024-10-16</td>
                                    <td className="p-4">
                                        <span className="text-green-500 font-semibold">Mới</span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-blue-600 hover:underline mr-4">Biên tập</button>
                                        <button className="text-blue-600 hover:underline">Xem</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Editor;
