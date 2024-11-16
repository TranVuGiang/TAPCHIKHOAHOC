import { authService } from '@/utils/authService';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

const SubmissionForm = () => {
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
    const [formData, setFormData] = useState({
        theloaiId: '',
        tieude: '',
        noidung: '',
        tukhoa: '',
        file: null,
    });
    const [fileName, setFileName] = useState(''); // State để hiển thị tên file

    const handleFileUpload = async (e) => {
        e.preventDefault()
        const fileInput = e.target.files[0];
        if (fileInput) {
            setFileName(fileInput.name);
            console.log(fileInput);
            const formData = new FormData();
            formData.append('files', fileInput);

            try {
                console.log(formData);
                const response = await authService.uploadFile(formData);
                console.log('File uploaded successfully:', response);
                // Có thể thêm xử lý response ở đây nếu cần
            } catch (error) {
                console.error('Error uploading file:', error);
                // Xử lý lỗi ở đây
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await authService.getAllTheLoai();
                setTheloai(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const handleTest = async () => {
        try {
            alert(JSON.stringify(formData));
        } catch (error) {
            console.log(error);
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

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Nộp Bài Viết</h2>
            <form encType="multipart/form-data">
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
                            <input type="checkbox" className="mr-2 mt-1" />
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
                        <input type="file" id="upload" className="hidden" onChange={handleFileUpload} multiple accept=".pdf"/>
                        {fileName && <div className="mt-2 text-sm text-gray-600">File đã chọn: {fileName}</div>}
                    </div>
                </div>

                {/* Navigation buttons */}
                <div className="flex flex-col sm:flex-row justify-between mt-6">
                    <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mb-2 sm:mb-0">
                        Trở lại
                    </button>
                    <button onClick={() => handleTest()} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Lưu
                    </button>
                </div>
            </form>
        </>
    );
};

export default SubmissionForm;
