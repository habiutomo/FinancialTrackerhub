import { useState } from "react";
import { useLocation } from "wouter";
import { 
  Bell, 
  Menu, 
  Search as SearchIcon, 
  Calendar, 
  MessageCircle, 
  HelpCircle,
  Settings,
  ChevronDown
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

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

  // Current date formatting
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Title and breadcrumb */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-800">{getPageTitle()}</h2>
          <div className="flex items-center text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-2">/</span>
            <span className="text-blue-600 font-medium">{getPageTitle()}</span>
          </div>
        </div>
        
        {/* Right side - Actions and user */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-50 hover:bg-gray-100 border border-gray-200 px-3 py-2 rounded-lg transition-colors">
            <SearchIcon className="text-gray-400 mr-2 h-4 w-4" />
            <Input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none shadow-none focus-visible:ring-0 w-52"
            />
          </div>
          
          {/* Date */}
          <div className="hidden lg:flex items-center text-gray-600 text-sm">
            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
            <span>{currentDate}</span>
          </div>
          
          {/* Notification */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-500" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center">3</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifikasi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-72 overflow-y-auto">
                {[1, 2, 3].map((i) => (
                  <DropdownMenuItem key={i} className="cursor-pointer py-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"></div>
                      <div>
                        <p className="font-medium text-sm">Ada PO baru yang perlu disetujui</p>
                        <p className="text-xs text-gray-500 mt-1">2 jam yang lalu</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer justify-center">
                <span className="text-blue-600 text-sm font-medium">Lihat Semua Notifikasi</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Messages */}
          <Button variant="ghost" size="icon" className="relative">
            <MessageCircle className="h-5 w-5 text-gray-500" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-blue-500 text-[10px] text-white flex items-center justify-center">2</span>
          </Button>
          
          {/* Help */}
          <Button variant="ghost" size="icon">
            <HelpCircle className="h-5 w-5 text-gray-500" />
          </Button>
          
          {/* Settings */}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-gray-500" />
          </Button>
          
          {/* User profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center cursor-pointer">
                <Avatar className="h-9 w-9 border-2 border-gray-200">
                  <AvatarFallback className="bg-blue-600 text-white">AD</AvatarFallback>
                </Avatar>
                <div className="ml-2 hidden md:block">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@gbuprocurement.com</p>
                </div>
                <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>My Tasks</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
