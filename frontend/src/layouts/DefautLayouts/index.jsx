import bannerTop from '@/assets/1.png';
import bannerBottom from '@/assets/2.png';
import bannerLeft from '@/assets/banner1.png';
import bannerRight from '@/assets/banner2.png';
import AdPopup from '@/components/adverPopup';
import PromotionalBanner from '@/components/advertisement/bannerTop';
import AdverLeft from '@/components/advertisement/left';
import MobileAdverBottom from '@/components/advertisement/mobileBottom';
import MobileAdverTop from '@/components/advertisement/mobileTop';
import AdverRight from '@/components/advertisement/right';
import Footer from '@/components/footer';
import Header from '@/components/header';
function DefaultLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col font-montserrat">
            <PromotionalBanner />
            <AdPopup />
            <Header />

            <div className="flex flex-col md:flex-row flex-grow w-full">
                {/* Advertising sidebar - Left */}
                <AdverLeft src={bannerLeft}/>

                {/* Main content */}
                <div className="flex-grow w-full min-h-screen px-4 sm:px-6 md:px-8 py-6">
                    {/* Mobile top advertisement */}
                    <MobileAdverTop src={bannerTop} />
                    

                    {/* Main content area */}
                    <div className="max-w-5xl mx-auto bg-white rounded-lg font-montserrat">{children}</div>

                    {/* Mobile bottom advertisement */}
                    <MobileAdverBottom src={bannerBottom} />
                </div>

                {/* Advertising sidebar - Right */}
                <AdverRight src={bannerRight}/>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
