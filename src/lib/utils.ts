import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatStatValue(value: number): string {
  if (value >= 1000000) {
    const millions = value / 1000000
    return `${millions.toFixed(millions >= 10 ? 0 : 1)}M+`
  }
  if (value >= 1000) {
    const thousands = value / 1000
    return `${thousands.toFixed(thousands >= 10 ? 0 : 1)}k+`
  }
  return `${value}+`
}
