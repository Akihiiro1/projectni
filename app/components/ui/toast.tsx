import { forwardRef, ReactNode } from 'react';

export interface ToastProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  variant?: 'default' | 'destructive';
  action?: ToastActionElement;
  className?: string;
  [key: string]: any;
}

export type ToastActionElement = ReactNode;

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      open = true,
      onOpenChange,
      title,
      description,
      variant = 'default',
      action,
      className = '',
      ...props
    },
    ref
  ) => {
    if (!open) return null;

    const variantStyles = {
      default: 'bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800',
      destructive: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    };

    return (
      <div
        ref={ref}
        className={`rounded-lg border p-4 shadow-md ${variantStyles[variant]} ${className}`}
        {...props}
      >
        <div className="flex items-start gap-3">
          <div className="flex-1">
            {title && (
              <p className="font-semibold text-gray-900 dark:text-white">{title}</p>
            )}
            {description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {description}
              </p>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      </div>
    );
  }
);

Toast.displayName = 'Toast';
