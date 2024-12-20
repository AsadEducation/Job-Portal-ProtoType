import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar";
import Footer from "../Pages/Shared/Footer";

const RootLayout = () => {
    return (
        <>
            <div className="w-11/12 mx-auto"><Navbar /></div>

            <Outlet />

            {/* <Footer/> */}
            <div className="mt-16"><Footer /></div>
        </>
    );
};

export default RootLayout;