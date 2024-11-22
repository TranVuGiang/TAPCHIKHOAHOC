import { authService } from '@/utils/authService';
import { Bell, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessDialog } from '../modalDialog';

const PendingArticles = ({danhsachCho}) => {
    const navigate = useNavigate()

    const [feedback, setFeedback] = useState('');
    const [danhsach, setDanhsach] = useState([]);
    const [isSuccess, setIsSuccess] = useState(false)
    useEffect(() => {
        console.log(danhsachCho);
        
        try {
            setDanhsach(danhsachCho);
        } catch (error) {
            console.log(error);
        }
    }, [danhsachCho]);

    const handleCensorDecision = async (kiemduyetId, status) => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.duyetBaiBao({
                token: token,
                kiemduyetId: kiemduyetId,
                status: status,
                ghichu: feedback,
            });
            setIsSuccess(true)
            window.location.reload();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewPdf = (file) => {
        navigate(file)
    }

    return (
        <div className="space-y-6 font-montserrat">
            {danhsach.length > 0 && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <p className="text-blue-700">Bạn có {danhsach.length} bài viết mới cần duyệt</p>
                </div>
            )}
            <SuccessDialog 
                isOpen={isSuccess}
                onClose={() => {setIsSuccess(false)}}
                title={"Thành công"}
                titleButton={"Tiếp tục"}
            />
            {danhsach.map((article) => (
                <div key={article.baiBao.id} className="bg-white border rounded-lg shadow-sm">
                    <div className="p-4 border-b">
                        <h3 className="text-lg font-medium text-gray-900">
                            Tên bài: <strong>{article.baiBao.tieude}</strong>
                        </h3>
                        <div className="mt-1 text-sm text-gray-500">Ngày tạo: {article.baiBao.ngaytao}</div>
                    </div>

                    <div className="p-4 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-md">
                            <div className="mt-2 flex items-center gap-2">
                                <span>
                                    Tác giả: <strong>{article.baiBao.taiKhoan.hovaten}</strong>
                                </span>
                            </div>
                            <div className="mt-2">
                                Thể loại: <strong>{article.baiBao.theloai}</strong>
                            </div>
                            <div className="mt-2">
                                Ghi chú: <strong>{article.ghichu}</strong>
                            </div>
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
                                onClick={() => handleCensorDecision(article.id, '1')}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Chấp nhận
                            </button>
                            <button
                                onClick={() => handleCensorDecision(article.id, '2')}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                Từ chối
                            </button>
                        </div>

                        <button onClick={handleViewPdf(article.file)} className="w-full flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors">
                            <FileText className="w-4 h-4" />
                            Xem PDF
                        </button>
                    </div>
                </div>
            ))}

            {danhsach.length === 0 && (
                <div className="text-center py-8 text-gray-500">Không có bài viết nào cần duyệt</div>
            )}
        </div>
    );
};

export default PendingArticles;
