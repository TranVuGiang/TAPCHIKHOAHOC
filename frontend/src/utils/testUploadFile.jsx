import { useState } from 'react';

export default function FileUpload() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (file) {
            console.log('Uploading file...');

            const formData = new FormData();
            formData.append('files', file); // Đổi tên 'file' thành 'files' để khớp với API

            try {
                const result = await fetch('https://anime404.click/api/files/upload', {
                    method: 'POST',
                    body: formData,
                });

                // Kiểm tra phản hồi từ server
                const contentType = result.headers.get("content-type");
                
                // Nếu server trả về JSON
                if (contentType && contentType.includes("application/json")) {
                    const data = await result.json();
                    console.log('JSON response:', data);
                } else {
                    // Nếu server trả về dạng text
                    const textData = await result.text();
                    console.log('Text response:', textData);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Tải lên</button>
        </div>
    );
};
