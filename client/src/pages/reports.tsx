import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FileDown, Calendar, Filter, ChevronDown } from "lucide-react";
import { formatRupiah } from "@/lib/formatters";

export default function Reports() {
  const [reportType, setReportType] = useState("pr");
  const [periodType, setPeriodType] = useState("monthly");
  const [year, setYear] = useState("2024");
  const [month, setMonth] = useState("4");
  
  // Sample data for demonstration
  const prStatusData = [
    { name: "Pending", value: 4, color: "#fcd34d" },
    { name: "Approved", value: 8, color: "#34d399" },
    { name: "Rejected", value: 2, color: "#f87171" },
    { name: "On Process", value: 5, color: "#60a5fa" }
  ];
  
  const prDepartmentData = [
    { name: "Mining", value: 7, color: "#818cf8" },
    { name: "Operations", value: 5, color: "#a78bfa" },
    { name: "Admin", value: 3, color: "#f472b6" },
    { name: "IT", value: 2, color: "#4ade80" },
    { name: "Finance", value: 2, color: "#facc15" }
  ];
  
  const monthlyTrendData = [
    { month: "Jan", pr: 12, po: 10, gr: 8 },
    { month: "Feb", pr: 15, po: 13, gr: 11 },
    { month: "Mar", pr: 18, po: 16, gr: 14 },
    { month: "Apr", pr: 14, po: 12, gr: 10 },
    { month: "May", pr: 21, po: 18, gr: 15 },
    { month: "Jun", pr: 25, po: 22, gr: 20 }
  ];
  
  const prValueData = [
    { name: "Operational", value: 345000000 },
    { name: "Project", value: 680000000 },
    { name: "Maintenance", value: 220000000 },
    { name: "Administration", value: 110000000 }
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9146FF", "#FF4D4D"];
  
  // Custom formatter functions for tooltips
  const documentTooltipFormatter = (value: any) => {
    return [`${value} dokumen`, 'Jumlah'];
  };

  const valueTooltipFormatter = (value: any) => {
    return [formatRupiah(value), 'Nilai'];
  };

  const rupliahTickFormatter = (value: any) => {
    return formatRupiah(value).slice(0, -6) + ' Jt';
  };
  
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Laporan (Reports)</h1>
        <p className="text-gray-600">Analisa dan laporan procurement</p>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Filter Laporan</CardTitle>
          <CardDescription>Pilih kategori dan periode untuk laporan yang diinginkan</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Jenis Laporan</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih jenis laporan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pr">Purchase Requisition</SelectItem>
                  <SelectItem value="po">Purchase Order</SelectItem>
                  <SelectItem value="gr">Good Receipt</SelectItem>
                  <SelectItem value="all">Semua Dokumen</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Tipe Periode</label>
              <Select value={periodType} onValueChange={setPeriodType}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tipe periode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Harian</SelectItem>
                  <SelectItem value="monthly">Bulanan</SelectItem>
                  <SelectItem value="yearly">Tahunan</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Tahun</label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tahun" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Bulan</label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bulan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Januari</SelectItem>
                  <SelectItem value="2">Februari</SelectItem>
                  <SelectItem value="3">Maret</SelectItem>
                  <SelectItem value="4">April</SelectItem>
                  <SelectItem value="5">Mei</SelectItem>
                  <SelectItem value="6">Juni</SelectItem>
                  <SelectItem value="7">Juli</SelectItem>
                  <SelectItem value="8">Agustus</SelectItem>
                  <SelectItem value="9">September</SelectItem>
                  <SelectItem value="10">Oktober</SelectItem>
                  <SelectItem value="11">November</SelectItem>
                  <SelectItem value="12">Desember</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <Button variant="outline" className="mr-2">
              <Filter className="h-4 w-4 mr-1" />
              Terapkan Filter
            </Button>
            <Button>
              <FileDown className="h-4 w-4 mr-1" />
              Download Laporan
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Report Dashboard */}
      <div className="mb-6">
        <Tabs defaultValue="summary" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="summary">Ringkasan</TabsTrigger>
            <TabsTrigger value="trends">Tren & Perkembangan</TabsTrigger>
            <TabsTrigger value="categories">Kategori & Distribusi</TabsTrigger>
          </TabsList>
          
          {/* Summary Tab */}
          <TabsContent value="summary">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status PR</CardTitle>
                  <CardDescription>Distribusi Purchase Requisition berdasarkan status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {prStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={documentTooltipFormatter} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Departemen</CardTitle>
                  <CardDescription>Distribusi Purchase Requisition berdasarkan departemen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prDepartmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {prDepartmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={documentTooltipFormatter} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Nilai PR</CardTitle>
                  <CardDescription>Distribusi Purchase Requisition berdasarkan nilai</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={prValueData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={rupliahTickFormatter} />
                        <Tooltip formatter={valueTooltipFormatter} />
                        <Legend />
                        <Bar dataKey="value" name="Nilai" fill="#4f46e5" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Tren Bulanan</CardTitle>
                  <CardDescription>Jumlah dokumen procurement dalam 6 bulan terakhir</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyTrendData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pr" name="PR" fill="#4f46e5" />
                        <Bar dataKey="po" name="PO" fill="#8b5cf6" />
                        <Bar dataKey="gr" name="GR" fill="#06b6d4" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Trends Tab */}
          <TabsContent value="trends">
            <Card>
              <CardHeader>
                <CardTitle>Tren Dokumen Procurement</CardTitle>
                <CardDescription>Perkembangan jumlah dokumen sepanjang waktu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyTrendData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="pr" name="PR" fill="#4f46e5" />
                      <Bar dataKey="po" name="PO" fill="#8b5cf6" />
                      <Bar dataKey="gr" name="GR" fill="#06b6d4" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Categories Tab */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Status PR</CardTitle>
                  <CardDescription>Distribusi Purchase Requisition berdasarkan status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {prStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={documentTooltipFormatter} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Departemen</CardTitle>
                  <CardDescription>Distribusi Purchase Requisition berdasarkan departemen</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={prDepartmentData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {prDepartmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={documentTooltipFormatter} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}