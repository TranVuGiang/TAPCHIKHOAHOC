import React from "react";
import image_assets from "@/assets/appsto.png";
import gg_play from "@/assets/gg_play.png";
import fb from "@/assets/fb.png";
import yt from "@/assets/yt.png";
import tt from "@/assets/tt.png"

const Footer = () => {//tên component
  return (//trả về nd UI
    <footer className="bg-gray-900 text-white py-12 font-montserrat">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        
        {/* Logo và tổ chức */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Khoa Học & Báo Chí</h2>
          <p className="text-gray-400">
            Nền tảng chia sẻ kiến thức khoa học và cập nhật tin tức báo chí đáng tin cậy.
          </p>
        </div>

        {/* Liên hệ tổ chức */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
          <ul>
            <li className="mb-2">
              <strong>Email:</strong> <a href="mailto:info@science-news.com" className="text-green-400">info@science-news.com</a>
            </li>
            <li className="mb-2">
              <strong>Điện thoại:</strong> <a href="tel:+84247336649" className="text-green-400">+84 24 7336 649</a>
            </li>
            <li className="mb-2">
              <strong>Địa chỉ:</strong> 123 Khoa Học Street, Quận 3, TP. HCM
            </li>
          </ul>
        </div>

        {/* Download theo mxh */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Tải ứng dụng</h3>
          <div className="flex space-x-4">
            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded">
              <img src={image_assets} alt="App Store" className="h-10" />
            </a>
            <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded">
              <img src={gg_play} alt="Google Play" className="h-10" />
            </a>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded">
                <img src={fb} alt="Facebook" className="h-10 w-38" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded">
                <img src={yt} alt="YouTube" className="h-10" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded">
                <img src={tt} alt="TikTok" className="h-10" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Phần cuối */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        &copy; 2024 Khoa Học & Báo Chí. Bản quyền thuộc về nền tảng của chúng tôi. Mọi sao chép đều cần có sự đồng ý bằng văn bản.
      </div>
    </footer>
  );
};

export default Footer;
