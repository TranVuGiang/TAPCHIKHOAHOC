import { authService } from '@/utils/authService';
import { createUrlSlug } from '@/utils/urlUtils.jsx';
import { AlertCircle, Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Advertisement() {
    const [selectedPlan, setSelectedPlan] = useState('');
    const navigate = useNavigate();
    const [quangcao, setQuangcao] = useState([]);

    // Updated features to match specific ad placements
    const adPlanFeatures = {
        1: {
            name: 'Vị trí cuối trang',
            features: [
                'Hiển thị quảng cáo tại cuối trang',
                'Tiếp cận người dùng kết thúc nội dung',
                'Vị trí hiển thị cố định',
            ],
        },
        2: {
            name: 'Vị trí popup',
            features: ['Hiển thị quảng cáo dạng popup', 'Thu hút chú ý người dùng', 'Hiệu ứng xuất hiện mềm mại'],
        },
        3: {
            name: 'Vị trí đầu trang',
            features: [
                'Hiển thị quảng cáo ngay đầu trang',
                'Tiếp cận người dùng ngay khi vào trang',
                'Vị trí ưu tiên và nổi bật',
            ],
        },
    };

    useEffect(() => {
        loadQC();
    }, []);

    const loadQC = async () => {
        try {
            const resp = await authService.loadQC();

            // Transform the fetched data with additional details
            const transformedPlans = resp.data.map((plan) => ({
                ...plan,
                name: adPlanFeatures[plan.bgqcId].name,
                features: adPlanFeatures[plan.bgqcId].features,
                period: plan.songay + ' ngày',
            }));

            setQuangcao(transformedPlans);

            // Set the first available plan as selected by default
            const availablePlans = transformedPlans.filter((plan) => plan.conqc);
            if (availablePlans.length > 0) {
                setSelectedPlan(availablePlans[0].tengoi);
            }
        } catch (error) {
            console.error('Error loading advertisement plans:', error);
        }
    };

    const handleSlug = (plan) => {
        const selectedPlanData = quangcao.find((p) => p.tengoi === selectedPlan);
        if (selectedPlanData) {
            const slug = createUrlSlug(selectedPlanData.name);
            navigate(`/home/option_advertisement/${slug}`, { state: { quangcao: selectedPlanData } });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
            <h2 className="text-4xl font-bold mb-8 text-center text-indigo-800">Nâng cấp Quảng Cáo</h2>

            <div className="flex justify-center mb-8 space-x-4">
                {quangcao.map((plan) => (
                    <button
                        key={plan.bgqcId}
                        className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 relative overflow-hidden ${
                            selectedPlan === plan.tengoi
                                ? 'bg-indigo-600 text-white shadow-lg transform scale-105'
                                : `${plan.conqc ? 'bg-white text-indigo-600 hover:bg-indigo-100' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`
                        } ${!plan.conqc ? 'grayscale opacity-50' : ''}`}
                        onClick={() => plan.conqc && setSelectedPlan(plan.tengoi)}
                        disabled={!plan.conqc}
                    >
                        {plan.name}
                        {!plan.conqc && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    Hết hàng
                                </div>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {quangcao.map((plan) => {
                if (plan.tengoi !== selectedPlan) return null;

                return (
                    <div
                        key={plan.bgqcId}
                        className={`max-w-md mx-auto bg-white p-8 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 ${
                            !plan.conqc ? 'grayscale opacity-50' : ''
                        }`}
                    >
                        <div className="relative">
                            {!plan.conqc && (
                                <div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm transform rotate-12">
                                    Hết hàng
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2 text-indigo-800">{plan.name}</h3>
                            <p className="text-4xl font-bold text-indigo-600 mb-4">
                                {plan.giatien}
                                <span className="text-lg font-normal text-gray-500">/ {plan.period}</span>
                            </p>

                            {!plan.conqc ? (
                                <div className="flex items-center text-red-500 mb-4">
                                    <AlertCircle className="mr-2" />
                                    <span>Gói này hiện tại không khả dụng</span>
                                </div>
                            ) : (
                                <>
                                    <ul className="space-y-3 mb-4">
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
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
