import Footer from "@/components/footer";
import Header from "@/components/header";

function HeaderOnly({ children }) {
    return ( 
        <>
        {/* HEADER */}
            <Header />

                {/* CONTENT */}
                <div>
                    {children}
                </div>
                {/* END CONTENT */}
                
        {/* FOOTER */}
            <Footer />
        </>
     );
}

export default HeaderOnly;