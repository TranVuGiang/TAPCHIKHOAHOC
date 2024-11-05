import PendingArticles from '@/components/pendingarticles';
import { AlertCircle, Check, FileText, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const CensorDashboard = () => {
    const [activeTab, setActiveTab] = useState('pending');
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

    useEffect(() => {
      console.log(feedback);
      
    }, [feedback])
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

   
    const ReviewedArticles = () => {
        const reviewedArticles = articles.filter(
            (article) => article.status === 'approved' || article.status === 'rejected',
        );

        return (
            <div className="space-y-6">
                {reviewedArticles.map((article) => (
                    <div key={article.id} className="bg-white border rounded-lg shadow-sm">
                        <div className="p-4 border-b">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                                {getStatusIcon(article.status)}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                                ID: {article.id} | Ngày đăng: {article.date}
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <div className="font-medium">Thông tin đánh giá</div>
                                <div className="mt-2 space-y-1 text-sm">
                                    <div>
                                        <span className="font-medium">Editor:</span> {article.editorName}
                                    </div>
                                    <div>
                                        <span className="font-medium">Nhận xét:</span> {article.editorFeedback}
                                    </div>
                                    <div>
                                        <span className="font-medium">Phản hồi Censor:</span> {article.censorFeedback}
                                    </div>
                                </div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
                                <FileText className="w-4 h-4" />
                                Xem PDF
                            </button>
                        </div>
                    </div>
                ))}

                {reviewedArticles.length === 0 && (
                    <div className="text-center py-8 text-gray-500">Chưa có bài viết nào được duyệt</div>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Kiểm Duyệt</h1>
            </div>

            <div className="mb-6">
                <div className="border-b">
                    <nav className="flex gap-4" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('pending')}
                            className={`px-1 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                                activeTab === 'pending'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Bài viết cần duyệt
                        </button>
                        <button
                            onClick={() => setActiveTab('reviewed')}
                            className={`px-1 py-4 text-sm font-medium border-b-2 whitespace-nowrap ${
                                activeTab === 'reviewed'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            Bài viết đã duyệt
                        </button>
                    </nav>
                </div>
            </div>

            <div>{activeTab === 'pending' ? <PendingArticles /> : <ReviewedArticles />}</div>
        </div>
    );
};

export default CensorDashboard;
