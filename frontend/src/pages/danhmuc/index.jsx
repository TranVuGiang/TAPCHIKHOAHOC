import img1 from '@/assets/blockchend.png';
import LoadingSpinner from '@/components/LoadingSpinner';
import MagazineCard from '@/share/MagazineCard';
import { authService } from '@/utils/authService';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Filter, Search, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
const Category = () => {
    const [articles] = useState([
        {
            id: 1,
            title: 'Trí tuệ nhân tạo và tương lai của công nghệ',
            excerpt: 'Khám phá những tiến bộ mới nhất...',
            date: '11/10/2024',
            image: img1,
            week: 2,
            number: 1,
            type: 'Technology',
        },
    ]);
    const [isLoading, setIsLoading] = useState(true);
    const [danhmucs, setDanhmucs] = useState([]);

    useEffect(() => {
        loadDanhMuc();
    }, []);

    const loadDanhMuc = async () => {
        try {
            setIsLoading(true);
            const response = await authService.getAllDanhMucByTime();
            setDanhmucs(response.data.data);
        } catch (error) {
            throw new Error(error.message || 'Load danh mục lỗi');
        } finally {
            setIsLoading(false);
        }
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 4;

    const filteredArticles = articles.filter((article) => {
        const matchesSearch =
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedType ? article.type === selectedType : true;
        return matchesSearch && matchesType;
    });

    const currentArticles = filteredArticles.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">CÁC SỐ MỚI NHẤT</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Khám phá những bài viết mới nhất về công nghệ, khoa học và nhiều chủ đề thú vị khác
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="relative">
                                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                >
                                    <option value="">Tất cả chủ đề</option>
                                    <option value="Technology">Công nghệ</option>
                                    <option value="Finance">Tài chính</option>
                                    <option value="Energy">Năng lượng</option>
                                    <option value="Science">Khoa học</option>
                                    <option value="Biology">Sinh học</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>

                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select className="w-full pl-10 p-3 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                                    <option value="">Tất cả thời gian</option>
                                    {Array.from(new Set(articles.map((article) => article.date))).map((date) => (
                                        <option key={date} value={date}>
                                            {date}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>

                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select className="w-full pl-10 p-3 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                                    <option value="">Tất cả số báo</option>
                                    <option value="Tuần 2">Báo mới (Tuần 2)</option>
                                    <option value="Tuần 3">Báo cũ (Tuần 3)</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {danhmucs.map((issue) => (
                        <div key={issue.danhmucId}>
                            <MagazineCard
                                weekNumber={issue.tuan}
                                issueNumber={issue.so}
                                publicationDate={issue.ngaytao}
                                title={issue.tieude}
                                excerpt={issue.mota}
                                coverImage={issue.url}
                            />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {filteredArticles.length > articlesPerPage && (
                    <div className="flex justify-center items-center gap-2 mt-8">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className={`p-2 rounded-lg border ${
                                currentPage === 1
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        {Array.from({ length: Math.ceil(filteredArticles.length / articlesPerPage) }).map((_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`min-w-[40px] h-10 rounded-lg ${
                                    currentPage === i + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white hover:bg-gray-50 text-gray-700'
                                }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                        <button
                            onClick={() =>
                                setCurrentPage((prev) =>
                                    Math.min(Math.ceil(filteredArticles.length / articlesPerPage), prev + 1),
                                )
                            }
                            disabled={currentPage === Math.ceil(filteredArticles.length / articlesPerPage)}
                            className={`p-2 rounded-lg border ${
                                currentPage === Math.ceil(filteredArticles.length / articlesPerPage)
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-white hover:bg-gray-50 text-gray-700'
                            }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
