import PdfGenerator from '@/components/inhoadon';
import { createUrlSlug } from "@/utils/urlUtils.jsx";
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export default function Advertisement() {
  const [selectedPlan, setSelectedPlan] = useState('day');
  const navigate = useNavigate();

  const plans = {
    day: {
      name: 'Gói Ngày',
      price: '4$',
      period: 'ngày',
      features: [
        'Quyền đọc quảng cáo ngắn',
        'Hiển thị quảng cáo theo chủ đề',
        'Truy cập quảng cáo 24h'
      ],
    },
    month: {
      name: 'Gói Tháng',
      price: '30$',
      period: 'tháng',
      features: [
        'Tất cả quyền lợi gói ngày',
        'Hiển thị quảng cáo liên tục',
        'Tùy chọn thêm chủ đề quảng cáo',
        'Quyền theo dõi phân tích quảng cáo'
      ],
    },
    year: {
      name: 'Gói Năm',
      price: '100$',
      period: 'năm',
      features: [
        'Tất cả quyền lợi gói tháng',
        'Hiển thị quảng cáo ưu tiên',
        'Báo cáo phân tích chi tiết',
        'Tối ưu hóa quảng cáo theo xu hướng'
      ],
    }
  };

  const handleSlug = () => {
    // Lấy tên của gói đã chọn và tạo slug
    const slug = createUrlSlug(plans[selectedPlan].name)
    navigate(`/home/${slug}`)
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
        <h2 className="text-4xl font-bold mb-8 text-center text-indigo-800">Nâng cấp gói Quảng cáo</h2>

        <div className="flex justify-center mb-8 space-x-4">
          {Object.keys(plans).map((plan) => (
              <button
                  key={plan}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                      selectedPlan === plan
                          ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                          : 'bg-white text-indigo-600 hover:bg-indigo-100'
                  }`}
                  onClick={() => setSelectedPlan(plan)}
              >
                {plans[plan].name}
              </button>
          ))}
        </div>

        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105">
          <h3 className="text-2xl font-bold mb-2 text-indigo-800">{plans[selectedPlan].name}</h3>
          <p className="text-4xl font-bold text-indigo-600 mb-4">
            {plans[selectedPlan].price}
            <span className="text-lg font-normal text-gray-500">/{plans[selectedPlan].period}</span>
          </p>
          <ul className="space-y-3">
            {plans[selectedPlan].features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
            ))}
          </ul>
          <button
              onClick={handleSlug}
              className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
          >
            Chọn Gói Này
          </button>
          <PdfGenerator />
        </div>
      </div>
  );
}