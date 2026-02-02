import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, UtensilsCrossed, MessageSquare, History, User } from 'lucide-react';
import { ROUTES } from '../data/constants';

const BottomNav = () => {
  const { pathname } = useLocation();
  const isActive = (path) => pathname === path;

  const navItems = [
    { path: ROUTES.HOME, icon: Home, label: 'Home' },
    { path: ROUTES.MENU, icon: UtensilsCrossed, label: 'Menu' },
    { path: ROUTES.ORDERS, icon: History, label: 'Orders' },
    { path: ROUTES.PROFILE, icon: User, label: 'Profile' },
    { path: ROUTES.CONTACT, icon: MessageSquare, label: 'Contact' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-100 z-50 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
      <div className="grid grid-cols-5 h-16 px-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className="group relative flex flex-col items-center justify-center gap-1 h-full w-full"
            >
              {/* Active Indicator Bar */}
              {active && (
                <div className="absolute top-0 w-8 h-1 rounded-b-lg bg-orange-500 shadow-sm"></div>
              )}

              <div className={`
                transition-all duration-300 transform
                ${active ? '-translate-y-1 text-orange-600' : 'text-gray-400 group-hover:text-gray-600'}
              `}>
                <item.icon 
                  size={active ? 24 : 22} 
                  strokeWidth={active ? 2.5 : 2} 
                />
              </div>
              
              <span className={`
                text-[9px] font-bold uppercase tracking-wider transition-colors duration-200
                ${active ? 'text-orange-600' : 'text-gray-400'}
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