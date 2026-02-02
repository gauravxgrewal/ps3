import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Minus, Plus, ArrowRight, CreditCard, Wallet, LogIn, Info, CheckCircle2, ShieldCheck } from 'lucide-react';
import Button from './Button';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from './Toast'; 
import { processPayment } from '../services/paymentService';
import { createOrder } from '../services/orderService';
import { ROUTES } from '../data/constants';

const CartSidebar = ({ isOpen, onClose, cart, onRemove, onUpdateQuantity, clearCart, getCartSummary }) => {
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const cartSummary = getCartSummary();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const generateOrderId = () => `PS3-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please login to place order");
      onClose();
      navigate(ROUTES.LOGIN);
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = generateOrderId();
      const customerPhone = user.phone || user.phoneNumber || '';
      const customerEmail = user.email || `${customerPhone}@ps3food.com`; 

      const paymentResult = await processPayment({
        paymentMethod,
        orderData: {
          amount: cartSummary.total,
          customerName: user.name || 'Foodie',
          customerPhone,
          customerEmail,
          orderId
        }
      });

      if (!paymentResult.success) throw new Error(paymentResult.error);

      const orderData = {
        orderId,
        items: cart,
        total: cartSummary.total,
        subtotal: cartSummary.subtotal,
        deliveryFee: cartSummary.deliveryFee,
        tax: cartSummary.tax,
        paymentMethod,
        paymentId: paymentResult.paymentId || 'CASH_ORDER',
        customerName: user.name || 'Foodie',
        customerPhone,
        customerEmail,
        userId: user.uid || user.id,
        status: 'pending',
        paymentStatus: paymentMethod === 'cash' ? 'pending' : 'completed',
        orderTime: new Date().toISOString()
      };

      const cleanOrderData = JSON.parse(JSON.stringify(orderData));

      const firebaseResult = await createOrder(cleanOrderData);
      if (!firebaseResult.success) throw new Error("Database error");

      clearCart();
      toast.success(paymentMethod === 'cash' ? "Order Placed (COD)! 🛵" : "Payment Successful! 🍕");
      onClose();
      navigate(ROUTES.ORDERS);

    } catch (error) {
      console.error('Order Failed:', error);
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="fixed right-0 top-0 bottom-0 w-full md:max-w-md bg-white shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        
        {/* Header - Glassmorphism touch */}
        <div className="p-5 border-b flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
                <ShoppingBag size={22} />
            </div>
            <div>
                <h3 className="font-black text-xl text-gray-900 leading-none">Your Bag</h3>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{cart.length} Items Selected</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
            <X size={24}/>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-8 bg-gray-50/50 custom-scrollbar">
          {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-10">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-4">
                    <ShoppingBag size={48} />
                </div>
                <h4 className="font-black text-gray-900 text-lg">Empty Bag!</h4>
                <p className="text-gray-500 text-sm mt-2 font-medium">Add some delicious food from the menu to get started.</p>
                <button onClick={onClose} className="mt-6 text-orange-500 font-bold text-sm underline">Browse Menu</button>
              </div>
          ) : (
            <>
              {/* Items List */}
              <div className="space-y-4">
                <div className="flex justify-between items-end px-1">
                    <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Order Details</h4>
                    <button onClick={clearCart} className="text-[10px] font-bold text-red-500 uppercase tracking-wider">Clear All</button>
                </div>
                {cart.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-[0_4px_12px_rgba(0,0,0,0.03)] flex gap-4 transition-transform active:scale-[0.98]">
                        <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-50">
                            {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-orange-50 text-2xl">🍕</div>}
                        </div>
                        <div className="flex-1 flex flex-col justify-between py-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-black text-gray-800 text-sm leading-tight">{item.name}</h4>
                                    <p className="text-[10px] text-gray-400 font-bold mt-1">Standard Size</p>
                                </div>
                                <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-black text-orange-600">₹{item.price * item.quantity}</span>
                                <div className="flex items-center bg-gray-50 border border-gray-100 rounded-xl p-1 px-2 gap-4">
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-400 hover:text-black"><Minus size={12} strokeWidth={3}/></button>
                                    <span className="text-xs font-black text-gray-900">{item.quantity}</span>
                                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-6 h-6 flex items-center justify-center bg-white rounded-lg shadow-sm text-gray-400 hover:text-black"><Plus size={12} strokeWidth={3}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Payment Method</h4>
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => setPaymentMethod('online')}
                        className={`relative p-5 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-3 ${paymentMethod === 'online' ? 'border-blue-600 bg-blue-50/50 shadow-lg shadow-blue-100' : 'border-white bg-white shadow-sm hover:border-gray-100'}`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${paymentMethod === 'online' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-100 text-gray-400'}`}>
                            <CreditCard size={24} />
                        </div>
                        <span className={`text-xs font-black uppercase tracking-wide ${paymentMethod === 'online' ? 'text-blue-700' : 'text-gray-500'}`}>Pay Online</span>
                        {paymentMethod === 'online' && <div className="absolute top-3 right-3 bg-blue-600 rounded-full p-0.5"><CheckCircle2 size={14} className="text-white" /></div>}
                    </button>

                    <button 
                        onClick={() => setPaymentMethod('cash')}
                        className={`relative p-5 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-3 ${paymentMethod === 'cash' ? 'border-emerald-600 bg-emerald-50/50 shadow-lg shadow-emerald-100' : 'border-white bg-white shadow-sm hover:border-gray-100'}`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${paymentMethod === 'cash' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-gray-100 text-gray-400'}`}>
                            <Wallet size={24} />
                        </div>
                        <span className={`text-xs font-black uppercase tracking-wide ${paymentMethod === 'cash' ? 'text-emerald-700' : 'text-gray-500'}`}>Cash / COD</span>
                        {paymentMethod === 'cash' && <div className="absolute top-3 right-3 bg-emerald-600 rounded-full p-0.5"><CheckCircle2 size={14} className="text-white" /></div>}
                    </button>
                </div>

                {/* Info Note */}
                <div className={`p-4 rounded-3xl border flex gap-3 transition-all duration-500 ${paymentMethod === 'cash' ? 'bg-emerald-50 border-emerald-100' : 'bg-blue-50 border-blue-100'}`}>
                    <Info size={18} className={paymentMethod === 'cash' ? 'text-emerald-500' : 'text-blue-500'} />
                    <p className={`text-[11px] font-bold leading-relaxed ${paymentMethod === 'cash' ? 'text-emerald-700' : 'text-blue-700'}`}>
                        {paymentMethod === 'cash' 
                            ? 'CASH ON DELIVERY: Place your order now. Pay in cash or via QR to our delivery partner upon arrival.' 
                            : 'SECURE CHECKOUT: Pay instantly using UPI, Credit/Debit Cards or Netbanking via our secure gateway.'}
                    </p>
                </div>
              </div>

              {/* Summary Card - Dark Modern Look */}
              <div className="bg-slate-900 rounded-[2.5rem] p-6 text-white shadow-2xl shadow-slate-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <ShieldCheck size={100} />
                </div>
                <div className="space-y-3 pb-4 border-b border-white/10 relative z-10">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/50"><span>Subtotal</span><span>₹{cartSummary.subtotal}</span></div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-white/50"><span>Delivery Fee</span><span className="text-emerald-400">FREE</span></div>
                </div>
                <div className="pt-4 flex justify-between items-center relative z-10">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Total Payable</p>
                        <span className="text-3xl font-black tracking-tight">₹{cartSummary.total}</span>
                    </div>
                    <div className="bg-white/10 px-3 py-1 rounded-full border border-white/10">
                        <span className="text-[10px] font-bold text-white/80">Incl. all taxes</span>
                    </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Button - Floating Effect */}
        {cart.length > 0 && (
          <div className="p-6 bg-white border-t border-gray-50">
            <Button 
                onClick={handlePlaceOrder} 
                variant="primary" 
                fullWidth 
                className={`py-5 rounded-full shadow-2xl transition-all duration-300 gap-3 group active:scale-95 ${
                    paymentMethod === 'cash' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200' : 'bg-slate-900 hover:bg-black shadow-slate-200'
                }`}
                isLoading={isProcessing}
            >
              <span className="font-black text-sm uppercase tracking-[0.15em]">
                {paymentMethod === 'cash' ? 'Confirm Order' : 'Complete Payment'}
              </span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-center text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-4">Secure 256-bit SSL Encryption</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;