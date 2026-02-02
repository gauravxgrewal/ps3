import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Edit2, Save, X, LogOut, ShieldCheck, ArrowLeft, Calendar, ChevronRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updateUser } from '../services/userService';
import { ROUTES, VALIDATION } from '../data/constants';
import Button from '../components/Button';
import Modal from '../components/Modal';
import { useToast } from '../components/Toast';

const ProfilePage = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate(ROUTES.LOGIN);
      return;
    }
    setName(user.name || '');
  }, [user, navigate]);

  const validateName = (nameValue) => {
    if (nameValue.trim().length < VALIDATION.NAME.MIN_LENGTH) return 'Name too short';
    if (nameValue.trim().length > VALIDATION.NAME.MAX_LENGTH) return 'Name too long';
    if (!VALIDATION.NAME.PATTERN.test(nameValue.trim())) return 'Letters only please';
    return null;
  };

  const handleSave = async () => {
    setError('');
    const nameError = validateName(name);
    if (nameError) {
      setError(nameError);
      return;
    }

    if (name.trim() === user.name) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      const result = await updateUser(user.id, { name: name.trim() });
      if (result.success) {
        const updatedUser = { ...user, name: name.trim() };
        localStorage.setItem('ps3-user', JSON.stringify(updatedUser));
        setIsEditing(false);
        toast.success('Profile updated');
      } else {
        setError('Update failed');
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setName(user.name || '');
    setIsEditing(false);
    setError('');
  };

  if (!user) return null;

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FA]">
        {/* App Bar & Header Background */}
        <div className="bg-slate-900 pb-20 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
            {/* Decorational Circles */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

            <div className="px-4 py-4 flex items-center gap-4 relative z-10 text-white">
                <button 
                    onClick={() => navigate(-1)} 
                    className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-xl font-bold tracking-tight">Profile</h1>
            </div>

            <div className="text-center mt-2 mb-4 relative z-10">
                <div className="inline-block p-1 bg-white/10 rounded-full backdrop-blur-sm mb-3">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
                        {user.role === 'admin' ? (
                            <ShieldCheck size={40} className="text-slate-900" />
                        ) : (
                            <User size={40} className="text-slate-900" />
                        )}
                    </div>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">{user.name || 'Guest'}</h2>
                <p className="text-slate-400 text-sm font-medium">
                    {user.role === 'admin' ? 'Administrator' : 'Foodie Member'}
                </p>
            </div>
        </div>

        {/* Content Card - Overlapping the Header */}
        <div className="px-4 -mt-12 relative z-20 pb-24">
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
                
                {/* Editable Name Section */}
                <div className="p-5 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-2">
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                        {!isEditing && (
                            <button onClick={() => setIsEditing(true)} className="text-orange-600 p-1 bg-orange-50 rounded-lg">
                                <Edit2 size={16} />
                            </button>
                        )}
                    </div>
                    
                    {isEditing ? (
                        <div className="space-y-3 animate-in fade-in zoom-in-95 duration-200">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange-500 rounded-xl px-4 py-3 font-bold text-gray-900 outline-none transition-all"
                                autoFocus
                            />
                            {error && <p className="text-xs text-red-500 font-bold ml-1">{error}</p>}
                            <div className="flex gap-2">
                                <Button onClick={handleCancel} variant="secondary" className="flex-1 rounded-xl h-10 text-xs">Cancel</Button>
                                <Button onClick={handleSave} isLoading={isLoading} variant="primary" className="flex-1 rounded-xl h-10 text-xs">Save</Button>
                            </div>
                        </div>
                    ) : (
                        <p className="text-lg font-bold text-gray-900">{user.name}</p>
                    )}
                </div>

                {/* Read Only Sections */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Mobile Number</label>
                        <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            +91 {user.phone}
                            <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-black uppercase">Verified</span>
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                        <Phone size={20} />
                    </div>
                </div>

                <div className="p-5 flex items-center justify-between group active:bg-gray-50 transition-colors">
                     <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Joined On</label>
                        <p className="text-base font-bold text-gray-900">
                            {new Date(user.createdAt || Date.now()).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                        <Calendar size={20} />
                    </div>
                </div>
            </div>

            {/* Logout Button */}
            <button 
                onClick={() => setShowLogoutModal(true)}
                className="w-full mt-6 bg-white border border-red-100 text-red-500 font-bold py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                <LogOut size={20} />
                Log Out
            </button>
            
            
        </div>
      </div>

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Logging out?"
        message="Come back soon! We'll have fresh food waiting for you."
        type="warning"
        actions={
          <>
            <Button onClick={() => setShowLogoutModal(false)} variant="secondary" className="rounded-xl flex-1 py-3">Cancel</Button>
            <Button onClick={() => { signOut(); navigate(ROUTES.HOME); }} variant="primary" className="rounded-xl flex-1 py-3 bg-red-600 hover:bg-red-700 shadow-red-200">
               Logout
            </Button>
          </>
        }
      />

      {toast.ToastComponent()}
    </>
  );
};

export default ProfilePage;