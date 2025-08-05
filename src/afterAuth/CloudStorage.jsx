import React from 'react';
import { FiFolder, FiFile, FiImage, FiMusic, FiVideo, FiDownload } from 'react-icons/fi';

const CloudStorage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-medium">Your Files</h3>
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FiDownload className="mr-2" /> Download
            </button>
            <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              <FiFolder className="mr-2" /> New Folder
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[
            { name: 'Documents', type: 'folder', items: 24, icon: <FiFolder size={24} className="text-blue-500" /> },
            { name: 'Images', type: 'folder', items: 156, icon: <FiImage size={24} className="text-green-500" /> },
            { name: 'Project Files', type: 'folder', items: 42, icon: <FiFolder size={24} className="text-yellow-500" /> },
            { name: 'report.pdf', type: 'file', size: '2.4 MB', icon: <FiFile size={24} className="text-gray-500" /> },
            { name: 'presentation.pptx', type: 'file', size: '5.7 MB', icon: <FiFile size={24} className="text-red-500" /> },
            { name: 'profile.jpg', type: 'file', size: '1.2 MB', icon: <FiImage size={24} className="text-purple-500" /> },
            { name: 'Music', type: 'folder', items: 89, icon: <FiMusic size={24} className="text-pink-500" /> },
            { name: 'tutorial.mp4', type: 'file', size: '45.8 MB', icon: <FiVideo size={24} className="text-indigo-500" /> }
          ].map((file, i) => (
            <div 
              key={i} 
              className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors cursor-pointer"
            >
              <div className="flex justify-center mb-3">
                {file.icon}
              </div>
              <h4 className="font-medium text-center truncate">{file.name}</h4>
              <p className="text-xs text-gray-500 text-center mt-1">
                {file.type === 'folder' ? `${file.items} items` : file.size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="font-medium mb-6">Storage Usage</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>Total Storage</span>
              <span>15 GB / 100 GB</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { type: 'Documents', usage: '4.2 GB', color: 'bg-blue-500' },
              { type: 'Images', usage: '6.8 GB', color: 'bg-green-500' },
              { type: 'Videos', usage: '2.5 GB', color: 'bg-indigo-500' },
              { type: 'Other', usage: '1.5 GB', color: 'bg-gray-500' }
            ].map((item, i) => (
              <div key={i} className="p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className={`w-3 h-3 rounded-full ${item.color} mr-2`}></div>
                  <span className="text-sm">{item.type}</span>
                </div>
                <span className="text-sm text-gray-500">{item.usage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CloudStorage;