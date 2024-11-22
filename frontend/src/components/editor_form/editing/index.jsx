import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

function Editor_Editing() {
    const [baibaos, setBaibao] = useState([]);
    const [reviewers, setReviewers] = useState([]);
    const [selectedBaibao, setSelectedBaibao] = useState(null);
    const [selectedReviewer, setSelectedReviewer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showAssignModal, setShowAssignModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    useEffect(() => {
        loadDataUser();
        loadReviewers();
    }, []);

    useEffect(() => {
        console.log(selectedReviewer);
    }, [selectedReviewer]);

    const loadDataUser = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.loadBaibaoForEditor(token);
            console.log(response.data.baibaos);
            setBaibao(response.data.baibaos);
        } catch (error) {
            console.log(error.message || 'Lỗi khi tải bài viết');
        }
    };

    const loadReviewers = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.getUserKiemDuyet(token);
            console.log(response.data);
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
            await authService.addCensor({
                baibaoId: selectedBaibao.id,
                taikhoanId: selectedReviewer,
                token: token,
                ghichu: ghichu,
            });
            loadDataUser();
            setShowAssignModal(false);
            setSelectedReviewer('');
            alert('Phân công phản biện thành công');
        } catch (error) {
            alert('Lỗi khi phân công phản biện');
        }
    };

    const handleSendFeedback = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            await authService.sendFeedback({
                baibaoId: selectedBaibao.id,
                feedback,
                token,
            });
            loadDataUser();
            setShowFeedbackModal(false);
            setFeedback('');
            alert('Gửi phản hồi thành công');
        } catch (error) {
            alert('Lỗi khi gửi phản hồi');
        }
    };

    const STATUS_CONFIG = {
        0: { text: 'Đã gửi', color: 'bg-blue-100 text-blue-800' },
        1: { text: 'Chờ xử lý', color: 'bg-blue-100 text-blue-800' },
        2: { text: 'Đang duyệt', color: 'bg-orange-100 text-orange-800' },
        3: { text: 'Đã duyệt', color: 'bg-yellow-100 text-yellow-800' },
        4: { text: 'Đã đăng', color: 'bg-green-100 text-green-800' },
    };

    const getStatusText = (status) => {
        return STATUS_CONFIG[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };
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

        const handleCensorDecision = async () => {
            try {
                const current = JSON.parse(localStorage.getItem('currentUser'));
                const token = current.token;
                console.log(token + " " + localFeedback + " " + kiemduyetId);
                
                const response = await authService.duyetBaiBao({
                    token: token,
                    kiemduyetId: kiemduyetId,
                    status: "4",
                    ghichu: localFeedback,  
                });
                setIsSuccess(true);
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        };

        return (
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
                    showFeedbackModal ? '' : 'hidden'
                }`}
            >
                <div className="bg-white rounded-lg p-6 w-96">
                    <h3 className="text-lg font-semibold mb-4">Gửi phản hồi cho tác giả</h3>
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
                    <h3 className="text-lg font-semibold mb-4">Phản hồi của tác giả</h3>
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
            <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Bài báo đang biên tập</h2>
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
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Người kiểm duyệt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thời gian
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {baibaos.map((item) => {
                                const status = getStatusText(item.status);
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">{item.tieude}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.taikhoans.hovaten}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}
                                            >
                                                {status.text}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {item.status !== 0
                                                ? item.kiemduyet.length > 0
                                                    ? item.kiemduyet.map((kiemduyetItem, index) => (
                                                          <span key={index} className="block">
                                                              {kiemduyetItem.taikhoan?.hovaten || 'Chưa có'}
                                                              <FeedbackCensor ghichu={item.kiemduyet.ghichu} />
                                                              <FeedbackModal kiemduyetId={kiemduyetItem.id} />
                                                          </span>
                                                      ))
                                                    : 'Chưa có'
                                                : 'Chưa phân công'}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.status !== 0 && item.status !== 1
                                                ? item.kiemduyet.length > 0
                                                    ? item.kiemduyet.map((kiemduyetItem, index) => (
                                                          <span key={index} className="block">
                                                              {kiemduyetItem.ngaykiemduyet || 'Chưa có'}
                                                          </span>
                                                      ))
                                                    : 'Chưa có'
                                                : 'Chưa có ngày'}
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
                                                {item.status === 3 && (
                                                    <button
                                                        className="text-blue-600 hover:text-blue-900"
                                                        onClick={() => {
                                                            setFeedbackCensor(true);
                                                        }}
                                                    >
                                                        Xem
                                                    </button>
                                                )}
                                                <button
                                                    className="text-green-600 hover:text-green-900"
                                                    onClick={() => {
                                                        setSelectedBaibao(item);
                                                        setShowFeedbackModal(true);
                                                    }}
                                                >
                                                    Phản hồi
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <AssignReviewerModal />
        </div>
    );
}

export default Editor_Editing;
