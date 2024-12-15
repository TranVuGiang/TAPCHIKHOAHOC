import { X } from 'lucide-react';

const ArticleDetailModal = ({ article, onClose }) => {
    const STATUS_CONFIG = {
        0: { text: 'Bị hạn chế', color: 'bg-blue-100 text-blue-800' },
        1: { text: 'Chờ xử lý', color: 'bg-orange-100 text-orange-800' },
        2: { text: 'Đang duyệt', color: 'bg-yellow-100 text-yellow-800' },
        3: { text: 'Đã duyệt', color: 'bg-green-100 text-green-800' },
        4: { text: 'Chấp nhận', color: 'bg-emerald-100 text-emerald-800' },
        5: { text: 'Cần chỉnh sửa', color: 'bg-amber-100 text-amber-800' },
        6: { text: 'Không chấp nhận', color: 'bg-red-100 text-red-800' },
        7: { text: 'Đã đăng', color: 'bg-purple-100 text-purple-800' },
    };

    const status = STATUS_CONFIG[article.status] || {
        text: 'Không xác định',
        color: 'bg-gray-100 text-gray-800',
    };

    const parseStatusHistory = (lichsu) => {
        if (!lichsu) return [];

        const histories = lichsu.replace(/,$/, '').split('],[');

        return histories.map((history) => {
            const cleanHistory = history.replace(/^\[|\]$/g, '');
            const [statusPart, timestamp] = cleanHistory.split(':');

            // Only extract the date part (assuming timestamp format is like "2023-12-15 10:30:45")
            const dateOnly = timestamp ? timestamp.split(' ')[0] : '';

            const statusCode = parseInt(statusPart);
            const statusInfo = STATUS_CONFIG[statusCode] || {
                text: 'Không xác định',
                color: 'bg-gray-100 text-gray-800',
            };

            return {
                statusCode,
                statusText: statusInfo.text,
                statusColor: statusInfo.color,
                timestamp: dateOnly,
            };
        });
    };

    const statusHistory = parseStatusHistory(article.lichsu);


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-3xl font-extrabold text-gray-900">Chi Tiết Bài Báo</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
                    >
                        <X size={28} strokeWidth={2} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-6">
                    {/* Article Information Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500 mb-1">Mã Bài Báo</p>
                                <p className="text-lg font-semibold text-gray-900">{article.id}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500 mb-1">Tiêu Đề</p>
                                <p className="text-lg font-semibold text-gray-900">{article.tieude}</p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500 mb-1">Trạng Thái</p>
                                <span
                                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${status.color}`}
                                >
                                    {status.text}
                                </span>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500 mb-1">Ngày Tạo</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {article.ngaytao?.trim() || 'Không có thông tin'}
                                </p>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-medium text-gray-500 mb-1">Ngày Đăng</p>
                                <p className="text-lg font-semibold text-gray-900">
                                    {article.ngaydang?.trim() || 'Chưa phát hành'}
                                </p>
                            </div>

                            {/* Conditional Engagement Metrics */}
                            {(article.luotthich !== '0' || article.luotxem !== '0' || article.luotcmt !== null) && (
                                <div className="bg-gray-50 p-4 rounded-lg grid grid-cols-3 gap-2">
                                    {article.luotthich !== '0' && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Lượt Thích</p>
                                            <p className="text-lg font-semibold">{article.luotthich}</p>
                                        </div>
                                    )}
                                    {article.luotxem !== '0' && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Lượt Xem</p>
                                            <p className="text-lg font-semibold">{article.luotxem}</p>
                                        </div>
                                    )}
                                    {article.luotcmt !== null && (
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Bình Luận</p>
                                            <p className="text-lg font-semibold">{article.luotcmt}</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500 mb-2">Nội Dung</p>
                        <div
                            className="text-gray-800 prose max-w-full"
                            dangerouslySetInnerHTML={{ __html: article.noidung }}
                        />
                    </div>

                    {/* Attached Files */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500 mb-2">Tệp Đính Kèm</p>
                        {article.file ? (
                            <a
                                href={article.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                            >
                                Xem Tệp Đính Kèm
                            </a>
                        ) : (
                            <p className="text-gray-500">Không có tệp đính kèm</p>
                        )}
                    </div>

                    {/* Status History */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-500 mb-3">Lịch Sử Trạng Thái</p>
                        {statusHistory.length > 0 ? (
                            <div className="space-y-2">
                                {statusHistory.map((historyItem, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm"
                                    >
                                        <span className={`px-2 py-1 rounded-full text-xs ${historyItem.statusColor}`}>
                                            {historyItem.statusText}
                                        </span>
                                        <span className="text-gray-600 text-sm">{historyItem.timestamp}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">Không có lịch sử trạng thái</p>
                        )}
                    </div>

                    {/* Reviewer Notes (if applicable) */}
                    {(article.status === 4 || article.status === 5 || article.status === 6) && article.kiemduyet && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm font-medium text-gray-500 mb-2">Ghi Chú Kiểm Duyệt</p>
                            {article.kiemduyet.map((item) => (
                                <div key={item.id} className="mb-2">
                                    <p className="text-gray-800 font-semibold">{item.taikhoan.hovaten}</p>
                                    <p className="text-gray-600">{item.ghichu}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ArticleDetailModal;
