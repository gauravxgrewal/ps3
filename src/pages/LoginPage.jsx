import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, User, Lock, ChefHat } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { ROUTES, VALIDATION, ERROR_MESSAGES } from '../data/constants';
import Button from '../components/Button';
import { useToast } from '../components/Toast';

const LoginPage = () => {
  const [step, setStep] = useState(1); // 1: Phone, 2: Name (if new)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);

  const { loginWithPhone, user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') navigate(ROUTES.ADMIN);
      else navigate(ROUTES.HOME);
    }
  }, [user, navigate]);

  // Validation
  const validatePhone = (phone) => {
    if (phone.length !== VALIDATION.PHONE.MAX_LENGTH) return ERROR_MESSAGES.INVALID_PHONE;
    if (!VALIDATION.PHONE.PATTERN.test(phone)) return 'Invalid mobile number format';
    return null;
  };

  const validateName = (name) => {
    if (name.trim().length < VALIDATION.NAME.MIN_LENGTH) return ERROR_MESSAGES.INVALID_NAME;
    if (!VALIDATION.NAME.PATTERN.test(name.trim())) return 'Name should contain letters only';
    return null;
  };

  // Step 1: Check if user exists and proceed
  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const phoneError = validatePhone(phoneNumber);
    if (phoneError) {
      setError(phoneError);
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginWithPhone(phoneNumber);

      if (result.success) {
        if (result.isNewUser) {
          setIsNewUser(true);
          setStep(2); // Move to name input for new users
          toast.success('Welcome! Please enter your name');
        } else {
          toast.success('✅ Login successful!');
          setTimeout(() => navigate(ROUTES.HOME), 500);
        }
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Register new user with name
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const nameError = validateName(userName);
    if (nameError) {
      setError(nameError);
      return;
    }

    setIsLoading(true);
    try {
      const result = await loginWithPhone(phoneNumber, userName);

      if (result.success) {
        toast.success('✅ Account created successfully!');
        setTimeout(() => navigate(ROUTES.HOME), 500);
      } else {
        setError(result.error || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Register error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
        {/* Header Image / Branding */}
        <div className="bg-orange-600 h-[30vh] rounded-b-[2.5rem] relative flex items-center justify-center overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl opacity-50"></div>

          <div className="relative z-10 text-center text-white p-6">
            <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl inline-block mb-4 shadow-lg border border-white/10">
              <ChefHat size={40} className="text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight">Welcome to PS3</h1>
            <p className="text-orange-100 font-medium text-sm mt-1">Delicious food awaits you</p>
          </div>
        </div>

        {/* Login Card */}
        <div className="flex-1 px-4 -mt-10 pb-6">
          <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 p-6 md:p-8 max-w-md mx-auto relative z-20">

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900">
                {step === 1 ? 'Get Started' : "What's Your Name?"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                {step === 1 ? 'Enter your mobile number to continue' : 'Help us personalize your experience'}
              </p>
            </div>

            {/* STEP 1: Phone Number */}
            {step === 1 && (
              <form onSubmit={handlePhoneSubmit} className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <Phone size={20} />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="Mobile Number"
                    maxLength="10"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none font-bold text-gray-900 transition-all placeholder:font-medium placeholder:text-gray-400 tracking-wide"
                    required
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full rounded-2xl py-4 text-base shadow-lg shadow-orange-200" 
                  isLoading={isLoading}
                  disabled={isLoading || phoneNumber.length !== 10}
                >
                  {isLoading ? 'Processing...' : 'Continue'}
                </Button>
              </form>
            )}

            {/* STEP 2: Enter Name (New Users Only) */}
            {step === 2 && (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-orange-500 transition-colors">
                    <User size={20} />
                  </div>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-orange-500 focus:outline-none font-bold text-gray-900 transition-all placeholder:font-medium placeholder:text-gray-400"
                    required
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl border border-red-100 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {error}
                  </div>
                )}

                <Button 
                  type="submit" 
                  variant="primary" 
                  className="w-full rounded-2xl py-4 text-base shadow-lg shadow-orange-200" 
                  isLoading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>

                <button
                  type="button"
                  onClick={() => { setStep(1); setUserName(''); setError(''); setPhoneNumber(''); }}
                  className="w-full py-2 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ← Change Number
                </button>
              </form>
            )}
          </div>

          {/* Admin Link */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate(ROUTES.ADMIN_LOGIN)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-500 text-xs font-bold hover:bg-gray-200 transition-colors"
            >
              <Lock size={12} /> Admin Access
            </button>
          </div>
        </div>
      </div>
      {toast.ToastComponent()}
    </>
  );
};

export default LoginPage;