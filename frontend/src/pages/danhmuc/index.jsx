import LoadingSpinner from '@/components/LoadingSpinner';
import MagazineCard from '@/share/MagazineCard';
import { authService } from '@/utils/authService';
import { MicrophoneIcon } from '@heroicons/react/24/solid';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Search, Tag } from 'lucide-react';
import { useEffect, useState } from 'react';

const Category = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [danhmucs, setDanhmucs] = useState([]);
    const [danhmucs2, setDanhmucs2] = useState([]);
    const [isListening, setIsListening] = useState(false);

    // Search and Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTopic, setSelectedTopic] = useState('');
    const [selectedWeek, setSelectedWeek] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 4;
    const [pagination, setPagination] = useState({
        pageNumber: 0,
        totalPage: 0,
        pageSize: 6,
        totalElements: 0,
    });
    useEffect(() => {
        loadDanhMuc();
    }, []);

    const loadDanhMuc = async () => {
        try {
            setIsLoading(true);
            const response = await authService.getAllDanhMucByTime({});

            const response2 = await authService.getAllDanhMucByTimePhanTrang(
                { token: '' },
                '0',
                response.data.totalElements,
            );
            setDanhmucs(response.data.data);
            setDanhmucs2(response2.data.data);
            setPagination({
                pageNumber: 0,
                totalPage: response.data.totalPage,
                pageSize: response.data.pageSize,
                totalElements: response.data.totalElements,
            });
        } catch (error) {
            console.error('Lỗi tải danh mục:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const loadDanhMucPhanTrang = async (page, size) => {
        setIsLoading(true);
        try {
            const response2 = await authService.getAllDanhMucByTimePhanTrang({ token: '' }, page, size);

            setDanhmucs(response2.data.data);
            setPagination((prevState) => ({
                ...prevState,
                pageNumber: page,
            }));
        } catch (error) {
            console.log(error.message || 'Đã có lỗi xảy ra khi tải trang');
        } finally {
            setIsLoading(false);
        }
    };
    // Filtering Logic
    const filteredDanhmucs = searchQuery
        ? danhmucs2.filter((danhmuc) => {
              const matchesSearch =
                  danhmuc.tieude.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  danhmuc.mota.toLowerCase().includes(searchQuery.toLowerCase());

              const matchesTopic = selectedTopic ? danhmuc.chude === selectedTopic : true;

              const matchesWeek = selectedWeek ? danhmuc.tuan.toString() === selectedWeek : true;

              return matchesSearch && matchesTopic && matchesWeek;
          })
        : danhmucs;

    // Pagination
    const currentDanhmucs = filteredDanhmucs.slice((currentPage - 1) * articlesPerPage, currentPage * articlesPerPage);

    // Get Unique Values for Filters
    const uniqueTopics = Array.from(new Set(danhmucs.map((dm) => dm.chude || ''))).filter((topic) => topic !== '');
    const uniqueWeeks = Array.from(new Set(danhmucs.map((dm) => dm.tuan)));

    // Reset Filters
    const resetFilters = () => {
        setSearchQuery('');
        setSelectedTopic('');
        setSelectedWeek('');
        setCurrentPage(1);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const handleVoiceSearch = () => {
        if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'vi-VN';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.start();
            setIsListening(true);

            recognition.onresult = (event) => {
                const result = event.results[0][0].transcript;
                setSearchQuery(result);
                setIsListening(false);
            };

            recognition.onerror = (error) => {
                console.error('Speech recognition error:', error);
                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };
        } else {
            alert('Trình duyệt của bạn không hỗ trợ nhận diện giọng nói!');
        }
    };

    const handlePreviousPage = () => {
        if (pagination.pageNumber > 0) {
            loadDanhMucPhanTrang(pagination.pageNumber - 1, '6');
        }
    };

    const handleNextPage = () => {
        if (pagination.pageNumber < pagination.totalPage - 1) {
            loadDanhMucPhanTrang(pagination.pageNumber + 1, '6');
        }
    };
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            <div className="space-y-8">
                {/* Header Section */}
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">CÁC SỐ MỚI NHẤT</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Khám phá những bài viết mới nhất về nhiều chủ đề thú vị
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="space-y-4">
                        {/* Search Bar */}
                        <div className="relative flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-sm">
                            {/* Icon tìm kiếm */}
                            <Search className="absolute left-10 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />

                            {/* Ô tìm kiếm */}
                            <input
                                type="text"
                                placeholder="Tìm kiếm tiêu đề hoặc mô tả..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-12 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                            />

                            {/* Nút voice search */}
                            <button
                                onClick={handleVoiceSearch}
                                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                                    isListening ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600'
                                } text-white shadow-md`}
                                disabled={isListening}
                            >
                                {isListening ? (
                                    <MicrophoneIcon className="w-5 h-5" />
                                ) : (
                                    <MicrophoneIcon className="w-5 h-5" />
                                )}
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Chủ đề Filter */}
                            <div className="relative">
                                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    value={selectedTopic}
                                    onChange={(e) => {
                                        setSelectedTopic(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                >
                                    <option value="">Tất cả chủ đề</option>
                                    {uniqueTopics.map((topic) => (
                                        <option key={topic} value={topic}>
                                            {topic}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>

                            {/* Tuần Filter */}
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <select
                                    value={selectedWeek}
                                    onChange={(e) => {
                                        setSelectedWeek(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="w-full pl-10 p-3 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                                >
                                    <option value="">Tất cả các tuần</option>
                                    {uniqueWeeks.map((week) => (
                                        <option key={week} value={week}>
                                            Tuần {week}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            </div>

                            {/* Reset Filters */}
                            <div className="col-span-2">
                                <button
                                    onClick={resetFilters}
                                    className="w-full p-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    Đặt lại bộ lọc
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredDanhmucs.map((issue) => (
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
                <div className="flex justify-center items-center space-x-2 p-4">
                    {/* Nút Previous */}
                    <button
                        onClick={handlePreviousPage}
                        disabled={isLoading || pagination.pageNumber === 0}
                        className={`
                            p-2 border rounded-l 
                            transition duration-200 ease-in-out
                            flex items-center justify-center
                            ${
                                pagination.pageNumber === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-blue-500 hover:bg-blue-100'
                            }
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <ChevronLeft size={20} />
                    </button>

                    {/* Các nút số trang */}
                    {[...Array(parseInt(pagination.totalPage))].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                loadDanhMucPhanTrang(index, '6');
                                console.log(index);
                            }}
                            disabled={isLoading}
                            className={`
                                px-4 py-2 border 
                                transition duration-200 ease-in-out 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                                active:scale-95 active:bg-blue-600 active:text-white
                                ${
                                    // Modify this condition to explicitly check for page 0 on initial load
                                    pagination.pageNumber === index
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'bg-white text-blue-500 hover:bg-blue-100 hover:shadow-sm'
                                }
                                ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Nút Next */}
                    <button
                        onClick={handleNextPage}
                        disabled={isLoading || pagination.pageNumber === pagination.totalPage - 1}
                        className={`
                            p-2 border rounded-r 
                            transition duration-200 ease-in-out
                            flex items-center justify-center
                            ${
                                pagination.pageNumber === pagination.totalPage - 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-white text-blue-500 hover:bg-blue-100'
                            }
                            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                        `}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Category;
