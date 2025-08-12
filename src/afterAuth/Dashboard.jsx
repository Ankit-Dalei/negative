import { useEffect, useState } from 'react';
import { 
  FiFolder, 
  FiFile, 
  FiImage, 
  FiUpload, 
  FiPlus,
  FiStar,
  FiMoreVertical,
  FiDownload,
  FiShare2,
  FiTrash2,
  FiSearch,
  FiClock,
  FiGrid,
  FiList
} from 'react-icons/fi';
import { CloudDataFetch } from '../services/cloudService/CloudDataFetch';

const DarkDrive = () => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const id = localStorage.getItem('authToken');
      const response = await CloudDataFetch(id);

      if (Array.isArray(response)) {
        // Separate folders and files
        const foldersData = response.filter(item => item.storeType === "Folder");
        const filesData = response.filter(item => item.storeType !== "Folder");
        setFolders(foldersData);
        setFiles(filesData); // make sure you have setFiles state
      } else {
        console.warn("Unexpected response format:", response);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
  }, []);


  // useEffect(()=>{
  // },[files])

  // Sample data
  // const folders = [
  //   { id: 1, name: 'teralogic', location: 'My Drive', starred: true },
  //   { id: 2, name: 'resume', location: 'My Drive', starred: false },
  //   { id: 3, name: 'angular', location: 'My Drive', starred: true },
  //   { id: 4, name: 'Personal', location: 'My Drive', starred: false },
  // ];

  // const files = [
  //   { id: 5, name: 'newResume.pdf', author: 'ANKIT DALEI', modified: 'Jul 16, 2025', opened: 'Jul 26, 2025', starred: true },
  //   { id: 6, name: 'Adresume.pdf', author: 'ANKIT DALEI', modified: 'Dec 27, 2024', opened: 'May 11, 2025', starred: false },
  //   { id: 7, name: 'Screenshot_2023-08-07-00-0.png', modified: 'Aug 7, 2023', opened: 'Sep 1, 2023', starred: false },
  //   { id: 8, name: 'Screenshot_2023-02-21-00-5.png', modified: 'Feb 21, 2023', opened: 'Mar 15, 2023', starred: false },
  //   { id: 9, name: 'Angular 18.rar', modified: 'Jan 5, 2024', opened: 'Feb 10, 2024', starred: true },
  // ];

  const toggleStar = (id, e) => {
    e.stopPropagation();
    // In a real app, update the starred status
    console.log(`Toggled star for item ${id}`);
  };

  const toggleSelect = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // const createNewFolder = () => {
  //   if (newFolderName.trim()) {
  //     // In a real app, add to folders array
  //     console.log(`Created new folder: ${newFolderName}`);
  //     setNewFolderName('');
  //     setShowNewFolderModal(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-indigo-400">Nebula Drive</h1>
          <p className="text-gray-400">Your files are stored securely in the cloud</p>
        </div>
        
        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search in Drive"
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 w-full"
            />
          </div>
          
          <button 
            onClick={() => setShowNewFolderModal(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <FiPlus size={18} />
            <span>New</span>
          </button>
          
          <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 px-4 py-2 rounded-lg transition-colors">
            <FiUpload size={18} />
            <span>Upload</span>
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-end mb-4">
        <div className="inline-flex bg-gray-800 rounded-lg p-1">
          <button 
            onClick={() => setViewMode('grid')} 
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-gray-700 text-indigo-400' : 'text-gray-400'}`}
          >
            <FiGrid size={20} />
          </button>
          <button 
            onClick={() => setViewMode('list')} 
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-gray-700 text-indigo-400' : 'text-gray-400'}`}
          >
            <FiList size={20} />
          </button>
        </div>
      </div>

      {/* Selected Items Toolbar */}
      {selectedItems.length > 0 && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 mb-4 flex items-center gap-4">
          <span className="text-gray-300">{selectedItems.length} selected</span>
          <button className="text-gray-300 hover:text-indigo-400 p-2">
            <FiDownload size={18} />
          </button>
          <button className="text-gray-300 hover:text-indigo-400 p-2">
            <FiShare2 size={18} />
          </button>
          <button className="text-gray-300 hover:text-red-400 p-2">
            <FiTrash2 size={18} />
          </button>
        </div>
      )}

      {/* Suggested Folders */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FiFolder className="text-indigo-400" />
          <span>Suggested Folders</span>
        </h2>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {folders.map(folder => (
              <div 
                key={folder._id}
                onClick={() => toggleSelect(folder._id)}
                className={`p-4 rounded-xl border ${selectedItems.includes(folder._id) ? 'border-indigo-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'} bg-gray-800/50 hover:bg-gray-800/80 transition-all cursor-pointer`}
              >
                <div className="flex justify-between items-start">
                  <FiFolder className="text-indigo-400 text-2xl" />
                  <button 
                    onClick={(e) => toggleStar(folder._id, e)}
                    className={`${folder.starred ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}
                  >
                    <FiStar size={16} />
                  </button>
                </div>
                <h3 className="font-medium mt-2 truncate">{folder.storeName}</h3>
                <p className="text-xs text-gray-400 mt-1 truncate">my drive</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            {folders.map(folder => (
              <div 
                key={folder._id}
                onClick={() => toggleSelect(folder._id)}
                className={`flex items-center p-4 hover:bg-gray-800/50 ${selectedItems.includes(folder._id) ? 'bg-gray-800' : ''} border-b border-gray-700 last:border-b-0 cursor-pointer`}
              >
                <FiFolder className="text-indigo-400 text-xl mr-4" />
                <div className="flex-grow">
                  <h3 className="font-medium">{folder.storeName}</h3>
                  <p className="text-sm text-gray-400">my drive</p>
                </div>
                <button 
                  onClick={(e) => toggleStar(folder._id, e)}
                  className={`ml-4 ${folder.starred ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}
                >
                  <FiStar size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Suggested Files */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FiFile className="text-indigo-400" />
          <span>Suggested Files</span>
        </h2>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {files.map(file => (
              <div 
                key={file._id}
                onClick={() => toggleSelect(file._id)}
                className={`p-4 rounded-xl border ${selectedItems.includes(file._id) ? 'border-indigo-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'} bg-gray-800/50 hover:bg-gray-800/80 transition-all cursor-pointer`}
              >
                <div className="flex justify-between items-start">
                  <FiFile className="text-indigo-400 text-2xl" />
                  <button 
                    onClick={(e) => toggleStar(file._id, e)}
                    className={`${file.starred ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}
                  >
                    <FiStar size={16} />
                  </button>
                </div>
                <h3 className="font-medium mt-2 truncate">{file.storeName}</h3>
                <div className="flex items-center text-xs text-gray-400 mt-1">
                  <FiClock className="mr-1" />
                  <span>{file.createdAt}</span>
                </div>
                {/* {file.author && <p className="text-xs text-gray-400 mt-1 truncate">by {file.author}</p>} */}
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-gray-700 rounded-lg overflow-hidden">
            {files.map(file => (
              <div 
                key={file._id}
                onClick={() => toggleSelect(file._id)}
                className={`flex items-center p-4 hover:bg-gray-800/50 ${selectedItems.includes(file._id) ? 'bg-gray-800' : ''} border-b border-gray-700 last:border-b-0 cursor-pointer`}
              >
                <FiFile className="text-indigo-400 text-xl mr-4" />
                <div className="flex-grow">
                  <h3 className="font-medium">{file.storeName}</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                    {/* {file.author && <p className="text-sm text-gray-400">by {file.author}</p>} */}
                    <p className="text-sm text-gray-400 flex items-center">
                      <FiClock className="mr-1" /> Modified {file.createdAt}
                    </p>
                    {/* <p className="text-sm text-gray-400">Opened {file.opened}</p> */}
                  </div>
                </div>
                <button 
                  onClick={(e) => toggleStar(file.id, e)}
                  className={`ml-4 ${file.starred ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-400'}`}
                >
                  <FiStar size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Folder Modal */}
      {/* {showNewFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Create New Folder</h3>
                <button 
                  onClick={() => setShowNewFolderModal(false)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <FiX size={24} />
                </button>
              </div>
              
              <div className="mb-6">
                <label htmlFor="folderName" className="block text-sm font-medium text-gray-300 mb-2">
                  Folder Name
                </label>
                <input
                  type="text"
                  id="folderName"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  autoFocus
                />
              </div>
              
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setShowNewFolderModal(false)}
                  className="px-4 py-2 border border-gray-600 text-gray-200 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={createNewFolder}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default DarkDrive;