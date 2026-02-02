import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';

const USERS_COLLECTION = 'users';

// 1. Create User (Standard Customer or Admin setup)
export const createUser = async (userData) => {
  try {
    // Agar UID nahi aayi, to hum phone number se generate kar lenge consistent ID ke liye
    const userId = userData.uid || `user-${userData.phone}`;
    
    const userRef = doc(db, USERS_COLLECTION, userId);
    
    // Naya data prepare karte hain
    const newUser = {
      ...userData,
      uid: userId, // Ensure ID is inside the doc too
      createdAt: userData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // setDoc use kar rahe hain taaki ID humari marzi ki ho
    await setDoc(userRef, newUser);
    
    return {
      success: true,
      data: newUser
    };
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
};

// 2. Get User by Phone (Used for checking if user exists)
export const getUserByPhone = async (phoneNumber) => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where('phone', '==', phoneNumber));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const userDoc = querySnapshot.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data()
    };
  } catch (error) {
    console.error('Get user by phone error:', error);
    throw error;
  }
};

// 3. Get User by ID (Direct Fetch - Faster)
export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return null;
    }
    
    return {
      id: userDoc.id,
      ...userDoc.data()
    };
  } catch (error) {
    console.error('Get user by ID error:', error);
    throw error;
  }
};

// 4. Update User Data
export const updateUser = async (userId, updates) => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date().toISOString()
    });
    
    return { success: true };
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

// 5. Verify Admin Login (New Logic: Phone + PIN)
export const verifyAdmin = async (phone, pin) => {
  try {
    // Step 1: User dhoondo phone se
    const user = await getUserByPhone(phone);
    
    if (!user) {
      return { success: false, error: 'Admin account not found' };
    }

    // Step 2: Role check karo
    if (user.role !== 'admin') {
      return { success: false, error: 'Access denied. Not an admin.' };
    }

    // Step 3: PIN Check karo
    // Note: Database me admin user ke pass 'adminPin' field hona chahiye
    if (!user.adminPin || String(user.adminPin) !== String(pin)) {
      return { success: false, error: 'Invalid Admin PIN' };
    }

    return { success: true, user };

  } catch (error) {
    console.error('Admin verify error:', error);
    return { success: false, error: 'Verification failed' };
  }
};

// 6. Get All Users (For Admin Dashboard)
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const querySnapshot = await getDocs(usersRef);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Get all users error:', error);
    throw error;
  }
};