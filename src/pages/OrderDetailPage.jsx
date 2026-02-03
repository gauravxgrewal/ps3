import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  ShoppingBag,
  CreditCard,
  Banknote,
  MapPin,
  Phone,
  Loader2,
} from 'lucide-react';
import { getOrderById } from '../services/orderService';
import { ORDER_STATUS_LABELS, ROUTES } from '../data/constants';
import Button from '../components/Button';

const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadOrder = async () => {
      setLoading(true);
      setError('');
      const result = await getOrderById(id);
      if (!isMounted) return;

      if (result.success) {
        setOrder(result.data);
      } else {
        setError(result.error || 'Order not found');
      }
      setLoading(false);
    };

    if (id) {
      loadOrder();
    } else {
      setLoading(false);
      setError('Missing order id');
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-3" />
        <p className="text-xs font-bold text-gray-500 tracking-wide">
          Fetching your order...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-white rounded-3xl shadow-md flex items-center justify-center mb-4">
          <ShoppingBag className="text-gray-300" size={32} />
        </div>
        <h2 className="text-xl font-black text-gray-900 mb-1">Order not found</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-xs">
          {error || 'We could not find details for this order.'}
        </p>
        <Button
          variant="primary"
          onClick={() => navigate(ROUTES.ORDERS)}
          className="rounded-2xl px-8 py-3 text-sm font-black"
        >
          Back to Orders
        </Button>
      </div>
    );
  }

  const createdAt = order.createdAt?.seconds
    ? new Date(order.createdAt.seconds * 1000)
    : order.orderTime
    ? new Date(order.orderTime)
    : null;

  const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status;
  const isOnline = order.paymentMethod === 'online';

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-8">
      {/* Curved header */}
      <div className="bg-slate-900 pb-24 pt-6 rounded-b-[2.5rem] relative overflow-hidden shadow-xl z-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

        <div className="px-4 flex items-center gap-4 relative z-10 text-white">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold tracking-tight">Order Details</h1>
        </div>

        <div className="px-6 mt-4 relative z-10 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Order
            </p>
            <p className="text-2xl font-black text-white tracking-tight">
              #{order.orderId || order.id?.slice(-6).toUpperCase()}
            </p>
            {createdAt && (
              <p className="text-xs text-slate-400 font-medium mt-1 flex items-center gap-1.5">
                <Clock size={14} />
                {createdAt.toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl px-3 py-2 text-right">
            <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-wider">
              Total Paid
            </span>
            <span className="block text-xl font-black text-white">
              ₹{order.total?.toFixed(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Content card */}
      <div className="px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden">
          {/* Status row */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                Status
              </p>
              <p className="text-sm font-bold text-gray-900">{statusLabel}</p>
            </div>
            <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-gray-100 text-gray-700">
              {order.status}
            </span>
          </div>

          {/* Items */}
          <div className="p-5 border-b border-gray-100">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
              Items
            </p>
            <div className="space-y-2">
              {(order.items || []).map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-sm bg-gray-50 rounded-2xl px-3 py-2 border border-gray-100"
                >
                  <div className="flex items-center gap-2 pr-4">
                    <span className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[11px] font-black text-gray-900">
                      {item.quantity}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 leading-snug">
                        {item.name}
                      </p>
                      {item.size && (
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                          {item.size}
                        </p>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(0)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment + meta */}
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                  {isOnline ? <CreditCard size={18} /> : <Banknote size={18} />}
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Payment Method
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {isOnline ? 'Online' : 'Cash on Delivery'}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {isOnline ? 'Paid' : 'To be paid'}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Contact
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    {order.customerName || 'Guest Customer'}
                  </p>
                  {order.customerPhone && (
                    <a
                      href={`tel:${order.customerPhone}`}
                      className="text-[11px] font-bold text-blue-600"
                    >
                      {order.customerPhone}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Address placeholder (structure ready) */}
            <div className="flex items-start gap-2 mt-2">
              <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                  Delivery Address
                </p>
                <p className="text-xs text-gray-500">
                  Address details feature coming soon. For now, our team
                  confirms your exact location on call.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;

