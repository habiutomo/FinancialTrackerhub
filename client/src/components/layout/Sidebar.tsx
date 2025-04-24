import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface SidebarItemProps {
  to: string;
  icon: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

function SidebarItem({ to, icon, label, isActive, onClick }: SidebarItemProps) {
  return (
    <Link href={to}>
      <a 
        className={cn(
          "sidebar-item flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer",
          isActive && "active"
        )}
        onClick={onClick}
      >
        <span className="material-icons text-gray-600 mr-3">{icon}</span>
        <span className={cn(isActive && "text-primary font-medium")}>{label}</span>
      </a>
    </Link>
  );
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useLocation();
  
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <aside 
      className={cn(
        "w-full md:w-64 bg-white shadow-md flex-shrink-0 z-20 transition-all duration-300 ease-in-out",
        "fixed md:static h-full md:h-auto",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex items-center p-4 border-b border-gray-200">
        <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white mr-2">
          <span className="material-icons text-lg">work</span>
        </div>
        <h1 className="text-lg font-medium">Procurement System</h1>
      </div>
      
      <nav className="py-4">
        <div className="px-4 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Main Menu
        </div>
        
        <SidebarItem 
          to="/" 
          icon="dashboard" 
          label="Dashboard" 
          isActive={location === "/"}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/form-create" 
          icon="add_box" 
          label="Form Create" 
          isActive={location === "/form-create"}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/master-data" 
          icon="storage" 
          label="Master Data" 
          isActive={location === "/master-data"}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/pr" 
          icon="description" 
          label="PR" 
          isActive={location.startsWith("/pr")}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/bidding" 
          icon="gavel" 
          label="Bidding" 
          isActive={location === "/bidding"}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/po" 
          icon="shopping_cart" 
          label="Purchase Order" 
          isActive={location.startsWith("/po")}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/gr" 
          icon="inventory" 
          label="Good Receipt" 
          isActive={location.startsWith("/gr")}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/invoice" 
          icon="receipt" 
          label="Invoice" 
          isActive={location === "/invoice"}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/dav" 
          icon="payments" 
          label="DAV" 
          isActive={location === "/dav"}
          onClick={closeSidebar}
        />
        
        <div className="px-4 pt-6 pb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Configuration
        </div>
        
        <SidebarItem 
          to="/struktur-gbu" 
          icon="account_tree" 
          label="Struktur GBU" 
          isActive={location === "/struktur-gbu"}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/vendor-evaluation" 
          icon="list" 
          label="List Evaluasi Vendor" 
          isActive={location === "/vendor-evaluation"}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/master-vendor" 
          icon="business" 
          label="Master Vendor" 
          isActive={location === "/master-vendor"}
          onClick={closeSidebar}
        />
        
        <SidebarItem 
          to="/account" 
          icon="account_balance" 
          label="Account" 
          isActive={location === "/account"}
          onClick={closeSidebar}
        />
      </nav>
    </aside>
  );
}
