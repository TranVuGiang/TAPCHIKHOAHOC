import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, rgb } from 'pdf-lib';
const PdfGenerator = () => {
    // Hàm xử lý khi bấm nút tạo PDF
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

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>In hợp đồng PDF</h1>
            <button
                onClick={generatePdf}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Tạo PDF
            </button>
        </div>
    );
};

export default PdfGenerator;
