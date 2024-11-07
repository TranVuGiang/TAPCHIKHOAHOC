
function MobileAdverBottom({ src }) {
    return (
        <div className="md:hidden w-full mt-6">
            <div className="relative h-100px] bg-slate-100 rounded-lg overflow-hidden shadow-lg">
                <img src={src} alt="Banner Top" className="h-full w-full object-cover rounded-lg" />
                
                {/* Lớp phủ tối nhẹ */}
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
            </div>
        </div>
    );
}

export default MobileAdverBottom;