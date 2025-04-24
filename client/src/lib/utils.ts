import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

export function formatDateTime(date: Date | string): string {
  if (!date) return '';
  const d = new Date(date);
  return `${d.toISOString().split('T')[0]} ${d.toTimeString().split(' ')[0].substring(0, 5)}`;
}

export function generateRandomId(length = 8): string {
  return Math.random().toString(36).substring(2, length + 2);
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed':
    case 'approved':
    case 'done':
      return 'bg-green-100 text-green-800';
    case 'pending':
    case 'in progress':
    case 'open':
      return 'bg-blue-100 text-blue-800';
    case 'rejected':
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    case 'draft':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
