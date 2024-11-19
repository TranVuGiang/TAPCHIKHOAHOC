import { SuccessDialog } from '@/components/modalDialog';
import { authService } from '@/utils/authService';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

function Editor_AddDanhMuc() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); // Trạng thái thêm thành công
    const [formData, setFormData] = useState({
        tieuDe: '',
        moTa: '',
        url: '', // URL của file sau khi upload
        tuan: '',
        so: '',
    });
    const [imageFile, setImageFile] = useState(null); // File đã chọn
    const [imageFileName, setImageFileName] = useState(''); // Tên file

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file); // Lưu file đã chọn
            setImageFileName(file.name); // Hiển thị tên file
        }
    };

    const handleOnChanges = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Ngăn chặn submit mặc định
        setIsLoading(true);

        try {
            let uploadedUrl = formData.url; // URL file nếu đã có
            if (imageFile) {
                // Thực hiện upload file
                const formDataImage = new FormData();
                formDataImage.append('files', imageFile);

                const response = await authService.uploadFile(formDataImage);
                uploadedUrl = response.file; // Lấy URL sau khi upload
                console.log('Upload thành công:', response);
            }

            // Lưu dữ liệu sau khi upload file
            const response = await authService.createDanhMuc({
                ...formData,
                url: uploadedUrl, // Cập nhật URL file vào formData
            });
            console.log(response);
            console.log('Thêm Danh Mục Thành Công');
            setIsSuccess(true); // Hiển thị dialog thành công
        } catch (error) {
            console.error('Lỗi khi thêm danh mục:', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6">
                    {/* Hiển thị SuccessDialog khi thêm thành công */}
                    <SuccessDialog
                        isOpen={isSuccess}
                        onClose={() => setIsSuccess(false)} // Đóng dialog
                        title="Thêm danh mục thành công"
                        titleButton="Tiếp tục"
                    />

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                                <input
                                    type="text"
                                    name="tieuDe"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Nhập tiêu đề danh mục..."
                                    value={formData.tieuDe}
                                    onChange={handleOnChanges}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                                <textarea
                                    name="moTa"
                                    rows="4"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Nhập mô tả chi tiết..."
                                    value={formData.moTa}
                                    onChange={handleOnChanges}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Tuần</label>
                                    <input
                                        type="number"
                                        name="tuan"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Nhập số tuần..."
                                        value={formData.tuan}
                                        onChange={handleOnChanges}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Số</label>
                                    <input
                                        type="number"
                                        name="so"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        placeholder="Nhập số..."
                                        value={formData.so}
                                        onChange={handleOnChanges}
                                    />
                                </div>
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
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png,image/jpg"
                                    />
                                    {imageFileName && (
                                        <div className="mt-2 text-sm text-gray-600">Ảnh đã chọn: {imageFileName}</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Đang lưu...' : 'Lưu danh mục'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Editor_AddDanhMuc;
