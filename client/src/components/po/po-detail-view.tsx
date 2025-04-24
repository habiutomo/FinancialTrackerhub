import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatRupiah, formatDate, formatDateTime, formatDateMonthName } from "@/lib/formatters";
import { ShoppingCart } from "lucide-react";

interface PODetailViewProps {
  data: {
    po: any;
    items: any[];
    approvals: any[];
    pr: any;
  };
}

export function PODetailView({ data }: PODetailViewProps) {
  const { po, items, approvals, pr } = data;
  
  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + Number(item.unitPrice) * item.quantity, 0);
  const ppnTotal = items.reduce((sum, item) => sum + Number(item.ppn), 0);
  const grandTotal = subtotal + ppnTotal;
  
  return (
    <div className="space-y-6">
      {/* PO Header Section */}
      <div className="p-6 bg-gray-50 border-b border-gray-200 rounded-md">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-primary-light text-white p-2 font-medium text-sm">
              PURCHASE ORDER
            </div>
            
            <div className="bg-white p-4 border border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Company</div>
                  <div className="font-medium">{po.company}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Address</div>
                  <div className="text-sm">{po.address}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Subject</div>
                  <div className="text-sm">{po.subject}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Vendor</div>
                  <div className="text-sm">{po.vendor}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Attention</div>
                  <div className="text-sm">{po.attention}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Shipping/Phone</div>
                  <div className="text-sm">{po.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="text-sm">{po.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Page</div>
                  <div className="text-sm">1/1</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-64">
            <div className="bg-white p-4 border border-gray-200 h-full">
              <div className="flex flex-col gap-2">
                <div>
                  <div className="text-sm text-gray-500">PO</div>
                  <div className="font-medium">{po.poNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Date</div>
                  <div className="text-sm">{formatDateMonthName(po.date)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Purchaser</div>
                  <div className="text-sm">GBU</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Delivery Point</div>
                  <div className="text-sm">{po.deliveryPoint}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Status PO</div>
                  <div>
                    <Badge className="bg-red-500 text-white">
                      {po.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* PO Items Section */}
      <div>
        <div className="text-lg font-medium mb-4">Detail PO</div>
        
        <div className="overflow-x-auto">
          <Table className="border">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="border-r">No</TableHead>
                <TableHead className="border-r">Description</TableHead>
                <TableHead className="border-r">Brand</TableHead>
                <TableHead className="border-r">ID Number</TableHead>
                <TableHead className="border-r">QTY</TableHead>
                <TableHead className="border-r">UOM</TableHead>
                <TableHead className="border-r">Unit Price (IDR)</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="border-r">{index + 1}</TableCell>
                  <TableCell className="border-r">{item.description}</TableCell>
                  <TableCell className="border-r">{item.brand || '-'}</TableCell>
                  <TableCell className="border-r">{item.idNumber || '-'}</TableCell>
                  <TableCell className="border-r">{item.quantity}</TableCell>
                  <TableCell className="border-r">{item.uom}</TableCell>
                  <TableCell className="border-r">{formatRupiah(item.unitPrice)}</TableCell>
                  <TableCell className="text-right">{formatRupiah(Number(item.unitPrice) * item.quantity)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* PO Totals Section */}
        <div className="mt-6 flex justify-end">
          <div className="w-64">
            <div className="border border-gray-200">
              <div className="px-4 py-2 flex justify-between items-center border-b border-gray-200">
                <div className="text-sm text-gray-600">Sub Total:</div>
                <div className="font-medium">{formatRupiah(subtotal)}</div>
              </div>
              <div className="px-4 py-2 flex justify-between items-center border-b border-gray-200">
                <div className="text-sm text-gray-600">PPN 11%:</div>
                <div className="font-medium">{formatRupiah(ppnTotal)}</div>
              </div>
              <div className="px-4 py-2 flex justify-between items-center bg-gray-50">
                <div className="text-sm font-medium">GRAND TOTAL:</div>
                <div className="font-bold">{formatRupiah(grandTotal)}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Terms & Conditions */}
        <div className="mt-6">
          <h3 className="text-sm font-medium uppercase text-gray-600 mb-2">Terms & Conditions</h3>
          <div className="text-sm text-gray-600 pl-4 space-y-1 whitespace-pre-line">
            {po.terms || 'No terms specified'}
          </div>
        </div>
      </div>
      
      {/* Approval Section */}
      <div className="border-t border-gray-200 pt-6">
        <div className="grid grid-cols-3 gap-4">
          {approvals.map((approval, index) => (
            <div key={index} className="border border-gray-200">
              <div className="bg-gray-50 px-4 py-2 text-center text-sm font-medium">
                {approval.role}
              </div>
              <div className="bg-green-500 text-white h-20 flex flex-col items-center justify-center">
                <div className="text-sm font-medium">{approval.userName}</div>
                <div className="text-xs">{formatDateTime(approval.approvedAt || approval.createdAt)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
