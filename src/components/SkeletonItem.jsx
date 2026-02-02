import React from 'react';

const SkeletonItem = () => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
    <div className="h-44 bg-gray-200"></div>
    <div className="p-5 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-10 bg-gray-200 rounded-xl w-full mt-4"></div>
    </div>
  </div>
);

export default SkeletonItem;