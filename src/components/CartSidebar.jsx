import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Minus, Plus, CreditCard, Wallet, ShieldCheck, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './Toast'; 
import { processPayment } from '../services/paymentService';
import { createOrder } from '../services/orderService';
import { ROUTES } from '../data/constants';
import { getImageUrl } from '../utils/image';

const CartSidebar = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity, clearCart, getCartSummary }) => {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState(true);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const cartSummary = getCartSummary();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Handle mobile back button
  useEffect(() => {
    if (!isOpen) return;

    const handleBackButton = (e) => {
      e.preventDefault();
      onClose();
      window.history.pushState(null, null, window.location.pathname);
    };

    window.addEventListener('popstate', handleBackButton);
    window.history.pushState(null, null, window.location.pathname);

    return () => window.removeEventListener('popstate', handleBackButton);
  }, [isOpen, onClose]);

  // --- MISSING FUNCTION ADDED BACK ---
  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login to place order");
      onClose();
      navigate(ROUTES.LOGIN);
      return;
    }

    // Validate required fields before processing
    if (!user.name && !user.phone) {
      toast.error("Please update your profile first");
      return;
    }

    setIsProcessing(true);
    try {
      const orderId = `PS3-${Date.now()}`;
      const customerPhone = user.phone ? String(user.phone).trim() : '';
      const customerName = user.name ? String(user.name).trim() : 'Guest User';
      const userId = user.uid || user.id;

      if (!userId) {
        throw new Error("User ID not found");
      }

      const paymentResult = await processPayment({
        paymentMethod,
        orderData: { amount: cartSummary.total, customerName, customerPhone, orderId }
      });

      if (!paymentResult.success) throw new Error(paymentResult.error);

      // Only proceed if cart still has items
      if (!cart || cart.length === 0) {
        throw new Error("Cart is empty");
      }

      // Sanitize cart items to remove undefined fields
      const cleanCartItems = cart.map(item => ({
        id: item.id || '',
        name: item.name || '',
        price: item.price || 0,
        quantity: item.quantity || 1,
        size: item.size || '',
        image: item.image || ''
      })).filter(item => item.id && item.name);

      if (cleanCartItems.length === 0) {
        throw new Error("No valid items in cart");
      }

      const firebaseResult = await createOrder({
        orderId,
        items: cleanCartItems,
        total: Number(cartSummary.total) || 0,
        paymentMethod,
        customerName,
        customerPhone,
        userId,
        status: 'pending',
        orderTime: new Date().toISOString()
      });

      if (firebaseResult.success) {
        clearCart();
        toast.success("Order Placed! 🍕");
        onClose();
        navigate(ROUTES.ORDERS);
      } else {
        throw new Error(firebaseResult.error);
      }
    } catch (error) {
      toast.error(error.message || "Order creation failed");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-slate-900/60 z-[60] backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed right-0 top-0 bottom-0 w-full md:max-w-[420px] bg-white z-[70] flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* 1. Slim Header */}
        <div className="bg-slate-900 py-3 px-5 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 p-1.5 rounded-lg text-white">
              <ShoppingBag size={16} strokeWidth={2.5} />
            </div>
            <h3 className="text-sm font-black text-white uppercase tracking-tight">Cart ({cart.length})</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-lg text-white flex items-center justify-center transition-all">
            <X size={18} strokeWidth={3} />
          </button>
        </div>

        {/* 2. Scrollable Body: 2 Columns */}
        <div className="flex-1 overflow-y-auto bg-[#F8F9FA] px-2 py-3 scrollbar-hide">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
              <ShoppingBag size={40} className="mb-2" />
              <p className="text-[10px] font-black uppercase">Your cart is empty</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {cart.map(item => (
                <div key={item.id} className="bg-white p-2 rounded-xl border border-slate-100 shadow-sm flex flex-col">
                  <div className="relative w-full aspect-square bg-slate-50 rounded-lg overflow-hidden mb-2">
                    {item.image ? (
                      <img
                        src={getImageUrl(item.image)}
                        className="w-full h-full object-cover"
                        alt={item.name}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xl">🍕</div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-h-[32px]">
                    <h4 className="text-[10px] font-bold text-slate-800 line-clamp-2 uppercase leading-tight">{item.name}</h4>
                    <p className="text-[11px] font-black text-slate-900 mt-1">₹{item.price * item.quantity}</p>
                  </div>

                  <div className="flex items-center justify-between mt-2 bg-slate-50 rounded-lg p-1 border border-slate-100">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-md text-slate-400 shadow-sm"><Minus size={10} strokeWidth={3}/></button>
                    <span className="text-[10px] font-black text-slate-900">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-md text-slate-400 shadow-sm"><Plus size={10} strokeWidth={3}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Hidable Footer */}
        {cart.length > 0 && (
          <div className="bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] shrink-0">
            {/* Arrow Toggle */}
            <button 
              onClick={() => setIsFooterExpanded(!isFooterExpanded)}
              className="w-full py-1.5 flex items-center justify-center text-slate-300 hover:text-slate-500"
            >
              {isFooterExpanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>

            <div className={`${isFooterExpanded ? 'px-5 pb-5 pt-1 block' : 'hidden'}`}>
              <div className="flex justify-between items-center mb-4">
                <div className="space-y-0.5">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Amount</p>
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">₹{cartSummary.total}</span>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => setPaymentMethod('online')}
                    className={`p-2 rounded-xl border-2 transition-all ${
                      paymentMethod === 'online'
                        ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-sm'
                        : 'border-slate-100 text-slate-300'
                    }`}
                  >
                    <CreditCard size={18} />
                  </button>
                  <button 
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2 rounded-xl border-2 transition-all ${
                      paymentMethod === 'cash'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-sm'
                        : 'border-slate-100 text-slate-300'
                    }`}
                  >
                    <Wallet size={18} />
                  </button>
                </div>
              </div>

              <Button 
                onClick={handlePlaceOrder} 
                variant="primary" 
                fullWidth 
                className={`py-4 rounded-xl flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[11px] border-0 transition-colors ${
                  paymentMethod === 'cash' ? 'bg-emerald-600' : 'bg-slate-900'
                }`}
                isLoading={isProcessing}
              >
                {paymentMethod === 'cash' ? 'Confirm Order' : 'Pay & Checkout'}
                <ChevronRight size={16} strokeWidth={3} />
              </Button>
            </div>

            {/* Collapsed Bar */}
            {!isFooterExpanded && (
              <div className="px-5 pb-5 pt-1 flex items-center justify-between">
                <span className="text-xl font-black text-slate-900">₹{cartSummary.total}</span>
                <button onClick={() => setIsFooterExpanded(true)} className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                  Show Checkout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;