import React from 'react';
import { ShoppingBag, Search, Package, AlertCircle } from 'lucide-react';
import Button from './Button';

/**
 * EmptyState Component - Beautiful empty state illustrations
 * Used when: no orders, no search results, no cart items, etc.
 */
const EmptyState = ({ 
  icon = ShoppingBag,
  title = 'Nothing here',
  description = 'Start by adding something',
  actionLabel = null,
  onAction = null,
  type = 'empty' // 'empty', 'error', 'search'
}) => {
  const configs = {
    empty: {
      bgGradient: 'from-orange-50 to-red-50',
      icon: ShoppingBag,
      iconColor: 'text-orange-600'
    },
    error: {
      bgGradient: 'from-red-50 to-pink-50',
      icon: AlertCircle,
      iconColor: 'text-red-600'
    },
    search: {
      bgGradient: 'from-blue-50 to-purple-50',
      icon: Search,
      iconColor: 'text-blue-600'
    }
  };

  const config = configs[type] || configs.empty;
  const Icon = config.icon;

  return (
    <div className={`flex flex-col items-center justify-center py-16 px-6 text-center bg-gradient-to-br ${config.bgGradient} rounded-3xl`}>
      <div className="w-24 h-24 flex items-center justify-center mb-6">
        <Icon size={48} className={config.iconColor} strokeWidth={1.5} />
      </div>
      <h3 className="text-2xl font-black text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button 
          onClick={onAction} 
          variant="primary" 
          className="rounded-full"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
