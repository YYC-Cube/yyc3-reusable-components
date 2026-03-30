/**
 * Global utility functions for the application
 */

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper priority
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency with Saudi Riyal symbol
 */
export function formatCurrency(amount: number | string, locale: string = 'en'): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/,/g, '')) : amount;
  
  if (isNaN(numAmount)) return '0 ﷼';
  
  return `${numAmount.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en-SA')} ﷼`;
}

/**
 * Format date to locale string
 */
export function formatDate(date: string | Date, locale: string = 'en'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  return d.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number = 50): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate unique ID
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if value is empty
 */
export function isEmpty(value: any): boolean {
  if (value == null) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Safe JSON parse
 */
export function safeJsonParse<T>(json: string, fallback: T): T {
  try {
    return JSON.parse(json);
  } catch {
    return fallback;
  }
}

/**
 * Get status color class
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    active: 'bg-green-500/20 text-green-400 border-green-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    approved: 'bg-green-500/20 text-green-400 border-green-500/30',
    verified: 'bg-green-500/20 text-green-400 border-green-500/30',
    pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    processing: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'in-transit': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    overdue: 'bg-red-500/20 text-red-400 border-red-500/30',
    failed: 'bg-red-500/20 text-red-400 border-red-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
    inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'on-leave': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    resigned: 'bg-red-500/20 text-red-400 border-red-500/30',
    delivered: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    submitted: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    compliant: 'bg-green-500/20 text-green-400 border-green-500/30',
    'non-compliant': 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  
  return statusColors[status.toLowerCase()] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
}

/**
 * Validate email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number (Saudi format)
 */
export function isValidSaudiPhone(phone: string): boolean {
  const phoneRegex = /^\+966\s?\d{2}\s?\d{3}\s?\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${Math.round(bytes / Math.pow(k, i) * 100) / 100} ${sizes[i]}`;
}

/**
 * Get gradient colors for charts
 */
export function getGradientColor(index: number): string {
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-green-500 to-emerald-500',
    'from-amber-500 to-orange-500',
    'from-purple-500 to-pink-500',
    'from-red-500 to-pink-500',
    'from-indigo-500 to-blue-500',
    'from-yellow-500 to-orange-500',
    'from-sky-500 to-blue-500',
    'from-rose-500 to-pink-500',
    'from-cyan-500 to-blue-500',
    'from-violet-500 to-purple-500',
    'from-fuchsia-500 to-pink-500',
    'from-orange-500 to-red-500',
    'from-slate-500 to-gray-500',
  ];
  
  return gradients[index % gradients.length];
}
