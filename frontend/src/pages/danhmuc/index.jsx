import img2 from "@/assets/blockchend.png";
import img4 from "@/assets/hanhtinh.png";
import img3 from "@/assets/nl.png";
import img1 from "@/assets/ttnt.png";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, Filter, Search } from 'lucide-react';
import { useState } from 'react';

export default function Category() {
  // Sample data for articles
  const [articles] = useState([
    {
      id: 1,
      title: "Trí tuệ nhân tạo và tương lai của công nghệ",
      excerpt: "Khám phá những tiến bộ mới nhất trong lĩnh vực AI và ảnh hưởng của nó đến đời sống...",
      date: "11/10/2024",
      category: "Công nghệ",
      image: img1,
      week: 2,
      number: 1
    },
    {
      id: 2,
      title: "Blockchain và ứng dụng trong công nghiệp",
      excerpt: "Không chỉ hoạt động hiệu quả với Bitcoin và các loại tiền điện tử, công nghệ Blockchain còn được ứng dụng trong nhiều ngành công nghiệp...",
      date: "10/10/2024",
      category: "Công nghệ",
      image: img2,
      week: 2,
      number: 2
    },
    {
      id: 3,
      title: "Năng lượng tái tạo: Giải pháp cho tương lai",
      excerpt: "Các nguồn năng lượng tái tạo đang ngày càng phát triển và trở thành xu hướng của tương lai...",
      date: "09/10/2024",
      category: "Môi trường",
      image: img3,
      week: 1,
      number: 3
    },
    {
      id: 4,
      title: "Khám phá mới về sự sống ngoài hành tinh",
      excerpt: "Các nhà khoa học NASA tìm thấy dấu hiệu mới về sự tồn tại của nước trên sao Hỏa...",
      date: "08/10/2024",
      category: "Vũ trụ",
      image: img4,
      week: 1,
      number: 4
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showTimeFilter, setShowTimeFilter] = useState(false);
  const [showMainFilter, setShowMainFilter] = useState(false);
  
  const itemsPerPage = 5;

  // States for filters
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');
  
  // Filter categories
  const categories = ["Tất cả", "Công nghệ", "Vũ trụ", "Môi trường", "Y học", "Sinh học"];
  const weeks = ["Tất cả", "Tuần 1", "Tuần 2", "Tuần 3", "Tuần 4"];

  // Filter articles based on all criteria
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Tất cả' || 
                           article.category === selectedCategory;
    const matchesWeek = selectedWeek === '' || selectedWeek === 'Tất cả' || 
                       `Tuần ${article.week}` === selectedWeek;
    return matchesSearch && matchesCategory && matchesWeek;
  });

  // Calculate pagination
const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedArticles = filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-cyan-800 mb-2">Các Số Mới Nhất</h2>
        <div className="h-1 w-32 bg-cyan-600"></div>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            className="w-full pl-10 pr-4 py-2 border border-cyan-300 rounded-lg focus:outline-none focus:border-cyan-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-cyan-500 w-5 h-5" />
        </div>
        
        <div className="flex gap-2 relative">
          {/* Week Filter Dropdown */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              onClick={() => setShowTimeFilter(!showTimeFilter)}
            >
              <Calendar className="w-4 h-4" />
              Số báo
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showTimeFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                {weeks.map((week) => (
                  <button 
                    key={week}
                    className="w-full text-left px-4 py-2 hover:bg-cyan-50 text-gray-700"
                    onClick={() => {
                      setSelectedWeek(week);
                      setShowTimeFilter(false);
                    }}
                  >
                    {week}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-800 rounded-lg hover:bg-cyan-200 transition-colors"
              onClick={() => setShowMainFilter(!showMainFilter)}
            >
              <Filter className="w-4 h-4" />
              Chủ đề
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showMainFilter && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                {categories.map((category) => (
                  <button 
                    key={category}
                    className="w-full text-left px-4 py-2 hover:bg-cyan-50 text-gray-700"
onClick={() => {
                      setSelectedCategory(category);
                      setShowMainFilter(false);
                    }}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-6">
        {displayedArticles.map(article => (
          <div key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                Tuần {article.week}: Số {article.number}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900 hover:text-cyan-600 cursor-pointer">
                  {article.title}
                </h3>
                <span className="text-sm text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 text-lg">
                {article.excerpt}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-500">{article.date}</span>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Đọc thêm →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center items-center gap-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-cyan-100 text-cyan-800 disabled:opacity-50 hover:bg-cyan-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-lg ${
              currentPage === i + 1
                ? 'bg-cyan-600 text-white'
                : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
        
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
className="p-2 rounded-lg bg-cyan-100 text-cyan-800 disabled:opacity-50 hover:bg-cyan-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}