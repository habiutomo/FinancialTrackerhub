import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlusCircle, Download, Upload, RefreshCw, Edit, Trash2, Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MasterData() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample data for demonstration
  const vendors = [
    { id: 1, code: "VEN001", name: "PT Sumber Makmur", category: "Supplier", status: "Active" },
    { id: 2, code: "VEN002", name: "PT Abadi Jaya", category: "Contractor", status: "Active" },
    { id: 3, code: "VEN003", name: "CV Mitra Utama", category: "Service", status: "Inactive" },
    { id: 4, code: "VEN004", name: "PT Mandiri Sentosa", category: "Supplier", status: "Active" },
    { id: 5, code: "VEN005", name: "CV Karya Bersama", category: "Contractor", status: "Active" }
  ];
  
  const materials = [
    { id: 1, code: "MAT001", name: "Besi Konstruksi", unit: "Ton", category: "Raw Material" },
    { id: 2, code: "MAT002", name: "Semen", unit: "Sak", category: "Building" },
    { id: 3, code: "MAT003", name: "Solar", unit: "Liter", category: "Fuel" },
    { id: 4, code: "MAT004", name: "Oli Mesin", unit: "Liter", category: "Lubricant" },
    { id: 5, code: "MAT005", name: "Spare Part", unit: "Pcs", category: "Equipment" }
  ];
  
  const accounts = [
    { id: 1, code: "ACC001", name: "Biaya Operasional", type: "Expense", status: "Active" },
    { id: 2, code: "ACC002", name: "Pendapatan", type: "Income", status: "Active" },
    { id: 3, code: "ACC003", name: "Aset Tetap", type: "Asset", status: "Active" },
    { id: 4, code: "ACC004", name: "Hutang Usaha", type: "Liability", status: "Active" },
    { id: 5, code: "ACC005", name: "Modal", type: "Equity", status: "Active" }
  ];
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Master Data</h1>
        <p className="text-gray-600">Kelola data utama untuk sistem procurement</p>
      </div>
      
      <Tabs defaultValue="vendors" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="vendors">Vendor</TabsTrigger>
          <TabsTrigger value="materials">Material</TabsTrigger>
          <TabsTrigger value="accounts">Akun</TabsTrigger>
        </TabsList>
        
        <TabsContent value="vendors">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Daftar Vendor</CardTitle>
                <CardDescription>Kelola vendor yang bekerja sama dengan perusahaan</CardDescription>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Tambah Vendor
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg pl-3 w-full max-w-sm">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Cari vendor..." 
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
                      <TableHead className="w-[80px]">Kode</TableHead>
                      <TableHead>Nama Vendor</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map((vendor) => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">{vendor.code}</TableCell>
                        <TableCell>{vendor.name}</TableCell>
                        <TableCell>{vendor.category}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            vendor.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {vendor.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Daftar Material</CardTitle>
                <CardDescription>Kelola material, barang, dan jasa yang digunakan</CardDescription>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Tambah Material
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg pl-3 w-full max-w-sm">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Cari material..." 
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
                      <TableHead className="w-[80px]">Kode</TableHead>
                      <TableHead>Nama Material</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map((material) => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.code}</TableCell>
                        <TableCell>{material.name}</TableCell>
                        <TableCell>{material.unit}</TableCell>
                        <TableCell>{material.category}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accounts">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Daftar Akun</CardTitle>
                <CardDescription>Kelola akun keuangan untuk sistem procurement</CardDescription>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Import
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Export
                </Button>
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Tambah Akun
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center bg-white border border-gray-200 rounded-lg pl-3 w-full max-w-sm">
                  <SearchIcon className="h-4 w-4 text-gray-400" />
                  <Input 
                    type="text" 
                    placeholder="Cari akun..." 
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
                      <TableHead className="w-[80px]">Kode</TableHead>
                      <TableHead>Nama Akun</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">{account.code}</TableCell>
                        <TableCell>{account.name}</TableCell>
                        <TableCell>{account.type}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {account.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}