import LoadingSpinner from '@/components/LoadingSpinner';
import { authService } from '@/utils/authService';
import { createUrlSlug } from '@/utils/urlUtils';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function ListPages() {
    const { magazineSlug } = useParams();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const response = await authService.getAllDanhMuc({});
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
                if (magazineSlug && categories.length > 0) {
                    const selectedCategory = categories.find(
                        category => createUrlSlug(category.tieude) === magazineSlug
                    );
                    console.log(selectedCategory.baibao);
                    setArticles(selectedCategory.baibao);
                } else {
                   console.log("Không thể fetch bài báo");
                   
                }
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError(err.message);
                setArticles([]);
            } finally {
                setLoading(false);
            }
        };

        if (categories.length > 0) {
            fetchArticles();
        }
    }, [magazineSlug, categories]);

    const handleArticleClick = (article) => {
        const articleSlug = createUrlSlug(article);
        navigate(`/home/${magazineSlug}/${articleSlug}`);
    };

    if (loading) {
        return (
           <LoadingSpinner />
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-3xl mx-auto p-4 text-center">
                <p className="text-red-600">Đã có lỗi xảy ra: {error}</p>
            </div>
        );
    }

    if (!loading && magazineSlug && articles.length === 0) {
        return (
            <div className="w-full max-w-3xl mx-auto p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                    Không tìm thấy bài viết trong danh mục này
                </h2>
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto p-2 sm:p-4" key={articles.id}>
            {!loading && magazineSlug && (
                <div className="mb-4 text-gray-600">
                    Tìm thấy {articles.length} bài viết
                </div>
            )}

            {articles.map((article) => (
                <div 
                    key={article.id} 
                    onClick={() => handleArticleClick(article.tieude)}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 cursor-pointer 
                             hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200
                             border-b border-gray-100 last:border-b-0"
                >
                    <div className="w-full sm:w-[150px] flex-shrink-0">
                        <img
                            src={article.url}
                            alt={article.tieude || ''}
                            className="w-full sm:w-[150px] h-[200px] sm:h-[100px] object-cover rounded
                                     shadow-sm hover:shadow-md transition-shadow duration-200"
                        />
                    </div>
                    
                    <div className="flex flex-col flex-grow">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 
                                     mb-1 sm:mb-2 line-clamp-2 hover:text-blue-600
                                     transition-colors duration-200">
                            {article.tieude}
                        </h2>
                        
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2 
                                    hidden sm:block">
                              <span dangerouslySetInnerHTML={{ __html: article.noidung }} />
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-auto
                                      text-xs sm:text-sm">
                            <span className="font-medium text-red-600 uppercase">
                                Tác giả: {article.taikhoan.hovaten}
                            </span>
                            <span className="text-gray-500 before:content-['•'] before:mx-2 
                                           before:text-gray-300">
                                {article.ngaydang}
                            </span>
                            <br />
                            <span className="text-blue-600">
                                Thể loại: {article.theloai.ten}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListPages;