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

  /**
   * Login/Register with Phone Number
   * Directly creates or logs in user with just phone number
   */
  const loginWithPhone = async (phoneNumber, userName = null) => {
    try {
      // Check if user exists
      let userData = await getUserByPhone(phoneNumber);

      // If user doesn't exist, create new user
      if (!userData) {
        if (!userName) {
          return {
            success: true,
            isNewUser: true,
            userExists: false
          };
        }

        const uid = `customer-${phoneNumber}`;
        const result = await createUser({
          phone: phoneNumber,
          name: userName,
          uid: uid,
          role: USER_ROLES.CUSTOMER,
          createdAt: new Date().toISOString()
        });

        userData = result.data || result;
      }

      // Normalize user object
      const normalizedUser = {
        ...userData,
        id: userData.id || userData.uid || `customer-${phoneNumber}`,
        uid: userData.uid || userData.id || `customer-${phoneNumber}`,
        phone: phoneNumber,
        name: userData.name || userName || 'Customer',
        role: USER_ROLES.CUSTOMER
      };

      // Save user session
      setUser(normalizedUser);
      localStorage.setItem('ps3-user', JSON.stringify(normalizedUser));

      return {
        success: true,
        isNewUser: !userData || !userData.id,
        user: normalizedUser,
        message: 'Login successful!'
      };

    } catch (error) {
      console.error('Login with phone error:', error);
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  };

  /**
   * Admin Login (PIN-based)
   */
  const loginAdmin = async (phone, pin) => {
    try {
      const result = await verifyAdmin(phone, pin);

      if (result.success) {
        const normalizedUser = {
          ...result.user,
          id: result.user.id || result.user.uid || `admin-${result.user.phone}`,
          uid: result.user.uid || result.user.id || `admin-${result.user.phone}`,
          phone: result.user.phone,
          name: result.user.name || 'Admin',
          role: USER_ROLES.ADMIN
        };

        setUser(normalizedUser);
        localStorage.setItem('ps3-user', JSON.stringify(normalizedUser));
        return { success: true };
      }

      return { success: false, error: result.error };

    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

  /**
   * Sign Out
   */
  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ps3-user');
    localStorage.removeItem('ps3-cart'); // Clear cart on logout
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