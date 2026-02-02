import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthDebugPanel = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user, loading } = useAuth();

  if (process.env.NODE_ENV === 'production') {
    return null; // Hide in production
  }

  const userState = {
    isLoading: loading,
    userExists: !!user,
    userObject: user ? {
      id: user.id,
      uid: user.uid,
      phone: user.phone,
      name: user.name,
      email: user.email,
      role: user.role,
    } : null,
    allUserKeys: user ? Object.keys(user) : [],
    localStorageUser: localStorage.getItem('ps3-user') ? JSON.parse(localStorage.getItem('ps3-user')) : null
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] max-w-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
      >
        <span>🔍 Auth Debug</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isExpanded && (
        <div className="mt-2 bg-white border-2 border-blue-600 rounded-lg p-4 shadow-2xl text-xs font-mono max-h-96 overflow-y-auto">
          <div className="space-y-3">
            <div>
              <div className="font-bold text-blue-700">Loading State</div>
              <div className={userState.isLoading ? 'text-orange-600 font-bold' : 'text-green-600'}>
                {userState.isLoading ? '⏳ Loading...' : '✅ Ready'}
              </div>
            </div>

            <div>
              <div className="font-bold text-blue-700">User Exists</div>
              <div className={userState.userExists ? 'text-green-600' : 'text-red-600 font-bold'}>
                {userState.userExists ? '✅ Yes' : '❌ No (NULL)'}
              </div>
            </div>

            {userState.userObject && (
              <div>
                <div className="font-bold text-blue-700">User Fields</div>
                <div className="bg-gray-100 p-2 rounded space-y-1 text-gray-800">
                  <div>
                    id: <span className={userState.userObject.id ? 'text-green-600 font-bold' : 'text-red-600'}>{userState.userObject.id || '❌ MISSING'}</span>
                  </div>
                  <div>
                    uid: <span className={userState.userObject.uid ? 'text-green-600 font-bold' : 'text-red-600'}>{userState.userObject.uid || '❌ MISSING'}</span>
                  </div>
                  <div>
                    phone: <span className={userState.userObject.phone ? 'text-green-600 font-bold' : 'text-red-600'}>{userState.userObject.phone || '❌ MISSING'}</span>
                  </div>
                  <div>
                    name: <span className={userState.userObject.name ? 'text-green-600' : 'text-gray-500'}>{userState.userObject.name || '(empty)'}</span>
                  </div>
                  <div>
                    role: <span className='text-blue-700'>{userState.userObject.role || '(none)'}</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <div className="font-bold text-blue-700">All User Keys</div>
              <div className="bg-gray-100 p-2 rounded text-gray-800">
                {userState.allUserKeys.length > 0 ? (
                  <div className="flex flex-wrap gap-1">
                    {userState.allUserKeys.map(key => (
                      <span key={key} className="bg-blue-100 px-2 py-1 rounded text-xs">
                        {key}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500">No user object</div>
                )}
              </div>
            </div>

            <div>
              <div className="font-bold text-blue-700 text-xs">LocalStorage</div>
              <div className="bg-gray-100 p-2 rounded text-gray-800 text-xs max-h-32 overflow-y-auto">
                {userState.localStorageUser ? (
                  <div className="space-y-1">
                    <div>✅ Data exists in localStorage</div>
                    <pre className="text-xs whitespace-pre-wrap break-words">
                      {JSON.stringify(userState.localStorageUser, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="text-red-600 font-bold">❌ No user data in localStorage</div>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                console.log('Current Auth State:', userState);
                alert('Auth state logged to console. Check browser console.');
              }}
              className="w-full bg-green-600 text-white py-1 rounded text-xs font-bold hover:bg-green-700 mt-2"
            >
              Log to Console
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthDebugPanel;
