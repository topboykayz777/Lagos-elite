import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWhatsAppLink(phone: string, message: string) {
  return `https://wa.me/${phone.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
}