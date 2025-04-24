import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  ShoppingCart, 
  Package, 
  PlusCircle as PlusCircleIcon, 
  Trash2 as Trash2Icon 
} from "lucide-react";

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
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nomor PR</label>
                    <input
                      type="text"
                      placeholder="Otomatis..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Departemen</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Pilih Departemen</option>
                      <option value="mining">Mining</option>
                      <option value="operations">Operations</option>
                      <option value="admin">Admin</option>
                      <option value="finance">Finance</option>
                      <option value="hrd">HRD</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Requester</label>
                    <input
                      type="text"
                      placeholder="Nama Pemohon"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Judul PR</label>
                    <input
                      type="text"
                      placeholder="Judul Purchase Requisition"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Keterangan</label>
                    <textarea
                      rows={3}
                      placeholder="Deskripsi kebutuhan..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-md p-4 space-y-4">
                  <h3 className="font-medium text-gray-700">Item PR</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Material</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kuantitas</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satuan</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Estimasi</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-2">1</td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              placeholder="Kode..."
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              placeholder="Nama material..."
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="Qty"
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <select className="w-full px-2 py-1 border border-gray-300 rounded-sm">
                              <option value="">Satuan</option>
                              <option value="pcs">Pcs</option>
                              <option value="kg">Kg</option>
                              <option value="ton">Ton</option>
                              <option value="liter">Liter</option>
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="Harga"
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="Total"
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                              disabled
                            />
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-2">
                    <PlusCircleIcon className="h-4 w-4 mr-2" />
                    Tambah Item
                  </Button>
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">
                    Batal
                  </Button>
                  <Button type="submit">
                    Simpan PR
                  </Button>
                </div>
              </form>
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
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nomor PO</label>
                    <input
                      type="text"
                      placeholder="Otomatis..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Berdasarkan PR</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Pilih No. PR</option>
                      <option value="PR0001">PR0001 - Spare Parts Excavator</option>
                      <option value="PR0002">PR0002 - Service Contract for Heavy Equipment</option>
                      <option value="PR0003">PR0003 - Office Supplies Annual Contract</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vendor</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Pilih Vendor</option>
                      <option value="1">PT Sumber Makmur</option>
                      <option value="2">PT Abadi Jaya</option>
                      <option value="3">CV Mitra Utama</option>
                      <option value="4">PT Mandiri Sentosa</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Alamat Pengiriman</label>
                    <textarea
                      rows={2}
                      placeholder="Alamat pengiriman lengkap..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Metode Pembayaran</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Pilih Metode</option>
                      <option value="cash">Cash</option>
                      <option value="credit">Credit (30 hari)</option>
                      <option value="credit45">Credit (45 hari)</option>
                      <option value="credit60">Credit (60 hari)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pengiriman</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Pilih Metode</option>
                      <option value="pickup">Diambil Sendiri</option>
                      <option value="delivery">Dikirim Vendor</option>
                    </select>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-md p-4 space-y-4">
                  <h3 className="font-medium text-gray-700">Item PO</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Material</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kuantitas</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satuan</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-2">1</td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              placeholder="Kode..."
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="text"
                              placeholder="Nama material..."
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="Qty"
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <select className="w-full px-2 py-1 border border-gray-300 rounded-sm">
                              <option value="">Satuan</option>
                              <option value="pcs">Pcs</option>
                              <option value="kg">Kg</option>
                              <option value="ton">Ton</option>
                              <option value="liter">Liter</option>
                            </select>
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="Harga"
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                            />
                          </td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="Total"
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                              disabled
                            />
                          </td>
                          <td className="px-3 py-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                              <Trash2Icon className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-2">
                    <PlusCircleIcon className="h-4 w-4 mr-2" />
                    Tambah Item
                  </Button>
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">
                    Batal
                  </Button>
                  <Button type="submit">
                    Simpan PO
                  </Button>
                </div>
              </form>
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
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nomor GR</label>
                    <input
                      type="text"
                      placeholder="Otomatis..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tanggal</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Berdasarkan PO</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="">Pilih No. PO</option>
                      <option value="PO0001">PO0001 - PT Sumber Makmur (Spare Parts)</option>
                      <option value="PO0002">PO0002 - PT Abadi Jaya (Service Contract)</option>
                      <option value="PO0003">PO0003 - CV Mitra Utama (Office Supplies)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Vendor</label>
                    <input
                      type="text"
                      placeholder="Nama Vendor (otomatis dari PO)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Penerima</label>
                    <input
                      type="text"
                      placeholder="Nama Penerima"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Surat Jalan</label>
                    <input
                      type="text"
                      placeholder="Nomor Surat Jalan"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">Catatan</label>
                    <textarea
                      rows={3}
                      placeholder="Catatan penerimaan..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-md p-4 space-y-4">
                  <h3 className="font-medium text-gray-700">Item GR</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode Material</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kuantitas Pesanan</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kuantitas Diterima</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Satuan</th>
                          <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-3 py-2">1</td>
                          <td className="px-3 py-2">PART001</td>
                          <td className="px-3 py-2">Spare Part Engine XYZ</td>
                          <td className="px-3 py-2">10</td>
                          <td className="px-3 py-2">
                            <input
                              type="number"
                              placeholder="Qty"
                              className="w-full px-2 py-1 border border-gray-300 rounded-sm"
                            />
                          </td>
                          <td className="px-3 py-2">Pcs</td>
                          <td className="px-3 py-2">
                            <select className="w-full px-2 py-1 border border-gray-300 rounded-sm">
                              <option value="completed">Sesuai</option>
                              <option value="partial">Sebagian</option>
                              <option value="pending">Ditunda</option>
                              <option value="rejected">Ditolak</option>
                            </select>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline">
                    Batal
                  </Button>
                  <Button type="submit">
                    Simpan GR
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}