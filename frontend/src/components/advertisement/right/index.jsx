import ButtonAdver from '@/share/ButtonAdver';

function AdverRight({ src }) {
    return (
        <div className="hidden md:block w-full md:w-[450px] mt-2">
            {/* Ad content */}
            <div className="sticky top-4 p-4">
                <div className="h-[600px] bg-slate-200 rounded-lg flex items-center justify-center relative">
                    <img src={src} alt="Banner Right" className="h-full rounded-lg shadow-gray-800" />

                    <div className="absolute bottom-5 text-white ">
                        <ButtonAdver>Join Now</ButtonAdver>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdverRight;
