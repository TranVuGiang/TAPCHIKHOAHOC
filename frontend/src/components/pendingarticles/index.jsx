import { AlertCircle, Bell, Check, FileText, X } from "lucide-react";
import { useEffect, useState } from "react";

const PendingArticles = () => {
    const [feedback, setFeedback] = useState('')
    const [articles, setArticles] = useState([
        {
            id: 1,
            title: 'Tiến bộ mới trong công nghệ AI',
            date: '2024-10-23',
            status: 'pending_editor',
            editorFeedback: '',
            censorFeedback: '',
            editorStatus: '',
            censorStatus: '',
            pdf: 'article1.pdf',
            editorName: 'Nguyễn Văn A',
        },
        {
            id: 2,
            title: 'Phát triển bền vững tại Việt Nam',
            date: '2024-10-22',
            status: 'pending_censor',
            editorFeedback: 'Bài viết tốt, cần thêm số liệu',
            censorFeedback: '',
            editorStatus: 'needs_revision',
            censorStatus: '',
            pdf: 'article2.pdf',
            editorName: 'Trần Thị B',
        },
    ]);
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            articleId: 2,
            message: 'Bài viết mới cần phê duyệt từ Editor',
            isRead: false,
        },
    ]);
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
    const handleCensorDecision = (articleId, decision, feedback) => {
        setArticles(
            articles.map((article) => {
                if (article.id === articleId) {
                    return {
                        ...article,
                        status: decision === 'approved' ? 'approved' : 'rejected',
                        censorStatus: decision,
                        censorFeedback: feedback,
                    };
                }
                return article;
            }),
        );

        setNotifications(notifications.filter((notif) => notif.articleId !== articleId));
    };

    const pendingArticles = articles.filter((article) => article.status === 'pending_censor');
    
    useEffect(() => {
        console.log(feedback);
        
    })
    return (
        <div className="space-y-6 font-montserrat">
            {notifications.length > 0 && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <p className="text-blue-700">Bạn có {notifications.length} bài viết mới cần duyệt</p>
                </div>
            )}

            {pendingArticles.map((article) => (
                <div key={article.id} className="bg-white border rounded-lg shadow-sm">
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
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Nhận xét của kiểm duyệt viên
                            </label>
                            <textarea 
                              onChange={(e) => setFeedback(e.target.value)}
                              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleCensorDecision(article.id, 'approved', 'Bài viết đạt yêu cầu')}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Chấp nhận
                            </button>
                            <button
                                onClick={() =>
                                    handleCensorDecision(article.id, 'rejected', 'Bài viết chưa đạt yêu cầu')
                                }
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
            ))}

            {pendingArticles.length === 0 && (
                <div className="text-center py-8 text-gray-500">Không có bài viết nào cần duyệt</div>
            )}
        </div>
    );
};

export default PendingArticles