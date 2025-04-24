import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { 
  FileText, 
  ShoppingCart, 
  Package, 
  ChevronRight, 
  Plus, 
  RefreshCw,
  TrendingUp,
  Clock,
  ClipboardCheck,
  Check,
  BarChart3,
  Activity,
  ArrowRight,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { GoodReceipt, PurchaseOrder, PurchaseRequisition } from "@shared/schema";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

export default function Dashboard() {
  const { data: prs, isLoading: isPRLoading } = useQuery<PurchaseRequisition[]>({
    queryKey: ["/api/pr"],
  });

  const { data: pos, isLoading: isPOLoading } = useQuery<PurchaseOrder[]>({
    queryKey: ["/api/po"],
  });

  const { data: grs, isLoading: isGRLoading } = useQuery<GoodReceipt[]>({
    queryKey: ["/api/gr"],
  });

  function countStatus(items: any[] | undefined, status: string) {
    if (!items) return 0;
    return items.filter(item => item.status.toLowerCase() === status.toLowerCase()).length;
  }

  // Sample data for charts
  const statusPieData = [
    { name: 'Completed', value: 35, color: '#10B981' },
    { name: 'In Process', value: 25, color: '#F59E0B' },
    { name: 'Draft', value: 15, color: '#6B7280' },
    { name: 'Pending', value: 25, color: '#3B82F6' },
  ];

  const departmentBarData = [
    { name: 'Engineering', pr: 25, po: 18, gr: 15 },
    { name: 'Operations', pr: 15, po: 12, gr: 10 },
    { name: 'Logistics', pr: 20, po: 18, gr: 15 },
    { name: 'Finance', pr: 10, po: 8, gr: 5 },
  ];

  const monthlyTrendData = [
    { name: 'Jan', pr: 10, po: 8, gr: 5 },
    { name: 'Feb', pr: 15, po: 12, gr: 8 },
    { name: 'Mar', pr: 12, po: 10, gr: 7 },
    { name: 'Apr', pr: 18, po: 15, gr: 11 },
    { name: 'May', pr: 22, po: 18, gr: 14 },
    { name: 'Jun', pr: 25, po: 20, gr: 16 },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#6B7280', '#3B82F6'];

  return (
    <div className="p-6">
      {/* Welcome & Stats */}
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Selamat Datang di Procurement Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your procurement processes</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm">Total PR</p>
                  <h3 className="text-3xl font-bold mt-1">{prs?.length || 0}</h3>
                  <div className="flex items-center mt-2 text-blue-100 text-sm">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>12% dari bulan lalu</span>
                  </div>
                </div>
                <div className="bg-blue-400 bg-opacity-30 p-3 rounded-lg">
                  <FileText size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm">Total PO</p>
                  <h3 className="text-3xl font-bold mt-1">{pos?.length || 0}</h3>
                  <div className="flex items-center mt-2 text-purple-100 text-sm">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>8% dari bulan lalu</span>
                  </div>
                </div>
                <div className="bg-purple-400 bg-opacity-30 p-3 rounded-lg">
                  <ShoppingCart size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm">Total GR</p>
                  <h3 className="text-3xl font-bold mt-1">{grs?.length || 0}</h3>
                  <div className="flex items-center mt-2 text-green-100 text-sm">
                    <ArrowUp className="h-4 w-4 mr-1" />
                    <span>5% dari bulan lalu</span>
                  </div>
                </div>
                <div className="bg-green-400 bg-opacity-30 p-3 rounded-lg">
                  <Package size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500 to-amber-700 text-white">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-amber-100 text-sm">Menunggu Approval</p>
                  <h3 className="text-3xl font-bold mt-1">7</h3>
                  <div className="flex items-center mt-2 text-amber-100 text-sm">
                    <ArrowDown className="h-4 w-4 mr-1" />
                    <span>3% dari kemarin</span>
                  </div>
                </div>
                <div className="bg-amber-400 bg-opacity-30 p-3 rounded-lg">
                  <Clock size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Charts and Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Status Dokumen</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <BarChart3 size={16} className="mr-1" /> 
                  View Reports
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
              {statusPieData.map((status, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: status.color }}></div>
                  <span className="text-xs text-gray-600">{status.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">Dokumen per Bulan</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Activity size={16} className="mr-1" />
                  View Details
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyTrendData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pr" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="po" stroke="#8B5CF6" strokeWidth={2} />
                  <Line type="monotone" dataKey="gr" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Processing Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Dokumen Menunggu Approval</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Purchase Requisitions</span>
                <span className="font-medium">{countStatus(prs, 'pending')}/{prs?.length || 0}</span>
              </div>
              <Progress value={(countStatus(prs, 'pending') / (prs?.length || 1)) * 100} className="h-2 bg-blue-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Purchase Orders</span>
                <span className="font-medium">{countStatus(pos, 'pending')}/{pos?.length || 0}</span>
              </div>
              <Progress value={(countStatus(pos, 'pending') / (pos?.length || 1)) * 100} className="h-2 bg-purple-100" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Good Receipts</span>
                <span className="font-medium">{countStatus(grs, 'in process')}/{grs?.length || 0}</span>
              </div>
              <Progress value={(countStatus(grs, 'in process') / (grs?.length || 1)) * 100} className="h-2 bg-green-100" />
            </div>
            
            <Link href="/approvals">
              <Button className="w-full mt-4" variant="outline">
                Lihat Semua Approval <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold">Aktivitas Terbaru</CardTitle>
              <Button variant="outline" size="sm">
                <RefreshCw size={16} className="mr-2" /> Muat Ulang
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Activity Item 1 */}
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-blue-500 p-2 rounded-full text-white">
                  <FileText size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">PR baru dibuat</p>
                      <p className="text-sm text-gray-600">Perpanjangan Kontrak Excavator 01 GAP</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">PRG01142</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock size={12} className="mr-1" />
                    <span>5 jam yang lalu</span>
                    <span className="mx-2">•</span>
                    <span>Oleh: Budi Santoso</span>
                  </div>
                </div>
              </div>
              
              {/* Activity Item 2 */}
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-purple-500 p-2 rounded-full text-white">
                  <ShoppingCart size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">PO disetujui</p>
                      <p className="text-sm text-gray-600">Perpanjangan Kontrak Grader GAP 001</p>
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">1298000157</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock size={12} className="mr-1" />
                    <span>1 hari yang lalu</span>
                    <span className="mx-2">•</span>
                    <span>Oleh: Andi Wijaya</span>
                  </div>
                </div>
              </div>
              
              {/* Activity Item 3 */}
              <div className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="bg-green-500 p-2 rounded-full text-white">
                  <Package size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">GR selesai</p>
                      <p className="text-sm text-gray-600">Transportasi Karyawan via Darat</p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">GR00563</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <Clock size={12} className="mr-1" />
                    <span>2 hari yang lalu</span>
                    <span className="mx-2">•</span>
                    <span>Oleh: Siti Rahayu</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <Button variant="ghost" size="sm">
                Lihat Semua Aktivitas <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-bold">Aksi Cepat</CardTitle>
          <CardDescription>Buat dokumen baru atau akses fitur lainnya</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Link href="/pr/new">
              <div className="bg-white border border-gray-200 hover:border-blue-500 hover:shadow-md rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all h-32 cursor-pointer">
                <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mb-2">
                  <FileText size={20} />
                </div>
                <span className="text-sm font-medium">Buat PR</span>
              </div>
            </Link>
            
            <Link href="/po/new">
              <div className="bg-white border border-gray-200 hover:border-purple-500 hover:shadow-md rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all h-32 cursor-pointer">
                <div className="bg-purple-100 p-3 rounded-lg text-purple-600 mb-2">
                  <ShoppingCart size={20} />
                </div>
                <span className="text-sm font-medium">Buat PO</span>
              </div>
            </Link>
            
            <Link href="/gr/new">
              <div className="bg-white border border-gray-200 hover:border-green-500 hover:shadow-md rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all h-32 cursor-pointer">
                <div className="bg-green-100 p-3 rounded-lg text-green-600 mb-2">
                  <Package size={20} />
                </div>
                <span className="text-sm font-medium">Buat GR</span>
              </div>
            </Link>
            
            <Link href="/approvals">
              <div className="bg-white border border-gray-200 hover:border-amber-500 hover:shadow-md rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all h-32 cursor-pointer">
                <div className="bg-amber-100 p-3 rounded-lg text-amber-600 mb-2">
                  <ClipboardCheck size={20} />
                </div>
                <span className="text-sm font-medium">Approval</span>
              </div>
            </Link>
            
            <Link href="/reports">
              <div className="bg-white border border-gray-200 hover:border-red-500 hover:shadow-md rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all h-32 cursor-pointer">
                <div className="bg-red-100 p-3 rounded-lg text-red-600 mb-2">
                  <BarChart3 size={20} />
                </div>
                <span className="text-sm font-medium">Report</span>
              </div>
            </Link>
            
            <Link href="/master-data">
              <div className="bg-white border border-gray-200 hover:border-indigo-500 hover:shadow-md rounded-xl p-4 flex flex-col items-center justify-center text-center transition-all h-32 cursor-pointer">
                <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600 mb-2">
                  <TrendingUp size={20} />
                </div>
                <span className="text-sm font-medium">Master Data</span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
