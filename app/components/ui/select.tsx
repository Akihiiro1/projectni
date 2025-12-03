import { forwardRef, HTMLAttributes, ReactNode, SelectHTMLAttributes, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, value, onValueChange, ...props }, ref) => (
    <select
      ref={ref}
      value={value}
      onChange={(e) => onValueChange?.(e.target.value)}
      {...props}
    >
      {children}
    </select>
  )
);

Select.displayName = 'Select';

interface SelectTriggerProps extends HTMLAttributes<HTMLButtonElement> {}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className = '', children, ...props }, ref) => (
    <button
      ref={ref}
      className={`flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${className}`}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
);

SelectTrigger.displayName = 'SelectTrigger';

interface SelectValueProps {
  placeholder?: string;
}

export const SelectValue = ({ placeholder }: SelectValueProps) => (
  <span>{placeholder}</span>
);

SelectValue.displayName = 'SelectValue';

interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`absolute top-full mt-2 w-full rounded-md border border-gray-300 bg-white shadow-lg z-50 ${className}`}
      {...props}
    />
  )
);

SelectContent.displayName = 'SelectContent';

interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, className = '', ...props }, ref) => (
    <div
      ref={ref}
      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm ${className}`}
      {...props}
    />
  )
);

SelectItem.displayName = 'SelectItem';
