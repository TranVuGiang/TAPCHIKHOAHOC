
const QuanLyBaiViet = () => {
    const sampleArticles = [
        {
            BaiBao_id: 1,
            TieuDe: "Nghiên cứu về kinh tế số",
            NgayDang: "2024-10-15",
            Status: 0,
            URL: "path/to/file1.pdf",
            TheLoai_id: 1
        },
        {
            BaiBao_id: 2,
            TieuDe: "Phát triển bền vững trong ASEAN",
            NgayDang: "2024-10-16",
            Status: 1,
            URL: "path/to/file2.pdf",
            TheLoai_id: 2
        }
    ];

    const getStatusText = (status) => {
        switch(status) {
            case 0: return { text: 'Đã nhận', color: 'bg-blue-100 text-blue-800' };
            case 1: return { text: 'Đang duyệt', color: 'bg-yellow-100 text-yellow-800' };
            case 2: return { text: 'Đã duyệt', color: 'bg-green-100 text-green-800' };
            case 3: return { text: 'Đã đăng', color: 'bg-purple-100 text-purple-800' };
            default: return { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Quản Lý Bài Viết</h2>
            <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tiêu đề
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ngày đăng
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Tệp PDF
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {sampleArticles.map((article) => {
                            const status = getStatusText(article.Status);
                            return (
                                <tr key={article.BaiBao_id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {article.BaiBao_id}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-900">
                                        {article.TieuDe}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {article.NgayDang}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                                            {status.text}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <a 
                                            href={article.URL} 
                                            className="text-blue-600 hover:text-blue-900 hover:underline"
                                        >
                                            Xem PDF
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuanLyBaiViet;