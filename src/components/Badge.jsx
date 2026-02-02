import React from 'react';

/**
 * Badge Component - Status and label badges
 * Improvements:
 * - More flexible positioning (inline or absolute)
 * - Better variant system
 * - Improved accessibility
 * - Cleaner styling
 */
const Badge = ({ 
  children, 
  variant = 'default',
  position = null,
  className = '',
  ...props
}) => {
  // Variant color schemes
  const variantClasses = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-yellow-900',
    info: 'bg-blue-500 text-white',
    purple: 'bg-purple-500 text-white',
    pink: 'bg-pink-500 text-white',
    orange: 'bg-orange-500 text-white',
  };
  
  // Position classes (only applied if position prop is provided)
  const positionClasses = position ? {
    'top-left': 'absolute top-2 left-2 z-10',
    'top-right': 'absolute top-2 right-2 z-10',
    'bottom-left': 'absolute bottom-2 left-2 z-10',
    'bottom-right': 'absolute bottom-2 right-2 z-10',
  }[position] : '';
  
  // Base classes
  const baseClasses = 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold';
  
  return (
    <span 
      className={`${baseClasses} ${variantClasses[variant]} ${positionClasses} ${className}`.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;