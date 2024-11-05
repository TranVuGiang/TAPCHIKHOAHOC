import { Eye, Search, Send, Upload, UserCheck, XCircle } from 'lucide-react';
import { useState } from 'react';

const EditorDashboard = () => {
    // State Management
    const [activeTab, setActiveTab] = useState('new');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedReviewer, setSelectedReviewer] = useState('');
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [currentPdf, setCurrentPdf] = useState(null);
    const [filterReviewer, setFilterReviewer] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [feedbackType, setFeedbackType] = useState('');
    const [reviewFile, setReviewFile] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    // Mock data
    const articles = {
        new: [
            {
                id: 1,
                title: 'Nghiên cứu về kinh tế số',
                author: 'Nguyễn Văn A',
                submittedDate: '2024-10-15',
                status: 'new',
                category: 'Kinh tế',
                abstract: 'Tóm tắt về nghiên cứu kinh tế số...',
                pdfUrl: '/path/to/pdf1.pdf'
            },
            {
                id: 2,
                title: 'Phát triển bền vững trong ASEAN',
                author: 'Trần Thị B',
                submittedDate: '2024-10-16',
                status: 'new',
                category: 'Chính trị',
                pdfUrl: '/path/to/pdf2.pdf'
            },
        ],
        inProgress: [
            {
                id: 3,
                title: 'Ảnh hưởng của AI trong giáo dục',
                author: 'Lê Văn C',
                submittedDate: '2024-10-14',
                status: 'reviewing',
                reviewer: 'TS. Phạm Văn X',
                category: 'Giáo dục',
                pdfUrl: '/path/to/pdf3.pdf',
                reviewStatus: 'pending'
            },
            {
                id: 4,
                title: 'Blockchain và tương lai',
                author: 'Nguyễn Thị D',
                submittedDate: '2024-10-13',
                status: 'reviewed',
                reviewer: 'PGS.TS. Lê Thị Y',
                category: 'Công nghệ',
                pdfUrl: '/path/to/pdf4.pdf',
                reviewStatus: 'completed',
                reviewDate: '2024-10-20'
            }
        ],
        completed: [
            {
                id: 5,
                title: 'Phát triển đô thị thông minh',
                author: 'Trần Văn E',
                submittedDate: '2024-10-12',
                status: 'published',
                reviewer: 'TS. Trần Văn Z',
                category: 'Đô thị học',
                pdfUrl: '/path/to/pdf5.pdf',
                reviewStatus: 'approved',
                reviewDate: '2024-10-18',
                publishDate: '2024-10-19'
            }
        ]
    };

    const reviewers = [
        { id: 1, name: 'TS. Phạm Văn X', expertise: 'Kinh tế học', currentLoad: 2 },
        { id: 2, name: 'PGS.TS. Lê Thị Y', expertise: 'Chính trị học', currentLoad: 1 },
        { id: 3, name: 'TS. Trần Văn Z', expertise: 'Công nghệ', currentLoad: 3 }
    ];

    // Status definitions
    const articleStatuses = {
        new: { label: 'Mới', color: 'bg-green-100 text-green-800' },
        reviewing: { label: 'Đang kiểm duyệt', color: 'bg-blue-100 text-blue-800' },
        reviewed: { label: 'Đã kiểm duyệt', color: 'bg-yellow-100 text-yellow-800' },
        revision: { label: 'Cần chỉnh sửa', color: 'bg-red-100 text-red-800' },
        approved: { label: 'Đã duyệt', color: 'bg-emerald-100 text-emerald-800' },
        published: { label: 'Đã xuất bản', color: 'bg-purple-100 text-purple-800' }
    };

    // Handlers
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const handleAssignReviewer = (article) => {
        setSelectedArticle(article);
        setShowAssignModal(true);
    };

    const handleOpenFeedback = (article) => {
        setSelectedArticle(article);
        setShowFeedbackModal(true);
        setFeedbackType('');
    };

  // Updated feedback handler
  const handleSendFeedback = () => {
    if (feedbackType === 'revision' && !reviewFile) {
        alert('Vui lòng tải lên file phản hồi chi tiết');
        return;
    }

    // Simulating API call
    const formData = new FormData();
    formData.append('articleId', selectedArticle.id);
    formData.append('feedbackType', feedbackType);
    if (reviewFile) {
        formData.append('reviewFile', reviewFile);
    }

    console.log('Sending feedback:', {
        articleId: selectedArticle.id,
        type: feedbackType,
        reviewFile: reviewFile,
        date: new Date().toISOString()
    });

    // Update article status based on feedback type
    const newStatus = feedbackType === 'approve' ? 'approved' : 'revision';
    console.log(`Article ${selectedArticle.id} status updated to ${newStatus}`);

    // Reset and close modal
    setShowFeedbackModal(false);
    setFeedbackType('');
    setReviewFile(null);
};

