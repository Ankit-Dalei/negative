import React from 'react';
import { FiBarChart2, FiTrendingUp, FiDownload } from 'react-icons/fi';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">API Usage Analytics</h3>
          <button className="flex items-center text-sm text-indigo-600">
            <FiDownload className="mr-2" /> Export
          </button>
        </div>
        <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <FiBarChart2 size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">API usage charts will appear here</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-medium mb-6">Response Times</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FiTrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Response time metrics</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="font-medium mb-6">Error Rates</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <FiTrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Error rate metrics</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;