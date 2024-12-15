import { authService } from '@/utils/authService';
import { createUrlSlug } from '@/utils/urlUtils.jsx';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Advertisement() {
    const [selectedPlan, setSelectedPlan] = useState('');
    const navigate = useNavigate();
    const [quangcao, setQuangcao] = useState([]);

    // Predefined features for each plan type
    const baseFeatures = {
        7: ['Quyền đọc quảng cáo ngắn', 'Hiển thị quảng cáo theo chủ đề', 'Truy cập quảng cáo 24h'],
        30: [
            'Tất cả quyền lợi gói 3 ngày',
            'Hiển thị quảng cáo liên tục',
            'Tùy chọn thêm chủ đề quảng cáo',
            'Quyền theo dõi phân tích quảng cáo',
        ],
        365: [
            'Tất cả quyền lợi gói 5 ngày',
            'Hiển thị quảng cáo ưu tiên',
            'Báo cáo phân tích chi tiết',
            'Tối ưu hóa quảng cáo theo xu hướng',
        ],
    };

    useEffect(() => {
        loadQC();
    }, []);

    const loadQC = async () => {
        try {
            const resp = await authService.loadQC();

            // Transform the fetched data to include additional plan information
            const transformedPlans = resp.data.map((plan) => ({
                ...plan,
                name: plan.tengoi,
                period: plan.songay.toString() + 'ngày',
                features: baseFeatures[plan.songay.toString()] || [],
            }));

            setQuangcao(transformedPlans);

            // Set the first plan as selected by default
            if (transformedPlans.length > 0) {
                setSelectedPlan(transformedPlans[0].tengoi);
            }
        } catch (error) {
            console.error('Error loading advertisement plans:', error);
        }
    };

    const handleSlug = (plan) => {
      // Find the selected plan
      const selectedPlanData = quangcao.find((p) => p.tengoi === selectedPlan);
      if (selectedPlanData) {
          const slug = createUrlSlug(selectedPlanData.name);
          // Sử dụng state hoặc context để truyền dữ liệu
          navigate(`/home/option_advertisement/${slug}`, { state: { quangcao: selectedPlanData } });
      }
  };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
            <h2 className="text-4xl font-bold mb-8 text-center text-indigo-800">Nâng cấp gói Quảng cáo</h2>

            <div className="flex justify-center mb-8 space-x-4">
                {quangcao.map((plan) => (
                    <button
                        key={plan.banggiaqc_id}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                            selectedPlan === plan.tengoi
                                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                                : 'bg-white text-indigo-600 hover:bg-indigo-100'
                        }`}
                        onClick={() => setSelectedPlan(plan.tengoi)}
                    >
                        {plan.name}
                    </button>
                ))}
            </div>

            {quangcao.map((plan) => {
                if (plan.tengoi !== selectedPlan) return null;

                return (
                    <div
                        key={plan.banggiaqc_id}
                        className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105"
                    >
                        <h3 className="text-2xl font-bold mb-2 text-indigo-800">{plan.name}</h3>
                        <p className="text-4xl font-bold text-indigo-600 mb-4">
                            {plan.giatien.toLocaleString()}₫
                            <span className="text-lg font-normal text-gray-500">/ {plan.period}</span>
                        </p>
                        <ul className="space-y-3">
                            {plan.features.map((feature, index) => (
                                <li key={index} className="flex items-center">
                                    <Check className="h-5 w-5 text-green-500 mr-2" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => handleSlug(plan)}
                            className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                        >
                            Chọn Gói Này 
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
