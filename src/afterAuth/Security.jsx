import React from 'react';
import { FiShield, FiLock, FiUserCheck, FiAlertTriangle } from 'react-icons/fi';

const Security = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-medium mb-6">Security Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
                <FiShield />
              </div>
              <h4 className="font-medium">Security Score</h4>
            </div>
            <div className="text-3xl font-bold text-green-600">92%</div>
            <p className="text-sm text-gray-500 mt-1">Excellent</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
                <FiLock />
              </div>
              <h4 className="font-medium">2FA Status</h4>
            </div>
            <div className="text-3xl font-bold text-blue-600">Enabled</div>
            <p className="text-sm text-gray-500 mt-1">Active</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-3">
                <FiUserCheck />
              </div>
              <h4 className="font-medium">Active Sessions</h4>
            </div>
            <div className="text-3xl font-bold text-purple-600">3</div>
            <p className="text-sm text-gray-500 mt-1">Current devices</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 mr-3">
                <FiAlertTriangle />
              </div>
              <h4 className="font-medium">Security Alerts</h4>
            </div>
            <div className="text-3xl font-bold text-yellow-600">1</div>
            <p className="text-sm text-gray-500 mt-1">Needs attention</p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Recent Security Events</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { 
                    event: 'Login', 
                    ip: '192.168.1.1', 
                    location: 'New York, US', 
                    time: '2 minutes ago', 
                    status: 'Success' 
                  },
                  { 
                    event: 'Failed Login', 
                    ip: '45.67.89.123', 
                    location: 'London, UK', 
                    time: '1 hour ago', 
                    status: 'Failed' 
                  },
                  { 
                    event: 'Password Changed', 
                    ip: '192.168.1.1', 
                    location: 'New York, US', 
                    time: '3 days ago', 
                    status: 'Success' 
                  },
                  { 
                    event: 'New Device', 
                    ip: '172.56.34.78', 
                    location: 'Tokyo, Japan', 
                    time: '1 week ago', 
                    status: 'Success' 
                  }
                ].map((event, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.event}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{event.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        event.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-medium mb-6">Security Recommendations</h3>
        <div className="space-y-4">
          {[
            { 
              title: 'Enable Two-Factor Authentication', 
              description: 'Add an extra layer of security to your account',
              action: 'Enable',
              completed: true
            },
            { 
              title: 'Change Password Regularly', 
              description: 'Last changed 6 months ago',
              action: 'Change',
              completed: false
            },
            { 
              title: 'Review Active Sessions', 
              description: '3 active sessions, 1 unrecognized device',
              action: 'Review',
              completed: false
            }
          ].map((rec, i) => (
            <div key={i} className="flex items-start p-4 border border-gray-200 rounded-lg">
              <div className={`p-2 rounded-full mr-4 ${
                rec.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
              }`}>
                <FiShield />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{rec.title}</h4>
                <p className="text-sm text-gray-500">{rec.description}</p>
              </div>
              <button className={`px-4 py-2 rounded-lg text-sm ${
                rec.completed ? 'bg-gray-100 text-gray-600' : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}>
                {rec.completed ? 'Completed' : rec.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Security;