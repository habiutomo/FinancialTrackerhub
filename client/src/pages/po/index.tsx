import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileDown, 
  Printer, 
  Plus, 
  Filter, 
  RefreshCw, 
  Trash2
} from "lucide-react";
import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import type { PurchaseOrder } from "@shared/schema";

export default function POList() {
  const [_, navigate] = useLocation();
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [status, setStatus] = useState<string>("all");

  // Fetch PO data
  const { data: pos, isLoading } = useQuery<PurchaseOrder[]>({
    queryKey: ["/api/po"],
  });

  // Filter data based on selected filters
  const filteredData = pos?.filter(po => {
    const date = new Date(po.date);
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;
    
    const dateCondition = 
      (!fromDate || date >= fromDate) && 
      (!toDate || date <= toDate);
    
    const statusCondition = 
      status === "all" || 
      po.status.toLowerCase() === status.toLowerCase();
    
    return dateCondition && statusCondition;
  });

  // Reset filters
  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
    setStatus("all");
  };

  // Navigate to PO details page
  const handleRowClick = (po: PurchaseOrder) => {
    navigate(`/po/${po.id}`);
  };

  // Define columns for the table
  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => <div className="text-sm">{row.index + 1}</div>,
    },
    {
      accessorKey: "date",
      header: "Date PO",
      cell: ({ row }) => <div className="text-sm text-gray-600">{formatDate(row.original.date)}</div>,
    },
    {
      accessorKey: "poNumber",
      header: "PO Number",
      cell: ({ row }) => (
        <div className="text-sm">
          <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium">
            {row.original.poNumber}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "prId",
      header: "PR Number",
      cell: ({ row }) => <div className="text-sm text-gray-600">{row.original.prId}</div>,
    },
    {
      accessorKey: "vendor",
      header: "Vendor",
      cell: ({ row }) => <div className="text-sm">{row.original.vendor}</div>,
    },
    {
      accessorKey: "subject",
      header: "Subject",
      cell: ({ row }) => <div className="text-sm">{row.original.subject}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusStyles = () => {
          switch (row.original.status.toLowerCase()) {
            case 'approved':
              return 'bg-green-100 text-green-800';
            case 'pending':
              return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
              return 'bg-red-100 text-red-800';
            case 'draft':
              return 'bg-gray-100 text-gray-800';
            default:
              return 'bg-gray-100 text-gray-800';
          }
        };
        
        return (
          <div className="text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles()}`}>
              {row.original.status}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <Button 
          variant="ghost" 
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            if (confirm("Are you sure you want to delete this record?")) {
              alert("Record deleted successfully");
            }
          }}
        >
          <Trash2 className="h-4 w-4 text-red-500" />
        </Button>
      ),
    },
  ];

  return (
    <div className="flex-1">
      {/* Tabs Navigation */}
      <div className="px-6 pt-6 pb-0 flex border-b border-gray-200 bg-white">
        <div className="border-b-2 border-primary text-primary px-4 py-2 font-medium cursor-pointer">
          Purchase Order List
        </div>
        <div className="text-gray-600 px-4 py-2 cursor-pointer">
          Create PO
        </div>
      </div>
      
      {/* Filters */}
      <div className="px-6 py-4 bg-white border-b border-gray-200 flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <label className="text-sm text-gray-600 mr-2">Date From:</label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm w-36"
          />
        </div>
        
        <div className="flex items-center">
          <label className="text-sm text-gray-600 mr-2">Date To:</label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm w-36"
          />
        </div>
        
        <div className="flex items-center">
          <label className="text-sm text-gray-600 mr-2">Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="all">All</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        
        <Button 
          size="sm" 
          className="flex items-center"
          onClick={() => {/* Apply filters */}}
        >
          <Filter className="h-4 w-4 mr-1" />
          Filter
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={handleReset}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white shadow-sm rounded-md overflow-hidden">
          {/* Table Actions */}
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{filteredData?.length || 0}</span> of <span className="font-medium">{pos?.length || 0}</span> entries
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                className="flex items-center"
                onClick={() => navigate("/po/new")}
              >
                <Plus className="h-4 w-4 mr-1" />
                New PO
              </Button>
              
              <Button variant="outline" size="icon">
                <FileDown className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Table */}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <DataTable 
              columns={columns} 
              data={filteredData || []} 
              searchColumn="subject"
              searchPlaceholder="Search subject..."
              onRowClick={handleRowClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
