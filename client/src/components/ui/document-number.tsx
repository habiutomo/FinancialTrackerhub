import { cn } from "@/lib/utils";

type DocumentType = "PR" | "PO" | "GR" | "INV";

interface DocumentNumberProps {
  type: DocumentType;
  number: string;
  className?: string;
}

export function DocumentNumber({ type, number, className }: DocumentNumberProps) {
  // Determine color based on document type
  const getTypeColor = (type: DocumentType) => {
    switch (type) {
      case "PR":
        return "bg-blue-500 text-white";
      case "PO":
        return "bg-amber-500 text-white";
      case "GR":
        return "bg-destructive text-white";
      case "INV":
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <span 
      className={cn(
        "px-2 py-1 rounded text-xs font-medium",
        getTypeColor(type),
        className
      )}
    >
      {number}
    </span>
  );
}
