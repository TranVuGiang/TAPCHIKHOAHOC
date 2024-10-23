import { AlertCircle, Check, Edit2, FileText, X } from 'lucide-react';
import { useState } from 'react';

const ModeratorDashboard = () => {
  const [articles, setArticles] = useState([
    {
      id: 1,
      title: "Tiến bộ mới trong công nghệ AI",
      date: "2024-10-23",
      status: "pending",
      pdf: "article1.pdf",
      feedback: "",
      newStatus: ""
    },
    {
      id: 2,
      title: "Phát triển bền vững tại Việt Nam",
      date: "2024-10-22",
      status: "pending",
      pdf: "article2.pdf",
      feedback: "",
      newStatus: ""
    }
  ]);

  const handleStatusChange = (articleId, value) => {
    setArticles(articles.map(article => 
      article.id === articleId 
        ? { ...article, newStatus: value }
        : article
    ));
  };

  const handleFeedbackChange = (articleId, value) => {
    setArticles(articles.map(article => 
      article.id === articleId 
        ? { ...article, feedback: value }
        : article
    ));
  };

  const handleSubmit = (articleId) => {
    setArticles(articles.map(article => 
      article.id === articleId 
        ? { ...article, status: article.newStatus }
        : article
    ));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'approved':
        return <Check className="text-green-500" />;
      case 'rejected':
        return <X className="text-red-500" />;
      case 'needs_revision':
        return <Edit2 className="text-yellow-500" />;
      default:
        return <AlertCircle className="text-gray-500" />;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'approved':
        return 'Hợp lệ';
      case 'rejected':
        return 'Không hợp lệ';
      case 'needs_revision':
        return 'Cần chỉnh sửa';
      default:
        return 'Chờ duyệt';
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-4 md:p-6 border-b">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">
            Dashboard Kiểm Duyệt Bài Báo
          </h1>
        </div>
        
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            {/* Desktop View */}
            <table className="w-full hidden md:table">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Tiêu đề</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Ngày đăng</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Trạng thái</th>
                  <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Tệp PDF</th>
<th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => (
                  <tr key={article.id} className="border-b">
                    <td className="py-4 px-4 text-sm text-gray-900">{article.id}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">{article.title}</td>
                    <td className="py-4 px-4 text-sm text-gray-900">{article.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 text-sm text-gray-900">
                        {getStatusIcon(article.status)}
                        {getStatusText(article.status)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border rounded-md hover:bg-gray-50">
                        <FileText className="w-4 h-4" />
                        Xem PDF
                      </button>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-4">
                        <select
                          value={article.newStatus}
                          onChange={(e) => handleStatusChange(article.id, e.target.value)}
                          className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Chọn trạng thái</option>
                          <option value="approved">Hợp lệ</option>
                          <option value="needs_revision">Cần chỉnh sửa</option>
                          <option value="rejected">Không hợp lệ</option>
                        </select>
                        
                        <textarea
                          placeholder="Nhập nhận xét..."
                          value={article.feedback}
                          onChange={(e) => handleFeedbackChange(article.id, e.target.value)}
                          className="w-full px-3 py-2 text-sm border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        
                        <button
                          onClick={() => handleSubmit(article.id)}
                          disabled={!article.newStatus || !article.feedback}
                          className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Gửi đánh giá
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
{/* Mobile View */}
            <div className="md:hidden space-y-6">
              {articles.map((article) => (
                <div key={article.id} className="bg-white rounded-lg border p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">ID: {article.id}</p>
                      <h3 className="text-lg font-medium text-gray-900 mt-1">{article.title}</h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {getStatusIcon(article.status)}
                      {getStatusText(article.status)}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Ngày đăng: {article.date}</p>
                    <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 border rounded-md hover:bg-gray-50">
                      <FileText className="w-4 h-4" />
                      Xem PDF
                    </button>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <select
                      value={article.newStatus}
                      onChange={(e) => handleStatusChange(article.id, e.target.value)}
                      className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Chọn trạng thái</option>
                      <option value="approved">Hợp lệ</option>
                      <option value="needs_revision">Cần chỉnh sửa</option>
                      <option value="rejected">Không hợp lệ</option>
                    </select>
                    
                    <textarea
                      placeholder="Nhập nhận xét..."
                      value={article.feedback}
                      onChange={(e) => handleFeedbackChange(article.id, e.target.value)}
                      className="w-full px-3 py-2 text-sm border rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <button
                      onClick={() => handleSubmit(article.id)}
                      disabled={!article.newStatus || !article.feedback}
                      className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Gửi đánh giá
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboard;