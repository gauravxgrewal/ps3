import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscribeToAllOrders, updateOrderStatus } from '../services/orderService';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../components/Toast';
import { 
  ShieldCheck, LogOut, RefreshCw, User, Phone, Check, X, CheckCircle, 
  ChefHat, DollarSign, Clock, AlertCircle, History
} from 'lucide-react';
import { ORDER_STATUS_LABELS } from '../data/constants';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  // FIX 1: Default filter ab 'active' hai taaki screen saaf rahe
  const [filter, setFilter] = useState('active'); 
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  
  const { signOut, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const userId = user?.uid || user?.id;
  const userRole = user?.role;

  useEffect(() => {
    if (authLoading) return;
    if (!userId || userRole !== 'admin') {
      navigate('/');
      return;
    }

    let isMounted = true;
    setLoadingOrders(true);

    const unsubscribe = subscribeToAllOrders(
      (newOrders) => {
        if (isMounted) {
          setOrders(newOrders);
          setLoadingOrders(false);
        }
      },
      (error) => {
        if (isMounted) {
          setLoadingOrders(false);
          toast.error('Sync Error: ' + error);
        }
      }
    );

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, [userId, userRole, authLoading, navigate]); 

  const handleStatusUpdate = async (orderId, newStatus) => {
    setUpdatingOrderId(orderId);
    try {
      const result = await updateOrderStatus(orderId, newStatus);
      if (result.success) {
        toast.success(`Order ${newStatus}`);
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error("Status update failed");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Helper function to check if order is from today
  const isToday = (dateString) => {
    if (!dateString) return false;
    const orderDate = new Date(dateString).toDateString();
    const today = new Date().toDateString();
    return orderDate === today;
  };

  // FIX 2: Stats ab sirf aaj ka data dikhayenge
  const stats = {
    pending: orders.filter(o => o.status === 'pending' && isToday(o.orderTime)).length,
    active: orders.filter(o => ['pending', 'confirmed'].includes(o.status)).length,
    revenue: orders
      .filter(o => o.status === 'delivered' && isToday(o.orderTime))
      .reduce((sum, o) => sum + (Number(o.total) || 0), 0)
  };

  // FIX 3: Filter logic to prevent screen cluttering
  const filteredOrders = orders.filter(o => {
    // Agar status delivered/cancelled hai, toh wo sirf tabhi dikhega jab specific filter selected ho
    // 'active' aur 'all' mein hum purane orders ko daba denge
    const orderIsToday = isToday(o.orderTime);

    if (filter === 'active') return ['pending', 'confirmed'].includes(o.status);
    if (filter === 'all') return orderIsToday; // All mein bhi sirf aaj ke dikhao
    
    // Baki filters (delivered/cancelled) mein sab dikhao agar user dekhna chahe
    return o.status === filter;
  });

  const getStatusColor = (status) => {
    switch(status) {
        case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
        case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
        case 'cancelled': return 'bg-rose-100 text-rose-800 border-rose-200';
        default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  if (authLoading || loadingOrders) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <div className="relative">
            <div className="w-12 h-12 border-4 border-slate-200 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-orange-500 rounded-full animate-spin absolute top-0 border-t-transparent"></div>
        </div>
        <p className="text-slate-500 font-bold mt-4 animate-pulse">Syncing Kitchen...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 font-sans">
      {/* Mobile Sticky Header */}
      <div className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-orange-600 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200/50">
              <ChefHat size={20} strokeWidth={2.5} />
            </div>
            <div>
                <h1 className="text-sm font-black text-slate-900 leading-none tracking-tight">KITCHEN</h1>
                <p className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-wide">ADMIN PORTAL</p>
            </div>
          </div>
          <button 
            onClick={() => { signOut(); navigate('/'); }} 
            className="w-9 h-9 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center hover:bg-slate-200 hover:text-red-500 active:bg-slate-300 transition-all duration-200"
          >
            <LogOut size={16} strokeWidth={2.5} />
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 px-4 pb-4">
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100 flex flex-col items-center justify-center shadow-sm">
            <div className="flex items-center gap-1.5 text-amber-600 mb-1">
                <AlertCircle size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-wide">Pending</span>
            </div>
            <p className="text-2xl font-black text-slate-900 leading-none">{stats.pending}</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 flex flex-col items-center justify-center shadow-sm">
             <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                <ChefHat size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-wide">In-Work</span>
            </div>
            <p className="text-2xl font-black text-slate-900 leading-none">{stats.active}</p>
          </div>
          <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center shadow-sm">
            <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
                <DollarSign size={14} strokeWidth={2.5} />
                <span className="text-[10px] font-black uppercase tracking-wide">Today</span>
            </div>
            <p className="text-2xl font-black text-slate-900 leading-none">₹{stats.revenue < 1000 ? stats.revenue : `${(stats.revenue/1000).toFixed(1)}k`}</p>
          </div>
        </div>

        {/* Filter Scroll */}
        <div className="flex gap-1 overflow-x-auto px-4 pb-0 scrollbar-hide border-b border-slate-100">
          {[
            { id: 'active', label: 'Current', icon: <ChefHat size={12}/> },
            { id: 'all', label: 'Today', icon: <Clock size={12}/> },
            { id: 'delivered', label: 'History', icon: <History size={12}/> },
            { id: 'pending', label: 'New' },
            { id: 'cancelled', label: 'Rejected' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`pb-3 pt-1 text-xs font-bold uppercase tracking-wider whitespace-nowrap border-b-[3px] transition-all px-3 flex items-center gap-1.5 ${
                filter === f.id 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {f.icon} {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredOrders.length === 0 ? (
            <div className="col-span-full py-32 text-center flex flex-col items-center justify-center opacity-40">
              <ShieldCheck size={64} className="text-slate-400 mb-4" strokeWidth={1.5} />
              <p className="text-slate-500 font-bold text-lg">Clean Kitchen!</p>
              <p className="text-slate-400 text-sm mt-1">No {filter} orders for now.</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.id} className={`bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200 ${!isToday(order.orderTime) ? 'opacity-75' : ''}`}>
                {/* Order Header */}
                <div className="px-4 py-3 bg-slate-50/80 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="bg-white border border-slate-200 text-slate-600 text-[10px] font-black px-2 py-1 rounded-md shadow-sm">
                        #{order.id?.slice(-4).toUpperCase()}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${getStatusColor(order.status)}`}>
                      {ORDER_STATUS_LABELS[order.status]}
                    </span>
                  </div>
                  {!isToday(order.orderTime) && <span className="text-[8px] font-bold text-slate-400 italic">Yesterday</span>}
                  <span className="font-black text-slate-900 text-sm bg-white px-2 py-1 rounded-lg border border-slate-100 shadow-sm">₹{order.total}</span>
                </div>

                {/* Customer & Items */}
                <div className="p-4 flex-1">
                  <div className="mb-4 pb-4 border-b border-slate-50 border-dashed">
                      <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                               <User size={12} strokeWidth={2.5} />
                          </div>
                          <p className="text-sm font-bold text-slate-900 truncate">{order.customerName || 'Guest Customer'}</p>
                      </div>
                      {order.customerPhone && (
                          <a href={`tel:${order.customerPhone}`} className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-semibold hover:text-blue-600 bg-slate-50 px-2 py-1 rounded-md ml-8 transition-colors">
                              <Phone size={10} /> {order.customerPhone}
                          </a>
                      )}
                  </div>

                  <div className="space-y-2.5">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-2.5 bg-slate-50/50 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                        <span className="bg-white text-slate-900 font-black text-xs h-6 w-6 flex items-center justify-center rounded-lg border border-slate-200 shadow-sm shrink-0">
                            {item.quantity}
                        </span>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-700 leading-snug">{item.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Footer */}
                <div className="p-3 bg-white border-t border-slate-100">
                    {order.status === 'pending' && (
                      <div className="flex gap-2">
                         <button 
                          disabled={updatingOrderId === order.id}
                          onClick={() => handleStatusUpdate(order.id, 'cancelled')} 
                          className="flex-1 py-3 px-2 bg-white border-2 border-slate-100 text-slate-400 rounded-xl font-bold text-xs uppercase hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all active:scale-95 disabled:opacity-50"
                        >
                          Reject
                        </button>
                        <button 
                          disabled={updatingOrderId === order.id}
                          onClick={() => handleStatusUpdate(order.id, 'confirmed')} 
                          className="flex-[2] py-3 px-2 bg-slate-900 text-white rounded-xl font-bold text-xs uppercase tracking-wide hover:bg-slate-800 shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {updatingOrderId === order.id ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                          Accept
                        </button>
                      </div>
                    )}
                    
                    {order.status === 'confirmed' && (
                      <button 
                        disabled={updatingOrderId === order.id}
                        onClick={() => handleStatusUpdate(order.id, 'delivered')} 
                        className="w-full py-3.5 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-emerald-700 shadow-lg active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {updatingOrderId === order.id ? <RefreshCw size={18} className="animate-spin" /> : <CheckCircle size={18} strokeWidth={2.5} />}
                        Done
                      </button>
                    )}
                    
                    {['delivered', 'cancelled'].includes(order.status) && (
                      <div className="flex items-center justify-center gap-2 text-slate-300 text-[10px] font-black uppercase tracking-widest py-2 bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                        <Clock size={14} />
                        Completed
                      </div>
                    )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;