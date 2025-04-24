import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const [location] = useLocation();
  
  // Function to determine page title based on current route
  const getPageTitle = (): string => {
    if (location === "/") return "Dashboard";
    if (location.startsWith("/pr")) return "Purchase Requisition";
    if (location.startsWith("/po")) return "Purchase Order";
    if (location.startsWith("/gr")) return "Good Receipt";
    if (location === "/bidding") return "Bidding";
    if (location === "/invoice") return "Invoice";
    if (location === "/dav") return "DAV";
    if (location === "/form-create") return "Form Create";
    if (location === "/master-data") return "Master Data";
    if (location === "/struktur-gbu") return "Struktur GBU";
    if (location === "/vendor-evaluation") return "Vendor Evaluation";
    if (location === "/master-vendor") return "Master Vendor";
    if (location === "/account") return "Account";
    
    return "Procurement System";
  };

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden mr-4" 
          onClick={toggleSidebar}
        >
          <span className="material-icons">menu</span>
        </Button>
        <h2 className="text-xl font-medium">{getPageTitle()}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md">
          <span className="material-icons text-gray-500 mr-2">search</span>
          <Input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none w-48"
          />
        </div>
        
        <div className="flex items-center">
          <span className="material-icons text-gray-500">notifications</span>
          <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white text-xs absolute translate-x-3 -translate-y-2">3</div>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white">
            <span className="material-icons text-sm">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
