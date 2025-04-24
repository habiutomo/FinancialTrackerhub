import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { FileText, ShoppingCart, Package, ChevronRight, Plus, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GoodReceipt, PurchaseOrder, PurchaseRequisition } from "@shared/schema";

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

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Purchase Requisitions</CardTitle>
              <CardDescription>Manage your purchase requests</CardDescription>
            </div>
            <div className="bg-blue-100 p-2 rounded-full">
              <FileText size={20} className="text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{prs?.length || 0}</div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-green-50 p-2 rounded-md text-center">
                <div className="text-green-600 text-sm font-medium">Approved</div>
                <div className="text-xl font-bold">{countStatus(prs, 'approved')}</div>
              </div>
              <div className="bg-yellow-50 p-2 rounded-md text-center">
                <div className="text-yellow-600 text-sm font-medium">Pending</div>
                <div className="text-xl font-bold">{countStatus(prs, 'pending')}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-md text-center">
                <div className="text-gray-600 text-sm font-medium">Draft</div>
                <div className="text-xl font-bold">{countStatus(prs, 'draft')}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href="/pr">
              <Button variant="outline" className="w-full">
                View All <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Purchase Orders</CardTitle>
              <CardDescription>Track your purchase orders</CardDescription>
            </div>
            <div className="bg-purple-100 p-2 rounded-full">
              <ShoppingCart size={20} className="text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pos?.length || 0}</div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-green-50 p-2 rounded-md text-center">
                <div className="text-green-600 text-sm font-medium">Approved</div>
                <div className="text-xl font-bold">{countStatus(pos, 'approved')}</div>
              </div>
              <div className="bg-yellow-50 p-2 rounded-md text-center">
                <div className="text-yellow-600 text-sm font-medium">Pending</div>
                <div className="text-xl font-bold">{countStatus(pos, 'pending')}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-md text-center">
                <div className="text-gray-600 text-sm font-medium">Draft</div>
                <div className="text-xl font-bold">{countStatus(pos, 'draft')}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href="/po">
              <Button variant="outline" className="w-full">
                View All <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg">Good Receipts</CardTitle>
              <CardDescription>Track your deliveries</CardDescription>
            </div>
            <div className="bg-green-100 p-2 rounded-full">
              <Package size={20} className="text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{grs?.length || 0}</div>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="bg-green-50 p-2 rounded-md text-center">
                <div className="text-green-600 text-sm font-medium">Completed</div>
                <div className="text-xl font-bold">{countStatus(grs, 'completed')}</div>
              </div>
              <div className="bg-yellow-50 p-2 rounded-md text-center">
                <div className="text-yellow-600 text-sm font-medium">In Process</div>
                <div className="text-xl font-bold">{countStatus(grs, 'in process')}</div>
              </div>
              <div className="bg-gray-50 p-2 rounded-md text-center">
                <div className="text-gray-600 text-sm font-medium">Draft</div>
                <div className="text-xl font-bold">{countStatus(grs, 'draft')}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href="/gr">
              <Button variant="outline" className="w-full">
                View All <ChevronRight size={16} className="ml-2" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="bg-white shadow-sm rounded-md p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Recent Transactions</h2>
          <Button variant="outline" size="sm">
            <RefreshCw size={16} className="mr-2" /> Refresh
          </Button>
        </div>
        <Separator className="mb-4" />
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-md mb-2">GR00563</span>
                <h3 className="font-medium">Perpanjangan Kontrak Excavator 01 GAP</h3>
                <div className="text-sm text-gray-500 mt-1">2024-12-23</div>
              </div>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">Completed</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-md mb-2">GR00562</span>
                <h3 className="font-medium">Perpanjangan Kontrak Grader GAP 001</h3>
                <div className="text-sm text-gray-500 mt-1">2024-12-23</div>
              </div>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">Completed</span>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-md mb-2">GR00561</span>
                <h3 className="font-medium">Transportasi Karyawan via Darat Melak-Tenggarong-Samarinda-Balikpapan</h3>
                <div className="text-sm text-gray-500 mt-1">2024-12-23</div>
              </div>
              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-md">Completed</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mt-4">
          <Button variant="ghost" size="sm">
            View All Transactions <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Quick Actions</h2>
        </div>
        <Separator className="mb-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/pr/new">
            <Button className="w-full h-auto py-6 flex flex-col" variant="outline">
              <FileText size={24} className="mb-2" />
              <span>Create New PR</span>
            </Button>
          </Link>
          
          <Link href="/po/new">
            <Button className="w-full h-auto py-6 flex flex-col" variant="outline">
              <ShoppingCart size={24} className="mb-2" />
              <span>Create New PO</span>
            </Button>
          </Link>
          
          <Link href="/gr/new">
            <Button className="w-full h-auto py-6 flex flex-col" variant="outline">
              <Package size={24} className="mb-2" />
              <span>Create New GR</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
