import { Card, CardContent } from "@/components/ui/card";
import { Approval } from "@shared/schema";

interface ApprovalPanelProps {
  approvals: Approval[];
}

export function ApprovalPanel({ approvals }: ApprovalPanelProps) {
  // Sort approvals by createdAt date
  const sortedApprovals = [...approvals].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <div className="p-6 border-t border-gray-200">
      <h3 className="text-lg font-medium mb-4">Approval History</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {sortedApprovals.map((approval) => (
          <div key={approval.id} className="border border-gray-200">
            <div className="bg-gray-50 px-2 py-2 text-center text-xs font-medium">
              {approval.approverRole}
            </div>
            <div className="approval-section h-16 flex flex-col items-center justify-center">
              <div className="text-xs font-medium">{approval.approverName}</div>
              <div className="text-xs">
                {approval.approvedAt
                  ? new Date(approval.approvedAt).toLocaleString('id-ID', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })
                  : 'Pending'}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-1 text-center text-xs">
              {approval.status === 'approved' ? 'Approved' : 
               approval.status === 'rejected' ? 'Rejected' : 'Pending'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
