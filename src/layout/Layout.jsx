import { useState } from "react";
import Footer from "@/components/Footer.jsx";
import DashboardNavbar from "@/components/DashboardNavbar.jsx";
import SideNav from "@/components/SideNav.jsx";
const Layout = ({ children }) => {
  const [openSideNav, setOpenSideNav] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/80 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <SideNav openSideNav={openSideNav} setOpenSideNav={setOpenSideNav} />

      <div className="flex-grow p-2.5 sm:p-4 relative xl:ml-72">
        <DashboardNavbar
          openSideNav={openSideNav}
          setOpenSideNav={setOpenSideNav}
        />
        {children}
      </div>

      <div className="w-full bg-slate-100/80 dark:bg-slate-900/60 dark:border-t dark:border-slate-800 transition-colors">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
