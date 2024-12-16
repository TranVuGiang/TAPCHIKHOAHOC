import ArticleDetailModal from '@/components/chitietbaibao';
import { SuccessDialog } from '@/components/modalDialog';
import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

function Editor_Editing() {
    const [baibaos, setBaibao] = useState([]);
    const [reviewers, setReviewers] = useState([]);
    const [selectedBaibao, setSelectedBaibao] = useState(null);
    const [selectedReviewer, setSelectedReviewer] = useState('');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [selectedKiemDuyetItem, setSelectedKiemDuyetItem] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        console.log(filteredBaibaos);

        const loadData = () => {
            loadDataUser();
            loadReviewers();
        };
        loadData();
        const intervalId = setInterval(loadData, 100000);

        // Cleanup: dừng interval khi component unmount
        return () => clearInterval(intervalId);
    }, []);

    const loadDataUser = async () => {
        setIsLoading(true);
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.loadBaibaoForEditor(token);
            setBaibao(response.data.baibaos);
        } catch (error) {
            console.log(error.message || 'Lỗi khi tải bài viết');
        } finally {
            setIsLoading(false);
        }
    };

    const loadReviewers = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.getUserKiemDuyet(token);
            setReviewers(response.data);
        } catch (error) {
            console.log('Lỗi khi tải danh sách phản biện:', error);
        }
    };

    const handleAssignReviewer = async (ghichu) => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            console.log('selectedReviewer: ', selectedReviewer);
            const response = await authService.addCensor({
                baibaoId: selectedBaibao.id,
                taikhoanId: selectedReviewer,
                token: token,
                ghichu: ghichu,
            });
            loadDataUser();
            setShowAssignModal(false);
            setSelectedReviewer('');
            setIsSuccess(true);
            console.log(response);
        } catch (error) {
            alert('Lỗi khi phân công phản biện');
        }
    };

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

    const filteredBaibaos =
        activeTab === 'all' ? baibaos : baibaos.filter((baibao) => baibao.status.toString() === activeTab);

    const getStatusText = (status) => {
        return STATUS_CONFIG[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    };
    const LoadingSpinner = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
            </div>
        );
    };
    // Tách AssignReviewerModal thành component riêng
    const AssignReviewerModal = () => {
        const [localGhichu, setLocalGhichu] = useState('');

        const handleSubmit = () => {
            handleAssignReviewer(localGhichu);
        };

        return (
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
                    showAssignModal ? '' : 'hidden'
                }`}
            >
                <SuccessDialog
                    isOpen={isSuccess}
                    onClose={() => setIsSuccess(false)}
                    title={'Phân phản biện thành công'}
                    titleButton={'Tiếp tục'}
                />
                <div className="bg-white rounded-lg p-6 w-96">
                    <h3 className="text-lg font-semibold mb-4">Phân công người phản biện</h3>
                    <select
                        className="w-full p-2 border rounded mb-4"
                        value={selectedReviewer}
                        onChange={(e) => setSelectedReviewer(e.target.value)}
                    >
                        <option value="">Chọn người phản biện</option>
                        {reviewers.map((reviewer) => (
                            <option key={reviewer.taikhoan_id} value={reviewer.taikhoan_id}>
                                {reviewer.hovaten}
                            </option>
                        ))}
                    </select>
                    <div className="max-w-md mx-auto mt-4">
                        <label className="block text-lg font-medium text-gray-700">Ghi chú</label>
                        <textarea
                            id="message"
                            rows="5"
                            placeholder="Type your message here..."
                            value={localGhichu}
                            onChange={(e) => setLocalGhichu(e.target.value)}
                            className="mt-2 w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none shadow-sm text-gray-800"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
                            onClick={() => setShowAssignModal(false)}
                        >
                            Hủy
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={handleSubmit}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>
        );
    };
    const FeedbackModal = ({ kiemduyetId }) => {
        const [localFeedback, setLocalFeedback] = useState('');
        const [isSuccess, setIsSuccess] = useState(false);
        const [selectedStatus, setSelectedStatus] = useState('4');

        // Các tùy chọn trạng thái cho combobox
        const statusOptions = [
            { id: 4, name: 'Chấp nhận' },
            { id: 5, name: 'Cần chỉnh sửa' },
            { id: 6, name: 'Không chấp nhận' },
        ];

        const handleCensorDecision = async () => {
            console.log(kiemduyetId);

            try {
                const current = JSON.parse(localStorage.getItem('currentUser'));
                const token = current.token;

                const response = await authService.phanhoiTacGia({
                    token: token,
                    kiemduyetId: kiemduyetId,
                    status: String(selectedStatus),
                    ghichu: localFeedback,
                });
                loadDataUser();
                setIsSuccess(true);
                console.log(response);
            } catch (error) {
                console.log(error);
            } finally {
                setShowFeedbackModal(false);
            }
        };
        useEffect(() => {
            if (isSuccess) {
                const timer = setTimeout(() => {
                    setShowFeedbackModal(false); // Đóng modal sau khi thông báo thành công
                }, 1000); // 1000ms (1 giây) hoặc tuỳ chỉnh

                return () => clearTimeout(timer); // Cleanup timer khi unmount
            }
        }, [isSuccess]);
        return (
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
                    showFeedbackModal ? '' : 'hidden'
                }`}
            >
                <SuccessDialog
                    isOpen={isSuccess}
                    onClose={() => setIsSuccess(false)}
                    title={'Gửi phản hồi thành công'}
                    titleButton={'Tiếp tục'}
                />
                <div className="bg-white rounded-lg p-6 w-96">
                    <h3 className="text-lg font-semibold mb-4">Gửi phản hồi cho tác giả</h3>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Trạng thái phản hồi</label>
                        <select
                            className="w-full p-2 border rounded"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                            {statusOptions.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <textarea
                        className="w-full p-2 border rounded mb-4 h-32"
                        value={localFeedback}
                        onChange={(e) => setLocalFeedback(e.target.value)}
                        placeholder="Nhập nội dung phản hồi..."
                    />
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
                            onClick={() => setShowFeedbackModal(false)}
                        >
                            Hủy
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            onClick={handleCensorDecision}
                        >
                            Gửi
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const [feedbackCensor, setFeedbackCensor] = useState(false);
    const FeedbackCensor = ({ ghichu }) => {
        return (
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
                    feedbackCensor ? '' : 'hidden'
                }`}
            >
                <div className="bg-white rounded-lg p-6 w-96">
                    <h3 className="text-lg font-semibold mb-4">Phản hồi của kiểm duyệt</h3>
                    <p className="text-sm text-gray-600 mb-2">{ghichu || 'Không có ghi chú'}</p>
                    <div className="flex justify-end gap-2">
                        <button
                            className="px-4 py-2 text-gray-600 rounded hover:bg-gray-100"
                            onClick={() => setFeedbackCensor(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm">
            {isLoading && <LoadingSpinner />}
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Bài báo đang biên tập</h2>
                {/* Tab Navigation */}
                <div className="flex border-b mb-4">
                    {[
                        { key: 'all', label: 'Tất cả' },
                        ...Object.entries(STATUS_CONFIG).map(([key, value]) => ({
                            key,
                            label: value.text,
                        })),
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            className={`px-4 py-2 border-b-2 ${
                                activeTab === tab.key
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                            onClick={() => setActiveTab(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
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
                                    Người kiểm duyệt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>{' '}
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Chi tiết
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredBaibaos.map((item) => {
                                const status = getStatusText(item.status);

                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{item.tieude}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.taikhoans.hovaten}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.status !== 0
                                                ? item.kiemduyet.length > 0
                                                    ? item.kiemduyet.map((kiemduyetItem, index) => (
                                                          <span key={index} className="block">
                                                              {kiemduyetItem.taikhoan?.hovaten || 'Chưa có'}
                                                          </span>
                                                      ))
                                                    : 'Chưa có'
                                                : 'Chưa phân công'}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}
                                            >
                                                {status.text}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex space-x-2">
                                                {item.status === 1 && (
                                                    <button
                                                        className="text-blue-600 hover:text-blue-900"
                                                        onClick={() => {
                                                            setSelectedBaibao(item);
                                                            setShowAssignModal(true);
                                                        }}
                                                    >
                                                        Phân công
                                                    </button>
                                                )}
                                                {item.status === 3 &&
                                                    item.kiemduyet.map((kiemduyetItem, index) => (
                                                        <div key={index}>
                                                            <button
                                                                className="text-blue-600 hover:text-blue-900"
                                                                onClick={() => {
                                                                    setSelectedKiemDuyetItem(kiemduyetItem);
                                                                    setFeedbackCensor(true);
                                                                }}
                                                            >
                                                                Xem/
                                                            </button>
                                                            <button
                                                                className="text-green-600 hover:text-green-900"
                                                                onClick={() => {
                                                                    setSelectedKiemDuyetItem(kiemduyetItem);
                                                                    setShowFeedbackModal(true);
                                                                }}
                                                            >
                                                                Phản hồi
                                                            </button>
                                                        </div>
                                                    ))}
                                                {item.status === 7 && <div className="text-gray-500">Đã đăng bài</div>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <a
                                                onClick={() => setSelectedArticle(item)}
                                                className="text-blue-600 hover:text-blue-900 cursor-pointer"
                                            >
                                                Xem
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* Thêm điều kiện render modal */}
            {selectedKiemDuyetItem && (
                <>
                    <FeedbackModal kiemduyetId={selectedKiemDuyetItem.id} />
                    <FeedbackCensor ghichu={selectedKiemDuyetItem.ghichu} />
                </>
            )}
            {selectedArticle && (
                <ArticleDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            )}
            <AssignReviewerModal />
        </div>
    );
}

export default Editor_Editing;
