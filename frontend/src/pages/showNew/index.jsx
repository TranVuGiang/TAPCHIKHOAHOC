import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useState } from 'react';

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);
  
  // Data mẫu bài viết hiện tại
  const articleData = {
    tieude: "Test1",
    noidung: "XXXXX",
    ngaydang: "2024-10-26",
    hinhanh: "/path/to/image.jpg"
  };

  // Data mẫu các bài viết gợi ý
  const suggestedArticles = [
    {
      id: 1,
      tieude: "Bài viết liên quan 1",
      tomtat: "Tóm tắt ngắn về nội dung bài viết này...",
      ngaydang: "2024-10-25",
      hinhanh: "https://via.placeholder.com/150",
      luotxem: 156
    },
    {
      id: 2,
      tieude: "Bài viết liên quan 2",
      tomtat: "Tóm tắt ngắn về nội dung bài viết này...",
      ngaydang: "2024-10-24",
      hinhanh: "https://via.placeholder.com/150",
      luotxem: 98
    },
    {
      id: 3,
      tieude: "Bài viết liên quan 3",
      tomtat: "Tóm tắt ngắn về nội dung bài viết này...",
      ngaydang: "2024-10-23",
      hinhanh: "https://via.placeholder.com/150",
      luotxem: 234
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      setPdfFile(fileURL);
    } else {
      alert('Vui lòng tải lên file PDF hợp lệ');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header với tiêu đề và ngày đăng */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {articleData.tieude}
          </h1>
          <div className="flex items-center text-gray-600">
            <span className="text-sm">
              Ngày đăng: {new Date(articleData.ngaydang).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>

        {/* Phần nội dung chính */}
        <div className="p-6 space-y-6">
          {/* Hình ảnh */}
          {articleData.hinhanh && (
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={articleData.hinhanh}
                alt={articleData.tieude}
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          {/* Nội dung bài viết */}
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {articleData.noidung}
            </p>
          </div>

          {/* PDF Viewer */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Tài liệu đính kèm
              </h2>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition duration-200"
              >
                Chọn file PDF
              </label>
            </div>

            {pdfFile ? (
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-[800px] w-full">
                  <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                    <Viewer fileUrl={pdfFile} />
                  </Worker>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-600">
                  Chưa có file PDF nào được chọn
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Phần bài viết gợi ý */}
        <div className="p-6 bg-gray-50">
          <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestedArticles.map((article) => (
              <div 
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={article.hinhanh}
                  alt={article.tieude}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 hover:text-blue-600">
                    <a href={`/article/${article.id}`}>{article.tieude}</a>
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {article.tomtat}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{new Date(article.ngaydang).toLocaleDateString('vi-VN')}</span>
                    <span>{article.luotxem} lượt xem</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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