import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, ShoppingCart, Package } from "lucide-react";

export default function FormCreate() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Form Create</h1>
        <p className="text-gray-600">Buat dokumen procurement baru dengan cepat</p>
      </div>
      
      <Tabs defaultValue="pr" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="pr" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <FileText className="w-4 h-4 mr-2" />
            Purchase Requisition
          </TabsTrigger>
          <TabsTrigger value="po" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Purchase Order
          </TabsTrigger>
          <TabsTrigger value="gr" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
            <Package className="w-4 h-4 mr-2" />
            Good Receipt
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="pr">
          <Card>
            <CardHeader>
              <CardTitle>Buat Purchase Requisition Baru</CardTitle>
              <CardDescription>
                Formulir ini digunakan untuk membuat permintaan pembelian barang atau jasa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <h3 className="text-lg font-medium text-gray-500">Form Pembuatan PR</h3>
                <p className="text-gray-400 mb-4">Form lengkap akan ditampilkan di sini</p>
                <Button variant="outline">Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="po">
          <Card>
            <CardHeader>
              <CardTitle>Buat Purchase Order Baru</CardTitle>
              <CardDescription>
                Formulir ini digunakan untuk membuat pesanan pembelian ke vendor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <h3 className="text-lg font-medium text-gray-500">Form Pembuatan PO</h3>
                <p className="text-gray-400 mb-4">Form lengkap akan ditampilkan di sini</p>
                <Button variant="outline">Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="gr">
          <Card>
            <CardHeader>
              <CardTitle>Buat Good Receipt Baru</CardTitle>
              <CardDescription>
                Formulir ini digunakan untuk mencatat penerimaan barang dari vendor
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <h3 className="text-lg font-medium text-gray-500">Form Pembuatan GR</h3>
                <p className="text-gray-400 mb-4">Form lengkap akan ditampilkan di sini</p>
                <Button variant="outline">Coming Soon</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}