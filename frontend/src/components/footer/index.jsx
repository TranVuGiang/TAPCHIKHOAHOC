
const Footer = () => {
  const teamMembers = [
    { name: "Trần Vũ Giang", id: "PS33213" },
    { name: "Dương Thái Bảo", id: "PS33207" },
    { name: "Phạm Văn Hiếu", id: "PS33100" },
    { name: "Nguyễn Thành Nhân", id: "PS33207" },
    { name: "Lâm Hoài Thương", id: "PS33271" }
  ];

  return (
      <footer className="bg-gray-900 text-white py-12 font-montserrat">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {/* Project Information */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-green-400">Đề Tài Tốt Nghiệp</h2>
            <p className="text-gray-300 text-lg font-semibold mb-2">
              Xây Dựng Website Tin Tức Khoa Học
            </p>
            <p className="text-gray-400">
              Nền tảng chia sẻ kiến thức và cập nhật thông tin khoa học đáng tin cậy.
            </p>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-green-400">Thành Viên</h3>
            <ul className="space-y-3">
              {teamMembers.map((member, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-gray-300">{member.name}</span>
                    <span className="text-green-400 font-mono">- {member.id}</span>
                  </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-green-400">Liên Hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <span className="text-gray-300">Email:</span>
                <a href="mailto:contact@fpt.edu.vn" className="text-green-400 hover:text-green-300">
                  giangtvps33213@fpt.edu.vn
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-gray-300">Địa chỉ:</span>
                <span className="text-gray-400">
                FPT Polytechnic CS3, TP. HCM
              </span>
              </li>
              <li className="mt-6">
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-800 hover:bg-gray-700 p-2 rounded transition duration-300">
                    <svg className="h-6 w-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} FPT Polytechnic. Đề tài tốt nghiệp - Ngành Công nghệ thông tin
        </div>
      </footer>
  );
};

export default Footer;