// File change handler
const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
        setReviewFile(file);
    } else {
        alert('Vui lòng chọn file PDF');
        e.target.value = '';
    }
};

    const confirmAssignment = () => {
        if (!selectedReviewer) return;

        // Simulating API call
        console.log('Assigning reviewer:', {
            articleId: selectedArticle.id,
            reviewerId: selectedReviewer
        });

        setShowAssignModal(false);
        setSelectedReviewer('');
    };

    // Filtering and search
    const filterArticles = (articlesList) => {
        return articlesList.filter(article => {
            const matchSearch = !searchQuery ||
                article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                article.author.toLowerCase().includes(searchQuery.toLowerCase());
            const matchReviewer = !filterReviewer || article.reviewer === filterReviewer;
            const matchStatus = !filterStatus || article.status === filterStatus;
            return matchSearch && matchReviewer && matchStatus;
        });
    };

    // UI Components
    const StatusBadge = ({ status }) => {
        const statusConfig = articleStatuses[status] || articleStatuses.new;
        return (
            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${statusConfig.color}`}>
                {statusConfig.label}
            </span>
        );
    };

    const ArticleTable = ({ articles }) => (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bài viết</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tác giả</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày gửi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người kiểm duyệt</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
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
                        <td className="px-6 py-4">{article.author}</td>
                        <td className="px-6 py-4">{article.submittedDate}</td>
                        <td className="px-6 py-4">
                            <StatusBadge status={article.status} />
                        </td>
                        <td className="px-6 py-4">
                            {article.reviewer || '-'}
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex space-x-2">
                                {article.status === 'new' && (
                                    <button
                                        onClick={() => handleAssignReviewer(article)}
                                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                                    >
                                        <UserCheck className="w-4 h-4 mr-1" />
                                        Phân công
                                    </button>
                                )}
                                {article.status === 'reviewed' && (
                                    <button
                                        onClick={() => handleOpenFeedback(article)}
                                        className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 flex items-center"
                                    >
                                        <Send className="w-4 h-4 mr-1" />
                                        Gửi phản hồi
                                    </button>
                                )}
                                <button
                                    onClick={() => setCurrentPdf(article)}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 flex items-center"
                                >
                                    <Eye className="w-4 h-4 mr-1" />
                                    Xem
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

    // Modals
    const FeedbackModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Phản hồi kiểm duyệt</h3>
                    <button
                        onClick={() => setShowFeedbackModal(false)}
                        className="text-gray-400 hover:text-gray-500">
                        <XCircle className="h-6 w-6" />
                    </button>
                </div>

                {/* Article Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Thông tin bài viết</h4>
                    <p className="text-gray-900 font-medium">{selectedArticle?.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{selectedArticle?.author}</p>
                </div>

                {/* Feedback Options */}
                <div className="space-y-6">
                    {/* Decision Selection */}
                    <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-4">Quyết định kiểm duyệt</h4>
                        <div className="space-y-3">
                            {/* Approve Option */}
                            <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="radio"
                                    value="approve"
                                    checked={feedbackType === 'approve'}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <div className="ml-3">
                                    <span className="font-medium text-gray-900">Chấp nhận đăng bài</span>
                                    <p className="text-sm text-gray-500">Bài viết đạt yêu cầu và sẵn sàng xuất bản</p>
                                </div>
                            </label>

                            {/* Revision Option */}
                            <label className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                                <input
                                    type="radio"
                                    value="revision"
                                    checked={feedbackType === 'revision'}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="h-4 w-4 text-blue-600"
                                />
                                <div className="ml-3">
                                    <span className="font-medium text-gray-900">Yêu cầu chỉnh sửa</span>
                                    <p className="text-sm text-gray-500">Bài viết cần được chỉnh sửa theo góp ý</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* File Upload Section - Only shown when revision is selected */}
                    {feedbackType === 'revision' && (
                        <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3">Tải lên file phản hồi chi tiết</h4>
                            <div className="mt-2">
                                <label className="block">
                                    <div className="flex items-center justify-center w-full">
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-3 text-gray-400" />
                                                {reviewFile ? (
                                                    <p className="text-sm text-gray-500">{reviewFile.name}</p>
                                                ) : (
                                                    <>
                                                        <p className="mb-2 text-sm text-gray-500">
                                                            <span className="font-semibold">Click để tải file</span> hoặc kéo thả
                                                        </p>
                                                        <p className="text-xs text-gray-500">PDF (tối đa 10MB)</p>
                                                    </>
                                                )}
                                            </div>
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={() => setShowFeedbackModal(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={handleSendFeedback}
                        disabled={!feedbackType || (feedbackType === 'revision' && !reviewFile)}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Gửi phản hồi
                    </button>
                </div>
            </div>
        </div>
    );

    const AssignReviewerModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Phân công người kiểm duyệt</h3>
                    <button
                        onClick={() => setShowAssignModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <XCircle className="h-5 w-5" />
                    </button>
                </div>

                <div className="mb-4">
                    <p className="text-sm text-gray-600">
                        Bài viết: <span className="font-medium">{selectedArticle?.title}</span>
                    </p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Chọn người kiểm duyệt
                        </label>
                        <div className="space-y-3">
                            {reviewers.map((reviewer) => (
                                <label key={reviewer.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                                    <input
                                        type="radio"
                                        name="reviewer"
                                        value={reviewer.id}
                                        checked={selectedReviewer === reviewer.id}
                                        onChange={(e) => setSelectedReviewer(Number(e.target.value))}
                                        className="text-blue-600"
                                    />
                                    <div className="ml-3">
                                        <p className="font-medium">{reviewer.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Chuyên môn: {reviewer.expertise}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Số bài đang kiểm duyệt: {reviewer.currentLoad}
                                        </p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={() => setShowAssignModal(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={confirmAssignment}
                            disabled={!selectedReviewer}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Xác nhận phân công
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
    // Main render
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Quản lý bài viết</h1>
                <p className="mt-2 text-gray-600">Kiểm duyệt và quản lý các bài viết đã được gửi</p>
            </div>

            {/* Search and Filter Section */}
            <div className="mb-6 flex flex-wrap gap-4">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg"
                        />
                        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                >
                    <option value="">Tất cả trạng thái</option>
                    {Object.entries(articleStatuses).map(([key, { label }]) => (
                        <option key={key} value={key}>{label}</option>
                    ))}
                </select>

                <select
                    value={filterReviewer}
                    onChange={(e) => setFilterReviewer(e.target.value)}
                    className="border rounded-lg px-4 py-2"
                >
                    <option value="">Tất cả người kiểm duyệt</option>
                    {reviewers.map((reviewer) => (
                        <option key={reviewer.id} value={reviewer.name}>{reviewer.name}</option>
                    ))}
                </select>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b">
                <nav className="-mb-px flex space-x-8">
                    {[
                        { id: 'new', label: 'Mới', count: articles.new.length },
                        { id: 'inProgress', label: 'Đang xử lý', count: articles.inProgress.length },
                        { id: 'completed', label: 'Đã hoàn thành', count: articles.completed.length }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                                py-4 px-1 border-b-2 font-medium text-sm
                                ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                            `}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </nav>
            </div>

            {/* Article Table */}
            <ArticleTable articles={filterArticles(articles[activeTab])} />

            {/* Modals */}
            {showAssignModal && <AssignReviewerModal />}
            {showFeedbackModal && <FeedbackModal />}
        </div>
    );
};
export default EditorDashboard;