import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, FileText } from "lucide-react";
import { PODetailView } from "@/components/po/po-detail-view";
import { PRDetailView } from "@/components/pr/pr-detail-view";
import { formatDate } from "@/lib/formatters";

interface GRDetailViewProps {
  data: {
    gr: any;
    approvals: any[];
    po: any;
    pr: any;
    poItems: any[];
  };
}

export function GRDetailView({ data }: GRDetailViewProps) {
  const { gr, approvals, po, pr, poItems } = data;
  const [activeTab, setActiveTab] = useState("details");
  const [showPODialog, setShowPODialog] = useState(false);
  const [showPRDialog, setShowPRDialog] = useState(false);
  
  return (
    <div className="space-y-6">
      {/* GR Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <h2 className="text-xl font-medium mb-2">Good Receipt Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">GR Number</p>
                  <p className="font-medium">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      {gr.grNumber}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p>{formatDate(gr.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {gr.status}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">PO Number</p>
                  <button 
                    className="text-primary hover:underline" 
                    onClick={() => setShowPODialog(true)}
                  >
                    {po?.poNumber}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={() => setShowPODialog(true)} className="flex gap-2 items-center">
                <ShoppingCart className="h-4 w-4" />
                View Related PO
              </Button>
              <Button variant="outline" onClick={() => setShowPRDialog(true)} className="flex gap-2 items-center">
                <FileText className="h-4 w-4" />
                View Related PR
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* GR Content */}
      <Card>
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="items">Items</TabsTrigger>
              <TabsTrigger value="approvals">Approvals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Good Receipt Information</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm text-gray-500">Description</div>
                    <div className="text-sm">{gr.description}</div>
                    
                    <div className="text-sm text-gray-500">Next Approval</div>
                    <div className="text-sm">
                      {gr.nextApproval === "done" ? (
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                          done
                        </span>
                      ) : gr.nextApproval}
                    </div>
                    
                    <div className="text-sm text-gray-500">Created At</div>
                    <div className="text-sm">{formatDate(gr.createdAt)}</div>
                    
                    <div className="text-sm text-gray-500">Updated At</div>
                    <div className="text-sm">{formatDate(gr.updatedAt)}</div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Related Purchase Order</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-sm text-gray-500">PO Number</div>
                    <div className="text-sm">{po?.poNumber}</div>
                    
                    <div className="text-sm text-gray-500">PO Date</div>
                    <div className="text-sm">{formatDate(po?.date)}</div>
                    
                    <div className="text-sm text-gray-500">Vendor</div>
                    <div className="text-sm">{po?.vendor}</div>
                    
                    <div className="text-sm text-gray-500">Delivery Point</div>
                    <div className="text-sm">{po?.deliveryPoint}</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="items" className="pt-4">
              <h3 className="text-lg font-medium mb-3">Items Received</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 border">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">No</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Description</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Brand</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r">Quantity</th>
                      <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r">UOM</th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {poItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 border-r">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 border-r">{item.description}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600 border-r">{item.brand || '-'}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-900 border-r">{item.quantity}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-center text-sm text-gray-600 border-r">{item.uom}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-right">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                            Received
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="approvals" className="pt-4">
              <h3 className="text-lg font-medium mb-3">Approval History</h3>
              <div className="grid grid-cols-3 gap-4">
                {approvals.map((approval, index) => (
                  <div key={index} className="border border-gray-200">
                    <div className="bg-gray-50 px-4 py-2 text-center text-sm font-medium">
                      {approval.role}
                    </div>
                    <div className="bg-green-500 text-white h-20 flex flex-col items-center justify-center">
                      <div className="text-sm font-medium">{approval.userName}</div>
                      <div className="text-xs">{formatDate(approval.approvedAt || approval.createdAt)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* PO Dialog */}
      <Dialog open={showPODialog} onOpenChange={setShowPODialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white mr-2">
                <ShoppingCart className="h-5 w-5" />
              </div>
              Purchase Order
            </DialogTitle>
          </DialogHeader>
          
          {po && (
            <PODetailView data={{
              po,
              items: poItems,
              approvals: [],
              pr: pr
            }} />
          )}
        </DialogContent>
      </Dialog>
      
      {/* PR Dialog */}
      <Dialog open={showPRDialog} onOpenChange={setShowPRDialog}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-white mr-2">
                <FileText className="h-5 w-5" />
              </div>
              Purchase Requisition
            </DialogTitle>
          </DialogHeader>
          
          {pr && (
            <PRDetailView data={{
              pr,
              items: [],
              approvals: []
            }} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
