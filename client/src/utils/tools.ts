import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function queryBuilder(query: { [x: string]: string | number | boolean | undefined }) {
    const queryString = Object.keys(query)
      .map((key) => `${key}=${query[key]}`)
      .join('&');
    return queryString
}