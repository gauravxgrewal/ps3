import React, { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

const InstallPWA = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      
      // Don't show if already dismissed
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000); // Show after 3 seconds
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setInstallPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  if (!showPrompt || !installPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 md:p-5">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Dismiss install prompt"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-start gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <img src="/logo.png" alt="PS3 Logo" className="w-10 h-10 rounded-lg" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
            <span className="text-2xl" style={{ display: 'none' }}>🍕</span>
          </div>
          <div className="flex-1">
            <h3 className="font-black text-gray-900 text-sm md:text-base mb-1">
              Install PS3 FastFood
            </h3>
            <p className="text-xs md:text-sm text-gray-600">
              Install our app for faster access and offline browsing!
            </p>
          </div>
        </div>
        
        <button
          onClick={handleInstall}
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Download size={18} />
          <span>Install App</span>
        </button>
      </div>
    </div>
  );
};

export default InstallPWA;