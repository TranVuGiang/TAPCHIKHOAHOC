import SocialInteraction from '@/components/socialInteraction';
import { authService } from '@/utils/authService';
import { createUrlSlug } from '@/utils/urlUtils';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const App = () => {
    const { magazineSlug, articleSlug } = useParams();
    const [pdfFile, setPdfFile] = useState(null);
    const [articles, setArticles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [theloai, setTheloai] = useState('');
    const [token, setToken] = useState('');

    // Fetch token
    useEffect(() => {
        const loadToken = async () => {
            try {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (currentUser) {
                    setToken(currentUser.token);
                }
            } catch (err) {
                console.error('Lỗi khi lấy token:', err);
            }
        };
        loadToken();
    }, []);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                if (!currentUser) {
                    throw new Error('Không tìm thấy thông tin người dùng');
                }

                const response = await authService.getAllDanhMuc({ token: currentUser.token });
                setCategories(response.data.data || []);
            } catch (err) {
                console.error('Lỗi khi tải danh mục:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Fetch articles and filter by category
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                
                // Kiểm tra điều kiện
                if (!magazineSlug || categories.length === 0) {
                    console.log('Không thể fetch bài báo: Thiếu dữ liệu cần thiết.');
                    return;
                }

                // Tìm danh mục
                const selectedCategory = categories.find((category) => 
                    createUrlSlug(category.tieude) === magazineSlug
                );

                if (!selectedCategory) {
                    console.log('Không tìm thấy danh mục phù hợp.');
                    return;
                }

                // Tìm bài báo
                const dataBaiBao = selectedCategory?.baibao?.find((item) => 
                    createUrlSlug(item.tieude) === articleSlug
                );

                if (dataBaiBao) {
                    setArticles(dataBaiBao);
                    setPdfFile(dataBaiBao.file);
                    setTheloai(dataBaiBao.theloai?.ten || 'Chưa xác định');
                } else {
                    console.log('Không tìm thấy bài báo phù hợp.');
                }
            } catch (err) {
                console.error('Lỗi khi fetch bài báo:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (categories.length > 0) {
            fetchArticles();
        }
    }, [magazineSlug, articleSlug, categories]);

    // Hiển thị trạng thái load
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-600">Đang tải dữ liệu...</div>
            </div>
        );
    }

    // Hiển thị lỗi
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-red-600">Có lỗi xảy ra: {error}</div>
            </div>
        );
    }

    // Kiểm tra dữ liệu
    if (!articles) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl text-gray-600">Không tìm thấy bài báo</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header với tiêu đề và ngày đăng */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{articles.tieude}</h1>
                    <div className="flex items-center text-gray-600">
                        <span className="text-md">
                            Ngày đăng: {new Date(articles.ngaydang).toLocaleDateString('vi-VN')}
                        </span>
                    </div>
                    <span className="text-md">Thể loại: {theloai}</span>
                </div>

                {/* Phần nội dung chính */}
                <div className="p-6 space-y-6">
                    {/* Hình ảnh */}
                    {articles.url && (
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <img src={articles.url} alt={articles.tieude} className="w-80 object-cover" />
                        </div>
                    )}

                    {/* Nội dung bài viết */}
                    <div className="prose max-w-none">
                        <p
                            dangerouslySetInnerHTML={{ __html: articles.noidung }}
                            className="text-gray-700 leading-relaxed"
                        />
                    </div>

                    {/* PDF Viewer */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">Tài liệu đính kèm</h2>
                        {pdfFile ? (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="h-[800px] w-full">
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                        <Viewer fileUrl={pdfFile} className="w-full h-full" />
                                    </Worker>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                                <p className="text-gray-600">Không có file PDF đính kèm</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Thích và bình luận */}
                <SocialInteraction articles={articles} />

                {/* Footer */}
                <div className="p-6 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                            Tags: <span className="text-blue-600">{articles.keyword}</span>
                        </div>
                        <button
                            onClick={() => window.print()}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200"
                        >
                            In bài viết
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;