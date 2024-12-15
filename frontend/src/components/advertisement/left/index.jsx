import img1 from '@/assets/1.png';
import img2 from '@/assets/2.png';
import img3 from '@/assets/banner1.png';
import img4 from '@/assets/banner2.png';
import ButtonAdver from "@/share/ButtonAdver";
import { useEffect, useState } from "react";

function AdverLeft() {
    const images = [img1, img2, img3, img4];
    const durations = [8000, 6000, 3000, 3000]; // Thời gian (ms) cho mỗi slide
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTransitioning(true); // Bắt đầu hiệu ứng chuyển
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setIsTransitioning(false); // Kết thúc hiệu ứng chuyển
            }, 500); // Thời gian chuyển mượt (500ms)
        }, durations[currentIndex]);

        return () => clearTimeout(timer);
    }, [currentIndex, durations]);

    return (
        <div className="hidden md:block w-full md:w-[450px] mt-2">
            {/* Ad content */}
            <div className="sticky top-4 p-4">
                <div className="h-[600px] bg-slate-200 rounded-lg relative overflow-hidden">
                    {/* Slide container */}
                    <div
                        className={`flex w-full h-full transition-transform duration-500 ease-in-out`}
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                        }}
                    >
                        {images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Banner ${index}`}
                                className="w-full h-full rounded-lg object-cover flex-shrink-0"
                            />
                        ))}
                    </div>

                    {/* ButtonAdver */}
                    <div className="absolute bottom-5 left-[70px] text-white ">
                        <ButtonAdver>Join Now</ButtonAdver>
                    </div>

                
                </div>

                {/* Indicator Dots */}
                <div className="flex justify-center mt-4 space-x-2">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-3 h-3 rounded-full cursor-pointer ${
                                currentIndex === index
                                    ? "bg-gray-800"
                                    : "bg-gray-400"
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdverLeft;
