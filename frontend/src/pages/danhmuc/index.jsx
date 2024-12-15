import React, { useState } from 'react';
import { Calendar, Search, ChevronLeft, ChevronRight, ChevronDown, Filter, Tag } from 'lucide-react';
import img1 from "@/assets/ttnt.png";
import img2 from "@/assets/blockchend.png";
import img3 from "@/assets/nl.png";
import img4 from "@/assets/hanhtinh.png";
import img5 from "@/assets/img5.png";
import img6 from "@/assets/img6.png";
import img7 from "@/assets/img7.png";
import img8 from "@/assets/img8.png";

const Category = () => {
  const [articles] = useState([
    { id: 1, title: 'Trí tuệ nhân tạo và tương lai của công nghệ', excerpt: 'Khám phá những tiến bộ mới nhất...', date: '11/10/2024', image: img1, week: 2, number: 1, type: 'Technology' },
    { id: 2, title: 'Công nghệ Blockchain và tiền điện tử', excerpt: 'Tìm hiểu về cách blockchain...', date: '12/10/2024', image: img2, week: 2, number: 2, type: 'Finance' },
    { id: 3, title: 'Năng lượng tái tạo: Giải pháp cho tương lai', excerpt: 'Khám phá tiềm năng...', date: '13/10/2024', image: img3, week: 2, number: 3, type: 'Energy' },
    { id: 4, title: 'Khám phá vũ trụ với kính viễn vọng Webb', excerpt: 'Những phát hiện mới nhất...', date: '14/10/2024', image: img4, week: 2, number: 4, type: 'Science' },
    { id: 5, title: 'Công nghệ Quantum Computing và tương lai', excerpt: 'Tìm hiểu về máy tính lượng tử...', date: '15/10/2024', image: img5, week: 3, number: 1, type: 'Technology' },
    { id: 6, title: 'Sinh học tổng hợp: Cuộc cách mạng mới', excerpt: 'Khám phá cách các nhà khoa học...', date: '16/10/2024', image: img6, week: 3, number: 2, type: 'Biology' },
    { id: 7, title: 'Internet vạn vật (IoT) trong đời sống', excerpt: 'Cách IoT đang thay đổi cách...', date: '17/10/2024', image: img7, week: 3, number: 3, type: 'Technology' },
    { id: 8, title: 'Khoa học thần kinh và trí nhớ con người', excerpt: 'Những khám phá mới...', date: '18/10/2024', image: img8, week: 3, number: 4, type: 'Science' }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;

  const filteredArticles = articles
    .filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType ? article.type === selectedType : true;
      const matchesTime = selectedTime ? article.date === selectedTime : true;
      const matchesWeek = selectedWeek ? `Tuần ${article.week}` === selectedWeek : true;
      return matchesSearch && matchesType && matchesTime && matchesWeek;
    });

  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTypeColor = (type) => {
    const colors = {
      Technology: 'bg-blue-100 text-blue-800',
      Finance: 'bg-green-100 text-green-800',
      Energy: 'bg-yellow-100 text-yellow-800',
      Science: 'bg-purple-100 text-purple-800',
      Biology: 'bg-pink-100 text-pink-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

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
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">Tất cả thời gian</option>
                  {Array.from(new Set(articles.map(article => article.date))).map(date => (
                    <option key={date} value={date}>{date}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={selectedWeek}
                  onChange={(e) => setSelectedWeek(e.target.value)}
                  className="w-full pl-10 p-3 rounded-lg border border-gray-200 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentArticles.map(article => (
            <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-64">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full font-medium">
                  Tuần {article.week}: Số {article.number}
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(article.type)}`}>
                    {article.type}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{article.date}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-gray-600">{article.excerpt}</p>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200">
                  Đọc thêm →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredArticles.length > articlesPerPage && (
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
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
                onClick={() => paginate(i + 1)}
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
              onClick={() => paginate(currentPage + 1)}
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