import { authService } from '@/utils/authService';
import { createUrlSlug } from '@/utils/urlUtils';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const App = () => {
    const { magazineSlug, articleSlug } = useParams();
    const [pdfFile, setPdfFile] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    const [theloai, setTheloai] = useState('')
    // Fetch categories
    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await authService.getAllDanhMuc();
                setCategories(response.data.data || []);
            } catch (err) {
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
                if (!magazineSlug || categories.length === 0) {
                    console.log('Không thể fetch bài báo: Thiếu dữ liệu cần thiết.');
                    return;
                }
                const selectedCategory = categories.find((category) => createUrlSlug(category.tieude) === magazineSlug);

                if (!selectedCategory) {
                    console.log('Không tìm thấy danh mục phù hợp.');
                    return;
                }
                const dataBaiBao = selectedCategory?.baibao?.find((item) => createUrlSlug(item.tieude) === articleSlug);
                if (dataBaiBao) {
                    setArticles(dataBaiBao);
                    setPdfFile(dataBaiBao.file)
                    setTheloai(dataBaiBao.theloai.ten)
                } else {
                    console.log('Không tìm thấy bài báo phù hợp.');
                    setArticles(selectedCategory.baibao || []);
                }
            } catch (err) {
                console.error('Lỗi khi fetch bài báo:', err);
                setError(err.message);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        if (categories.length > 0) {
            fetchArticles();
        }
    }, [magazineSlug, articleSlug, categories]);

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
                                        <Viewer fileUrl={pdfFile} className="w-full h-full"/>
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

                {/* Phần bài viết gợi ý */}
                {/* <div className="p-6 bg-gray-50">
                    <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {suggestedArticles.map((article) => (
                            <div
                                key={article.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                            >
                                <img src={article.hinhanh} alt={article.tieude} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2 text-gray-800 hover:text-blue-600">
                                        <a href={`/article/${article.id}`}>{article.tieude}</a>
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3">{article.tomtat}</p>
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>{new Date(article.ngaydang).toLocaleDateString('vi-VN')}</span>
                                        <span>{article.luotxem} lượt xem</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div> */}

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
