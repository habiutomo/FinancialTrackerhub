import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, RefreshCw, Eye, Download, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatRupiah } from "@/lib/formatters";

export default function Bidding() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample data for demonstration
  const biddingList = [
    { 
      id: 1, 
      number: "BD/2023/001", 
      title: "Supply Spare Parts Excavator", 
      status: "Open", 
      dueDate: "2024-04-30", 
      department: "Mining", 
      vendors: 5,
      estimatedValue: 450000000
    },
    { 
      id: 2, 
      number: "BD/2023/002", 
      title: "Service Contract for Heavy Equipment", 
      status: "Closed", 
      dueDate: "2024-04-15", 
      department: "Operations", 
      vendors: 3,
      estimatedValue: 750000000
    },
    { 
      id: 3, 
      number: "BD/2023/003", 
      title: "Office Supplies Annual Contract", 
      status: "Awarded", 
      dueDate: "2024-03-31", 
      department: "Admin", 
      vendors: 8,
      estimatedValue: 120000000
    },
    { 
      id: 4, 
      number: "BD/2023/004", 
      title: "Transportation Services", 
      status: "Open", 
      dueDate: "2024-05-15", 
      department: "Logistics", 
      vendors: 4,
      estimatedValue: 890000000
    },
    { 
      id: 5, 
      number: "BD/2023/005", 
      title: "IT Hardware Procurement", 
      status: "Under Review", 
      dueDate: "2024-04-20", 
      department: "IT", 
      vendors: 6,
      estimatedValue: 350000000
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      case 'awarded':
        return 'bg-blue-100 text-blue-800';
      case 'under review':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Penawaran (Bidding)</h1>
        <p className="text-gray-600">Kelola penawaran dan proses lelang pengadaan</p>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Daftar Penawaran</CardTitle>
            <CardDescription>Semua proses penawaran dan lelang pengadaan</CardDescription>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-1" />
              Buat Penawaran Baru
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg pl-3 w-full md:w-auto md:min-w-[320px]">
              <SearchIcon className="h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Cari penawaran..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-0 focus-visible:ring-0 focus:outline-none"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <select className="rounded-md border border-gray-200 bg-white text-sm">
                  <option value="all">Semua Status</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="awarded">Awarded</option>
                  <option value="under review">Under Review</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Departemen:</span>
                <select className="rounded-md border border-gray-200 bg-white text-sm">
                  <option value="all">Semua Departemen</option>
                  <option value="mining">Mining</option>
                  <option value="operations">Operations</option>
                  <option value="admin">Admin</option>
                  <option value="logistics">Logistics</option>
                  <option value="it">IT</option>
                </select>
              </div>
              
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No. Bidding</TableHead>
                  <TableHead>Judul Penawaran</TableHead>
                  <TableHead>Departemen</TableHead>
                  <TableHead>Tenggat Waktu</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Jumlah Vendor</TableHead>
                  <TableHead>Estimasi Nilai</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {biddingList.map((bid) => (
                  <TableRow key={bid.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">{bid.number}</TableCell>
                    <TableCell>{bid.title}</TableCell>
                    <TableCell>{bid.department}</TableCell>
                    <TableCell>{bid.dueDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(bid.status)} border-0`}
                      >
                        {bid.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">{bid.vendors}</TableCell>
                    <TableCell>{formatRupiah(bid.estimatedValue)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4 text-blue-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Menampilkan <span className="font-medium">5</span> dari <span className="font-medium">5</span> penawaran
            </p>
            <div className="space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}