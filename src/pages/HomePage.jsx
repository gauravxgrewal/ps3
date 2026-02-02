import React from 'react';
import { Link } from 'react-router-dom';
import { APP_CONFIG, FEATURES, ROUTES } from '../data/constants';
import { getPopularItems } from '../data/menuData';
import Button from '../components/Button';
import MenuItem from '../components/MenuItem';
import { Zap, Star, PhoneCall, ArrowRight, ChefHat, Timer, UtensilsCrossed } from 'lucide-react';
import Footer from '../components/Footer';

const HomePage = ({ onAddToCart, getItemQuantity }) => {
  const popularItems = getPopularItems().slice(0, 8);

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans">
      
      {/* 1. Immersive Dark Hero Section */}
      <section className="relative bg-slate-900 pb-24 pt-8 rounded-b-[3rem] overflow-hidden z-0 shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-3xl"></div>

        <div className="container mx-auto px-6 md:px-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Text Content */}
            <div className="text-center md:text-left space-y-6 flex-1">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/5 text-orange-300 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mx-auto md:mx-0 shadow-lg">
                <Timer size={12} className="text-orange-400" /> 
                <span>{APP_CONFIG.deliveryTime} Delivery</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-black text-white leading-[1.05] tracking-tight drop-shadow-sm">
                Taste the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                  Extraordinary
                </span>
              </h1>
              
              <p className="text-slate-400 text-sm sm:text-lg leading-relaxed max-w-sm mx-auto md:mx-0 font-medium">
                Fresh ingredients, chef-crafted recipes, delivered hot to your door in minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2 justify-center md:justify-start">
                {/* EXPLORE MENU - Promoted to Primary Button */}
                <Link to={ROUTES.MENU} className="w-full sm:w-auto">
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="rounded-2xl w-full shadow-xl shadow-orange-500/20 bg-gradient-to-r from-orange-500 to-red-600 border-0 py-4"
                    icon={<UtensilsCrossed size={18} />}
                  >
                    Explore Menu
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image / Composition */}
            <div className="relative w-full max-w-[320px] md:max-w-md mx-auto flex-1">
               <div className="relative aspect-square">
                 {/* Glowing Orb */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/30 to-red-500/30 rounded-full blur-2xl transform scale-90"></div>
                 
                 {/* Main Image Container */}
                 <div className="relative w-full h-full bg-gradient-to-b from-white/10 to-white/0 rounded-[2.5rem] border border-white/10 backdrop-blur-sm p-3 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                   <img 
                      className="w-full h-full object-cover rounded-[2rem] shadow-inner" 
                      src="hero.png" 
                      alt="Delicious Food" 
                      loading="eager" 
                   />
                   
                   {/* Floating Stats Card 1 */}
                   <div className="absolute -bottom-6 -left-4 bg-white p-3 pr-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] flex items-center gap-3 animate-bounce-slow z-20">
                     <div className="bg-yellow-100 p-2 rounded-full">
                       <Star size={16} className="text-yellow-600 fill-yellow-600" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Rating</p>
                        <p className="text-sm font-black text-gray-900 leading-none mt-1">{APP_CONFIG.googleRating}</p>
                     </div>
                   </div>

                   {/* Floating Stats Card 2 */}
                   <div className="absolute top-10 -right-6 bg-white p-3 pr-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] flex items-center gap-3 animate-bounce-slow delay-700 z-20">
                     <div className="bg-green-100 p-2 rounded-full">
                       <Zap size={16} className="text-green-600 fill-green-600" />
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Fresh</p>
                        <p className="text-sm font-black text-gray-900 leading-none mt-1">Daily</p>
                     </div>
                   </div>

                 </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Floating Features (Overlapping Card GRID) */}
      <div className="px-4 -mt-10 relative z-10 mb-12">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 p-4">
            <div className="grid grid-cols-3 divide-x divide-gray-100">
                {FEATURES.map((feature, index) => (
                  <div key={index} className="flex flex-col items-center text-center px-2 py-2">
                    <div className="text-orange-500 mb-2 transform scale-110">
                        {feature.icon}
                    </div>
                    <h3 className="text-[10px] sm:text-xs font-black text-gray-900 uppercase tracking-wide mb-1">{feature.title}</h3>
                    <p className="hidden md:block text-xs text-gray-400">{feature.description}</p>
                  </div>
                ))}
            </div>
        </div>
      </div>

      {/* 3. Popular Items Grid (Cards) */}
      {popularItems.length > 0 && (
        <section className="py-4 md:py-12 mb-8">
          <div className="container mx-auto px-4">
            
            {/* Header */}
            <div className="flex justify-between items-end mb-6 px-2">
              <div>
                <span className="text-orange-600 text-[10px] font-black uppercase tracking-widest block mb-1">Fan Favorites</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-none">Top Rated</h2>
              </div>
              <Link to={ROUTES.MENU} className="group flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-orange-600 transition-colors">
                <span>View All</span>
                <div className="bg-gray-100 p-1 rounded-full group-hover:bg-orange-100 transition-colors">
                    <ArrowRight size={14} />
                </div>
              </Link>
            </div>
            
            {/* GRID LAYOUT */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              {popularItems.map((item) => (
                <MenuItem 
                  key={item.id} 
                  item={item} 
                  onAddToCart={onAddToCart} 
                  getItemQuantity={getItemQuantity} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Premium CTA Section */}
      <section className="px-4 pb-20">
        <div className="container mx-auto">
            <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden px-6 py-12 text-center shadow-2xl shadow-slate-200">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500 rounded-full blur-[60px] opacity-20"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-[60px] opacity-20"></div>

                <div className="relative z-10 max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-white/5 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-6 text-white border border-white/10 shadow-lg">
                        <ChefHat size={32} />
                    </div>
                    <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
                        Hungry?
                    </h2>
                    <p className="text-slate-400 mb-8 text-sm font-medium leading-relaxed">
                        Skip the waiting. Get fresh, hot food delivered to your door in minutes with just a few taps.
                    </p>
                    <div className="flex flex-col gap-3 items-center">
                        {/* CALL US - Promoted to Primary Button */}
                        <a href={`tel:${APP_CONFIG.phoneNumber}`} className="w-full sm:w-auto min-w-[200px]">
                            <Button 
                                variant="primary" 
                                className="rounded-xl w-full bg-white text-slate-900 border-0 hover:bg-gray-100 py-4 font-black shadow-lg shadow-orange-500/25" 
                                icon={<PhoneCall size={18} />}
                            >
                                Call Us Now
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;