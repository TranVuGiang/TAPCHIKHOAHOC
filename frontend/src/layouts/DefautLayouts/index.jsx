import bannerLeft from "@/assets/banner1.png";
import bannerRight from "@/assets/banner2.png";
import AdPopup from "@/components/adverPopup";
import PromotionalBanner from "@/components/advertisement/bannerTop";
import AdverLeft from "@/components/advertisement/left";
import AdverRight from "@/components/advertisement/right";
import Footer from "@/components/footer";
import Header from "@/components/header";
function DefaultLayout({ children }) {
    return ( 
        <div className="min-h-screen flex flex-col">
            <PromotionalBanner />
            <AdPopup />
            <Header />
            
            <div className="flex flex-col md:flex-row flex-grow w-full">
                {/* Advertising sidebar - Left */}
                <AdverLeft>
                    <img src={bannerLeft} alt="Banner Left" className="h-full w-full rounded-lg shadow-gray-800"/>
                </AdverLeft>

                {/* Main content */}
                <div className="flex-grow w-full min-h-screen px-4 sm:px-6 md:px-8 py-6">
                    {/* Mobile top advertisement */}
                    <div className="md:hidden w-full mb-6">
                        <div className="h-[200px] bg-slate-100 rounded-lg flex items-center justify-center">
                            <span className="text-slate-600">Mobile Advertisement</span>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="max-w-5xl mx-auto bg-white rounded-lg font-montserrat">
                        {children}
                    </div>

                    {/* Mobile bottom advertisement */}
                    <div className="md:hidden w-full mt-6">
                        <div className="h-[200px] bg-slate-100 rounded-lg flex items-center justify-center">
                            <span className="text-slate-600">Mobile Advertisement</span>
                        </div>
                    </div>
                </div>

                {/* Advertising sidebar - Right */}
                <AdverRight>
                    <img src={bannerRight} alt="Banner Right" className="h-full rounded-lg shadow-gray-800"/>
                </AdverRight>
            </div>
            <Footer />
        </div>
     );
}

export default DefaultLayout;