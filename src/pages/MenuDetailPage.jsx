import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Share2, Clock, Star, Info, ChevronRight, Trash2, Check } from 'lucide-react';
import { menuData } from '../data/menuData';
import Badge from '../components/Badge';
import { getImageUrl } from '../utils/image';

const MenuDetailPage = ({ onAddToCart, getItemQuantity }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    let foundItem = null;
    Object.values(menuData).forEach(category => {
      const found = category.items?.find(i => i.id === id);
      if (found) foundItem = found;
    });

    if (foundItem) {
      setItem(foundItem);
      if (foundItem.sizes && foundItem.sizes.length > 0) {
        setSelectedSize(foundItem.sizes[0]);
      }
    } else {
      navigate('/menu');
    }
  }, [id, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!item) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentPrice = selectedSize ? selectedSize.price : item.price;
  
  const cartQuantity = selectedSize 
    ? getItemQuantity(item.id, selectedSize) 
    : getItemQuantity(item.id);

  const handleAdd = () => {
    onAddToCart(item, selectedSize, 'add');
  };

  const handleRemove = () => {
    onAddToCart(item, selectedSize, 'remove');
  };

  return (
    <div className="min-h-screen bg-white pb-32">
      
      <div className="relative h-[45vh] w-full bg-slate-100">
        <div className="absolute top-0 left-0 right-0 p-4 pt-6 flex justify-between items-center z-20">
            <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all shadow-lg"
            >
                <ArrowLeft size={20} />
            </button>
            <button className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/30 active:scale-95 transition-all shadow-lg">
                <Share2 size={18} />
            </button>
        </div>

        {item.image ? (
          <img 
            src={getImageUrl(item.image)} 
            alt={item.name} 
            className={`w-full h-full object-cover transition-opacity duration-700 ease-in-out ${isImageLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
            onLoad={() => setIsImageLoading(false)}
          />
        ) : (
            <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center">
                <span className="text-9xl filter drop-shadow-lg animate-pulse">🍕</span>
            </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 -mt-10 bg-white rounded-t-[2.5rem] px-6 pt-2 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.2)]">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-4 opacity-50"></div>

        <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-black text-gray-900 leading-tight flex-1 pr-4">{item.name}</h1>
                <div className="flex flex-col items-end">
                    <span className="text-2xl font-black text-orange-600">₹{currentPrice}</span>
                </div>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
                {item.badge && (
                    <Badge color={item.badgeColor} className="text-[10px] px-2 py-0.5">{item.badge}</Badge>
                )}
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wide px-2 border-l border-gray-200">
                    Fast Food
                </span>
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex items-center gap-2">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    <div><p className="text-sm font-bold text-gray-900 leading-none">4.5</p><p className="text-[10px] text-gray-400 font-bold">Rating</p></div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                    <Clock size={18} className="text-orange-500" />
                    <div><p className="text-sm font-bold text-gray-900 leading-none">{item.prepTime || '20m'}</p><p className="text-[10px] text-gray-400 font-bold">Time</p></div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="flex items-center gap-2">
                    <Info size={18} className="text-blue-500" />
                    <div><p className="text-sm font-bold text-gray-900 leading-none">Info</p><p className="text-[10px] text-gray-400 font-bold">Details</p></div>
                </div>
            </div>
        </div>

        {item.description && (
            <div className="mb-8 pb-4 border-b border-gray-100">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">{item.description}</p>
            </div>
        )}

        {item.sizes && item.sizes.length > 0 && (
            <div className="mb-8">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Choose Size</h3>
                <div className="grid grid-cols-1 gap-3">
                    {item.sizes.map((size) => {
                        const isSelected = selectedSize?.size === size.size;
                        return (
                            <button
                                key={size.size}
                                onClick={() => setSelectedSize(size)}
                                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${isSelected ? 'border-orange-500 bg-orange-50/50' : 'border-gray-100 bg-white'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-orange-500 bg-orange-500' : 'border-gray-300'}`}>
                                        {isSelected && <Check size={12} className="text-white" strokeWidth={4} />}
                                    </div>
                                    <span className={`font-bold text-sm ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>{size.size}</span>
                                </div>
                                <span className="font-black text-gray-900">₹{size.price}</span>
                            </button>
                        )
                    })}
                </div>
            </div>
        )}
      </div>

      <div className="fixed bottom-12 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-8 z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.04)]">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
            
            <div className="flex flex-col min-w-[100px]">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Item Total</span>
                <span className="text-2xl font-black text-gray-900 leading-none">
                    ₹{currentPrice * (cartQuantity > 0 ? cartQuantity : 1)}
                </span>
            </div>
            
            {cartQuantity > 0 ? (
                <div className="flex-1 flex items-center justify-between bg-slate-900 text-white rounded-2xl h-14 px-2 shadow-xl shadow-slate-500/20">
                    <button 
                        onClick={handleRemove}
                        className="w-14 h-full flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-colors active:scale-90"
                    >
                        {cartQuantity === 1 ? <Trash2 size={20} /> : <Minus size={20} />}
                    </button>
                    
                    <span className="text-xl font-black">{cartQuantity}</span>
                    
                    <button 
                        onClick={handleAdd}
                        className="w-14 h-full flex items-center justify-center text-white hover:bg-white/10 rounded-xl transition-colors active:scale-90"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            ) : (
                <button
                    onClick={handleAdd}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-2xl h-14 font-bold text-base shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                >
                    <span>Add to Cart</span>
                    <div className="bg-white/20 rounded-full p-1">
                        <ChevronRight size={16} />
                    </div>
                </button>
            )}
        </div>
      </div>

    </div>
  );
};

export default MenuDetailPage;