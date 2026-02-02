import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, ShieldCheck, Lock, Eye, EyeOff, ChefHat, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, VALIDATION, ERROR_MESSAGES } from '../data/constants';
import Button from '../components/Button';
import { useToast } from '../components/Toast';

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
    if (user && user.role === 'admin') {
      navigate(ROUTES.ADMIN);
    }
  }, [user, navigate]);

  const validatePhone = (phoneNum) => {
    if (phoneNum.length !== VALIDATION.PHONE.MAX_LENGTH) return ERROR_MESSAGES.INVALID_PHONE;
    if (!VALIDATION.PHONE.PATTERN.test(phoneNum)) return 'Invalid mobile number';
    return null;
  };

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setError('');

    const phoneError = validatePhone(phone);
    if (phoneError) {
      setError(phoneError);
      return;
    }

    if (password.length < VALIDATION.PIN.MIN_LENGTH) {
      setError(`Password must be at least ${VALIDATION.PIN.MIN_LENGTH} characters`);
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginAdmin(phone, password);
      if (result.success) {
        toast.success('🔐 Admin Access Granted');
        setTimeout(() => navigate(ROUTES.ADMIN), 500);
      } else {
        setError(result.error || ERROR_MESSAGES.ADMIN_ACCESS_DENIED);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
        {/* 1. Curved Branding Header (Matches LoginPage) */}
        <div className="bg-slate-900 h-[30vh] rounded-b-[2.5rem] relative flex items-center justify-center overflow-hidden shrink-0 shadow-xl">
           {/* Decorative Background Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-600/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
           
           <div className="relative z-10 text-center text-white p-6">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl inline-block mb-4 shadow-lg border border-white/10">
                 <ShieldCheck size={40} className="text-orange-500" />
              </div>
              <h1 className="text-3xl font-black tracking-tight">Admin Portal</h1>
              <p className="text-slate-400 font-medium text-sm mt-1 uppercase tracking-widest">Restricted Access</p>
           </div>
        </div>

        {/* 2. Admin Login Card (Floating over header) */}
        <div className="flex-1 px-4 -mt-10 pb-6">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 md:p-8 max-w-md mx-auto relative z-20">
                
                <div className="mb-8">
                   <h2 className="text-2xl font-black text-gray-900">Credentials</h2>
                   <p className="text-gray-500 text-sm mt-1">Please enter your authorized staff credentials to continue</p>
                </div>

                <form onSubmit={handlePasswordLogin} className="space-y-5">
                    <div className="space-y-4">
                        {/* Admin Phone Input */}
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                <Phone size={20} />
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                                placeholder="Admin Mobile Number"
                                maxLength="10"
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none font-bold text-gray-900 transition-all placeholder:font-medium placeholder:text-gray-400"
                                required
                                autoFocus
                            />
                        </div>

                        {/* Secure Password Input */}
                        <div className="relative group">
                             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                                <Lock size={20} />
                            </div>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Security Password"
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none font-bold text-gray-900 transition-all placeholder:font-medium placeholder:text-gray-400"
                                required
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)} 
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Error Feedback */}
                    {error && (
                      <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                         <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {error}
                      </div>
                    )}

                    <Button 
                      type="submit" 
                      variant="primary" 
                      className="w-full rounded-2xl py-4 text-base shadow-lg shadow-orange-200 bg-slate-900 hover:bg-black border-0" 
                      isLoading={isLoading}
                    >
                       Authenticate Staff <ArrowRight size={20} className="ml-1" />
                    </Button>
                </form>
            </div>

            {/* Back to User Login Link */}
            <div className="mt-8 text-center">
                <button 
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-gray-100 shadow-sm text-gray-500 text-xs font-bold hover:bg-gray-50 transition-colors active:scale-95"
                >
                    <ArrowLeft size={12} /> Exit to Customer Login
                </button>
            </div>
        </div>
      </div>
      {toast.ToastComponent()}
    </>
  );
};

export default AdminLoginPage;