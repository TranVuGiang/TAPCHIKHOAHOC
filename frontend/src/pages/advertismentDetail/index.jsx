import { authService } from '@/utils/authService';
// import { log } from 'console';
import { AlertCircle, Calendar, Check, FileCodeIcon } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import fontkit from '@pdf-lib/fontkit';

export default function ChiTietQuangCao() {
    const location = useLocation();
    const navigate = useNavigate();
    const [quangcao, setQuangcao] = useState(null);
    const [nguoiDung, setNguoiDung] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userDetail, setUserDetail] = useState([]);

    useEffect(() => {
        loadDataUser();
    }, []);

    const generatePdf = async () => {
        try {
            const dataUser = {
                name: 'Nguyễn Văn A',
                birthday: '27/03/2004',
                numberPhone: '0123456789',
                email: 'tvugiang@gmail.com',
            };
            const dataHoaDon = {
                loaiQC: 'Theo năm',
                giaTien: '30.000.000VND',
                soNgay: '365',
                ngayBD: '12/09/2024',
                ngayKT: '12/09/2025',
            };
            const dataThanhToan = {
                tongTien: '30.000.000VND',
                phuongThucTT: 'Chuyển khoảng',
                thoiHanTT: '14/09/2024',
            };
            // Đường dẫn đến file PDF mẫu
            const templateUrl = '/HoaDonQuangCao.pdf';
            const fontUrl = '/fonts/font-times-new-roman.ttf';
            // Tải file PDF mẫu
            const existingPdfBytes = await fetch(templateUrl).then((res) => res.arrayBuffer());
            // Tải font Unicode
            const fontResp = await fetch(fontUrl);
            const fontBytes = await fontResp.arrayBuffer();

            // Tạo tài liệu từ file mẫu
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            pdfDoc.registerFontkit(fontkit);
            const CustomFont = await pdfDoc.embedFont(fontBytes);
            // Lấy trang đầu tiên
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];

            // Thông tin khách hàng
            firstPage.drawText(`${dataUser.name}`, {
                x: 230,
                y: 395,
                font: CustomFont,
                size: 14,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(`${dataUser.birthday}`, {
                x: 430,
                y: 395,
                font: CustomFont,
                size: 14,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(`${dataUser.numberPhone}`, {
                x: 225,
                y: 370,
                font: CustomFont,
                size: 14,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(`${dataUser.email}`, {
                x: 360,
                y: 370,
                font: CustomFont,
                size: 14,
                color: rgb(0, 0, 0),
            });

            // Thông tin quảng cáo
            firstPage.drawText(`${dataHoaDon.loaiQC}`, {
                x: 220,
                y: 317,
                font: CustomFont,
                size: 14,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(`${dataHoaDon.giaTien}`, {
                x: 220,
                y: 300,
                font: CustomFont,
                size: 14,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(`${dataHoaDon.soNgay}`, {
                x: 220,
                y: 282,
                font: CustomFont,
                size: 14,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(`${dataHoaDon.ngayBD}`, {
                x: 220,
                y: 265,
                font: CustomFont,
                size: 14,
                color: rgb(0, 0, 0),
            });
            firstPage.drawText(`${dataHoaDon.ngayKT}`, {
                x: 420,
                y: 265,
                font: CustomFont,
                size: 14,
                color: rgb(0, 0, 0),
            });

            // Lưu file PDF đã chỉnh sửa
            const pdfBytes = await pdfDoc.save();

            // Tạo và tải file PDF mới
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'contract.pdf';
            a.click();

            // Dọn dẹp URL object
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Lỗi khi tạo PDF:', error);
        }
    };

    const loadDataUser = async () => {
        try {
            const current = JSON.parse(localStorage.getItem('currentUser'));
            const token = current.token;
            const fetchData = await authService.getUserDetails(token);
            const informationUser = fetchData.data.user;
            console.log('Thông tin người dùng:', informationUser);
            setUserDetail(informationUser);
            setIsLoading(false);
        } catch (error) {
            console.log(error.message || 'Lỗi nớ');
            setIsLoading(false);
        }
    };
    // Mapping of ad placement details
    const adPlanDetails = {
        1: {
            fullName: 'Vị trí Quảng Cáo Cuối Trang',
            benefits: [
                'Quảng cáo hiển thị tại vị trí cuối trang',
                'Tiếp cận người dùng sau khi xem nội dung',
                'Vị trí hiển thị ổn định',
            ],
        },
        2: {
            fullName: 'Vị trí Quảng Cáo Popup',
            benefits: ['Quảng cáo hiển thị dạng popup', 'Thu hút chú ý người dùng', 'Hiệu ứng xuất hiện nổi bật'],
        },
        3: {
            fullName: 'Vị trí Quảng Cáo Đầu Trang',
            benefits: [
                'Quảng cáo hiển thị ngay đầu trang',
                'Tiếp cận người dùng ngay khi vào trang',
                'Vị trí ưu tiên nhất',
            ],
        },
    };

    useEffect(() => {
        // Check if there's data passed from navigation state
        if (!location.state?.quangcao) {
            // Redirect back to advertisement selection page
            navigate('/home/option_advertisement');
            return;
        }

        // Get advertisement information from navigation state
        const advertisementData = location.state.quangcao;

        // Enhance the advertisement data with full details
        const enhancedQuangcao = {
            ...advertisementData,
            fullName: adPlanDetails[advertisementData.bgqcId]?.fullName || advertisementData.tengoi,
            benefits: adPlanDetails[advertisementData.bgqcId]?.benefits || [],
        };

        setQuangcao(enhancedQuangcao);

        // Get user information from localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            setNguoiDung(currentUser);
        }
    }, [location, navigate]);

    const taohopdong = async (bgqcid) => {
        setIsLoading(true);
        try {
            const resp = await authService.taoHopDong({
                token: nguoiDung.token,
                bgqcid: bgqcid,
            });
            console.log('Tạo hợp đồng thành công:', resp);
            if (resp.data) {
                taoThanhToan(
                    'ADS - ' + resp.data.bangGiaQC.songay + ' Days',
                    resp.data.bangGiaQC.tengoi,
                    resp.data.bangGiaQC.giatien,
                    nguoiDung.token,
                    resp.data.hopDong.hopdong_id,
                    resp.data.bangGiaQC.bgqcId,
                );
            }
        } catch (error) {
            console.error('Lỗi tạo hợp đồng:', error);
            setError('Không thể tạo hợp đồng. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const taoThanhToan = async (productName, description, price, token, hopdong_id, bgqcId) => {
        setIsLoading(true);

        try {
            const resp = await authService.taoThanhToan(productName, description, price, token, hopdong_id, bgqcId);
            window.location.href = resp.data.checkoutData.checkoutUrl;
            console.log('Tạo thanh toán thành công:', resp);
        } catch (error) {
            console.error('Lỗi tạo thanh toán:', error);
            setError('Không thể tạo thanh toán. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    // Loading spinner component
    const LoadingSpinner = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500" />
        </div>
    );

    if (!quangcao) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
                    <p className="mt-4 text-lg text-gray-700">Không tìm thấy thông tin quảng cáo</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
            {isLoading && <LoadingSpinner />}
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                {/* Title and General Information */}
                <div className="bg-indigo-600 text-white p-6">
                    <h1 className="text-3xl font-bold">{quangcao.fullName}</h1>
                    <div className="flex items-center mt-2">
                        <Calendar className="mr-2" size={20} />
                        <span>Thời hạn: {quangcao.songay} ngày</span>
                    </div>
                </div>

                {/* Detailed Information */}
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <p className="text-2xl font-bold text-indigo-700">{quangcao.giatien}</p>
                    </div>

                    {/* Package Benefits */}
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3 text-indigo-800">Quyền lợi gói</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <Check className="mr-2 text-green-500" size={20} />
                                <span>Quảng cáo cho {quangcao.songay} ngày</span>
                            </li>
                            {quangcao.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-center">
                                    <Check className="mr-2 text-green-500" size={20} />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Create Contract Button */}
                    <div className="mt-6">
                        {error && (
                            <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded mb-4 flex items-center">
                                <AlertCircle className="mr-2 text-red-500" size={20} />
                                <span>{error}</span>
                            </div>
                        )}
                        <button
                            className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300"
                            onClick={() => taohopdong(quangcao.bgqcId)}
                        >
                            <FileCodeIcon className="mr-2" size={20} />
                            Tạo Hợp Đồng Quảng Cáo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
