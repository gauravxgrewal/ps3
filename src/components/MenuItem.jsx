import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Plus, Minus, Star } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

const MenuItem = ({ item, onAddToCart, getItemQuantity }) => {
  const navigate = useNavigate(); // Hook for navigation
  
  // Initialize with the first available size if sizes exist
  const [selectedSize, setSelectedSize] = useState(item.sizes ? item.sizes[0] : null);

  // Determine the effective price
  const currentPrice = selectedSize ? selectedSize.price : item.price;
  
  // Get quantity specific to the selected size
  const quantity = selectedSize 
    ? getItemQuantity(item.id, selectedSize) 
    : getItemQuantity(item.id);

  // Stop propagation ensures clicking buttons doesn't open the detail page
  const handleAdd = (e) => {
    e.stopPropagation(); 
    onAddToCart(item, selectedSize, 'add');
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    onAddToCart(item, selectedSize, 'remove');
  };

  const handleSizeSelect = (e, size) => {
    e.stopPropagation();
    setSelectedSize(size);
  };

  // Navigate to detail page
  const handleItemClick = () => {
    navigate(`/menu/${item.id}`); // Make sure this route matches your App.js
  };

  // Auto-select first size if props change
  useEffect(() => {
    if (item.sizes && item.sizes.length > 0 && !selectedSize) {
      setSelectedSize(item.sizes[0]);
    }
  }, [item, selectedSize]);

  return (
    <div 
        onClick={handleItemClick} // Click handler for the whole card
        className="bg-white rounded-[1.5rem] p-3 shadow-sm border border-gray-100 flex flex-col h-full transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] group relative cursor-pointer"
    >
      
      {/* 1. Image Section (Fixed Height) */}
      <div className="relative mb-3 flex-shrink-0">
        <div className="w-full aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center relative">
            {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                  loading="lazy"
                />
            ) : (
                <span className="text-4xl filter grayscale opacity-50">🍕</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
            {item.badge && (
                <Badge color={item.badgeColor} className="shadow-sm text-[10px] px-2 py-0.5 font-bold uppercase">{item.badge}</Badge>
            )}
        </div>
        
        {/* Veg/Non-Veg Dot */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1 rounded-md shadow-sm border border-gray-100">
            <div className={`w-3 h-3 border ${item.type === 'veg' ? 'border-green-600' : 'border-red-600'} flex items-center justify-center p-0.5`}>
                <div className={`w-full h-full rounded-full ${item.type === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></div>
            </div>
        </div>
      </div>

      {/* 2. Content Section (Pushes footer down) */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="mb-1 flex justify-between items-start">
            <h3 className="font-black text-gray-900 text-sm md:text-base leading-tight line-clamp-1" title={item.name}>
                {item.name}
            </h3>
            {/* Rating if available */}
            {item.rating && (
                <div className="flex items-center gap-0.5 bg-green-50 px-1.5 py-0.5 rounded-md shrink-0 ml-2">
                    <Star size={10} className="text-green-600 fill-green-600" />
                    <span className="text-[10px] font-bold text-green-700">{item.rating}</span>
                </div>
            )}
        </div>
        
        <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed mb-3 line-clamp-2 min-h-[2.5em]">
            {item.description || 'Delicious freshly prepared food with premium ingredients.'}
        </p>

        {/* COMPACT SIZE SELECTOR (Horizontal Chips) */}
        {item.sizes && item.sizes.length > 0 && (
            <div className="mt-auto pt-2 border-t border-gray-50">
                <div className="flex items-center justify-between mb-1.5">
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Size</p>
                     <p className="text-xs font-black text-orange-600">₹{currentPrice}</p>
                </div>
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                    {item.sizes.map((size) => (
                        <button
                            key={size.size}
                            onClick={(e) => handleSizeSelect(e, size)} 
                            className={`flex-1 py-1.5 px-1 rounded-lg text-[10px] font-bold transition-all capitalize border whitespace-nowrap text-center ${
                                selectedSize?.size === size.size
                                ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                                : 'bg-gray-50 text-gray-500 border-transparent hover:bg-gray-100'
                            }`}
                        >
                            <span className="hidden sm:inline">{size.size}</span>
                            <span className="sm:hidden">{size.size.charAt(0)}</span>
                        </button>
                    ))}
                </div>
            </div>
        )}
      </div>

      {/* 3. Footer Actions (Always aligned at bottom) */}
      <div className="mt-3 pt-3 flex items-center justify-between gap-2">
        {/* Price Display (Only if no sizes) */}
        {!item.sizes ? (
             <div className="flex flex-col">
                <span className="text-[10px] text-gray-400 font-bold line-through decoration-red-400/50">₹{Math.round(item.price * 1.2)}</span>
                <span className="text-base md:text-lg font-black text-gray-900 leading-none">₹{item.price}</span>
             </div>
        ) : (
            <div className="hidden"></div>
        )}
        
        {/* Action Button */}
        {quantity === 0 ? (
            <Button 
                onClick={handleAdd} // This uses the handler with stopPropagation
                variant="primary" 
                size="sm" 
                className={`rounded-xl shadow-lg shadow-orange-500/20 h-9 text-xs font-bold border-0 ${item.sizes ? 'w-full' : 'px-5'}`}
            >
                Add {item.sizes ? '' : '+'}
            </Button>
        ) : (
            <div 
                className={`flex items-center bg-slate-900 rounded-xl p-1 h-9 shadow-lg ${item.sizes ? 'w-full justify-between' : 'gap-2'}`}
                onClick={(e) => e.stopPropagation()} // Prevent clicks on the counter bg from opening detail page
            >
                <button 
                    onClick={handleRemove}
                    className="w-7 h-full flex items-center justify-center text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                    <Minus size={14} />
                </button>
                <span className="font-bold text-white text-xs min-w-[20px] text-center">{quantity}</span>
                <button 
                    onClick={handleAdd}
                    className="w-7 h-full flex items-center justify-center bg-white text-slate-900 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <Plus size={14} strokeWidth={3} />
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;