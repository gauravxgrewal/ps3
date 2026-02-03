import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, FEATURES, ROUTES } from '../data/constants';
import { getPopularItems } from '../data/menuData';
import Button from '../components/Button';
import MenuItem from '../components/MenuItem';
import { Zap, Star, PhoneCall, ArrowRight, ChefHat, Timer, UtensilsCrossed, MapPin } from 'lucide-react';
import Footer from '../components/Footer';
import { getImageUrl } from '../utils/image';
import { subscribeToMenu } from '../services/menuService';

const HomePage = ({ onAddToCart, getItemQuantity }) => {
  const [dbItems, setDbItems] = useState([]);
  const [hasDbMenu, setHasDbMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToMenu(
      (items) => {
        setDbItems(items);
        setHasDbMenu(items && items.length > 0);
      },
      () => setHasDbMenu(false)
    );

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const popularItems = useMemo(() => {
    if (hasDbMenu) {
      const available = dbItems.filter((i) => i.available !== false);
      const popular = available.filter((i) => i.popular);
      return (popular.length ? popular : available).slice(0, 8);
    }
    return getPopularItems().slice(0, 8);
  }, [dbItems, hasDbMenu]);

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans">
      
      {/* 1. HERO SECTION: Mobile (Stack) & Desktop (Side-by-Side) */}
      <section className="relative bg-slate-900 pt-8 pb-16 md:pt-20 md:pb-32 rounded-b-[2.5rem] md:rounded-b-[5rem] overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-transparent to-transparent opacity-50"></div>
        
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Text Content */}
            <div className="text-center md:text-left space-y-6 md:max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-orange-400 px-4 py-2 rounded-full text-xs font-bold tracking-wide">
                <Timer size={14} /> 
                <span>{APP_CONFIG.deliveryTime} Fast Delivery</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tight">
                Taste the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Extraordinary
                </span>
              </h1>
              
              <p className="text-slate-400 text-base md:text-xl leading-relaxed max-w-md mx-auto md:mx-0 font-medium">
                Fresh ingredients, chef-crafted recipes, delivered hot to your door in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
                <Link to={ROUTES.MENU} className="w-full sm:w-auto">
                  <Button 
                    variant="primary" 
                    className="rounded-2xl w-full md:w-56 bg-gradient-to-r from-orange-500 to-red-600 border-0 py-5 text-lg font-bold shadow-xl shadow-orange-500/30 hover:scale-105 transition-transform"
                    icon={<UtensilsCrossed size={20} />}
                  >
                    Order Now
                  </Button>
                </Link>
                <a href={`tel:${APP_CONFIG.phoneNumber}`} className="w-full sm:w-auto">
                  <Button variant="secondary" className="rounded-2xl w-full border-white/10 bg-white/5 text-white backdrop-blur-md py-5 hover:bg-white/10">
                    <PhoneCall size={20} className="mr-2" /> Call Us
                  </Button>
                </a>
              </div>
            </div>

            {/* Hero Image: Hidden on tiny screens, big on Desktop */}
            <div className="relative hidden md:block flex-1 max-w-md lg:max-w-lg">
                <div className="absolute -inset-10 bg-orange-500/20 blur-[100px] rounded-full animate-pulse"></div>
                <div className="relative z-10">
                  <img 
                    src={getImageUrl('hero.png')} 
                    className="w-full drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)] rounded-[2.5rem]" 
                    alt="Delicious Food" 
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2 border border-white/20">
                    <div className="flex items-center gap-1">
                    
                      <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">4.9</span>
                         </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURES: Grid on Mobile, Row on Desktop */}
      <div className="container mx-auto px-6 -mt-10 relative z-20">
        <div className="bg-white flex justify-center rounded-[2rem] md:rounded-[3rem] shadow-2xl p-6 md:p-10 border border-gray-50">
            <div className="grid grid-cols-3 md:grid-cols-3 gap-8 md:divide-x md:divide-gray-100">
                {FEATURES.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center md:items-start text-center md:text-left md:px-6 space-y-2">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-2">
                        {feature.icon}
                    </div>
                    <h3 className="text-sm md:text-base font-black text-slate-900 uppercase">{feature.title}</h3>
                    <p className="hidden md:block text-sm text-slate-500 font-medium leading-tight">{feature.description}</p>
                  </div>
                ))}
            </div>
        </div>
      </div>

      {/* 3. MENU SECTION: Multi-column Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 text-center md:text-left">
            <div>
              <span className="text-orange-600 text-xs md:text-sm font-black uppercase tracking-[0.2em]">Our Favorites</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mt-2 tracking-tight">Top Rated Dishes</h2>
            </div>
            <Link to={ROUTES.MENU} className="group flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-orange-600 transition-colors">
              VIEW FULL MENU 
              <div className="bg-slate-100 p-2 rounded-full group-hover:bg-orange-100 group-hover:text-orange-600 transition-all">
                <ArrowRight size={18} />
              </div>
            </Link>
          </div>
          
          {/* Responsive Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {popularItems.map((item) => (
              <div key={item.id} className="transform hover:-translate-y-2 transition-transform duration-300">
                <MenuItem 
                  item={item} 
                  onAddToCart={onAddToCart} 
                  getItemQuantity={getItemQuantity} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER: Large surface for Desktop */}
      <section className="pb-24 px-6">
        <div className="container mx-auto">
          <div className="relative bg-slate-900 rounded-[3rem] overflow-hidden p-8 md:p-20 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
              <div className="relative z-10 md:max-w-2xl">
                  <h2 className="text-white text-4xl md:text-6xl font-black mb-6">Ready to taste the <br/><span className="text-orange-500">difference?</span></h2>
                  <p className="text-slate-400 text-lg md:text-xl mb-10">Join thousands of happy foodies getting fresh meals daily.</p>
                  <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-500 hover:text-white transition-all">
                      Get Started Today
                  </button>
              </div>
              <div className="hidden lg:block opacity-20 transform rotate-12">
                  <ChefHat size={250} color="white" />
              </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;