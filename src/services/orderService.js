import { db } from '../config/firebase';
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';

const ORDERS_COLLECTION = 'orders';

/**
 * Helper to remove undefined values recursively
 */
const sanitizeData = (data) => {
  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item)).filter(item => item !== undefined);
  }
  
  if (data !== null && typeof data === 'object') {
    const cleaned = {};
    Object.keys(data).forEach(key => {
      const value = data[key];
      if (value !== undefined && value !== null) {
        cleaned[key] = sanitizeData(value);
      }
    });
    return cleaned;
  }
  
  return data;
};

// --- CREATE ---

export const createOrder = async (orderData) => {
  try {
    if (!orderData) throw new Error('Invalid order data');
    
    // Sanitize all data including nested items
    const cleanData = sanitizeData(orderData);
    
    // Validate critical fields
    if (!cleanData.userId) throw new Error('User ID is required');
    if (!cleanData.items || cleanData.items.length === 0) throw new Error('Order must have items');
    if (!cleanData.total) throw new Error('Order total is required');
    
    // Log cleaned data for debugging
    console.log('Creating order with data:', cleanData);
    
    // Use serverTimestamp for consistent ordering
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...cleanData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      status: cleanData.status || 'pending'
    });

    return { success: true, orderId: docRef.id, data: { id: docRef.id, ...cleanData } };
  } catch (error) {
    console.error('Create order error:', error);
    console.error('Failed order data:', orderData);
    return { success: false, error: error.message };
  }
};

// --- READ (Single) ---

export const getOrderById = async (orderId) => {
  try {
    if (!orderId) throw new Error('Order ID required');
    const orderDoc = await getDoc(doc(db, ORDERS_COLLECTION, orderId));
    if (!orderDoc.exists()) return { success: false, error: 'Order not found' };
    return { success: true, data: { id: orderDoc.id, ...orderDoc.data() } };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// --- REAL-TIME SUBSCRIPTIONS (The Core Logic) ---

/**
 * Admin: Listen to ALL orders
 */
export const subscribeToAllOrders = (onOrdersUpdate, onError) => {
  const q = query(collection(db, ORDERS_COLLECTION), orderBy('createdAt', 'desc'));

  return onSnapshot(q, 
    (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onOrdersUpdate(orders);
    },
    (error) => {
      console.error("🔥 Admin Sub Error:", error);
      if (onError) onError(error.message);
    }
  );
};

/**
 * User: Listen to MY orders
 * PREVENTS INFINITE LOOPS by handling Index errors
 */
export const subscribeToUserOrders = (userId, onOrdersUpdate, onError) => {
  if (!userId) return () => {};

  // IMPORTANT: This query requires a Firestore Index (userId + createdAt)
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const unsubscribe = onSnapshot(q, 
    (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      onOrdersUpdate(orders);
    },
    (error) => {
      // Catch Missing Index Error specifically
      if (error.code === 'failed-precondition') {
          console.error(`
          🛑 FIREBASE INDEX MISSING 🛑
          Please check your browser console. Firebase has generated a link.
          Click that link to automatically build the index for userId + createdAt.
          `);
      }
      console.error("User Sub Error:", error);
      if (onError) onError(error.message);
    }
  );

  return unsubscribe;
};

// --- UPDATE & DELETE ---

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, { status: newStatus, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateOrder = async (orderId, updates) => {
  try {
    const cleanUpdates = sanitizeData(updates);
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(orderRef, { ...cleanUpdates, updatedAt: serverTimestamp() });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// --- UTILS (Fetch Once) ---

export const getOrdersByUser = async (userId) => {
  try {
    const q = query(
      collection(db, ORDERS_COLLECTION), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return { success: true, data: snapshot.docs.map(d => ({ id: d.id, ...d.data() })) };
  } catch (error) {
    return { success: false, error: error.message, data: [] };
  }
};

export const getOrdersByStatus = async (status) => {
  try {
    const q = query(
        collection(db, ORDERS_COLLECTION), 
        where('status', '==', status), 
        orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return { success: true, data: snapshot.docs.map(d => ({ id: d.id, ...d.data() })) };
  } catch (error) {
    return { success: false, error: error.message, data: [] };
  }
};