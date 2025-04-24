import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatRupiah, formatDate, formatDateTime } from "@/lib/formatters";
import { Eye, Cloud } from "lucide-react";

interface PRDetailViewProps {
  data: {
    pr: any;
    items: any[];
    approvals: any[];
  };
}

export function PRDetailView({ data }: PRDetailViewProps) {
  const { pr, items, approvals } = data;
  
  const totalAmount = items.reduce((sum, item) => sum + Number(item.total), 0);
  const formattedTotalAmount = formatRupiah(totalAmount);
  
  return (
    <div className="space-y-6">
      {/* PR Header Section */}
      <div className="bg-gray-50 border-b border-gray-200 p-6 rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 h-full">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white mr-2">
                  <span className="text-xs font-bold">MMS</span>
                </div>
                <div className="font-medium">MMS</div>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">To</div>
                <div>Procurement</div>
                
                <div className="text-gray-500">From</div>
                <div>{pr.requester}</div>
                
                <div className="text-gray-500">Department</div>
                <div>{pr.department}</div>
                
                <div className="text-gray-500">Need PR</div>
                <div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    {pr.needsPr ? "YES" : "NO"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 h-full">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Type PR</div>
                <div>{pr.typePr}</div>
                
                <div className="text-gray-500">Remarks</div>
                <div className="text-xs">{pr.remarks}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 h-full">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">No PR</div>
                <div>{pr.prNumber}</div>
                
                <div className="text-gray-500">Date</div>
                <div>{formatDate(pr.date)}</div>
                
                <div className="text-gray-500">Subject</div>
                <div className="text-xs">{pr.subject}</div>
                
                <div className="text-gray-500">Status</div>
                <div>
                  <Badge 
                    variant="outline" 
                    className={`${
                      pr.status.toLowerCase() === 'open' 
                        ? 'bg-blue-100 text-blue-800 border-blue-200' 
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}
                  >
                    {pr.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="text-gray-500">Support Doc</div>
                <div>
                  <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                    {pr.supportDoc ? "Required" : "Optional"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* PR Items Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="text-lg font-medium">Pipeline total: {items.length}</div>
          <div className="flex items-center">
            <div className="relative">
              <input type="text" placeholder="Search" className="border border-gray-300 rounded pl-8 pr-2 py-1 text-sm" />
              <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-sm text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table className="border">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="border-r">NO</TableHead>
                <TableHead className="text-center border-r">ACT</TableHead>
                <TableHead className="text-center border-r">FILE</TableHead>
                <TableHead className="border-r">DESCRIPTION</TableHead>
                <TableHead className="border-r">TYPE</TableHead>
                <TableHead className="border-r">ID</TableHead>
                <TableHead className="border-r">ASSET NUMBER</TableHead>
                <TableHead className="border-r">BRAND</TableHead>
                <TableHead className="text-center border-r">QTY</TableHead>
                <TableHead className="text-center border-r">UOM</TableHead>
                <TableHead className="text-right border-r">PRICE</TableHead>
                <TableHead className="text-right border-r">PRBKB</TableHead>
                <TableHead className="text-right">TOTAL</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="border-r">{index + 1}</TableCell>
                  <TableCell className="text-center border-r">
                    <Eye className="h-4 w-4 text-primary inline-block" />
                  </TableCell>
                  <TableCell className="text-center border-r">
                    <Cloud className="h-4 w-4 text-sky-600 inline-block" />
                  </TableCell>
                  <TableCell className="border-r">{item.description}</TableCell>
                  <TableCell className="border-r">{item.type}</TableCell>
                  <TableCell className="border-r">{item.itemId || '-'}</TableCell>
                  <TableCell className="border-r">{item.assetNumber || '-'}</TableCell>
                  <TableCell className="border-r">{item.brand || '-'}</TableCell>
                  <TableCell className="text-center border-r">{item.quantity}</TableCell>
                  <TableCell className="text-center border-r">{item.uom}</TableCell>
                  <TableCell className="text-right border-r">{formatRupiah(item.price)}</TableCell>
                  <TableCell className="text-right border-r">{formatRupiah(item.prbkb)}</TableCell>
                  <TableCell className="text-right">{formatRupiah(item.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* PR Totals Section */}
        <div className="mt-6 flex justify-end">
          <div className="w-64">
            <div className="border border-gray-200">
              <div className="px-4 py-1 flex justify-between items-center border-b border-gray-200 text-sm">
                <div className="text-gray-600">BPPNB 2.5%:</div>
                <div className="font-medium">Rp 0</div>
              </div>
              <div className="px-4 py-2 flex justify-between items-center bg-gray-50">
                <div className="text-sm font-medium">GRAND TOTAL:</div>
                <div className="font-bold">{formattedTotalAmount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Approval Section */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium mb-4">Approval History</h3>
        <div className="grid grid-cols-5 gap-2">
          {approvals.map((approval, index) => (
            <div key={index} className="border border-gray-200">
              <div className="bg-gray-50 px-2 py-2 text-center text-xs font-medium">
                {approval.role}
              </div>
              <div className="bg-green-500 text-white h-16 flex flex-col items-center justify-center">
                <div className="text-xs font-medium">{approval.userName}</div>
                <div className="text-xs">{formatDateTime(approval.approvedAt || approval.createdAt)}</div>
              </div>
              <div className="bg-gray-50 px-4 py-1 text-center text-xs">
                {approval.status === 'approved' ? 'Approved By' : 
                 approval.status === 'pending' ? 'Pending Approval' : 
                 approval.status === 'rejected' ? 'Rejected By' : 'Notified By'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
