import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-h-screen">
        <Topbar toggleSidebar={() => setSidebarOpen(prev => !prev)} />
        
        <main className="flex-1">
          {children}
        </main>
        
        <footer className="px-6 py-4 bg-white border-t border-gray-200">
          <div className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} PT Gunung Bara Utama. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}
