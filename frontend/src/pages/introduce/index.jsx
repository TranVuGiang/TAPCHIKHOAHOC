import React from 'react';
import { Newspaper, Book, Users, Globe, Award, Clock } from 'lucide-react';

export default function Introduce() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Chào mừng đến với Tạp chí Khoa học
          </h1>
          <p className="text-lg text-gray-600">
            Nơi chia sẻ kiến thức, nghiên cứu và những thông tin giá trị trong cộng đồng học thuật
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">1000+</div>
            <div className="text-gray-600">Bài báo đã xuất bản</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">500+</div>
            <div className="text-gray-600">Tác giả tin cậy</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">50k+</div>
            <div className="text-gray-600">Độc giả thường xuyên</div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Newspaper className="h-8 w-8 text-cyan-600 mr-3" />
              <h3 className="text-xl font-semibold">Nội dung chất lượng</h3>
            </div>
            <p className="text-gray-600">
              Mọi bài viết đều được thẩm định kỹ lưỡng bởi các chuyên gia trong lĩnh vực
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Book className="h-8 w-8 text-cyan-600 mr-3" />
              <h3 className="text-xl font-semibold">Đa dạng chủ đề</h3>
            </div>
            <p className="text-gray-600">
              Bao quát nhiều lĩnh vực từ khoa học, công nghệ đến văn hóa, xã hội
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-cyan-600 mr-3" />
              <h3 className="text-xl font-semibold">Cộng đồng học thuật</h3>
            </div>
            <p className="text-gray-600">
              Kết nối các nhà nghiên cứu, học giả và độc giả quan tâm đến khoa học
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Về chúng tôi</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Tạp chí Khoa học là nền tảng uy tín trong việc xuất bản và chia sẻ các công trình nghiên cứu, 
              bài báo khoa học chất lượng cao. Chúng tôi cam kết mang đến những nội dung giá trị, 
              được thẩm định kỹ lưỡng và có tính ứng dụng cao.
            </p>
            <p>
              Với đội ngũ biên tập viên giàu kinh nghiệm và quy trình xuất bản chuyên nghiệp, 
              chúng tôi tự hào là cầu nối tin cậy giữa các nhà nghiên cứu và độc giả.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Globe className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tầm nhìn toàn cầu</h3>
            <p className="text-gray-600">
              Kết nối tri thức không giới hạn không gian và thời gian
            </p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Chất lượng hàng đầu</h3>
            <p className="text-gray-600">
              Cam kết duy trì tiêu chuẩn cao nhất trong xuất bản học thuật
            </p>
          </div>
          <div className="text-center">
            <Clock className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cập nhật liên tục</h3>
            <p className="text-gray-600">
              Luôn cập nhật những xu hướng và phát triển mới nhất
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}