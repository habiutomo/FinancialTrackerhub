import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, RefreshCw, FileText, Download, Search as SearchIcon, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatRupiah, formatDate } from "@/lib/formatters";

export default function Invoice() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample data for demonstration
  const invoices = [
    { 
      id: 1, 
      number: "INV/2023/001", 
      poNumber: "PO00123",
      vendor: "PT Sumber Makmur", 
      date: "2024-04-15", 
      dueDate: "2024-05-15", 
      status: "Paid", 
      amount: 45000000
    },
    { 
      id: 2, 
      number: "INV/2023/002", 
      poNumber: "PO00124",
      vendor: "PT Abadi Jaya", 
      date: "2024-04-10", 
      dueDate: "2024-05-10", 
      status: "Pending", 
      amount: 75000000
    },
    { 
      id: 3, 
      number: "INV/2023/003", 
      poNumber: "PO00125",
      vendor: "CV Mitra Utama", 
      date: "2024-04-05", 
      dueDate: "2024-05-05", 
      status: "Overdue", 
      amount: 12000000
    },
    { 
      id: 4, 
      number: "INV/2023/004", 
      poNumber: "PO00126",
      vendor: "PT Mandiri Sentosa", 
      date: "2024-03-28", 
      dueDate: "2024-04-28", 
      status: "Paid", 
      amount: 89000000
    },
    { 
      id: 5, 
      number: "INV/2023/005", 
      poNumber: "PO00127",
      vendor: "CV Karya Bersama", 
      date: "2024-03-20", 
      dueDate: "2024-04-20", 
      status: "Partial", 
      amount: 35000000
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'partial':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Faktur (Invoice)</h1>
        <p className="text-gray-600">Kelola faktur dan pembayaran vendor</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Faktur</p>
                <p className="text-2xl font-bold">{invoices.length}</p>
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
                <p className="text-sm text-gray-500">Sudah Dibayar</p>
                <p className="text-2xl font-bold">
                  {invoices.filter(inv => inv.status.toLowerCase() === 'paid').length}
                </p>
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
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold">
                  {invoices.filter(inv => inv.status.toLowerCase() === 'pending').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <FileText className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Terlambat</p>
                <p className="text-2xl font-bold">
                  {invoices.filter(inv => inv.status.toLowerCase() === 'overdue').length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <FileText className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Daftar Faktur</CardTitle>
            <CardDescription>Semua faktur dan status pembayaran</CardDescription>
          </div>
          <div className="space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button size="sm">
              <PlusCircle className="h-4 w-4 mr-1" />
              Input Faktur Baru
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg pl-3 w-full md:w-auto md:min-w-[320px]">
              <SearchIcon className="h-4 w-4 text-gray-400" />
              <Input 
                type="text" 
                placeholder="Cari faktur..." 
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
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="partial">Partial</option>
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
                <Filter className="h-4 w-4 mr-1" />
                Filter Lainnya
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">No. Faktur</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>No. PO</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Jatuh Tempo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Jumlah</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-medium">{invoice.number}</TableCell>
                    <TableCell>{invoice.vendor}</TableCell>
                    <TableCell>{invoice.poNumber}</TableCell>
                    <TableCell>{formatDate(invoice.date)}</TableCell>
                    <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={`${getStatusColor(invoice.status)} border-0`}
                      >
                        {invoice.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{formatRupiah(invoice.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              Menampilkan <span className="font-medium">5</span> dari <span className="font-medium">5</span> faktur
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