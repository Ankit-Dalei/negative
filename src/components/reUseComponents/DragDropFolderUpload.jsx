import { useState, useRef } from "react";
import { uploadFolder } from "../../services/cloudService/UploadFolderService";

const DragDropFolderUpload = ({ onClose, setUploadFolderhook, refresh, setRefresh }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.items) {
      const folderFiles = [];
      const processItems = [];
      
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        const item = e.dataTransfer.items[i].webkitGetAsEntry();
        if (item && item.isDirectory) {
          processItems.push(readDirectory(item, folderFiles));
        } else if (e.dataTransfer.items[i].getAsFile()) {
          folderFiles.push(e.dataTransfer.items[i].getAsFile());
        }
      }
      
      // Wait for all directories to be processed
      Promise.all(processItems).then(() => {
        setFiles(folderFiles);
      });
    } else if (e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const readDirectory = (entry, collectedFiles) => {
    return new Promise((resolve) => {
      const reader = entry.createReader();
      const readEntries = [];
      
      reader.readEntries((entries) => {
        const processEntries = [];
        
        entries.forEach((entry) => {
          if (entry.isFile) {
            readEntries.push(new Promise((fileResolve) => {
              entry.file((file) => {
                // Preserve the folder structure by adding webkitRelativePath
                file.webkitRelativePath = entry.fullPath;
                collectedFiles.push(file);
                fileResolve();
              });
            }));
          } else if (entry.isDirectory) {
            processEntries.push(readDirectory(entry, collectedFiles));
          }
        });
        
        // Wait for all files and subdirectories to be processed
        Promise.all([...readEntries, ...processEntries]).then(() => {
          resolve();
        });
      });
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setLoading(true);
  
    try {
      const id = localStorage.getItem("authToken");
  
      for (const file of files) {
        const fullPath = file.webkitRelativePath;
        const pathParts = fullPath.split('/');
        const rootFolder = pathParts[0];
        
        // Get the path excluding the root folder (including the filename)
        const pathExcludingRoot = pathParts.slice(1).join('/');
  
        const uploadData = {
          storeType: "Folder",
          rootFolder: rootFolder, // Root folder name
          path: pathExcludingRoot, // Path excluding root folder including filename
          storeName: file.name, // File name only
          file: file,
        };
        
        await uploadFolder(uploadData, id);
      }
  
      console.log("✅ All files uploaded successfully!");
      setFiles([]);
      setUploadFolderhook(false);
      setRefresh((prev) => !prev);
      onClose?.();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-lg p-8 text-center transition absolute 
        left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-800
        ${dragActive ? "border-indigo-500 bg-gray-700" : "border-gray-500"}
      `}
    >
      <p
        className="text-gray-300 select-none cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      >
        {files.length > 0
          ? `${files.length} files selected`
          : dragActive
          ? "Drop your folder here..."
          : "Drag & drop folder here or click to upload"}
      </p>

      <input
        ref={fileInputRef}
        type="file"
        webkitdirectory="true" // allow folder selection
        directory=""
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-500"
        >
          {loading ? "Uploading..." : "Upload Folder"}
        </button>
      )}
    </div>
  );
};

export default DragDropFolderUpload;