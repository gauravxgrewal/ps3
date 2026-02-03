import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { getUserByPhone, createUser, verifyAdmin } from '../services/userService';
import { USER_ROLES } from '../data/constants';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const savedUser = localStorage.getItem('ps3-user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('ps3-user');
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const loginWithPhone = async (phoneNumber, userName = null) => {
    try {
      let userData = await getUserByPhone(phoneNumber);
      let isActuallyNew = false;

      // Agar user nahi hai, aur name bhi nahi hai -> Step 2 par bhejo
      if (!userData && !userName) {
        return { success: true, isNewUser: true };
      }

      // Agar user nahi hai, aur name mil gaya -> Register karo
      if (!userData && userName) {
        const uid = `customer-${phoneNumber}`;
        const result = await createUser({
          phone: phoneNumber,
          name: userName,
          uid: uid,
          role: USER_ROLES.CUSTOMER,
          createdAt: new Date().toISOString()
        });
        userData = result.data || result;
        isActuallyNew = true;
      }

      // User object format fix karo
      const normalizedUser = {
        ...userData,
        id: userData.id || userData.uid || `customer-${phoneNumber}`,
        uid: userData.uid || userData.id || `customer-${phoneNumber}`,
        phone: phoneNumber,
        name: userData.name || userName || 'Customer',
        role: userData.role || USER_ROLES.CUSTOMER
      };

      setUser(normalizedUser);
      localStorage.setItem('ps3-user', JSON.stringify(normalizedUser));

      return {
        success: true,
        isNewUser: false, // Ab registration/login ho gaya toh false
        user: normalizedUser,
        message: isActuallyNew ? 'Account Created!' : 'Welcome Back!'
      };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Authentication failed' };
    }
  };

  const loginAdmin = async (phone, pin) => {
    try {
      const result = await verifyAdmin(phone, pin);
      if (result.success) {
        const normalizedUser = {
          ...result.user,
          role: USER_ROLES.ADMIN 
        };
        setUser(normalizedUser);
        localStorage.setItem('ps3-user', JSON.stringify(normalizedUser));
        return { success: true };
      }
      return { success: false, error: result.error };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ps3-user');
    localStorage.removeItem('ps3-cart');
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    loginWithPhone,
    loginAdmin,
    signOut,
    isAdmin: user?.role === USER_ROLES.ADMIN,
    isCustomer: user?.role === USER_ROLES.CUSTOMER
  }), [user, loading, signOut]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};