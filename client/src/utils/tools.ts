import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { colors } from "./data";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function queryBuilder(query: { [x: string]: string | number | boolean | undefined }) {
  const queryString = Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join('&');
  return queryString
}

interface IColors {
  colors: {
    status: "unassigned" | "in-progress" | "resolved" | "closed",
    text: string,
    background: string

  }[]
}
export function getStatusColor(status: string){
  const bgColor = colors?.find(color => color.status === status)?.background
  const textColor = colors?.find(color => color.status === status)?.text

  return {
    bgColor,
    textColor
  }

}