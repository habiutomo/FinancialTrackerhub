import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, Printer, Download, Cloud, Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatRupiah, formatDate } from "@/lib/formatters";
import { PRDetailView } from "@/components/pr/pr-detail-view";
import { printDocument } from "@/lib/print-utils";

export default function PRDetail() {
  const [_, navigate] = useLocation();
  const [match, params] = useRoute("/pr/:id");
  const [isNewRecord, setIsNewRecord] = useState(false);
  
  useEffect(() => {
    if (params?.id === "new") {
      setIsNewRecord(true);
    }
  }, [params]);

  // Fetch PR data if not a new record
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/pr', params?.id],
    enabled: !isNewRecord && !!params?.id,
  });

  const handleBack = () => {
    navigate("/pr");
  };

  const handlePrint = () => {
    if (data) {
      printDocument("pr", data);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <p>Error loading purchase requisition details</p>
              <Button variant="outline" className="mt-4" onClick={handleBack}>
                Back to List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1">
      {/* Header Navigation */}
      <div className="px-6 pt-6 pb-4 flex items-center justify-between bg-white border-b border-gray-200">
        <div className="flex items-center">
          <Button variant="ghost" onClick={handleBack} className="mr-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-xl font-medium">
            {isNewRecord ? "Create Purchase Requisition" : `Purchase Requisition: ${data?.pr?.prNumber}`}
          </h1>
        </div>
        
        {!isNewRecord && data && (
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-1" />
              Download
            </Button>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="p-6">
        {isNewRecord ? (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-medium mb-4">New Purchase Requisition</h2>
              {/* Form for new PR would go here */}
              <div className="text-center text-gray-500 py-8">
                <p>PR creation form would be implemented here</p>
                <Button onClick={handleBack} className="mt-4">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          data && <PRDetailView data={data} />
        )}
      </div>
    </div>
  );
}
