import { SuccessDialog } from '@/components/modalDialog';
import { authService } from '@/utils/authService';
import { CloudArrowUpIcon, PencilIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Editor_AddDanhMuc() {
    const navigate = useNavigate()
    // State for form data
    const [formData, setFormData] = useState({
        danhmucId: null,
        tieude: '',
        mota: '',
        url: '',
        tuan: '',
        so: '',
        token: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imageFileName, setImageFileName] = useState('');

    // Validation state
    const [errors, setErrors] = useState({});

    // State for list and editing
    const [danhMucList, setDanhMucList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Validate Tiêu đề (required, min 3 characters)
        if (!formData.tieude.trim()) {
            newErrors.tieude = 'Tiêu đề không được để trống';
        } else if (formData.tieude.trim().length < 3) {
            newErrors.tieude = 'Tiêu đề phải có ít nhất 3 ký tự';
        }

        // Validate Mô tả (optional, but if provided, min 10 characters)
        if (formData.mota.trim() && formData.mota.trim().length < 10) {
            newErrors.mota = 'Mô tả phải có ít nhất 10 ký tự';
        }

        // Validate Tuần (required, positive number)
        if (!formData.tuan.toString().trim()) {
            newErrors.tuan = 'Tuần không được để trống';
        } else if (isNaN(formData.tuan) || Number(formData.tuan) < 0) {
            newErrors.tuan = 'Tuần phải là số dương';
        }

        // Validate Số (required, positive number)
        if (!formData.so.toString().trim()) {
            newErrors.so = 'Số không được để trống';
        } else if (isNaN(formData.so) || Number(formData.so) < 0) {
            newErrors.so = 'Số phải là số dương';
        }

        // Validate Image (only for new entries)
        if (!isEditing && !imageFile) {
            newErrors.image = 'Vui lòng chọn ảnh';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Fetch Danh Muc List
    const fetchDanhMucList = async () => {
        const current = JSON.parse(localStorage.getItem('currentUser'))
        if(current === null || undefined ) {
            navigate('/')
        }
        setIsLoading(true)
        try {
            const response = await authService.getAllDanhMucByTime({token: current.token});
            console.log(response.data.data);

            setDanhMucList(response.data.data);
        } catch (error) {
            console.error('Lỗi khi tải danh mục:', error.message);
        } finally {
        setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchDanhMucList();
    }, []);

    // Handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileName(file.name);
            // Clear image error when file is selected
            setErrors((prev) => ({ ...prev, image: undefined }));
        }
    };

    // Handle input changes
    const handleOnChanges = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    // Handle Edit
    const handleEdit = (item) => {
        setFormData({
            danhmucId: item.danhmucId,
            tieude: item.tieude,
            mota: item.mota,
            url: item.url,
            tuan: item.tuan,
            so: item.so,
        });
        setIsEditing(true);
        setImageFileName(item.url ? item.url.split('/').pop() : '');
        // Clear previous errors
        setErrors({});
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) return;

        try {
            await authService.deleteDanhMuc(id);
            fetchDanhMucList();
            alert('Xóa danh mục thành công');
        } catch (error) {
            console.error('Lỗi khi xóa danh mục:', error.message);
            alert('Xóa danh mục thất bại');
        }
    };

    // Handle Submit (Create/Update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const current = JSON.parse(localStorage.getItem('currentUser'));
        const token = current.token;

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            let uploadedUrl = formData.url;
            if (imageFile) {
                // Upload file
                const formDataImage = new FormData();
                formDataImage.append('files', imageFile);

                const response = await authService.uploadFile(formDataImage);
                uploadedUrl = response.file;
            }

            // Prepare data
            const submitData = {
                ...formData,
                url: uploadedUrl,
                token: token,
            };

            // Create or Update based on editing state
            if (isEditing) {
                console.log(formData);

                await authService.updateDanhMuc(submitData);
                setIsSuccess(true);
            } else {
                await authService.createDanhMuc(submitData);
                setIsSuccess(true);
            }

            handleReset();
            fetchDanhMucList();
        } catch (error) {
            console.error('Lỗi khi thực hiện:', error.message);
            alert('Thao tác thất bại');
        } finally {
            setIsLoading(false);
           
        }
    };

    // Reset form
    const handleReset = () => {
        setFormData({
            danhmucId: null,
            tieude: '',
            mota: '',
            url: '',
            tuan: '',
            so: '',
        });
        setIsEditing(false);
        setImageFile(null);
        setImageFileName('');
        setErrors({});
    };

    const LoadingSpinner = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
            </div>
        );
    };

    

    return (
        <div className="container mx-auto px-4 py-8">
            {isLoading && <LoadingSpinner />}
            <SuccessDialog
                title={'Thêm danh mục thành công'}
                titleButton={'Tiếp tục'}
                isOpen={isSuccess}
                onClose={() => setIsSuccess(false)}
            />
            <div className="">
                {/* Form Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                            <input
                                type="text"
                                name="tieude"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                                    errors.tieude
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'focus:ring-blue-500 focus:border-blue-500'
                                }`}
                                placeholder="Nhập tiêu đề danh mục..."
                                value={formData.tieude}
                                onChange={handleOnChanges}
                            />
                            {errors.tieude && (
                                <div className="text-red-500 text-sm mt-1 flex items-center">
                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                    {errors.tieude}
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
                            <textarea
                                name="mota"
                                rows="4"
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                                    errors.mota
                                        ? 'border-red-500 focus:ring-red-500'
                                        : 'focus:ring-blue-500 focus:border-blue-500'
                                }`}
                                placeholder="Nhập mô tả chi tiết..."
                                value={formData.mota}
                                onChange={handleOnChanges}
                            />
                            {errors.mota && (
                                <div className="text-red-500 text-sm mt-1 flex items-center">
                                    <XCircleIcon className="h-4 w-4 mr-1" />
                                    {errors.mota}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tuần</label>
                                <input
                                    type="number"
                                    name="tuan"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                                        errors.tuan
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                    placeholder="Nhập số tuần..."
                                    value={formData.tuan}
                                    onChange={handleOnChanges}
                                />
                                {errors.tuan && (
                                    <div className="text-red-500 text-sm mt-1 flex items-center">
                                        <XCircleIcon className="h-4 w-4 mr-1" />
                                        {errors.tuan}
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Số</label>
                                <input
                                    type="number"
                                    name="so"
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
                                        errors.so
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                    placeholder="Nhập số..."
                                    value={formData.so}
                                    onChange={handleOnChanges}
                                />
                                {errors.so && (
                                    <div className="text-red-500 text-sm mt-1 flex items-center">
                                        <XCircleIcon className="h-4 w-4 mr-1" />
                                        {errors.so}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div
                                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition duration-300 ${
                                    errors.image
                                        ? 'border-red-500 bg-red-50'
                                        : 'border-gray-300 bg-gray-50 hover:border-blue-600 hover:bg-blue-50'
                                }`}
                            >
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
                                {errors.image && (
                                    <div className="text-red-500 text-sm mt-1 flex items-center justify-center">
                                        <XCircleIcon className="h-4 w-4 mr-1" />
                                        {errors.image}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-end space-x-4">
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                disabled={isLoading}
                            >
                                {isEditing ? 'Cập Nhật' : 'Thêm Danh Mục'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-sm mt-5">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Tiêu Đề
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Tuần
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                        Số
                                    </th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                                        Hành Động
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {danhMucList.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3">{item.tieude}</td>
                                        <td className="px-4 py-3">{item.tuan}</td>
                                        <td className="px-4 py-3">{item.so}</td>
                                        <td className="px-4 py-3 text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {danhMucList.length === 0 && (
                            <div className="text-center py-4 text-gray-500">Không có danh mục nào</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Editor_AddDanhMuc;
