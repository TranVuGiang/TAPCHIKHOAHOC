import { CheckCircle, Edit2, Eye, FileText, Search, UserCheck, XCircle } from 'lucide-react';
import { useState } from 'react';

const EditorDashboard = () => {
    const [activeTab, setActiveTab] = useState('new');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [selectedReviewer, setSelectedReviewer] = useState('');
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [currentPdf, setCurrentPdf] = useState(null);

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
                pdfUrl: '/path/to/pdf3.pdf'
            },
        ],
    };

    const notifications = [
        {
            id: 1,
            type: 'new_submission',
            title: 'Bài viết mới',
            message: 'Nguyễn Văn A đã gửi bài viết mới: "Nghiên cứu về kinh tế số"',
            date: '2024-10-15 14:30',
        },
        {
            id: 2,
            type: 'review_complete',
            title: 'Kiểm duyệt hoàn thành',
            message: 'TS. Phạm Văn X đã hoàn thành kiểm duyệt bài viết "Ảnh hưởng của AI trong giáo dục"',
            date: '2024-10-14 16:45',
        },
    ];

    const reviewers = [
        { id: 1, name: 'TS. Phạm Văn X', expertise: 'Kinh tế học', currentLoad: 2 },
        { id: 2, name: 'PGS.TS. Lê Thị Y', expertise: 'Chính trị học', currentLoad: 1 },
        { id: 3, name: 'TS. Trần Văn Z', expertise: 'Công nghệ', currentLoad: 3 },
    ];

    const handleAssignReviewer = (articleId) => {
        setSelectedArticle(articles.new.find(article => article.id === articleId));
        setShowAssignModal(true);
    };

    const confirmAssignment = () => {
        console.log(`Assigned reviewer ${selectedReviewer} to article ${selectedArticle.id}`);
        setShowAssignModal(false);
        setSelectedReviewer('');
    };

    const handleViewPdf = (article) => {
        setCurrentPdf(article);
        setShowPdfModal(true);
    };

    const renderArticleList = (articlesList) => (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Bài viết</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tác giả</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày gửi</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {articlesList.map((article) => (
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
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleViewPdf(article)}
                                        className="text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                        <Eye className="h-4 w-4 mr-1" />
                                        Xem
                                    </button>
                                    <a
                                        href={article.pdfUrl}
                                        download
                                        className="text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                        <FileText className="h-4 w-4 mr-1" />
                                        Tải về
                                    </a>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                    ${article.status === 'new' ? 'bg-green-100 text-green-800' : 
                                    'bg-blue-100 text-blue-800'}`}>
                                    {article.status === 'new' ? 'Mới' : 'Đang kiểm duyệt'}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex space-x-2">
                                    {article.status === 'new' ? (
                                        <button
                                            onClick={() => handleAssignReviewer(article.id)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                                        >
                                            <UserCheck className="w-4 h-4 mr-1" />
                                            Phân công
                                        </button>
                                    ) : (
                                        <span className="text-gray-600">
                                            Người kiểm duyệt: {article.reviewer}
                                        </span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const renderNotifications = () => (
        <div className="space-y-4">
            {notifications.map((notification) => (
                <div key={notification.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-start">
                        <div className={`rounded-full p-2 mr-3 ${
                            notification.type === 'new_submission' ? 'bg-green-100' : 'bg-blue-100'
                        }`}>
                            {notification.type === 'new_submission' ? (
                                <Edit2 className="h-5 w-5 text-green-600" />
                            ) : (
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            <span className="text-sm text-gray-500 mt-2 block">{notification.date}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý bài viết</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-1 lg:px-8 py-6">
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab('new')}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === 'new'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        Bài viết mới
                    </button>
                    <button
                        onClick={() => setActiveTab('inProgress')}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === 'inProgress'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        Bài viết đang xử lý
                    </button>
                    <button
                        onClick={() => setActiveTab('notifications')}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === 'notifications'
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        Thông báo
                    </button>
                </div>

                <div className="mb-6">
                    <div className="flex items-center bg-white p-4 rounded-lg shadow">
                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            className="flex-1 outline-none"
                        />
                    </div>
                </div>

                {activeTab === 'new' && renderArticleList(articles.new)}
                {activeTab === 'inProgress' && renderArticleList(articles.inProgress)}
                {activeTab === 'notifications' && renderNotifications()}
            </main>

            {/* Modal phân công người kiểm duyệt */}
            {showAssignModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-medium mb-4">Phân công người kiểm duyệt</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Chọn người kiểm duyệt
                            </label>
                            <select
                                className="w-full border rounded-lg p-2"
                                value={selectedReviewer}
                                onChange={(e) => setSelectedReviewer(e.target.value)}
                            >
                                <option value="">Chọn người kiểm duyệt...</option>
                                {reviewers.map((reviewer) => (
                                    <option key={reviewer.id} value={reviewer.id}>
                                        {reviewer.name} - {reviewer.expertise} (Đang xử lý: {reviewer.currentLoad})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex justify-end space-x-4">
                            <button
                                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                onClick={() => setShowAssignModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={confirmAssignment}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal xem PDF */}
            {showPdfModal && currentPdf && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 w-full max-w-4xl h-[80vh]">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium">{currentPdf.title}</h3>
                            <button
                                onClick={() => setShowPdfModal(false)}
                                className="text-gray-400 hover:text-gray-500"
                            >
                                <XCircle className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="h-[calc(100%-4rem)] w-full">
                            <iframe
                                src={currentPdf.pdfUrl}
                                className="w-full h-full rounded-lg border"
                                title="PDF Viewer"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditorDashboard;