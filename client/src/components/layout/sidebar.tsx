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
  Database
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
      "bg-white shadow-md z-10 transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white mr-2">
          <ShoppingCart size={20} />
        </div>
        {!collapsed && <h1 className="text-lg font-medium">Procurement System</h1>}
        <button 
          className="ml-auto text-gray-500 hover:text-gray-700"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? "→" : "←"}
        </button>
      </div>
      
      <nav className="py-4">
        {menuItems.map((section, i) => (
          <div key={i} className="mb-4">
            {!collapsed && (
              <div className="px-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {section.section}
              </div>
            )}
            
            {section.items.map((item, j) => {
              const isActive = item.href === location || 
                (item.href !== "/" && location.startsWith(item.href));
              
              return (
                <Link href={item.href} key={j}>
                  <a className={cn(
                    "flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer",
                    isActive ? "border-l-4 border-primary bg-blue-50" : ""
                  )}>
                    <span className={cn(
                      "mr-3",
                      isActive ? "text-primary" : "text-gray-600"
                    )}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className={cn(
                        isActive ? "text-primary font-medium" : ""
                      )}>
                        {item.label}
                      </span>
                    )}
                  </a>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
