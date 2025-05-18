import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
type LayoutProps = {
  children?: React.ReactNode;
  sidebarVisible?: boolean;
};
function Layout({
  sidebarVisible = true
}: LayoutProps) {
  return <div className="flex flex-col min-h-screen text-climbup-text">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <main className="flex-1 p-4 md:p-6 bg-[t#] bg-[#fef9e1]">
          <Outlet />
        </main>
      </div>
      <Footer />
      
      {/* Background Video */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-climbup-background/80"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'52\' height=\'26\' viewBox=\'0 0 52 26\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%236D2323\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-climbup-heading/5 via-transparent to-climbup-text/5"></div>
      </div>
    </div>;
}
export default Layout;