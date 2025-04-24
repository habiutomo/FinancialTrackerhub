import { cn } from "@/lib/utils";

type StatusType = 
  | "draft" 
  | "pending" 
  | "approved" 
  | "rejected" 
  | "completed" 
  | "in-progress"
  | "done"
  | "open"
  | "closed";

interface StatusBadgeProps {
  status: StatusType | string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const normalizedStatus = status.toLowerCase();
  
  // Determine style based on status
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "done":
      case "completed":
      case "approved":
        return "bg-green-100 text-green-800";
      case "pending":
      case "in-progress":
      case "open":
        return "bg-yellow-100 text-yellow-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      case "rejected":
      case "closed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <span 
      className={cn(
        "status-pill px-2 py-1 rounded-xl text-xs font-medium uppercase",
        getStatusStyle(normalizedStatus),
        className
      )}
    >
      {status}
    </span>
  );
}
