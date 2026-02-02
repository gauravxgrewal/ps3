import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Modal = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info',
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
  actions = null,
  size = 'md', // sm, md, lg, xl
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  const typeConfig = {
    success: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    error: {
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
    },
    warning: {
      icon: AlertTriangle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
    },
    info: {
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
  };

  const config = typeConfig[type] || typeConfig.info;
  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={closeOnBackdrop ? onClose : undefined}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl ${sizeClasses[size]} w-full transform transition-all animate-slideUp`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-start justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              {Icon && (
                <div className={`${config.bgColor} ${config.borderColor} border-2 p-2 rounded-xl`}>
                  <Icon className={config.color} size={24} />
                </div>
              )}
              {title && (
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-500" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="p-6">
          {message && (
            <p className="text-gray-700 leading-relaxed">{message}</p>
          )}
          {children}
        </div>

        {/* Footer / Actions */}
        {actions && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

/**
 * Usage Examples:
 * 
 * <Modal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Success!"
 *   message="Your order has been placed."
 *   type="success"
 * />
 * 
 * <Modal
 *   isOpen={showModal}
 *   onClose={() => setShowModal(false)}
 *   title="Delete Item?"
 *   type="warning"
 *   actions={
 *     <>
 *       <button onClick={onClose}>Cancel</button>
 *       <button onClick={handleDelete}>Delete</button>
 *     </>
 *   }
 * >
 *   <p>Are you sure you want to delete this item?</p>
 * </Modal>
 */
