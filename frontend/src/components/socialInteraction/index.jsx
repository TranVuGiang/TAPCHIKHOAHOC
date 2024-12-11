import { authService } from '@/utils/authService';
import { TrashIcon } from '@heroicons/react/24/solid';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

const SocialInteraction = ({ articles }) => {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [token, setToken] = useState('');
    const [chitietbaibao, setChitietbaibao] = useState(null);
    const [likeCount, setLikeCount] = useState('0');
    const [isLoading, setIsLoading] = useState(true);
    const [dathich, setDathich] = useState(null);
    const [binhluan, setBinhluan] = useState([]);

    useEffect(() => {
        loadArticleData();
    }, []);
    const loadArticleData = async () => {
        try {
            // Kiểm tra điều kiện articles không phải null và undefined
            if (articles) {
                setChitietbaibao(articles);
                // Sử dụng optional chaining để tránh lỗi
                setLikeCount(articles.thich?.thich || '0');
                setDathich(articles.thich?.dathich || false);
                setBinhluan(articles.binhluans || null);
                setIsLoading(false);
            } else {
                console.log('Không có dữ liệu bài báo');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Lỗi khi load dữ liệu:', error);
            setIsLoading(false);
        }
    };
    const handleLike = async () => {
        if (!chitietbaibao) return;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser === null || undefined) {
            return;
        }

        let status = null;
        if (dathich) {
            status = '0';
            setLikeCount(likeCount - 1);
            setDathich(false);
        } else {
            status = '1';
            setLikeCount(likeCount + 1);
            setDathich(true);
        }
        try {
            const response = await authService.likeBaibao({
                token: currentUser.token,
                baibaoId: chitietbaibao.baibaoId,
                status: status,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser === null || undefined) {
            return;
        }
        try {
            const response = await authService.saveComment({
                token: currentUser.token,
                baibaoId: chitietbaibao.baibaoId,
                noidung: newComment,
            });

            console.log(response);
            loadArticleData();
            setNewComment('');
        } catch (error) {
            console.log(error);
        }
    };
    const handleDeleteComment = async (e) => {
        e.preventDefault();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser === null || undefined) {
            return;
        }
        try {
            const response = await authService.deleteComment({
                token: currentUser.token,
                baibaoId: chitietbaibao.baibaoId,
            });
            console.log(response);
            loadArticleData();
        } catch (error) {
            console.log(error);
        }
    }
    // Hiển thị loading nếu đang tải dữ liệu
    if (isLoading) {
        return <div className="text-center py-4">Đang tải dữ liệu...</div>;
    }

    // Hiển thị thông báo nếu không có dữ liệu
    if (!chitietbaibao) {
        return <div className="text-center py-4">Không có dữ liệu</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
            {/* Like Section */}
            <div className="flex items-center space-x-4 mb-6 border-b pb-4">
                <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 ${dathich ? 'text-red-500' : 'text-gray-600'} hover:text-red-500 transition`}
                >
                    <Heart fill={dathich ? 'currentColor' : 'none'} className="w-6 h-6" />
                    <span>{likeCount} Thích</span>
                </button>
            </div>

            {/* Comments Section */}
            <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <MessageCircle className="mr-2 w-6 h-6 text-gray-600" />
                    Bình luận ({comments.length})
                </h3>

                {/* Comment Input */}
                <form className="mb-6 flex items-center space-x-4">
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Nhập bình luận của bạn..."
                        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                        onClick={handleCommentSubmit}
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
                {/* Comments List */}
                {binhluan.length > 0 ? (
                    <div className="space-y-4">
                        {binhluan
                            .sort((a, b) => new Date(b.thoigian) - new Date(a.thoigian))
                            .map((comment, index) => (
                                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-semibold text-gray-800">{comment.hovaten}</span>
                                        <span className="text-sm text-gray-500">{comment.thoigian}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="text-gray-700">{comment.noidung}</p>
                                        {comment.dabinhluan ? (
                                            <button onClick={handleDeleteComment}>
                                                <TrashIcon className="size-7 text-red-700 py-1 px-1" />
                                            </button>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center">Chưa có bình luận nào</p>
                )}
            </div>
        </div>
    );
};

export default SocialInteraction;
