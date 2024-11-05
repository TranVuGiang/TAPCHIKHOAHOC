import { AlertCircle, Check, FileText, X } from 'lucide-react';

const ArticleCard = ({ article, handleDecision, showFeedback }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <Check className="w-5 h-5 text-green-500" />;
            case 'rejected':
                return <X className="w-5 h-5 text-red-500" />;
            case 'needs_revision':
                return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            default:
                return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Đã duyệt';
            case 'rejected':
                return 'Từ chối';
            case 'needs_revision':
                return 'Cần chỉnh sửa';
            case 'pending_editor':
                return 'Chờ Editor duyệt';
            case 'pending_censor':
                return 'Chờ Censor duyệt';
            default:
                return 'Chờ duyệt';
        }
    };

    return (
        <div className="bg-white border rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                <div className="mt-1 text-sm text-gray-500">
                    ID: {article.id} | Ngày đăng: {article.date}
                </div>
            </div>

            <div className="p-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                    <div className="font-medium">Đánh giá của Editor</div>
                    <div className="mt-2 flex items-center gap-2">
                        {getStatusIcon(article.editorStatus)}
                        <span>{getStatusText(article.editorStatus)}</span>
                    </div>
                    <div className="mt-2">{article.editorFeedback}</div>
                </div>

                {showFeedback && (
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Nhận xét của kiểm duyệt viên
                        </label>
                        <textarea 
                            onChange={(e) => setFeedback(e.target.value)}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        />
                    </div>
                )}

                <div className="flex gap-4">
                    <button
                        onClick={() => handleDecision(article.id, 'approved', 'Bài viết đạt yêu cầu')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                        Chấp nhận
                    </button>
                    <button
                        onClick={() => handleDecision(article.id, 'rejected', 'Bài viết chưa đạt yêu cầu')}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Từ chối
                    </button>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
                    <FileText className="w-4 h-4" />
                    Xem PDF
                </button>
            </div>
        </div>
    );
};

export default ArticleCard;
