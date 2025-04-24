import { useState } from "react";
import { useLocation } from "wouter";
import { Bell, Menu, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Header() {
  const [location] = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  
  // Get page title based on current location
  const getPageTitle = () => {
    if (location === "/") return "Dashboard";
    if (location.startsWith("/pr")) return "Purchase Requisition";
    if (location.startsWith("/po")) return "Purchase Order";
    if (location.startsWith("/gr")) return "Good Receipt";
    if (location.startsWith("/bidding")) return "Bidding";
    if (location.startsWith("/invoice")) return "Invoice";
    if (location.startsWith("/dav")) return "DAV";
    
    // Extract title from path
    return location.split("/").pop()?.split("-").map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    ).join(" ") || "Procurement System";
  };

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <Button variant="ghost" className="md:hidden mr-4 p-0">
          <Menu size={24} />
        </Button>
        <h2 className="text-xl font-medium">{getPageTitle()}</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-md">
          <SearchIcon className="text-gray-500 mr-2 h-4 w-4" />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none shadow-none focus-visible:ring-0 w-48"
          />
        </div>
        
        <div className="relative">
          <Button variant="ghost" className="p-2 relative" size="icon">
            <Bell className="text-gray-500 h-5 w-5" />
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center text-white text-[10px]">3</span>
          </Button>
        </div>
        
        <div className="flex items-center">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-white">AD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
