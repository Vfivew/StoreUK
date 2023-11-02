import Footer from "../components/Navigational/Footer/Footer";
import Header from "../components/Navigational/Header/Header";
import Navbar from "../components/Navigational/Navbar/Navbar";
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <>
            <Header />
            <Navbar />
            <Outlet/>
            <Footer/>
        </>
    );
};

export default Layout;