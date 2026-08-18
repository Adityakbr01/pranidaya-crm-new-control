import { useState } from "react";
import Footer from "@/components/Footer.jsx";
import DashboardNavbar from "@/components/DashboardNavbar.jsx";
import SideNav from "@/components/SideNav.jsx";
const Layout = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-blue-gray-50/50">
      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />

      <div className={`flex-grow p-4 relative xl:ml-72`}>
        <DashboardNavbar
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
        />
        {children}
      </div>

      <div className="w-full bg-blue-gray-50">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
