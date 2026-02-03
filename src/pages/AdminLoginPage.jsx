import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, VALIDATION, ERROR_MESSAGES } from '../data/constants';
import Button from '../components/Button';
import { useToast } from '../components/Toast';
import BottomNav from '../components/BottomNav'; // Consistency

const AdminLoginPage = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginAdmin, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user && user.role === 'admin') navigate(ROUTES.ADMIN);
  }, [user, navigate]);

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await loginAdmin(phone, password);
      if (result.success) {
        toast.success('🔐 Access Granted');
        setTimeout(() => navigate(ROUTES.ADMIN), 500);
      } else {
        setError(result.error || ERROR_MESSAGES.ADMIN_ACCESS_DENIED);
      }
    } catch (err) {
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FA] pb-32">
        {/* Red/Dark Warning Header */}
        <div className="bg-slate-900 pb-24 pt-12 rounded-b-[3rem] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10 text-center text-white">
            <div className="bg-red-500/10 backdrop-blur-xl p-4 rounded-3xl inline-block mb-4 border border-red-500/20 shadow-inner">
               <ShieldCheck size={40} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Staff Portal</h1>
            <p className="text-red-500/60 font-black text-[10px] mt-2 uppercase tracking-[0.2em]">Authorized Personnel Only</p>
          </div>
        </div>

        <div className="px-4 -mt-12 relative z-20">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-8 max-w-md mx-auto">
            <form onSubmit={handlePasswordLogin} className="space-y-5">
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                    <Phone size={20} />
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Admin Phone"
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-red-500/50 focus:outline-none font-bold text-gray-900 transition-all"
                    required
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-red-500 transition-colors">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Secret Key"
                    className="w-full pl-14 pr-12 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-red-500/50 focus:outline-none font-bold text-gray-900 transition-all"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && <div className="p-4 bg-red-50 text-red-600 text-[10px] font-black rounded-2xl border border-red-100 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {error}
              </div>}

              <Button type="submit" variant="primary" className="w-full rounded-2xl py-5 bg-slate-900 border-0 shadow-xl shadow-red-900/10" isLoading={isLoading}>
                Authenticate <ArrowRight size={20} className="ml-1" />
              </Button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => navigate(ROUTES.LOGIN)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-sm text-gray-400 text-[10px] font-black uppercase tracking-widest">
              <ArrowLeft size={12} /> Exit to Customer App
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
      {toast.ToastComponent()}
    </>
  );
};

export default AdminLoginPage;