import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, useLocation } from "wouter";
import { ArrowLeft, Printer, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GRDetailView } from "@/components/gr/gr-detail-view";
import { printDocument } from "@/lib/print-utils";

export default function GRDetail() {
  const [_, navigate] = useLocation();
  const [match, params] = useRoute("/gr/:id");
  const [isNewRecord, setIsNewRecord] = useState(false);
  
  useEffect(() => {
    if (params?.id === "new") {
      setIsNewRecord(true);
    }
  }, [params]);

  // Fetch GR data if not a new record
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/gr', params?.id],
    enabled: !isNewRecord && !!params?.id,
  });

  const handleBack = () => {
    navigate("/gr");
  };

  const handlePrint = () => {
    if (data) {
      printDocument("gr", data);
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
              <p>Error loading goods receipt details</p>
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
            {isNewRecord ? "Create Good Receipt" : `Good Receipt: ${data?.gr?.grNumber}`}
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
              <h2 className="text-lg font-medium mb-4">New Good Receipt</h2>
              {/* Form for new GR would go here */}
              <div className="text-center text-gray-500 py-8">
                <p>GR creation form would be implemented here</p>
                <Button onClick={handleBack} className="mt-4">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          data && <GRDetailView data={data} />
        )}
      </div>
    </div>
  );
}
