import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * SearchBar Component - Search input with clear functionality
 * Improvements:
 * - Using Lucide icons instead of emoji
 * - Better accessibility with aria-labels
 * - Improved focus states
 * - Cleaner animations
 * - Better mobile UX
 */
const SearchBar = ({ value, onChange, placeholder = 'Search menu...' }) => {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative max-w-md mx-auto">
      {/* Search Icon */}
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search size={20} className="text-gray-400" aria-hidden="true" />
      </div>
      
      {/* Search Input */}
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-12 py-3 
          rounded-full border-2 border-gray-200 
          focus:border-orange-500 focus:ring-2 focus:ring-orange-200 
          focus:outline-none 
          transition-all duration-200
          text-gray-900 placeholder-gray-400
          text-sm md:text-base
        "
        aria-label="Search menu items"
      />
      
      {/* Clear Button */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="
            absolute inset-y-0 right-0 pr-4 
            flex items-center 
            text-gray-400 hover:text-gray-600 
            transition-colors duration-200
          "
          aria-label="Clear search"
        >
          <X size={20} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;