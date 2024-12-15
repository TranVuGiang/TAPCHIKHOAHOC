import InputPost from '@/share/inputPost';
import WordForm from '@/share/wordForm';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid';

const SubmissionForm = () => {
    return (
      <>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Nộp Bài Viết</h2>
                <form>
                    {/* Form Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="block mb-2 font-bold">Ngôn ngữ</label>
                            <select className="w-full p-2 border rounded">
                                <option>Tiếng Việt</option>
                                <option>English</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-bold">Chuyên Mục</label>
                            <select className="w-full p-2 border rounded">
                                <option>QUẢN LÝ KINH TẾ</option>
                                <option>KHÁC</option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2 font-bold">Loại bài viết</label>
                            <select className="w-full p-2 border rounded">
                                <option>Báo cáo khoa học</option>
                                <option>Thảo luận</option>
                            </select>
                        </div>
                    </div>

                    {/* Submission Requirements */}
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

                    {/* Article Details */}
                    <InputPost title="Tên bài báo" placeholerTitle="Nhập tên bài báo" />

                    <InputPost title="Tên bài báo (EN)" placeholerTitle="Nhập tên bài báo (EN)" />

                    <WordForm title="Tóm tắt" />

                    <WordForm title="Tóm tắt (EN)" />

                    <InputPost
                        title="Từ khóa"
                        placeholerTitle={`Nhập từ khóa cho bài viết của bạn. Nhấn "Enter" sau mỗi từ khóa`}
                    />

                    <InputPost
                        title="Key name"
                        placeholerTitle={`Enter keywords for your article. Press "Enter" after each keyword`}
                    />

                    <WordForm title="Tài liệu tham khảo" />

                    {/* Co-authors Table */}
                    <div className="mb-4 overflow-x-auto">
                        <h3 className="font-semibold mb-2">Danh sách đồng tác giả</h3>
                        <table className="w-full border-collapse border">
                            <thead>
                                <tr>
                                    <th className="border p-2">Tên</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Điện thoại</th>
                                    <th className="border p-2">Đơn vị công tác</th>
                                    <th className="border p-2">Tác giả chính</th>
                                    <th className="border p-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="border p-2">Đức Lê Bùi Thiên</td>
                                    <td className="border p-2">lebuithienduc123@gmail.com</td>
                                    <td className="border p-2">0869499328</td>
                                    <td className="border p-2">Đại học công thương</td>
                                    <td className="border p-2 text-center">
                                        <input type="checkbox" checked readOnly />
                                    </td>
                                    <td className="border p-2 text-center">
                                        <button className="bg-red-500 text-white px-2 py-1 rounded">Xóa</button>
                                    </td>
                                </tr>
                                {/* Additional rows can be added dynamically */}
                            </tbody>
                        </table>
                        <button className="bg-green-500 text-white px-4 py-2 rounded mt-2">+ Thêm đồng tác giả</button>
                    </div>

                    {/* File Upload Section */}
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
                            <input type="file" id="upload" className="hidden" />
                        </div>
                    </div>

                    {/* Action Buttons */}
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