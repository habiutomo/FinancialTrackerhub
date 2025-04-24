import { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Gavel,
  ShoppingCart,
  Package,
  Receipt,
  CreditCard,
  CircuitBoard,
  List,
  Store,
  Building2,
  PlusSquare,
  Database,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  BarChart3
} from "lucide-react";

export default function Sidebar() {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { 
      section: "Main Menu",
      items: [
        { label: "Dashboard", href: "/", icon: <LayoutDashboard size={20} /> },
        { label: "Form Create", href: "/form-create", icon: <PlusSquare size={20} /> },
        { label: "Master Data", href: "/master-data", icon: <Database size={20} /> },
        { label: "PR", href: "/pr", icon: <FileText size={20} /> },
        { label: "Bidding", href: "/bidding", icon: <Gavel size={20} /> },
        { label: "Purchase Order", href: "/po", icon: <ShoppingCart size={20} /> },
        { label: "Good Receive", href: "/gr", icon: <Package size={20} /> },
        { label: "Invoice", href: "/invoice", icon: <Receipt size={20} /> },
        { label: "DAV", href: "/dav", icon: <CreditCard size={20} /> },
        { label: "Approvals", href: "/approvals", icon: <CheckSquare size={20} /> },
        { label: "Reports", href: "/reports", icon: <BarChart3 size={20} /> },
      ]
    },
    {
      section: "Configuration",
      items: [
        { label: "Struktur GBU", href: "/struktur-gbu", icon: <CircuitBoard size={20} /> },
        { label: "List Evaluasi Vendor", href: "/vendor-evaluation", icon: <List size={20} /> },
        { label: "Master Vendor", href: "/vendor", icon: <Store size={20} /> },
        { label: "Account", href: "/account", icon: <Building2 size={20} /> },
      ]
    }
  ];

  return (
    <aside className={cn(
      "bg-[#1e2a4a] text-white h-screen flex flex-col transition-all duration-300 ease-in-out",
      collapsed ? "w-20" : "w-72"
    )}>
      {/* Logo and App Title */}
      <div className="flex items-center p-4 border-b border-gray-700">
        <div className="w-10 h-10 rounded-md bg-blue-500 flex items-center justify-center text-white mr-3">
          <ShoppingCart size={20} />
        </div>
        {!collapsed && (
          <div>
            <h1 className="text-lg font-semibold text-white">Procurement</h1>
            <p className="text-xs text-blue-300">PT Gunung Bara Utama</p>
          </div>
        )}
        <button 
          className="ml-auto bg-blue-600 hover:bg-blue-700 rounded-full p-1 text-white transition-colors"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
      
      {/* Navigation Menu */}
      <nav className="py-4 flex-1 overflow-y-auto scrollbar-thin">
        {menuItems.map((section, i) => (
          <div key={i} className="mb-6">
            {!collapsed && (
              <div className="px-6 pb-2 text-xs font-semibold text-blue-300 uppercase tracking-wider">
                {section.section}
              </div>
            )}
            
            <div className="space-y-1">
              {section.items.map((item, j) => {
                const isActive = item.href === location || 
                  (item.href !== "/" && location.startsWith(item.href));
                
                return (
                  <div key={j} className="px-3">
                    <Link href={item.href}>
                      <div className={cn(
                        "flex items-center rounded-lg px-3 py-2.5 cursor-pointer",
                        isActive 
                          ? "bg-blue-700 text-white" 
                          : "text-gray-300 hover:bg-[#263457] hover:text-white"
                      )}>
                        <span className={cn(
                          "flex-shrink-0",
                          collapsed ? "mx-auto" : "mr-3"
                        )}>
                          {item.icon}
                        </span>
                        {!collapsed && (
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      {/* User Profile */}
      <div className={cn(
        "p-4 border-t border-gray-700 mt-auto flex items-center",
        collapsed ? "justify-center" : "justify-start"
      )}>
        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
          AD
        </div>
        {!collapsed && (
          <div className="ml-3">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-400">Procurement Dept</p>
          </div>
        )}
      </div>
    </aside>
  );
}
