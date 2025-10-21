import { IconProps } from "@/interfaces";

export default function ChevronDownIcon({ className, size, click }: IconProps){
  return (
    <svg 
    width={size || "20"} 
    height={size || "21"}
    viewBox="0 0 20 21" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    onClick={click}
    >
      <path 
      d="M5 8L10 13L15 8" 
      // stroke="#36394A" 
      stroke="currentColor" 
      strokeWidth="1.66667" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      />
    </svg>
  )
}