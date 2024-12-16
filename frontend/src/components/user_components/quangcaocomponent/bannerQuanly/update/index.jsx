import { authService } from '@/utils/authService';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

const EditQuangCaoModal = ({ advertisement, onClose }) => {
    const [formData, setFormData] = useState({
        quangcaoId: advertisement.quangcaoId,
        url: advertisement.url || '',
        link: advertisement.link || '',
        tieude: advertisement.tieude || '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        let image = formData.url
        try {
            // Lấy token từ localStorage hoặc context authentication
            const current = JSON.parse(localStorage.getItem('currentUser'));
            if (imageFile) {
                const formDataImage = new FormData();
                formDataImage.append('files', imageFile);
    
                const response = await authService.uploadFile(formDataImage);
                image = response.file; 
            }
            const response = await authService.updateQuangCao({
                quangcaoId: formData.quangcaoId,
                url: image,
                link: formData.link,
                tieude: formData.tieude,
                token: current.token,
            });

            // Xử lý kết quả thành công
            alert('Cập nhật quảng cáo thành công');

            // Đóng modal
            if (onClose) {
                onClose();
            }
        } catch (err) {
            // Xử lý lỗi
            setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật quảng cáo');
            console.error('Lỗi cập nhật quảng cáo:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const [imageFileName, setImageFileName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const handleFileImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileName(file.name); // Hiển thị tên file
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Chỉnh Sửa Quảng Cáo</h2>

                    {error && (
                        <div
                            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                            role="alert"
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="tieude" className="block text-gray-700 font-bold mb-2">
                                Tiêu Đề
                            </label>
                            <input
                                type="text"
                                id="tieude"
                                name="tieude"
                                value={formData.tieude}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:border-blue-600 hover:bg-blue-50 transition duration-300">
                                <label
                                    htmlFor="upload-image"
                                    className="flex flex-col items-center cursor-pointer text-blue-600 font-medium mb-4"
                                >
                                    <CloudArrowUpIcon className="h-6 w-6 mb-2" />
                                    <span>Tải ảnh bài viết</span>
                                    <small>Chấp nhận các định dạng: .jpg, .jpeg, .png</small>
                                </label>
                                <input
                                    type="file"
                                    id="upload-image"
                                    className="hidden"
                                    onChange={handleFileImage}
                                    accept="image/jpeg,image/png,image/jpg"
                                />
                                {imageFileName && (
                                    <div className="mt-2 text-sm text-gray-600">Ảnh đã chọn: {imageFileName}</div>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="link" className="block text-gray-700 font-bold mb-2">
                                Liên Kết
                            </label>
                            <input
                                type="text"
                                id="link"
                                name="link"
                                value={formData.link}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex justify-end space-x-2 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Đang Cập Nhật...' : 'Cập Nhật'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditQuangCaoModal;
