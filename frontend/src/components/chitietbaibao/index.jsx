import { X } from 'lucide-react';

const ArticleDetailModal = ({ article, onClose }) => {
    if (!article) return null;

    // Cấu hình trạng thái bài báo
    const STATUS_CONFIG = {
        0: { text: 'Đã gửi', color: 'bg-blue-100 text-blue-800' },
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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Chi Tiết Bài Báo</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    {/* Thông tin cơ bản */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="font-semibold text-gray-600">ID Bài Báo:</p>
                            <p className="text-gray-900">{article.id}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-600">Trạng Thái:</p>
                            <span className={`px-2 py-1 rounded-full text-xs ${status.color}`}>{status.text}</span>
                        </div>
                       
                        <div>
                            <p className="font-semibold text-gray-600">Tiêu Đề:</p>
                            <p className="text-gray-900">{article.tieude}</p>
                        </div>
                        {(article.status === 4 || article.status === 5 || article.status === 6) && (
                            <div>
                                <p className="font-semibold text-gray-600">Ghi chú từ kiểm duyệt: </p>
                                <p className="text-gray-900"><strong>{article.kiemduyet.map((item) => item.ghichu)}</strong></p>
                            </div>
                        )}
                        <div>
                            <p className="font-semibold text-gray-600">Nội dung</p>
                            <p className="text-gray-900" dangerouslySetInnerHTML={{ __html: article.noidung }} />
                        </div>
                        
                        <div>
                            <p className="font-semibold text-gray-600">Ngày Tạo:</p>
                            <p className="text-gray-900">{article.ngaytao?.trim() || 'Không có thông tin'}</p>
                        </div>
                        <div>
                            <p className="font-semibold text-gray-600">Ngày Đăng:</p>
                            <p className="text-gray-900">{article.ngaydang?.trim() || 'Chưa phát hành'}</p>
                        </div>
                       
                    </div>

                    {/* Thông tin file */}
                    <div className="mt-4">
                        <p className="font-semibold text-gray-600">File Đính Kèm:</p>
                        {article.file ? (
                            <a
                                href={article.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                Xem File Đính Kèm
                            </a>
                        ) : (
                            <p className="text-gray-500">Không có file đính kèm</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleDetailModal;
