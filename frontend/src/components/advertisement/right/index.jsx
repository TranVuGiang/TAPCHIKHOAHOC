import ButtonAdver from "@/share/ButtonAdver";

function AdverRight({ children }) {
    return (
        <div className="hidden md:block w-full md:w-[450px] mt-2">
            {/* Ad content */}
            <div className="sticky top-4 p-4">
                <div className="h-[600px] bg-slate-200 rounded-lg flex items-center justify-center relative">
                    {children}
                    <div className="absolute bottom-5 text-white ">
                        <ButtonAdver>Join Now</ButtonAdver>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdverRight;
