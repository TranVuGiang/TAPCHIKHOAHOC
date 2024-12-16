import AdPopup from '@/components/adverPopup';
import MobileAdverTop from '@/components/advertisement/mobileTop';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';
function DefaultLayout({ children }) {
    const [quangcao, setQuangcao] = useState([]);

    useEffect(() => {
        xemQuangCao();
        loadQuangCao();
    }, []);

    const loadQuangCao = async () => {
        try {
            const resp = await authService.dangQuangCao();
            setQuangcao(resp.data);
        } catch (error) {
            console.log(error);
        }
    };

    const xemQuangCao = async () => {
        try {
            await authService.xemQuangCao('1');
            await authService.xemQuangCao('2');
            await authService.xemQuangCao('3');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col font-montserrat">
            <AdPopup quangcao3={quangcao} />
            <Header />
            {/* <PromotionalBanner /> */}

            <div className="flex flex-col md:flex-row flex-grow w-full">
                {/* Advertising sidebar - Left */}
                {/* <AdverLeft /> */}
                {/* Main content */}
                <div className="flex-grow w-full min-h-screen px-4 sm:px-6 md:px-8 py-6">
                    {/* Mobile top advertisement */}
                    <MobileAdverTop quangcao1={quangcao} />

                    {/* Main content area */}
                    <div className="max-w-5xl mx-auto bg-white rounded-lg font-montserrat">{children}</div>

                    {/* Mobile bottom advertisement */}
                    {/* <MobileAdverBottom src={bannerBottom} /> */}
                </div>

                {/* Advertising sidebar - Right */}
                {/* <AdverRight/> */}
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
