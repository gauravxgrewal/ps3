import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, User, Lock, ChefHat, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, VALIDATION, ERROR_MESSAGES } from '../data/constants';
import Button from '../components/Button';
import { useToast } from '../components/Toast';
import BottomNav from '../components/BottomNav'; // Added BottomNav

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { loginWithPhone, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate(ROUTES.ADMIN);
      else navigate(ROUTES.HOME);
    }
  }, [user, navigate]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (phoneNumber.length !== 10) {
      setError(ERROR_MESSAGES.INVALID_PHONE);
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginWithPhone(phoneNumber);
      if (result.success) {
        if (result.isNewUser) {
          setStep(2);
          toast.success('Welcome! Please enter your name');
        } else {
          toast.success('✅ Welcome Back!');
          setTimeout(() => navigate(ROUTES.HOME), 500);
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (userName.trim().length < 3) {
      setError('Name is too short');
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginWithPhone(phoneNumber, userName);
      if (result.success) {
        toast.success('✅ Account Created!');
        setTimeout(() => navigate(ROUTES.HOME), 500);
      }
    } catch (err) {
      setError('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FA] pb-32">
        {/* Premium Dark Header (Matched with Profile/Menu) */}
        <div className="bg-slate-900 pb-24 pt-12 rounded-b-[3rem] relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          <div className="relative z-10 text-center text-white px-6">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl inline-block mb-6 border border-white/10 shadow-2xl">
              <ChefHat size={48} className="text-orange-500" />
            </div>
            <h1 className="text-4xl font-black tracking-tight">PS3 Fast Food</h1>
            <p className="text-slate-400 font-bold text-sm mt-2 uppercase tracking-widest">Freshness Delivered</p>
          </div>
        </div>

        {/* Floating Login Card */}
        <div className="px-4 -mt-12 relative z-20">
          <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 p-8 max-w-md mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 leading-tight">
                {step === 1 ? 'Welcome Back!' : 'Join the Club'}
              </h2>
              <p className="text-gray-400 text-sm font-bold mt-1">
                {step === 1 ? 'Enter your number to start eating' : 'Tell us your name to continue'}
              </p>
            </div>

            {step === 1 ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <Phone size={20} />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Mobile Number"
                    maxLength="10"
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-orange-500 focus:outline-none font-black text-gray-900 transition-all placeholder:font-bold placeholder:text-gray-400"
                    required
                  />
                </div>

                {error && <p className="text-xs text-red-500 font-black ml-2 animate-pulse">{error}</p>}

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full rounded-2xl py-5 text-base font-black shadow-xl shadow-orange-500/20 bg-slate-900 border-0" 
                  isLoading={isLoading}
                >
                  Continue <ArrowRight size={20} className="ml-2" />
                </Button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent rounded-[1.5rem] focus:bg-white focus:border-orange-500 focus:outline-none font-black text-gray-900 transition-all placeholder:font-bold placeholder:text-gray-400"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" className="w-full rounded-2xl py-5 font-black bg-slate-900 border-0" isLoading={isLoading}>
                  Create Account
                </Button>
              </form>
            )}
          </div>

          <div className="mt-10 text-center">
            <button onClick={() => navigate(ROUTES.ADMIN_LOGIN)} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-sm text-gray-500 text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
              <Lock size={12} /> Admin Access
            </button>
          </div>
        </div>
      </div>
      <BottomNav />
      {toast.ToastComponent()}
    </>
  );
};

export default LoginPage;