import { authService } from '@/utils/authService';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { useLocation } from 'react-router-dom';
import { ErrorDialog, SuccessDialog } from '../modalDialog';

const SubmissionForm = () => {
    const location = useLocation();
    const [error, setError] = useState({
        message: '',
        isError: false,
    });
    const baibao = location.state?.baibao ?? null;
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ script: 'sub' }, { script: 'super' }],
            [{ color: [] }, { background: [] }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            [{ align: [] }],
            ['clean'],
        ],
    };

    const [theloai, setTheloai] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        theloaiId: '',
        tieude: '',
        noidung: '',
        tukhoa: '',
        file: '',
        url: '',
    });

    const [checkboxes, setCheckboxes] = useState(Array(6).fill(false));
    const handleCheckboxChange = (index) => {
        setCheckboxes((prev) => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    useEffect(() => {
        loadDataUser();
        if (baibao !== null) {
            reloadFormData();
        }
    }, []);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const reloadFormData = () => {
        setFormData(baibao);
    };

    const loadDataUser = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            setToken(token);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message || 'Lỗi nớ');
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authService.getAllTheLoai();
                setTheloai(response.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        setIsLoading(true)
        e.preventDefault();
        
        // Kiểm tra các trường bắt buộc
        const validations = [
            { 
                condition: !formData.theloaiId, 
                message: 'Vui lòng chọn loại bài viết' 
            },
            { 
                condition: !formData.tieude.trim(), 
                message: 'Tên bài báo không được để trống' 
            },
            { 
                condition: !formData.noidung.trim(), 
                message: 'Tóm tắt bài viết không được để trống' 
            },
            { 
                condition: !formData.tukhoa.trim(), 
                message: 'Từ khóa không được để trống' 
            },
            { 
                condition: !checkboxes.every(Boolean), 
                message: 'Vui lòng chọn tất cả các yêu cầu trước khi nộp bài!' 
            }
        ];
    
        // Kiểm tra file
        const validateFile = (file, type) => {
            if (!file) {
                setError({
                    message: `Vui lòng tải ${type} lên`,
                    isError: true
                });
                return false;
            }
    
            const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            const allowedFileTypes = ['application/pdf'];
    
            const currentAllowedTypes = type === 'ảnh' ? allowedImageTypes : allowedFileTypes;
            const maxSize = 10 * 1024 * 1024; // 10MB
    
            if (!currentAllowedTypes.includes(file.type)) {
                setError({
                    message: `Định dạng ${type} không hợp lệ. Vui lòng chọn file ${type} đúng định dạng`,
                    isError: true
                });
                return false;
            }
    
            if (file.size > maxSize) {
                setError({
                    message: `Kích thước ${type} vượt quá 10MB. Vui lòng chọn file nhỏ hơn`,
                    isError: true
                });
                return false;
            }
    
            return true;
        };
    
        // Kiểm tra các validation
        for (let validation of validations) {
            if (validation.condition) {
                setError({
                    message: validation.message,
                    isError: true
                });
                return;
            }
        }
    
        // Kiểm tra file ảnh
        if (imageFile && !validateFile(imageFile, 'ảnh')) {
            return;
        }
    
        // Kiểm tra file bản thảo
        if (file && !validateFile(file, 'bản thảo')) {
            return;
        }
    
        try {
            let uploadImage = formData.url;
            let uploadFile = formData.file;
            
            if (file) {
                const formDataFile = new FormData();
                formDataFile.append('files', file);
    
                const response = await authService.uploadFile(formDataFile);
                uploadFile = response.file;
            }
            
            if (imageFile) {
                const formDataImage = new FormData();
                formDataImage.append('files', imageFile);
    
                const response = await authService.uploadFile(formDataImage);
                uploadImage = response.file; 
            }
            
            let baibaoId = baibao !== null ? baibao.id : null;
    
            const response = await authService.createBaiBao({
                baibaoId: baibaoId,
                token: token,
                theloaiId: formData.theloaiId,
                tieude: formData.tieude,
                noidung: formData.noidung,
                tukhoa: formData.tukhoa,
                url: uploadImage,
                file: uploadFile,
            });
            
            setIsSuccess(true);
            setFormData({
                theloaiId: '',
                tieude: '',
                noidung: '',
                tukhoa: '',
                file: '',
                url: '',
            });
            
            // Reset file states
            setFile(null);
            setFileName('');
            setImageFile(null);
            setImageFileName('');
            
            console.log(response);
        } catch (error) {
            setError({
                message: error.response?.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.',
                isError: true,
            });
        } finally {
            setIsLoading(true)
        }
    };

    const [fileName, setFileName] = useState(''); // State để hiển thị tên file
    const [file, setFile] = useState(null);
    const [imageFileName, setImageFileName] = useState('');
    const [imageFile, setImageFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setFileName(file.name); // Hiển thị tên file
        }
    };
    const handleFileImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileName(file.name); // Hiển thị tên file
        }
    };

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            theloaiId: e.target.value,
        }));
    };

    const handleInputTenBaiBao = (e) => {
        setFormData((prev) => ({
            ...prev,
            tieude: e.target.value,
        }));
    };

    const handleInputTuKhoa = (e) => {
        setFormData((prev) => ({
            ...prev,
            tukhoa: e.target.value,
        }));
    };

    const handleInputNoiDung = (e) => {
        setFormData((prev) => ({
            ...prev,
            noidung: e,
        }));
    };

    const LoadingSpinner = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
            </div>
        );
    };

    return (
        <>
            {isLoading && <LoadingSpinner />}
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Nộp Bài Viết</h2>
            <ErrorDialog
                title={error.message}
                isOpen={error.isError}
                onClose={() => setError({ message: '', isError: false })}
            />
            <SuccessDialog
                isOpen={isSuccess}
                onClose={() => setIsSuccess(false)}
                title={'Gửi bài thành công'}
                titleButton={'Tiếp tục'}
            />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Article type selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <label className="block mb-2 font-bold">Loại bài viết</label>
                        <select
                            className="w-full p-2 border rounded"
                            onChange={handleInputChange}
                            value={formData.theloaiId}
                        >
                            <option value="">Chọn loại bài viết</option>
                            {theloai.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.tenloai}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Submission requirements */}
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Yêu cầu nộp bài</h3>
                    <p className="mb-2">
                        Bạn phải đọc và xác nhận rằng bạn đã hoàn thành các yêu cầu bên dưới trước khi tiếp tục
                    </p>
                    {[
                        'Sự phù hợp với mục đích - phạm vi của Tạp chí.',
                        'Sự tuân thủ các chính sách gửi bài, phản biện, biên tập của Tạp chí.',
                        'Sự phù hợp với thể lệ bài viết của Tạp chí.',
                        'Tác giả sử dụng mẫu bản thảo để chuẩn bị bài viết.',
                        'Tác giả chịu trách nhiệm hoàn toàn trước pháp luật về Bản quyền đối với bài viết.',
                        'Cam kết bài viết chưa từng được công bố trên bất kỳ tạp chí nào trước đó và không gửi bài đến tạp chí khác trong thời gian chờ xét duyệt.',
                    ].map((item, index) => (
                        <div key={index} className="flex items-start mb-2">
                            <input
                                type="checkbox"
                                className="mr-2 mt-1"
                                checked={checkboxes[index]}
                                onChange={() => handleCheckboxChange(index)}
                            />
                            <label className="flex-1">{item}</label>
                        </div>
                    ))}
                </div>

                {/* Article information */}
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Tên bài báo</label>
                    <input
                        type="text"
                        value={formData.tieude}
                        onChange={handleInputTenBaiBao}
                        className="w-full p-2 border rounded"
                        placeholder={'Nhập vào tên bài báo'}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Tóm tắt</label>
                    <ReactQuill theme="snow" value={formData.noidung} onChange={handleInputNoiDung} modules={modules} />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-bold">Từ khóa </label>
                    <input
                        type="text"
                        value={formData.tukhoa}
                        onChange={handleInputTuKhoa}
                        className="w-full p-2 border rounded"
                        placeholder={'Nhập từ khóa cho bài viết của bạn. Nhấn "Enter" sau mỗi từ khóa'}
                    />
                </div>

                {/* Image upload */}
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
                {/* File upload */}
                <div className="mb-6">
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50 hover:border-blue-600 hover:bg-blue-50 transition duration-300">
                        <label
                            htmlFor="upload"
                            className="flex flex-col items-center cursor-pointer text-blue-600 font-medium mb-4"
                        >
                            <CloudArrowUpIcon className="h-6 w-6 mb-2" />
                            <span>Tải tệp bản thảo</span>
                            <small>Nhấn vào đây để chọn tệp</small>
                        </label>
                        <input
                            type="file"
                            id="upload"
                            className="hidden"
                            onChange={handleFileChange}
                            multiple
                            accept=".pdf"
                        />
                        {fileName && <div className="mt-2 text-sm text-gray-600">File đã chọn: {fileName}</div>}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex flex-col sm:flex-row justify-between mt-6">
                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mb-2 sm:mb-0">
                        Trở lại
                    </button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Lưu
                    </button>
                </div>
            </form>
        </>
    );
};

export default SubmissionForm;
