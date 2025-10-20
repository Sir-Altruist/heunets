import React from 'react'
import { Tools } from '@/utils';

interface IButton {
    text: string;
    size?: "default" | "full";
    type?: "button" | "submit";
    className?: string;
    handler?: () => void;
}

const { cn } = Tools
const Button = ({ type, text, size, className, handler }: IButton) => {
  return (
    <button 
    type={type === "submit" ? "submit" : "button"} 
    className={cn(`${size === "full" ? "w-full" : "w-max" } rounded-[8px] bg-[#0842A6] text-[#fff] p-3 hover:bg-[#2A239F]`, className)}
    onClick={handler}
    >
        {text}
    </button>
  )
}

export default Button