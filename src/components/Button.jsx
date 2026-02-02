import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Button Component - Reusable button with multiple variants
 * Improvements:
 * - Better TypeScript-ready prop types
 * - Cleaner variant system
 * - Improved accessibility with aria attributes
 * - Better disabled states
 * - Smoother transitions
 * - More consistent sizing
 * - Better loading state with icon
 */
const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  disabled = false,
  isLoading = false, 
  className = '',
  icon = null,
  type = 'button',
  ...props 
}) => {
  // Base styles - consistent across all variants
  const baseClasses = `
    font-bold rounded-xl transition-all duration-200 
    flex items-center justify-center gap-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `;
  
  // Variant-specific styles
  const variantClasses = {
    primary: `
      bg-gradient-to-r from-orange-500 to-red-600 text-white 
      hover:shadow-lg hover:from-orange-600 hover:to-red-700
      focus:ring-orange-500
    `,
    secondary: `
      bg-white text-gray-900 border-2 border-gray-200 
      hover:border-gray-300 hover:bg-gray-50 hover:shadow-md
      focus:ring-gray-300
    `,
    success: `
      bg-gradient-to-r from-green-500 to-green-600 text-white 
      hover:shadow-lg hover:from-green-600 hover:to-green-700
      focus:ring-green-500
    `,
    outline: `
      border-2 border-orange-500 text-orange-600 bg-transparent
      hover:bg-orange-50
      focus:ring-orange-500
    `,
    ghost: `
      text-gray-700 bg-transparent
      hover:bg-gray-100
      focus:ring-gray-300
    `,
  };
  
  // Size-specific styles
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs md:text-sm',
    md: 'px-5 py-2.5 text-sm md:text-base',
    lg: 'px-8 py-4 text-base md:text-lg',
  };
  
  // Width handling
  const widthClass = fullWidth ? 'w-full' : '';
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${widthClass} 
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" size={18} aria-hidden="true" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {icon && <span aria-hidden="true">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;