import React from 'react';
import { FiCode, FiKey, FiPlus } from 'react-icons/fi';

const ApiManager = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">API Endpoints</h3>
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <FiPlus className="mr-2" /> New Endpoint
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              name: 'User Authentication', 
              method: 'POST', 
              endpoint: '/api/v1/auth/login',
              usage: '1,245 calls'
            },
            { 
              name: 'Get Products', 
              method: 'GET', 
              endpoint: '/api/v1/products',
              usage: '3,452 calls'
            },
            { 
              name: 'Create Order', 
              method: 'POST', 
              endpoint: '/api/v1/orders',
              usage: '856 calls'
            },
            { 
              name: 'Update Profile', 
              method: 'PUT', 
              endpoint: '/api/v1/users/profile',
              usage: '328 calls'
            },
            { 
              name: 'Delete Item', 
              method: 'DELETE', 
              endpoint: '/api/v1/items/:id',
              usage: '112 calls'
            }
          ].map((api, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{api.name}</h4>
                <span className={`px-2 py-1 text-xs rounded ${
                  api.method === 'GET' ? 'bg-blue-100 text-blue-800' :
                  api.method === 'POST' ? 'bg-green-100 text-green-800' :
                  api.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {api.method}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 font-mono">{api.endpoint}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{api.usage}</span>
                <button className="text-indigo-600 hover:text-indigo-800">
                  <FiKey />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-medium mb-6">API Keys</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Key</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { name: 'Frontend App', key: 'sk_live_***1234', created: '2 days ago', status: 'Active' },
                { name: 'Mobile App', key: 'sk_live_***5678', created: '1 week ago', status: 'Active' },
                { name: 'Backend Service', key: 'sk_live_***9012', created: '3 weeks ago', status: 'Revoked' }
              ].map((key, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{key.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">{key.key}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{key.created}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      key.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {key.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApiManager;