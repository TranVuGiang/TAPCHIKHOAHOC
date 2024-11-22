import { authService } from '@/utils/authService';
import { useState } from 'react';

const FeedbackModal = ({ kiemduyetId, showFeedbackModal }) => {
    const [feedback, setFeedback] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleCensorDecision = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.duyetBaiBao({
                token: token,
                kiemduyetId: kiemduyetId,
                status: 4,
                ghichu: feedback,
            });
            setIsSuccess(true);
            window.location.reload();
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
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
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
export default FeedbackModal;
