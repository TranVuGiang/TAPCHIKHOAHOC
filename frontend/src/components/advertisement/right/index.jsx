import img1 from '@/assets/1.png';
import img2 from '@/assets/2.png';
import img3 from '@/assets/banner1.png';
import img4 from '@/assets/banner2.png';
import ButtonAdver from "@/share/ButtonAdver";
import { useEffect, useState } from "react";

function AdverRight() {
    const images = [img1, img2, img3, img4];
    const durations = [7000, 5000, 4000, 3000]; // Thời gian mỗi slide
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, durations[currentIndex]);

        return () => clearTimeout(timer);
    }, [currentIndex, durations]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            (prevIndex - 1 + images.length) % images.length
        );
    };

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
                    <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white z-10">
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

export default AdverRight;
