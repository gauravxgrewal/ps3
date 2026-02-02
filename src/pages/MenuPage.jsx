import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { menuData, searchMenuItems, getItemsByCategory } from '../data/menuData';
import MenuItem from '../components/MenuItem';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SkeletonItem from '../components/SkeletonItem';
import Footer from '../components/Footer';
import { ChefHat, Search, UtensilsCrossed, ArrowUp } from 'lucide-react';

const MenuPage = ({ onAddToCart, getItemQuantity }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    const handler = setTimeout(() => { setDebouncedQuery(searchQuery); }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredItems = useMemo(() => {
    if (debouncedQuery.trim()) return searchMenuItems(debouncedQuery);
    if (activeCategory === 'all') return Object.values(menuData).flatMap(category => category.items);
    return getItemsByCategory(activeCategory);
  }, [debouncedQuery, activeCategory]);

  const handleCategoryChange = useCallback((category) => {
    setActiveCategory(category);
    setSearchQuery('');
    if (contentRef.current) {
      // Adjusted scroll offset for the new taller header
      const headerOffset = 180; 
      const targetScroll = contentRef.current.offsetTop - headerOffset;
      window.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FA]">
        
        {/* 1. Premium Curved Header */}
        <div className="bg-slate-900 pb-20 pt-6 rounded-b-[2.5rem] relative overflow-hidden shadow-xl z-0">
            {/* Decorative Blobs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
            
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-2xl mb-3 shadow-inner border border-white/5">
                    <ChefHat className="text-orange-400" size={28} />
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight mb-1">
                    Discover <span className="text-orange-500">Taste</span>
                </h1>
                <p className="text-slate-400 text-sm font-medium">
                    {Object.values(menuData).reduce((acc, cat) => acc + cat.items.length, 0)} delicious items waiting for you
                </p>
            </div>
        </div>

        {/* 2. Floating Sticky Search & Filter Section */}
        {/* -mt-10 pulls it up over the dark header */}
        <div className="relative top-4 px-4 -mt-10 mb-6">
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 p-4 space-y-3 ring-1 ring-black/5">
                <SearchBar 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    placeholder="Search for dishes..." 
                />
                <CategoryFilter 
                    activeCategory={activeCategory} 
                    onCategoryChange={handleCategoryChange} 
                />
            </div>
        </div>

        {/* 3. Main Content Area */}
        <section ref={contentRef} className="pb-24">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (<SkeletonItem key={i} />))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Search size={32} className="text-orange-300" />
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2">No items found</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-[200px]">
                    We couldn't find exactly what you're looking for.
                </p>
                <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} 
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-gray-200 active:scale-95 transition-transform"
                >
                    Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-10">
                {activeCategory === 'all' && !debouncedQuery ? (
                  Object.entries(menuData).map(([key, category]) => (
                    <div key={key} className="space-y-4">
                      {/* Category Header */}
                      <div className="flex items-end gap-3 pt-5 px-2">
                        <div className="text-3xl filter drop-shadow-sm transform -translate-y-1" aria-hidden="true">
                            {category.icon}
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-gray-900 tracking-tight leading-none">
                            {category.name}
                          </h2>
                          <span className="text-[10px] font-bold  text-gray-400 uppercase tracking-widest">
                            {category.items.length} Options
                          </span>
                        </div>
                      </div>

                      {/* Items Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                        {category.items.map(item => (
                          <MenuItem 
                            key={item.id} 
                            item={item} 
                            onAddToCart={onAddToCart} 
                            getItemQuantity={getItemQuantity} 
                          />
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-center pt-5 justify-between px-2">
                      <h2 className="text-lg font-black text-gray-900">
                        {debouncedQuery ? `Results for "${debouncedQuery}"` : menuData[activeCategory]?.name || 'Selection'}
                      </h2>
                      <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-bold text-gray-500">
                        {filteredItems.length} found
                      </span>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                      {filteredItems.map(item => (
                        <MenuItem 
                          key={item.id} 
                          item={item} 
                          onAddToCart={onAddToCart} 
                          getItemQuantity={getItemQuantity} 
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            
            {/* End of List Indicator */}
            {!isLoading && filteredItems.length > 0 && (
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-400 mb-2">
                        <UtensilsCrossed size={20} />
                    </div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        That's all folks
                    </p>
                </div>
            )}
          </div>
        </section>
      </div>
     
    </>
  );
};

export default MenuPage;