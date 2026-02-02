import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Pizza, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  MapPin, 
  Clock, 
  ExternalLink,
  ChefHat
} from 'lucide-react';
import { APP_CONFIG, ROUTES } from '../data/constants';
import Button from './Button';

const Footer = () => {
  const quickLinks = [
    { label: 'Our Menu', path: ROUTES.MENU },
    { label: 'Contact Us', path: ROUTES.CONTACT },
    { label: 'About Story', path: '#' },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-24 md:pb-8 border-t border-white/5 relative overflow-hidden">
      
      {/* Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent blur-sm"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

          {/* 1. Brand Identity */}
          <div className="flex flex-col items-center md:items-start space-y-6 text-center md:text-left">
            <Link 
              to={ROUTES.HOME} 
              className="group flex flex-col items-center md:items-start gap-4"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-orange-900/50 group-hover:scale-105 transition-transform duration-300">
                <ChefHat size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-white">
                  {APP_CONFIG.restaurantName}
                </h2>
                <p className="text-[10px] text-orange-400 font-bold uppercase tracking-[0.2em] mt-1.5">
                  Since 2024
                </p>
              </div>
            </Link>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
              Craving happiness? We deliver it hot and fresh. Join our community of food lovers today.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3">
              <a href={APP_CONFIG.socialMedia.instagram} className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-600 hover:border-transparent transition-all hover:scale-110">
                <Instagram size={18} />
              </a>
              <a href={APP_CONFIG.socialMedia.facebook} className="w-10 h-10 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:border-transparent transition-all hover:scale-110">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* 2. Quick Navigation */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-500 mb-6">
              Explore
            </h3>
            <nav className="grid grid-cols-1 gap-3 w-full max-w-[200px]">
              {quickLinks.map((link) => (
                <Link 
                  key={link.label} 
                  to={link.path}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/10 transition-all group"
                >
                  <span>{link.label}</span>
                  <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-400" />
                </Link>
              ))}
            </nav>
          </div>

          {/* 3. Contact Info */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-500">
              Visit Us
            </h3>
            
            <div className="space-y-4 w-full bg-slate-900/50 p-6 rounded-3xl border border-white/5">
              <div className="flex items-start gap-4">
                <MapPin size={20} className="text-orange-500 shrink-0 mt-1" />
                <p className="text-sm text-slate-400 leading-relaxed font-medium">
                  {APP_CONFIG.address}
                </p>
              </div>
              <div className="w-full h-px bg-white/5"></div>
              <div className="flex items-center gap-4">
                <Clock size={20} className="text-orange-500 shrink-0" />
                <p className="text-sm text-slate-400 font-medium">
                  {APP_CONFIG.openingHours}
                </p>
              </div>
            </div>
    
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center md:text-left">
            © 2026 {APP_CONFIG.restaurantName} • All rights reserved
          </p>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">System Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;