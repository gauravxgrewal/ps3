import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, UtensilsCrossed, MessageSquare, History, User } from 'lucide-react';
import { ROUTES } from '../data/constants';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './Toast';

const BottomNav = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  
  const isActive = (path) => pathname === path;

  const navItems = [
    { path: ROUTES.HOME, icon: Home, label: 'Home', protected: false },
    { path: ROUTES.MENU, icon: UtensilsCrossed, label: 'Menu', protected: false },
    { path: ROUTES.ORDERS, icon: History, label: 'Orders', protected: true },
    { path: ROUTES.PROFILE, icon: User, label: 'Profile', protected: true },
    { path: ROUTES.CONTACT, icon: MessageSquare, label: 'Contact', protected: false },
  ];

  const handleProtectedClick = (e, item) => {
    if (item.protected && !user) {
      e.preventDefault();
      toast.error('Please login to access this');
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
      <div className="grid grid-cols-5 h-16 px-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          const isDisabled = item.protected && !user;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleProtectedClick(e, item)}
              className={`group relative flex flex-col items-center justify-center gap-1 h-full w-full ${
                isDisabled ? 'cursor-not-allowed opacity-60' : ''
              }`}
            >
              {/* Active Indicator Bar */}
              {active && !isDisabled && (
                <div className="absolute top-0 w-8 h-1 rounded-b-lg bg-orange-500 shadow-sm"></div>
              )}

              <div className={`
                transition-all duration-300 transform
                ${active && !isDisabled ? '-translate-y-1 text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}
              `}>
                <item.icon 
                  size={active && !isDisabled ? 24 : 22} 
                  strokeWidth={active && !isDisabled ? 2.5 : 2} 
                />
              </div>
              
              <span className={`
                text-[9px] font-bold uppercase tracking-wider transition-colors duration-200
                ${active && !isDisabled ? 'text-orange-600' : 'text-gray-400'}
              `}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;