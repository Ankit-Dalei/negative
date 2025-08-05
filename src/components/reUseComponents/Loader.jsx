import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;