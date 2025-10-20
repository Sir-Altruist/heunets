import React from 'react'
import { Tools } from '@/utils'
import { IField } from '@/interfaces';


const { cn } = Tools;
const InputField = ({
    label,
    placeholder,
    error,
    name,
    value,
    handlers,
    className,
    inputType,
}: IField) => {
  return (
    <div className="flex flex-col gap-1">
        <label className='text-sm'>{label}</label>
        <input
        type={inputType || "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={e => handlers.onChange(e)}
        className={cn(
        "w-full px-3 mt-1 py-2 border rounded-lg",
        "placeholder:text-gray-400",
        "focus:outline-none focus:ring-2 focus:border-transparent",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
        error
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-[#0842A6]"
        )}
        />
        {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
    </div>
  )
}

export default InputField