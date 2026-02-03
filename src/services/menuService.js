import { db } from '../config/firebase';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';

const MENU_COLLECTION = 'menuItems';

/**
 * One-time fetch of all menu items from Firestore.
 */
export const getAllMenuItemsFromDb = async () => {
  try {
    const snapshot = await getDocs(
      collection(db, MENU_COLLECTION),
    );
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    console.error('getAllMenuItemsFromDb error:', error);
    throw error;
  }
};

/**
 * Real-time subscription to all menu items.
 * The caller can decide how to group items by category on the client.
 */
export const subscribeToMenu = (onUpdate, onError) => {
  const col = collection(db, MENU_COLLECTION);
  const q = query(col, orderBy('name', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      onUpdate(items);
    },
    (error) => {
      console.error('subscribeToMenu error:', error);
      if (onError) onError(error);
    },
  );
};

/**
 * Create or overwrite a single menu item.
 */
export const upsertMenuItem = async (id, data) => {
  const ref = doc(db, MENU_COLLECTION, id);
  await setDoc(ref, data, { merge: true });
  return { success: true };
};

export const updateMenuItem = async (id, updates) => {
  const ref = doc(db, MENU_COLLECTION, id);
  await updateDoc(ref, updates);
  return { success: true };
};

export const deleteMenuItem = async (id) => {
  const ref = doc(db, MENU_COLLECTION, id);
  await deleteDoc(ref);
  return { success: true };
};

