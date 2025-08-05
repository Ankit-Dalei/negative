import React from 'react';
import { FiActivity, FiServer, FiUsers, FiUpload } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">API Requests</p>
            <h3 className="text-2xl font-bold">1,248</h3>
          </div>
          <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
            <FiActivity size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Active Services</p>
            <h3 className="text-2xl font-bold">8</h3>
          </div>
          <div className="p-3 rounded-full bg-green-100 text-green-600">
            <FiServer size={20} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500">Team Members</p>
            <h3 className="text-2xl font-bold">12</h3>
          </div>
          <div className="p-3 rounded-full bg-purple-100 text-purple-600">
            <FiUsers size={20} />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'API call to payment service', time: '2 mins ago', icon: <FiActivity /> },
            { action: 'Database backup completed', time: '1 hour ago', icon: <FiServer /> },
            { action: 'New team member invited', time: '3 hours ago', icon: <FiUsers /> },
            { action: 'File upload to storage', time: '5 hours ago', icon: <FiUpload /> }
          ].map((item, i) => (
            <div key={i} className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 mr-3">
                {item.icon}
              </div>
              <div>
                <p>{item.action}</p>
                <p className="text-sm text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-medium mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {['New Project', 'Invite Team', 'Run Test', 'Deploy'].map((action, i) => (
            <button 
              key={i}
              className="p-3 border border-gray-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-100 transition-colors"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;