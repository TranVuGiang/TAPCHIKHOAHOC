import { authService } from '@/utils/authService';
import { createUrlSlug } from '@/utils/urlUtils';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const App = () => {
    const magazineSlug = useParams();
    const [dataBaiBao, setDataBaiBao] = useState([]);
    const [pdfFile, setPdfFile] = useState(null);
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                const response = await authService.getBaiBaoById(0,12);
                const allArticles = Array.from(response.data.content);
                if (magazineSlug.articleSlug) {
                    const selectedCategory = allArticles.find(
                        (category) => createUrlSlug(category.tieude) === magazineSlug.articleSlug,
                    );
                    setDataBaiBao(selectedCategory);

                    
                    // Set PDF file từ dataBaiBao
                    if (selectedCategory?.file) {
                        setPdfFile(selectedCategory.file);
                    }
                } else {
                    console.log("Lỗi không load được bài báo");
                }
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError(err.message);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [magazineSlug.articleSlug]);

    useEffect(() => {
        console.log(dataBaiBao);
        
    }, [dataBaiBao])

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header với tiêu đề và ngày đăng */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{dataBaiBao.tieude}</h1>
                    <div className="flex items-center text-gray-600">
                        <span className="text-sm">
                            Ngày đăng: {new Date(dataBaiBao.ngaydang).toLocaleDateString('vi-VN')}
                        </span>
                    </div>
                </div>

                {/* Phần nội dung chính */}
                <div className="p-6 space-y-6">
                    {/* Hình ảnh */}
                    {dataBaiBao.url && (
                        <div className="rounded-lg overflow-hidden shadow-md">
                            <img
                                src={dataBaiBao.url}
                                alt={dataBaiBao.tieude}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    {/* Nội dung bài viết */}
                    <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">{dataBaiBao.noidung}</p>
                    </div>

                    {/* PDF Viewer */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-800">Tài liệu đính kèm</h2>
                        {pdfFile ? (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="h-[800px] w-full">
                                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                                        <Viewer fileUrl={pdfFile} />
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
                            Tags: <span className="text-blue-600">Example, Test</span>
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