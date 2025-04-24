import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, RefreshCw, FileText, Download, Search as SearchIcon, Eye, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatRupiah, formatDate } from "@/lib/formatters";

export default function DAV() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample data for demonstration
  const davList = [
    { 
      id: 1, 
      number: "DAV/2023/001", 
      invoiceNumber: "INV00123",
      vendor: "PT Sumber Makmur", 
      date: "2024-04-15", 
      status: "Approved", 
      amount: 45000000,
      approvedBy: "Budi Santoso",
      approvedDate: "2024-04-17"
    },
    { 
      id: 2, 
      number: "DAV/2023/002", 
      invoiceNumber: "INV00124",
      vendor: "PT Abadi Jaya", 
      date: "2024-04-10", 
      status: "Pending", 
      amount: 75000000,
      approvedBy: "",
      approvedDate: ""
    },
    { 
      id: 3, 
      number: "DAV/2023/003", 
      invoiceNumber: "INV00125",
      vendor: "CV Mitra Utama", 
      date: "2024-04-05", 
      status: "Rejected", 
      amount: 12000000,
      approvedBy: "Andi Wijaya",
      approvedDate: "2024-04-07"
    },
    { 
      id: 4, 
      number: "DAV/2023/004", 
      invoiceNumber: "INV00126",
      vendor: "PT Mandiri Sentosa", 
      date: "2024-03-28", 
      status: "Approved", 
      amount: 89000000,
      approvedBy: "Siti Rahayu",
      approvedDate: "2024-03-30"
    },
    { 
      id: 5, 
      number: "DAV/2023/005", 
      invoiceNumber: "INV00127",
      vendor: "CV Karya Bersama", 
      date: "2024-03-20", 
      status: "Verified", 
      amount: 35000000,
      approvedBy: "Dian Permata",
      approvedDate: "2024-03-22"
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'verified':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Calculate totals
  const totalAmount = davList.reduce((sum, dav) => sum + dav.amount, 0);
  const approvedAmount = davList
    .filter(dav => dav.status.toLowerCase() === 'approved')
    .reduce((sum, dav) => sum + dav.amount, 0);
  const pendingAmount = davList
    .filter(dav => dav.status.toLowerCase() === 'pending')
    .reduce((sum, dav) => sum + dav.amount, 0);
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">DAV (Document Approval for Vendor Payment)</h1>
        <p className="text-gray-600">Kelola persetujuan dokumen pembayaran vendor</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total DAV</p>
                <p className="text-2xl font-bold">{davList.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-bold">{formatRupiah(totalAmount)}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Approved Amount</p>
                <p className="text-xl font-bold">{formatRupiah(approvedAmount)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Pending Amount</p>
                <p className="text-xl font-bold">{formatRupiah(pendingAmount)}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Daftar DAV</CardTitle>
            <CardDescription>Dokumen persetujuan pembayaran vendor</CardDescription>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-1" />
              Buat DAV Baru
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg pl-3 w-full md:w-auto md:min-w-[320px]">
              <SearchIcon className="h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Cari DAV..." 
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
                  <option value="approved">Approved</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Tanggal:</span>
                <select className="rounded-md border border-gray-200 bg-white text-sm">
                  <option value="all">Semua Tanggal</option>
                  <option value="this-month">Bulan Ini</option>
                  <option value="last-month">Bulan Lalu</option>
                  <option value="this-year">Tahun Ini</option>
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
                  <TableHead className="w-[120px]">No. DAV</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>No. Invoice</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                  <TableHead>Disetujui Oleh</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {davList.map((dav) => (
                  <TableRow key={dav.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">{dav.number}</TableCell>
                    <TableCell>{dav.vendor}</TableCell>
                    <TableCell>{dav.invoiceNumber}</TableCell>
                    <TableCell>{formatDate(dav.date)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(dav.status)} border-0`}
                      >
                        {dav.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatRupiah(dav.amount)}</TableCell>
                    <TableCell>{dav.approvedBy || "-"}</TableCell>
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
              Menampilkan <span className="font-medium">5</span> dari <span className="font-medium">5</span> DAV
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