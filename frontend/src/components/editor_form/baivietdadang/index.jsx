function Editor_BaiVietDaDang({baiVietDaDangData}) {
    return ( 
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
     );
}

export default Editor_BaiVietDaDang;