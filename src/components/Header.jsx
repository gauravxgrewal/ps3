import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APP_CONFIG, ROUTES } from '../data/constants';
import { ShoppingBag, Pizza, User, History } from 'lucide-react'; // Added icons

const Header = ({ cartCount, onCartClick }) => {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  // Updated to match BottomNav routes
  const navLinks = [
    { path: ROUTES.HOME, label: 'Home' },
    { path: ROUTES.MENU, label: 'Menu' },
    { path: ROUTES.ORDERS, label: 'Orders' }, // Added
    { path: ROUTES.CONTACT, label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <nav className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link 
          to={ROUTES.HOME} 
          className="flex items-center gap-2 md:gap-3 group"
        >
          <div className="w-10 h-10 md:w-11 md:h-11 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-100 group-hover:scale-105 transition-transform duration-200">
            <Pizza size={22} strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg md:text-xl font-black text-gray-900 leading-none tracking-tight uppercase">
              {APP_CONFIG.restaurantName}
            </h1>
            <p className="text-[9px] text-orange-500 font-bold uppercase tracking-widest mt-0.5 hidden md:block">
              {APP_CONFIG.tagline}
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 bg-gray-50/50 p-1 rounded-full border border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`
                px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200
                ${isActive(link.path) 
                  ? 'bg-white text-orange-600 shadow-sm border border-gray-100' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions: Profile & Cart */}
        <div className="flex items-center gap-3">
            {/* Desktop Profile Icon */}
            <Link 
                to={ROUTES.PROFILE}
                className={`hidden md:flex w-10 h-10 items-center justify-center rounded-full border transition-colors ${
                    isActive(ROUTES.PROFILE) 
                    ? 'bg-orange-50 border-orange-100 text-orange-600' 
                    : 'bg-white border-gray-100 text-gray-400 hover:text-gray-900 hover:border-gray-300'
                }`}
            >
                <User size={20} />
            </Link>

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="
                relative flex items-center gap-2.5 
                bg-gray-900 text-white 
                px-4 py-2.5 
                rounded-2xl 
                font-bold text-xs uppercase tracking-wide
                shadow-xl shadow-gray-900/10 
                hover:bg-gray-800 hover:scale-105
                transition-all duration-200 
                active:scale-95
              "
            >
              <ShoppingBag size={18} strokeWidth={2.5} />
              <span className="hidden md:inline">Cart</span>
              
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 border-2 border-white text-white rounded-full flex items-center justify-center text-[9px] font-black animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </button>
        </div>

      </nav>
    </header>
  );
};

export default Header;