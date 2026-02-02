/**
 * Debug Helper - Shows current user state for testing
 * Usage: Add <UserDebug /> to any page temporarily
 */
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const UserDebug = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-4 bg-blue-100 text-blue-900 text-sm rounded">Loading user...</div>;

  if (!user) {
    return <div className="p-4 bg-yellow-100 text-yellow-900 text-sm rounded">❌ No user logged in</div>;
  }

  return (
    <div className="p-4 bg-green-100 text-green-900 text-xs rounded font-mono space-y-1">
      <div>✅ User logged in</div>
      <div>id: {user.id || 'MISSING'}</div>
      <div>uid: {user.uid || 'MISSING'}</div>
      <div>phone: {user.phone || 'MISSING'}</div>
      <div>name: {user.name || 'N/A'}</div>
      <div>role: {user.role || 'MISSING'}</div>
    </div>
  );
};

export default UserDebug;
