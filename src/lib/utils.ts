import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(input: string) {
  return `${input.slice(0, 1).toUpperCase()}${input.slice(1).toLowerCase()}`;
}

type Locale = "en-GB" | "en-US" | "pl-PL";
type Style = "full" | "long" | "medium" | "short";
type FormatDateOptions = { locale: Locale; dateStyle: Style; timeStyle: Style };

export function formatDate(
  date: Date | number,
  { locale, dateStyle, timeStyle }: FormatDateOptions
): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    dateStyle,
    timeStyle,
    timeZone: "CET",
  });

  return formatter.format(date);
}
