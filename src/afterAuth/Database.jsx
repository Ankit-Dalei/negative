import React from 'react';
import { FiDatabase, FiPlus, FiSearch } from 'react-icons/fi';

const Database = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">Database Collections</h3>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <FiPlus className="mr-2" /> New Collection
          </button>
        </div>
        
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Search collections..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'users', documents: '1,248', size: '45 MB', modified: '2 hours ago' },
                { name: 'products', documents: '856', size: '32 MB', modified: '5 hours ago' },
                { name: 'orders', documents: '3,452', size: '128 MB', modified: '1 day ago' },
                { name: 'logs', documents: '12,845', size: '512 MB', modified: '2 days ago' }
              ].map((collection, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                        <FiDatabase />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{collection.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collection.documents}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collection.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{collection.modified}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Database;