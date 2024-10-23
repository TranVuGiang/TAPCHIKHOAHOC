import { CheckCircle, Edit2, Search, XCircle } from 'lucide-react';
import { useState } from 'react';

const EditorDashboard = () => {
    const [activeTab, setActiveTab] = useState('pending');
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedReviewer, setSelectedReviewer] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');
    const [articleStatus, setArticleStatus] = useState('');
    const [revisionComments, setRevisionComments] = useState('');

    // Mock data
    const articles = [
        {
            id: 1,
            title: "Nghiên cứu về kinh tế số",
            author: "Nguyễn Văn A",
            submittedDate: "2024-10-15",
            status: "pending",
            category: "Kinh tế",
            abstract: "Tóm tắt về nghiên cứu kinh tế số...",
            keywords: ["kinh tế số", "công nghệ", "phát triển"]
        },
        {
            id: 2,
            title: "Phát triển bền vững trong ASEAN",
            author: "Trần Thị B",
            submittedDate: "2024-10-16",
            status: "reviewing",
            category: "Chính trị",
            abstract: "Nghiên cứu về phát triển bền vững...",
            keywords: ["ASEAN", "phát triển bền vững"]
        }
    ];

    const reviewers = [
        { id: 1, name: "TS. Phạm Văn X", expertise: "Kinh tế học", currentLoad: 2 },
        { id: 2, name: "PGS.TS. Lê Thị Y", expertise: "Chính trị học", currentLoad: 1 },
        { id: 3, name: "TS. Trần Văn Z", expertise: "Công nghệ", currentLoad: 3 }
    ];

    const handleAssignReviewer = (articleId, reviewerId) => {
        setSelectedArticle(articles.find(article => article.id === articleId));
        setSelectedReviewer(reviewerId);
        setShowNotificationModal(true);
    };

    const handleSendNotification = () => {
        // Logic to send notification
        console.log(`Assigned reviewer ${selectedReviewer} to article ${selectedArticle.id}`);
        console.log(`Notification: ${notificationMessage}`);
        setShowNotificationModal(false);
        setNotificationMessage('');
    };

    const handleStatusChange = (article, status) => {
        setSelectedArticle(article);
        setArticleStatus(status);
        setShowStatusModal(true);
    };

    const handleSendStatusUpdate = () => {
        // Logic to send status update notification
        console.log(`Status update for article ${selectedArticle.id}: ${articleStatus}`);
        console.log(`Comments: ${revisionComments}`);
        setShowStatusModal(false);
        setRevisionComments('');
        setArticleStatus('');
    };

    const getStatusButtonClass = (type) => {
        switch(type) {
            case 'accept':
                return 'bg-green-100 text-green-700 hover:bg-green-200';
            case 'reject':
                return 'bg-red-100 text-red-700 hover:bg-red-200';
            case 'revise':
                return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
            default:
                return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 font-montserrat">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="mx-auto px-4 py-6">
                    <h1 className="text-3xl font-bold text-gray-900">Biên tập viên</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto px-4 py-6">
                {/* Search and Filter Bar */}
                <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài báo..."
                            className="pl-10 pr-4 py-2 border rounded-lg w-64"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    
                    <div className="flex gap-4">
                        <select className="border rounded-lg px-4 py-2">
                            <option value="">Tất cả chuyên mục</option>
                            <option value="economics">Kinh tế</option>
                            <option value="politics">Chính trị</option>
                        </select>
                        
                        <select className="border rounded-lg px-4 py-2">
                            <option value="">Tất cả trạng thái</option>
                            <option value="pending">Chờ xử lý</option>
                            <option value="reviewing">Đang kiểm duyệt</option>
                        </select>
                    </div>
                </div>

                {/* Articles List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Bài báo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tác giả
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ngày gửi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {articles.map((article) => (
                                <tr key={article.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium">{article.title}</span>
                                            <span className="text-sm text-gray-500">{article.category}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {article.author}
                                    </td>
                                    <td className="px-6 py-4">
                                        {article.submittedDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            article.status === 'pending' 
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-blue-100 text-blue-800'
                                        }`}>
                                            {article.status === 'pending' ? 'Chờ xử lý' : 'Đang kiểm duyệt'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => setSelectedArticle(article)}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                Chi tiết
                                            </button>
                                            <select 
                                                className="border rounded px-2 py-1"
                                                onChange={(e) => handleAssignReviewer(article.id, e.target.value)}
                                                value=""
                                            >
                                                <option value="">Phân công người kiểm duyệt</option>
                                                {reviewers.map(reviewer => (
                                                    <option key={reviewer.id} value={reviewer.id}>
                                                        {reviewer.name} ({reviewer.currentLoad} bài)
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="flex space-x-1">
                                                <button
                                                    onClick={() => handleStatusChange(article, 'accept')}
                                                    className={`p-1 rounded ${getStatusButtonClass('accept')}`}
                                                    title="Chấp nhận"
                                                >
                                                    <CheckCircle className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(article, 'revise')}
                                                    className={`p-1 rounded ${getStatusButtonClass('revise')}`}
                                                    title="Yêu cầu chỉnh sửa"
                                                >
                                                    <Edit2 className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleStatusChange(article, 'reject')}
                                                    className={`p-1 rounded ${getStatusButtonClass('reject')}`}
                                                    title="Từ chối"
                                                >
                                                    <XCircle className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Status Update Modal */}
                {showStatusModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 w-96">
                            <h3 className="text-lg font-medium mb-4">
                                {articleStatus === 'accept' && 'Chấp nhận bài viết'}
                                {articleStatus === 'reject' && 'Từ chối bài viết'}
                                {articleStatus === 'revise' && 'Yêu cầu chỉnh sửa'}
                            </h3>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Thông báo cho tác giả
                                </label>
                                <textarea
                                    className="w-full border rounded-lg p-2"
                                    rows="4"
                                    placeholder={
                                        articleStatus === 'accept' 
                                            ? 'Nhập thông báo chấp nhận...' 
                                            : articleStatus === 'reject'
                                            ? 'Nhập lý do từ chối...'
                                            : 'Nhập yêu cầu chỉnh sửa...'
                                    }
                                    value={revisionComments}
                                    onChange={(e) => setRevisionComments(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                    onClick={() => setShowStatusModal(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    className={`px-4 py-2 text-white rounded-lg ${
                                        articleStatus === 'accept' 
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : articleStatus === 'reject'
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-yellow-600 hover:bg-yellow-700'
                                    }`}
                                    onClick={handleSendStatusUpdate}
                                >
                                    Gửi thông báo
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notification Modal */}
                {showNotificationModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 w-96">
                            <h3 className="text-lg font-medium mb-4">Gửi thông báo</h3>
                            <textarea
                                className="w-full border rounded-lg p-2 mb-4"
                                rows="4"
                                placeholder="Nhập nội dung thông báo..."
                                value={notificationMessage}
                                onChange={(e) => setNotificationMessage(e.target.value)}
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                    onClick={() => setShowNotificationModal(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    onClick={handleSendNotification}
                                >
                                    Gửi
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Article Detail Modal */}
                {selectedArticle && !showNotificationModal && !showStatusModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 w-2/3">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-medium">Chi tiết bài báo</h3>
                                <button 
                                    onClick={() => setSelectedArticle(null)}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    <XCircle className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="space-y-4">
                            <div>
                                    <h4 className="font-medium text-gray-700">Tiêu đề</h4>
                                    <p className="mt-1">{selectedArticle.title}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700">Tác giả</h4>
                                    <p className="mt-1">{selectedArticle.author}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700">Chuyên mục</h4>
                                    <p className="mt-1">{selectedArticle.category}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700">Ngày gửi</h4>
                                    <p className="mt-1">{selectedArticle.submittedDate}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700">Tóm tắt</h4>
                                    <p className="mt-1">{selectedArticle.abstract}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700">Từ khóa</h4>
                                    <div className="mt-1 flex flex-wrap gap-2">
                                        {selectedArticle.keywords.map((keyword, index) => (
                                            <span 
                                                key={index}
                                                className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                                            >
                                                {keyword}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h4 className="font-medium text-gray-700 mb-2">Tài liệu đính kèm</h4>
                                    <div className="border rounded-lg p-4">
                                        <a 
                                            href="#" 
                                            className="flex items-center text-blue-600 hover:text-blue-800"
                                        >
                                            <svg 
                                                className="h-5 w-5 mr-2" 
                                                fill="none" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth="2" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                            >
                                                <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Tải xuống bản đầy đủ (PDF)
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                    onClick={() => setSelectedArticle(null)}
                                >
                                    Đóng
                                </button>
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    onClick={() => {
                                        setSelectedArticle(null);
                                        // Additional logic for editing if needed
                                    }}
                                >
                                    Chỉnh sửa
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default EditorDashboard;