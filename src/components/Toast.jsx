import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

/**
 * Toast Notification Component
 * Light-weight alternative to alerts for quick messages
 */

const Toast = ({ 
  type = 'info', 
  message, 
  isVisible, 
  onClose, 
  duration = 3000,
  position = 'top-right' 
}) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      textColor: 'text-green-800',
      iconColor: 'text-green-600',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      textColor: 'text-red-800',
      iconColor: 'text-red-600',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-600',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-600',
    },
  };

  const style = config[type] || config.info;
  const Icon = style.icon;

  return (
    <div
      className={`fixed ${positions[position]} z-50 animate-slideInRight`}
      role="alert"
    >
      <div
        className={`
          ${style.bgColor} ${style.borderColor} ${style.textColor}
          border-l-4 rounded-xl shadow-lg p-4 min-w-[300px] max-w-md
          flex items-start gap-3
        `}
      >
        <Icon className={`${style.iconColor} flex-shrink-0 mt-0.5`} size={20} />
        <p className="flex-1 font-semibold text-sm leading-relaxed">{message}</p>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-black/10 rounded-lg transition-colors"
          aria-label="Close notification"
        >
          <X size={16} className={style.iconColor} />
        </button>
      </div>
    </div>
  );
};

export default Toast;

/**
 * Toast Hook for easy usage
 */
export const useToast = () => {
  const [toast, setToast] = React.useState({
    isVisible: false,
    type: 'info',
    message: '',
  });

  const showToast = (message, type = 'info', duration = 3000) => {
    setToast({ isVisible: true, type, message });
    
    if (duration > 0) {
      setTimeout(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
      }, duration);
    }
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const ToastComponent = () => (
    <Toast
      type={toast.type}
      message={toast.message}
      isVisible={toast.isVisible}
      onClose={hideToast}
    />
  );

  return {
    showToast,
    hideToast,
    ToastComponent,
    success: (msg, duration) => showToast(msg, 'success', duration),
    error: (msg, duration) => showToast(msg, 'error', duration),
    warning: (msg, duration) => showToast(msg, 'warning', duration),
    info: (msg, duration) => showToast(msg, 'info', duration),
  };
};

/**
 * Usage:
 * 
 * const toast = useToast();
 * 
 * <button onClick={() => toast.success('Order placed!')}>
 *   Place Order
 * </button>
 * 
 * {toast.ToastComponent()}
 */
