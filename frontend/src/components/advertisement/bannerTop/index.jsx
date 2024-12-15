import { ArrowRight, Star, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const PromotionalBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);

  const promos = [
    {
      title: "Ưu đãi đặc biệt! 🎉",
      description: "Giảm giá 50% cho người dùng mới",
      cta: "Đăng ký ngay"
    },
    {
      title: "Flash Sale! ⚡",
      description: "Chỉ còn 24h để nhận ưu đãi khủng",
      cta: "Xem ngay"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promos.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="w-full h-[100px] bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg">
      <div className="h-full max-w-7xl mx-auto px-4 relative">
        <div className="flex items-center justify-center h-full animate-fade-in">
          <div className="hidden sm:flex items-center">
            <Star className="h-8 w-8 mr-4 animate-pulse" />
          </div>
          
          <div className="text-center flex-1">
            <p className="font-bold text-2xl transition-all duration-500 ease-in-out">
              {promos[currentPromo].title}
            </p>
            <p className="text-base mt-2 transition-all duration-500 ease-in-out">
              {promos[currentPromo].description}
            </p>
          </div>

          <button className="hidden sm:flex items-center bg-white text-purple-600 px-6 py-3 rounded-full font-semibold text-base hover:bg-opacity-90 transition-all duration-300 ml-4">
            {promos[currentPromo].cta}
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>

          <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-200 transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromotionalBanner;