import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { useState } from 'react';

const App = () => {
  const [pdfFile, setPdfFile] = useState(null);

  // Hàm xử lý khi upload file PDF
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      setPdfFile(fileURL);  // Lưu URL của file PDF vào state
    } else {
      alert('Please upload a valid PDF file');
    }
  };

  return (
    <div>
      <h2>Upload and Display PDF</h2>
      <input type="file" accept="application/pdf" onChange={handleFileUpload} />
      
      {/* Nếu có file PDF, hiển thị nó */}
      {pdfFile && (
        <div style={{ height: '800px', width: '900px', margin: '0 auto' , borderRadius: '50px'}}>
          {/* Điều chỉnh chiều rộng bằng cách đặt width cho div */}
          <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
            <Viewer fileUrl={pdfFile} />
          </Worker>
        </div>
      )}
    </div>
  );
};

export default App;
