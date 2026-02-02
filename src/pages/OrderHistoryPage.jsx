import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToUserOrders } from '../services/orderService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { 
  Package, 
  Clock, 
  ShoppingBag, 
  ArrowLeft, 
  CreditCard, 
  Banknote, 
  Wifi, 
  WifiOff
} from 'lucide-react';
import { ORDER_STATUS_LABELS, ROUTES } from '../data/constants';
import Button from '../components/Button';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [isLive, setIsLive] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  // STABLE ID: We extract the ID once to prevent useEffect loops
  const stableUserId = user?.uid || user?.id || user?.phone;

  useEffect(() => {
    // 1. Initial Checks
    if (!stableUserId) {
      setLoading(false);
      return;
    }

    setLoading(true);

    // 2. Subscribe
    const unsubscribe = subscribeToUserOrders(
      stableUserId,
      (newOrders) => {
        // This runs automatically whenever Firestore updates
        setOrders(newOrders);
        setLoading(false);
        setIsLive(true);
      },
      (error) => {
        console.error(error);
        setIsLive(false);
        setLoading(false);
        toast.error("Live updates paused");
      }
    );

    // 3. Cleanup (CRITICAL: Stops the listener when you leave the page)
    return () => {
      if (unsubscribe) unsubscribe();
    };
    
    // 4. Dependency: Only restart listener if User ID changes
  }, [stableUserId]); // Removed 'user' object, used 'stableUserId' string

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'preparing': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    if (filter === 'active') return ['pending', 'confirmed', 'preparing', 'out_for_delivery'].includes(order.status);
    return order.status === filter;
  });

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin mb-4"></div>
        <p className="text-sm font-bold text-gray-400 animate-pulse">Syncing History...</p>
      </div>
    );
  }

  if (!stableUserId) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-white shadow-lg rounded-3xl flex items-center justify-center mb-6">
          <Package size={32} className="text-gray-300" />
        </div>
        <h2 className="text-2xl font-black text-gray-900">Login Required</h2>
        <p className="text-gray-500 mt-2 mb-8 max-w-[200px]">Sign in to track your live orders</p>
        <Button onClick={() => navigate(ROUTES.LOGIN)} variant="primary" className="w-full max-w-xs py-4 rounded-2xl shadow-xl shadow-orange-100">
          Login Now
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      
      {/* 1. Dark Curved Header */}
      <div className="bg-slate-900 pb-20 pt-6 rounded-b-[2.5rem] relative overflow-hidden shadow-xl z-0">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

         <div className="px-4 relative z-10">
            <div className="flex justify-between items-start mb-4">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors">
                    <ArrowLeft size={24} />
                </button>
                <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full border ${isLive ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {isLive ? <Wifi size={12} /> : <WifiOff size={12} />}
                    <span className="text-[10px] font-bold uppercase tracking-wider">{isLive ? 'LIVE' : 'OFFLINE'}</span>
                </div>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                   <ShoppingBag className="text-orange-400" size={24} />
                </div>
                <div>
                   <h1 className="text-2xl font-black text-white leading-none">My Orders</h1>
                   <p className="text-slate-400 text-xs font-bold mt-1">
                      {filteredOrders.length} {filter === 'all' ? 'Total' : filter} orders
                   </p>
                </div>
            </div>
         </div>
      </div>

      {/* 2. Floating Filter Bar */}
      <div className="relative top-4 px-4 -mt-10 mb-6">
         <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/20 p-2 ring-1 ring-black/5 flex gap-2 overflow-x-auto no-scrollbar">
            {['all', 'active', 'delivered', 'cancelled'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-xs font-black capitalize transition-all whitespace-nowrap flex-1 text-center ${
                  filter === f ? 'bg-slate-900 text-white shadow-md' : 'bg-transparent text-gray-500 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
         </div>
      </div>

      {/* 3. Orders List */}
      <div className="px-4 space-y-4 max-w-xl mx-auto">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <h3 className="text-lg font-black text-gray-900">No {filter !== 'all' ? filter : ''} orders</h3>
            <p className="text-gray-400 text-sm mt-1 mb-6">Looks like you haven't ordered yet.</p>
            <Button onClick={() => navigate(ROUTES.MENU)} variant="primary" className="rounded-xl shadow-lg shadow-orange-200">
                Browse Menu
            </Button>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} onClick={() => navigate(`${ROUTES.ORDER_DETAILS}/${order.id}`)} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden active:scale-[0.99] transition-transform duration-200 cursor-pointer">
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black text-gray-900 tracking-tight">
                        #{order.orderId || order.id?.slice(-6).toUpperCase()}
                        </span>
                        {['pending', 'confirmed', 'preparing'].includes(order.status) && (
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Clock size={12} />
                      <span className="text-[11px] font-bold uppercase">
                        {order.createdAt?.seconds 
                          ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
                          : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
                        }
                      </span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border ${getStatusColor(order.status)}`}>
                    {ORDER_STATUS_LABELS[order.status] || order.status}
                  </span>
                </div>

                <div className="bg-gray-50/50 rounded-2xl p-3 mb-4 border border-gray-100/50">
                  <div className="space-y-2">
                    {(order.items || []).slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 font-medium truncate pr-4">
                            <span className="text-gray-900 font-black mr-1.5">{item.quantity}x</span> 
                            {item.name}
                        </span>
                        <span className="text-gray-900 font-bold text-xs">₹{(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                    ))}
                    {(order.items?.length > 3) && (
                         <div className="text-[10px] font-bold text-gray-400 pt-1 uppercase tracking-wider">
                            + {order.items.length - 3} more items
                         </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                   <div className="flex items-center gap-1.5 text-gray-400">
                      {order.paymentMethod === 'online' ? <CreditCard size={14} /> : <Banknote size={14} />}
                      <span className="text-[10px] font-bold uppercase tracking-wider">
                        {order.paymentMethod === 'online' ? 'Online' : 'COD'}
                      </span>
                   </div>
                   <div className="text-right">
                      <span className="text-lg font-black text-gray-900">₹{order.total?.toFixed(0)}</span>
                   </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;