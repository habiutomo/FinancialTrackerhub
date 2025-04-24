import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, Search as SearchIcon, CheckCircle, XCircle, Clock, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatRupiah, formatDate } from "@/lib/formatters";

export default function Approvals() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample data for demonstration
  const approvalRequests = [
    { 
      id: 1, 
      documentType: "PR", 
      documentNumber: "PRG01142", 
      documentTitle: "Perpanjangan Kontrak Excavator 01 GAP",
      requestDate: "2024-04-21", 
      requester: "Budi Santoso",
      department: "Mining",
      status: "Pending", 
      priority: "High"
    },
    { 
      id: 2, 
      documentType: "PO", 
      documentNumber: "PO00123", 
      documentTitle: "Spare Part Dump Truck",
      requestDate: "2024-04-18", 
      requester: "Andi Wijaya",
      department: "Operations",
      status: "Pending", 
      priority: "Medium"
    },
    { 
      id: 3, 
      documentType: "GR", 
      documentNumber: "GR00561", 
      documentTitle: "Transportasi Karyawan via Darat",
      requestDate: "2024-04-15", 
      requester: "Siti Rahayu",
      department: "HR",
      status: "Pending", 
      priority: "Low"
    },
    { 
      id: 4, 
      documentType: "PR", 
      documentNumber: "PRG01141", 
      documentTitle: "Perpanjangan Kontrak Drill",
      requestDate: "2024-04-10", 
      requester: "Dian Permata",
      department: "Mining",
      status: "Approved", 
      priority: "High"
    },
    { 
      id: 5, 
      documentType: "PO", 
      documentNumber: "PO00122", 
      documentTitle: "Pembelian ATK Bulanan",
      requestDate: "2024-04-05", 
      requester: "Rudi Hartono",
      department: "Admin",
      status: "Rejected", 
      priority: "Low"
    }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getDocumentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pr':
        return 'bg-blue-100 text-blue-800';
      case 'po':
        return 'bg-purple-100 text-purple-800';
      case 'gr':
        return 'bg-green-100 text-green-800';
      case 'invoice':
        return 'bg-amber-100 text-amber-800';
      case 'dav':
        return 'bg-indigo-100 text-indigo-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Filter by status
  const pendingApprovals = approvalRequests.filter(req => req.status.toLowerCase() === 'pending');
  const approvedRequests = approvalRequests.filter(req => req.status.toLowerCase() === 'approved');
  const rejectedRequests = approvalRequests.filter(req => req.status.toLowerCase() === 'rejected');
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Persetujuan (Approvals)</h1>
        <p className="text-gray-600">Kelola semua permintaan persetujuan dokumen</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Pending Approvals</p>
                <p className="text-2xl font-bold">{pendingApprovals.length}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Approved</p>
                <p className="text-2xl font-bold">{approvedRequests.length}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Rejected</p>
                <p className="text-2xl font-bold">{rejectedRequests.length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Persetujuan</CardTitle>
          <CardDescription>Dokumen yang memerlukan persetujuan Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="pending">
                <Clock className="w-4 h-4 mr-2" />
                Menunggu Persetujuan ({pendingApprovals.length})
              </TabsTrigger>
              <TabsTrigger value="approved">
                <CheckCircle className="w-4 h-4 mr-2" />
                Disetujui ({approvedRequests.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                <XCircle className="w-4 h-4 mr-2" />
                Ditolak ({rejectedRequests.length})
              </TabsTrigger>
            </TabsList>
            
            {/* Pending Tab */}
            <TabsContent value="pending">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg pl-3 w-full max-w-sm">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Cari dokumen..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border-0 focus-visible:ring-0 focus:outline-none"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipe Dokumen</TableHead>
                      <TableHead>Nomor</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Pemohon</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Departemen</TableHead>
                      <TableHead>Prioritas</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((req) => (
                      <TableRow key={req.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getDocumentTypeColor(req.documentType)} border-0`}
                          >
                            {req.documentType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{req.documentNumber}</TableCell>
                        <TableCell>{req.documentTitle}</TableCell>
                        <TableCell>{req.requester}</TableCell>
                        <TableCell>{formatDate(req.requestDate)}</TableCell>
                        <TableCell>{req.department}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getPriorityColor(req.priority)} border-0`}
                          >
                            {req.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="outline" size="sm" className="mr-2">
                            <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm">
                            <XCircle className="h-4 w-4 mr-1 text-red-600" />
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {pendingApprovals.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                          Tidak ada dokumen yang menunggu persetujuan
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Approved Tab */}
            <TabsContent value="approved">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg pl-3 w-full max-w-sm">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Cari dokumen..." 
                    className="border-0 focus-visible:ring-0 focus:outline-none"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipe Dokumen</TableHead>
                      <TableHead>Nomor</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Pemohon</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Departemen</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedRequests.map((req) => (
                      <TableRow key={req.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getDocumentTypeColor(req.documentType)} border-0`}
                          >
                            {req.documentType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{req.documentNumber}</TableCell>
                        <TableCell>{req.documentTitle}</TableCell>
                        <TableCell>{req.requester}</TableCell>
                        <TableCell>{formatDate(req.requestDate)}</TableCell>
                        <TableCell>{req.department}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(req.status)} border-0`}
                          >
                            {req.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {approvedRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                          Tidak ada dokumen yang telah disetujui
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Rejected Tab */}
            <TabsContent value="rejected">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg pl-3 w-full max-w-sm">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Cari dokumen..." 
                    className="border-0 focus-visible:ring-0 focus:outline-none"
                  />
                </div>
                <Button variant="ghost" size="sm">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Refresh
                </Button>
              </div>
              
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tipe Dokumen</TableHead>
                      <TableHead>Nomor</TableHead>
                      <TableHead>Judul</TableHead>
                      <TableHead>Pemohon</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Departemen</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedRequests.map((req) => (
                      <TableRow key={req.id} className="cursor-pointer hover:bg-gray-50">
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getDocumentTypeColor(req.documentType)} border-0`}
                          >
                            {req.documentType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{req.documentNumber}</TableCell>
                        <TableCell>{req.documentTitle}</TableCell>
                        <TableCell>{req.requester}</TableCell>
                        <TableCell>{formatDate(req.requestDate)}</TableCell>
                        <TableCell>{req.department}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={`${getStatusColor(req.status)} border-0`}
                          >
                            {req.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {rejectedRequests.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-6 text-gray-500">
                          Tidak ada dokumen yang ditolak
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}