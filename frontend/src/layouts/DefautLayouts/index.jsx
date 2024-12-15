import bannerTop from '@/assets/1.png';
import bannerBottom from '@/assets/2.png';
import AdPopup from '@/components/adverPopup';
import MobileAdverBottom from '@/components/advertisement/mobileBottom';
import MobileAdverTop from '@/components/advertisement/mobileTop';
import Footer from '@/components/footer';
import Header from '@/components/header';
function DefaultLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col font-montserrat">
            <AdPopup />
            <Header />
            {/* <PromotionalBanner /> */}

            <div className="flex flex-col md:flex-row flex-grow w-full">
                {/* Advertising sidebar - Left */}
                {/* <AdverLeft /> */}
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
                {/* <AdverRight/> */}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
