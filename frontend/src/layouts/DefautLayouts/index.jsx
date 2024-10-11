import Footer from "@/components/footer";
import Header from "@/components/header";

function DefaultLayout({ children }) {
    return ( 
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-col md:flex-row flex-grow w-full">
                {/* Advertising sidebar - Left */}
                <div className="hidden md:block w-full md:w-[420px] bg-slate-100">
                    {/* Ad content */}
                    <div className="sticky top-4 p-4">
                        <div className="h-[600px] bg-slate-200 rounded-lg flex items-center justify-center">
                            <span className="text-slate-600">Advertisement Space</span>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="flex-grow w-full min-h-screen px-4 sm:px-6 md:px-8 py-6">
                    {/* Mobile top advertisement */}
                    <div className="md:hidden w-full mb-6">
                        <div className="h-[200px] bg-slate-100 rounded-lg flex items-center justify-center">
                            <span className="text-slate-600">Mobile Advertisement</span>
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="max-w-4xl mx-auto">
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
                <div className="hidden md:block w-full md:w-[420px] bg-slate-100">
                    {/* Ad content */}
                    <div className="sticky top-4 p-4">
                        <div className="h-[600px] bg-slate-200 rounded-lg flex items-center justify-center">
                            <span className="text-slate-600">Advertisement Space</span>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
     );
}

export default DefaultLayout;