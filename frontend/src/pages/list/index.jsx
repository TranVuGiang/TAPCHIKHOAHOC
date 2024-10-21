import { useEffect, useState } from 'react';

function ListPages() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        const fetchDatas = async () => {
            const resp = await fetch('http://localhost:5173/list-baibao.json');
            if (!resp) throw new Error('Failed to fetch');
            const data = await resp.json();
            setNews(data);
        };
        fetchDatas();
    }, []);

    return (
        <div className="w-full max-w-3xl mx-auto p-2 sm:p-4">
            {news.map((article) => (
                <div 
                    key={article.id} 
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6 cursor-pointer 
                             hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200
                             border-b border-gray-100 last:border-b-0"
                >
                    {/* Thumbnail */}
                    <div className="w-full sm:w-[150px] flex-shrink-0">
                        <img
                            src={article.url_anh}
                            alt={article.tieude}
                            className="w-full sm:w-[150px] h-[200px] sm:h-[100px] object-cover rounded
                                     shadow-sm hover:shadow-md transition-shadow duration-200"
                        />
                    </div>
                    
                    {/* Content */}
                    <div className="flex flex-col flex-grow">
                        <h2 className="text-base sm:text-lg font-semibold text-gray-800 
                                     mb-1 sm:mb-2 line-clamp-2 hover:text-blue-600
                                     transition-colors duration-200">
                            {article.tieude}
                        </h2>
                        
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2 
                                    hidden sm:block">
                            {article.mota}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-auto
                                      text-xs sm:text-sm">
                            <span className="font-medium text-red-600 uppercase">
                                Tác giả: {article.tacgia}
                            </span>
                            <span className="text-gray-500 before:content-['•'] before:mx-2 
                                           before:text-gray-300">
                                {article.thoigiandang}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ListPages;