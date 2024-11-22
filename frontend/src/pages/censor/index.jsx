import PendingArticles from '@/components/pendingarticles';
import { authService } from '@/utils/authService';
import { AlertCircle, Check, FileText, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CensorDashboard = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('pending');

    const getStatusIcon = (status) => {
        switch (status) {
            case 0:
                return <AlertCircle className="w-5 h-5 text-yellow-500" />;
            case 1:
                return <Check className="w-5 h-5 text-green-500" />;
            case 2:
                return <X className="w-5 h-5 text-red-500" />;

            default:
                return <AlertCircle className="w-5 h-5 text-gray-500" />;
        }
    };

    const [danhsach, setDanhsach] = useState([]);
    const [danhsachCho, setDanhsachCho] = useState([]);

    useEffect(() => {
        loadDataDanhSach();
    }, []);

    const loadDataDanhSach = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const response = await authService.loadDanhSachForCensor(token);
            setDanhsach(response.data.data);

            if (!response.data.data && response.data.data.length === 0) {
                console.log('Lỗi không fetch được');
                return;
            }
            const dangxuly = response.data.data.filter(
                item => item.status === 0
            )
            const duyetxong = response.data.data.filter(
                item => item.status === 1 || item.status === 2
            );
            
            if(dangxuly && duyetxong) {
                setDanhsachCho(dangxuly)
                setDanhsach(duyetxong)
            }
            console.log(danhsach);
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewPdf = (file) => {
        navigate(file)
    }
    const ReviewedArticles = () => {
        const reviewedArticles = danhsach.filter((article) => article.status === '1' || article.status === '2');

        return (
            <div className="space-y-6">
                {danhsach.map((article) => (
                    <div key={article.id} className="bg-white border rounded-lg shadow-sm">
                        <div className="p-4 border-b">
                            <div className="flex items-center gap-2">
                                <h3 className="text-lg font-medium text-gray-900">{article.baiBao.tieude}</h3>
                                {getStatusIcon(article.status)}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                                ID: {article.id} | Ngày đăng: {article.ngaytao}
                            </div>
                        </div>

                        <div className="p-4 space-y-4">
                            <div className="bg-gray-50 p-4 rounded-md">
                                <div className="font-medium">Thông tin đánh giá</div>
                                <div className="mt-2 space-y-1 text-sm">
                                    <div>
                                        <span className="font-medium">Phản hồi Censor:</span> {article.ghichu}
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
                <h1 className="text-2xl font-bold text-gray-900">Kiểm Duyệt</h1>
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

            <div>{activeTab === 'pending' ? <PendingArticles danhsachCho={danhsachCho} /> : <ReviewedArticles />}</div>
        </div>
    );
};

export default CensorDashboard;
