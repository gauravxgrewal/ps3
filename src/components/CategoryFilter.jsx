import React, { useRef, useEffect } from 'react';
import { menuData } from '../data/menuData';

/**
 * CategoryFilter Component - Enhanced horizontal scrolling pills
 * Improvements:
 * - Better mobile scrolling with scroll hints
 * - Larger touch targets
 * - Auto-scroll active item into view
 * - Enhanced animations
 * - Premium look like Swiggy/Zomato
 */
const CategoryFilter = ({ activeCategory, onCategoryChange }) => {
  const scrollContainerRef = useRef(null);
  const activeButtonRef = useRef(null);

  // Build categories list
  const categories = [
    { id: 'all', name: 'All', fullName: 'All Items', icon: '🍽️' },
    ...Object.entries(menuData).map(([key, category]) => ({
      id: key,
      name: category.name.split(' ')[0], // Short name for mobile
      fullName: category.name, // Full name for desktop
      icon: category.icon,
    })),
  ];

  // Auto-scroll active category into view
  useEffect(() => {
    if (activeButtonRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const button = activeButtonRef.current;
      
      const containerWidth = container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      
      const scrollTo = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
      
      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  }, [activeCategory]);

  return (
    <div className="relative">
      {/* Gradient fade on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      
      <nav 
        ref={scrollContainerRef}
        className="overflow-x-auto pb-2 scrollbar-hide scroll-smooth" 
        aria-label="Category filter"
      >
        <div className="flex gap-2 md:gap-3 px-4 py-2 min-w-max">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                ref={isActive ? activeButtonRef : null}
                type="button"
                onClick={() => onCategoryChange(category.id)}
                className={`
                  px-5 md:px-6 py-3 md:py-3.5
                  rounded-full font-bold text-sm 
                  whitespace-nowrap 
                  transition-all duration-300
                  focus:outline-none focus:ring-2 focus:ring-offset-2
                  transform active:scale-95
                  ${isActive
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-200  focus:ring-orange-500'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md focus:ring-gray-300'
                  }
                `}
                aria-pressed={isActive}
                aria-label={`Filter by ${category.fullName}`}
              >
                <span className="mr-2 text-base" aria-hidden="true">{category.icon}</span>
                <span className="md:hidden">{category.name}</span>
                <span className="hidden md:inline">{category.fullName}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default CategoryFilter;