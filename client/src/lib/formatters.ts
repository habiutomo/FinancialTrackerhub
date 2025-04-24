/**
 * Format a number as Indonesian Rupiah
 */
export function formatRupiah(amount: number | string): string {
  if (amount === null || amount === undefined) return 'Rp 0';
  
  const value = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Format with thousand separators for Indonesian currency
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format a date to YYYY-MM-DD format
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) return '';
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

/**
 * Format a date to DD-MMM-YYYY format (e.g., 01-Jan-2024)
 */
export function formatDateMonthName(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) return '';
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();
  
  return `${day}-${month}-${year}`;
}

/**
 * Format a date and time to YYYY-MM-DD HH:MM:SS format
 */
export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  // Check if the date is valid
  if (isNaN(dateObj.getTime())) return '';
  
  return dateObj.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * Truncate text if it exceeds a certain length
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

/**
 * Format numbers with thousand separators
 */
export function formatNumber(num: number | string): string {
  if (num === null || num === undefined) return '0';
  
  const value = typeof num === 'string' ? parseFloat(num) : num;
  
  return new Intl.NumberFormat('id-ID').format(value);
}
