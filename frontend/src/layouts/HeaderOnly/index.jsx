import Footer from "@/components/footer";
import Header from "@/components/header";

function HeaderOnly({ children }) {
    return ( 
        <div className="font-montserrat">
        {/* HEADER */}
            <Header />

                {/* CONTENT */}
                <div>
                    {children}
                </div>
                {/* END CONTENT */}
                
        {/* FOOTER */}
            <Footer />
        </div>
     );
}

export default HeaderOnly;