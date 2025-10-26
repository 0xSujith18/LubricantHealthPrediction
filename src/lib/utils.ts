import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const downloadCSV = (data: any[], filename: string) => {
  const csvContent = "data:text/csv;charset=utf-8," 
    + Object.keys(data[0]).join(",") + "\n"
    + data.map(row => Object.values(row).join(",")).join("\n");
  
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'Good': return 'text-green-500';
    case 'Average': return 'text-yellow-500';
    case 'Bad': return 'text-red-500';
    default: return 'text-gray-500';
  }
};

export const getConditionBg = (condition: string) => {
  switch (condition) {
    case 'Good': return 'bg-green-500/20';
    case 'Average': return 'bg-yellow-500/20';
    case 'Bad': return 'bg-red-500/20';
    default: return 'bg-gray-500/20';
  }
};