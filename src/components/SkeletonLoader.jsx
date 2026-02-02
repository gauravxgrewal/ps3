import React from 'react';

/**
 * SkeletonLoader Component - Shimmer loading skeleton
 * Shows placeholder while content loads
 */
const SkeletonLoader = ({ 
  type = 'card', // 'card', 'order', 'text-line', 'full-page'
  count = 1 
}) => {
  const renderCardSkeleton = () => (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-40 md:h-52 bg-gradient-to-r from-gray-200 to-gray-100"></div>
      <div className="p-4 md:p-5 space-y-3">
        <div className="h-4 bg-gray-200 rounded-lg w-3/4"></div>
        <div className="h-3 bg-gray-100 rounded-lg w-full"></div>
        <div className="h-3 bg-gray-100 rounded-lg w-2/3"></div>
        <div className="h-10 bg-gradient-to-r from-orange-200 to-red-100 rounded-lg mt-4"></div>
      </div>
    </div>
  );

  const renderOrderSkeleton = () => (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 animate-pulse space-y-3">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-gray-200 rounded w-24"></div>
        <div className="h-6 bg-gray-200 rounded w-20"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded w-full"></div>
        <div className="h-3 bg-gray-100 rounded w-4/5"></div>
      </div>
      <div className="h-8 bg-gradient-to-r from-orange-200 to-red-100 rounded-lg"></div>
    </div>
  );

  const renderTextLineSkeleton = () => (
    <div className="space-y-3 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-100 rounded w-5/6"></div>
      <div className="h-4 bg-gray-100 rounded w-4/5"></div>
    </div>
  );

  const renderFullPageSkeleton = () => (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      <div className="h-20 bg-white border-b border-gray-200"></div>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-100 rounded"></div>
            <div className="h-3 bg-gray-100 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    </div>
  );

  let renderSkeleton;
  switch (type) {
    case 'card':
      renderSkeleton = renderCardSkeleton;
      break;
    case 'order':
      renderSkeleton = renderOrderSkeleton;
      break;
    case 'text-line':
      renderSkeleton = renderTextLineSkeleton;
      break;
    case 'full-page':
      renderSkeleton = renderFullPageSkeleton;
      break;
    default:
      renderSkeleton = renderCardSkeleton;
  }

  if (type === 'full-page') {
    return renderSkeleton();
  }

  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          {renderSkeleton()}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
