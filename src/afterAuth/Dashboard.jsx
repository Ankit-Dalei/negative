import { useEffect, useState, useRef } from 'react';
import { 
  FiFolder, FiFile, FiImage, FiUpload, FiPlus,
  FiStar, FiMoreVertical, FiDownload, FiShare2,
  FiTrash2, FiSearch, FiClock, FiGrid, FiList, FiGitBranch
} from 'react-icons/fi';
import { CloudDataFetch } from '../services/cloudService/CloudDataFetch';
import DragDropUpload from '../components/reUseComponents/DragDropUpload';
import DeleteFile from '../services/cloudService/DeleteFile';
import { downloadZip } from '../services/cloudService/DownloadFile';
import { getDownloadLink } from '../services/cloudService/ShareFile';

const DarkDrive = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showNewMenu, setShowNewMenu] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploadhook, setUploadhook] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem('authToken');
        const response = await CloudDataFetch(id);

        if (Array.isArray(response)) {
          const foldersData = response.filter(item => item.storeType === "Folder");
          const filesData = response.filter(item => item.storeType !== "Folder");
          setFolders(foldersData);
          setFiles(filesData);
        } else {
          console.warn("Unexpected response format:", response);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, [refresh]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowNewMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSelect = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const uploadFile=(e)=>{
    // console.log(e)
    setUploadhook(true)
    setShowNewMenu(false)
  }

  const handelDelete = async () => {
    try {
      const id = localStorage.getItem("authToken");
  
      if (!id) {
        console.error("No auth token found in localStorage");
        return;
      }
  
      if (!selectedItems || selectedItems.length === 0) {
        console.warn("No items selected for deletion");
        return;
      }
  
      const response = await DeleteFile(selectedItems, id);
  
      if (response.success) {
        console.log("✅ Deleted:", response.deleted);
        setRefresh((prev) => !prev);
        setSelectedItems([])
      } else {
        console.error("❌ Delete failed:", response.message);
      }
    } catch (error) {
      console.error("Error deleting files:", error.message || error);
    }
  };

  const handelDownloads= async () => {
     try {
      const id = localStorage.getItem("authToken");
  
      if (!id) {
        console.error("No auth token found in localStorage");
        return;
      }
  
      if (!selectedItems || selectedItems.length === 0) {
        console.warn("No items selected for deletion");
        return;
      }
  
      const response = await downloadZip(selectedItems, id);

      if (response.status==200) {
        setSelectedItems([])
      } else {
        console.error("❌ Download Failed", response);
      }
    } catch (error) {
      console.error("Error downloading files:", error.message || error);
    }
  }



  const handleShare = async () => {
    try {
      const id = localStorage.getItem("authToken");

      if (!id) {
        console.error("No auth token found in localStorage");
        return;
      }

      if (!selectedItems || selectedItems.length === 0) {
        console.warn("No items selected for sharing");
        return;
      }

      const url = await getDownloadLink(selectedItems, id);
      if (!url) return;

      setShareUrl(url);
      setPopupOpen(true); // open popup
    } catch (err) {
      console.error("❌ Error sharing:", err);
    }
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("✅ Link copied to clipboard!");
    });
  };


  const handelClose=()=>{
    setPopupOpen(false)
    setSelectedItems([])
  }



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
          
          {/* New Button with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowNewMenu(!showNewMenu)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FiPlus size={18} />
              <span>New</span>
            </button>

            {showNewMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                <button 
                  onClick={() => { setShowNewMenu(false); alert('Create Folder clicked'); }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                >
                  <FiFolder /> Create Folder
                </button>
                <button 
                  onClick={() => {uploadFile("file")}}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                >
                  <FiUpload /> Upload File
                </button>
                <button 
                  onClick={() => { setShowNewMenu(false); alert('Git Clone clicked'); }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 w-full text-left"
                >
                  <FiGitBranch /> Git Clone
                </button>
              </div>
            )}
          </div>
          
          {/* <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 px-4 py-2 rounded-lg transition-colors">
            <FiUpload size={18} />
            <span>Upload</span>
          </button>*/}
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
          <button className="text-gray-300 hover:text-indigo-400 p-2" onClick={handelDownloads}>
            <FiDownload size={18} />
          </button>
          <button className="text-gray-300 hover:text-indigo-400 p-2" onClick={handleShare}>
            <FiShare2 size={18} />
          </button>
          <button className="text-gray-300 hover:text-red-400 p-2" onClick={handelDelete}>
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
                onClick={() => toggleSelect(folder.id)}
                className={`p-4 rounded-xl border ${selectedItems.includes(folder.id) ? 'border-indigo-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'} bg-gray-800/50 hover:bg-gray-800/80 transition-all cursor-pointer`}
              >
                <div className="flex justify-between items-start">
                  <FiFolder className="text-indigo-400 text-2xl" />
                  <button 
                    onClick={(e) => toggleStar(folder.id, e)}
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
                onClick={() => toggleSelect(folder.id)}
                className={`flex items-center p-4 hover:bg-gray-800/50 ${selectedItems.includes(folder.id) ? 'bg-gray-800' : ''} border-b border-gray-700 last:border-b-0 cursor-pointer`}
              >
                <FiFolder className="text-indigo-400 text-xl mr-4" />
                <div className="flex-grow">
                  <h3 className="font-medium">{folder.storeName}</h3>
                  <p className="text-sm text-gray-400">my drive</p>
                </div>
                <button 
                  onClick={(e) => toggleStar(folder.id, e)}
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
                onClick={() => toggleSelect(file.id)}
                className={`p-4 rounded-xl border ${selectedItems.includes(file.id) ? 'border-indigo-500 bg-gray-800' : 'border-gray-700 hover:border-gray-600'} bg-gray-800/50 hover:bg-gray-800/80 transition-all cursor-pointer`}
              >
                <div className="flex justify-between items-start">
                  <FiFile className="text-indigo-400 text-2xl" />
                  <button 
                    onClick={(e) => toggleStar(file.id, e)}
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
                onClick={() => toggleSelect(file.id)}
                className={`flex items-center p-4 hover:bg-gray-800/50 ${selectedItems.includes(file.id) ? 'bg-gray-800' : ''} border-b border-gray-700 last:border-b-0 cursor-pointer`}
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
      {popupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center">
            <h2 className="text-lg font-semibold mb-4 text-black ">Share Link</h2>
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="w-full p-2 border rounded mb-4 border-blue-600 text-blue-400"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCopy}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Copy
              </button>
              <button
                onClick={handelClose}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {uploadhook?<DragDropUpload setUploadhook={setUploadhook} setRefresh={setRefresh}/>:''}
    </div>
  );
};

export default DarkDrive;