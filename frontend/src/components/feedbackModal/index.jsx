import { XCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

const FeedbackModal = ({ 
    isOpen, 
    onClose, 
    selectedArticle, 
    onSubmit 
}) => {
    const [feedbackType, setFeedbackType] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFeedbackType('');
            setFeedbackMessage('');
        }
    }, [isOpen]);

    // Handle feedback submission
    const handleSubmit = useCallback(() => {
        onSubmit({
            articleId: selectedArticle?.id,
            type: feedbackType,
            message: feedbackMessage,
            date: new Date().toISOString()
        });
        onClose();
    }, [feedbackType, feedbackMessage, selectedArticle, onSubmit, onClose]);

    // Handle text change with debounce
    const handleTextChange = useCallback((e) => {
        setFeedbackMessage(e.target.value);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Gửi phản hồi kiểm duyệt</h3>
                    <button
                        onClick={onClose}
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
                            Kết quả kiểm duyệt
                        </label>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="approve"
                                    checked={feedbackType === 'approve'}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="text-blue-600"
                                />
                                <span>Chấp nhận đăng bài</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="revision"
                                    checked={feedbackType === 'revision'}
                                    onChange={(e) => setFeedbackType(e.target.value)}
                                    className="text-blue-600"
                                />
                                <span>Yêu cầu chỉnh sửa</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nội dung phản hồi chi tiết
                        </label>
                        <textarea
                            value={feedbackMessage}
                            onChange={handleTextChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className={`w-full border rounded-lg p-2 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                                isFocused ? 'border-blue-500' : 'border-gray-300'
                            }`}
                            placeholder="Nhập nội dung phản hồi chi tiết..."
                            autoComplete="off"
                            spellCheck="false"
                        />
                    </div>

                    {feedbackType === 'revision' && (
                        <div className="rounded-lg bg-yellow-50 p-4">
                            <p className="text-sm text-yellow-700">
                                Vui lòng cung cấp những góp ý cụ thể để tác giả có thể chỉnh sửa bài viết.
                            </p>
                        </div>
                    )}

                    <div className="flex justify-end space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!feedbackType || !feedbackMessage.trim()}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Gửi phản hồi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackModal;