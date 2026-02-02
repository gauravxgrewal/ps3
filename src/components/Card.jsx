import React from 'react';

/**
 * Card Component - Reusable card container
 * Improvements:
 * - Better prop handling
 * - Improved accessibility
 * - Cleaner animations
 * - More flexible styling
 */
const Card = ({ 
  children, 
  hover = false,
  className = '',
  gradient = null,
  onClick = null,
  as: Component = 'div',
  ...props
}) => {
  const baseClasses = 'bg-white rounded-2xl shadow-sm overflow-hidden';
  const hoverClasses = hover 
    ? 'transition-all duration-200 hover:shadow-lg cursor-pointer' 
    : 'transition-shadow duration-200';
  const gradientClass = gradient ? `bg-gradient-to-br ${gradient}` : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <Component 
      className={`${baseClasses} ${hoverClasses} ${gradientClass} ${clickableClass} ${className}`.trim().replace(/\s+/g, ' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(e) : undefined}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * CardHeader - Card header section
 */
export const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`relative ${className}`} {...props}>
    {children}
  </div>
);

/**
 * CardBody - Card body/content section
 */
export const CardBody = ({ children, className = '', ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

/**
 * CardFooter - Card footer/action section
 */
export const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`px-5 pb-5 ${className}`} {...props}>
    {children}
  </div>
);

export default Card;