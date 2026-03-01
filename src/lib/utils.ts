import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a clean WhatsApp link with a pre-filled message.
 * @param phone The phone number in international format (e.g., +234...)
 * @param message The message to pre-fill
 */
export function getWhatsAppLink(phone: string, message: string) {
  // Remove any non-numeric characters from the phone number
  const cleanPhone = phone.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}