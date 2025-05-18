
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

type LayoutProps = {
  children?: React.ReactNode;
  sidebarVisible?: boolean;
};

function Layout({ sidebarVisible = true }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-glow text-neon-yellow">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
