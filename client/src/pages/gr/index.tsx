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
  Search, 
  Filter, 
  RefreshCw, 
  Trash2
} from "lucide-react";
import { formatDate } from "@/lib/formatters";
import type { ColumnDef } from "@tanstack/react-table";
import type { GoodReceipt } from "@shared/schema";

export default function GRList() {
  const [_, navigate] = useLocation();
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [status, setStatus] = useState<string>("all");

  // Fetch GR data
  const { data: grs, isLoading } = useQuery<GoodReceipt[]>({
    queryKey: ["/api/gr"],
  });

  // Filter data based on selected filters
  const filteredData = grs?.filter(gr => {
    const date = new Date(gr.date);
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;
    
    const dateCondition = 
      (!fromDate || date >= fromDate) && 
      (!toDate || date <= toDate);
    
    const statusCondition = 
      status === "all" || 
      gr.status.toLowerCase() === status.toLowerCase();
    
    return dateCondition && statusCondition;
  });

  // Reset filters
  const handleReset = () => {
    setDateFrom("");
    setDateTo("");
    setStatus("all");
  };

  // Navigate to GR details page
  const handleRowClick = (gr: GoodReceipt) => {
    navigate(`/gr/${gr.id}`);
  };

  // Define columns for the table
  const columns: ColumnDef<GoodReceipt>[] = [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => <div className="text-sm">{row.index + 1}</div>,
    },
    {
      accessorKey: "date",
      header: "Date GR",
      cell: ({ row }) => <div className="text-sm text-gray-600">{formatDate(row.original.date)}</div>,
    },
    {
      accessorKey: "grNumber",
      header: "GR Number",
      cell: ({ row }) => (
        <div className="text-sm">
          <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {row.original.grNumber}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "poId",
      header: "PO Number",
      cell: ({ row }) => <div className="text-sm text-gray-600">{row.original.poId}</div>,
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div className="text-sm">{row.original.description}</div>,
    },
    {
      accessorKey: "nextApproval",
      header: "Next Approval",
      cell: ({ row }) => (
        <div className="text-sm">
          {row.original.nextApproval === "done" ? (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
              done
            </span>
          ) : (
            row.original.nextApproval
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <div className="text-sm">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            {row.original.status}
          </span>
        </div>
      ),
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
          Good Receipt List
        </div>
        <div className="text-gray-600 px-4 py-2 cursor-pointer">
          Create GR
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
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
              Showing <span className="font-medium">{filteredData?.length || 0}</span> of <span className="font-medium">{grs?.length || 0}</span> entries
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                className="flex items-center"
                onClick={() => navigate("/gr/new")}
              >
                <Plus className="h-4 w-4 mr-1" />
                New GR
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
              searchColumn="description"
              searchPlaceholder="Search description..."
              onRowClick={handleRowClick}
            />
          )}
        </div>
      </div>
    </div>
  );
}
