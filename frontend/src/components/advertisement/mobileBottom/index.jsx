import img1 from '@/assets/1.png';
import img2 from '@/assets/2.png';
import img3 from '@/assets/banner1.png';
import img4 from '@/assets/banner2.png';
import { useEffect, useState } from 'react';
function MobileAdverBottom() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [img1, img2, img3, img4];
    useEffect(() => {
        // Tự động chuyển slide sau mỗi 5 giây
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
    }, [images.length]);

    return (
        <div className="md:hidden w-full mt-6">
            <div className="relative h-[100px] bg-slate-100 rounded-lg overflow-hidden shadow-lg">
                {/* Hiển thị hình ảnh */}
                <img
                    src={images[currentIndex]}
                    alt={`Banner ${currentIndex}`}
                    className="h-full w-full object-cover rounded-lg transition-opacity duration-1000 ease-in-out"
                />

                {/* Lớp phủ tối nhẹ */}
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>

                {/* Dots Indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MobileAdverBottom;
