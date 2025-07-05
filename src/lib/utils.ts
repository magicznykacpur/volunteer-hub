import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(input: string) {
  return `${input.slice(0, 1).toUpperCase()}${input.slice(1).toLowerCase()}`
}