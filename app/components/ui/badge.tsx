import { forwardRef, HTMLAttributes, ReactNode } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className = '', ...props }, ref) => {
    const variantStyles = {
      default: 'bg-gray-200 text-gray-800',
      success: 'bg-green-200 text-green-800',
      warning: 'bg-yellow-200 text-yellow-800',
      danger: 'bg-red-200 text-red-800',
      info: 'bg-blue-200 text-blue-800',
    };
    
    const sizeStyles = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-1 text-sm',
      lg: 'px-4 py-2 text-base',
    };
    
    const baseStyles = 'inline-flex items-center font-medium rounded-full';
    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
    
    return (
      <div ref={ref} className={combinedClassName} {...props} />
    );
  }
);

Badge.displayName = 'Badge';
