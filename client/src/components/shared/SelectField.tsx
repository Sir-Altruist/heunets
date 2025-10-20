"use client"

import { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@/assets/icons';
import { Tools } from '@/utils';
import { ISelect } from '@/interfaces';

const { cn } = Tools
export default function CustomSelect({ 
  options, 
  className,
  setState,
  value
}: ISelect) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  /** Close dropdown when clicking outside **/
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setState(option)
    setIsOpen(false);
  };

  return (
        <div className={cn("relative w-[150px] outline-none text-[#D5D9DE]", className)} ref={dropdownRef}>
          {/* Select Button */}
            <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={
                cn("w-full flex gap-2 cursor-pointer bg-white border border-[#D5D9DE] rounded-lg p-2 items-center justify-between text-left hover:border-gray-300 transition-colors",
                  className
                )}
            >
            <span className={cn("text-base text-gray-900 px-1")}>
              {value || "All"}
            </span>
            <ChevronDownIcon 
              className={cn(`w-5 h-5 text-gray-600 transition-transform duration-200 ${
                isOpen ? 'rotate-180' : ''
              }`)}
            />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute overflow-y-auto top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden z-10 animate-fadeIn">
              {options.map((option) => {
                return (
                    <button
                    type="button"
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`w-full p-3 text-left text-base cursor-pointer hover:bg-gray-50 transition-colors text-gray-900 ${
                        value === option.value ? 'bg-gray-50' : ''
                    }`}
                    >
                    {option.label}
                    </button>
                )
})}
            </div>
          )}
        </div>
    );
}