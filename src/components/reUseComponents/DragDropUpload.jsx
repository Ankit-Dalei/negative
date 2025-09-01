import { useState, useRef } from "react";
import { uploadFile } from "../../services/cloudService/uploadFileService";

const DragDropUpload = ({ onClose,setUploadhook,refresh,setRefresh }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null); 
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
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
  
    const uploadData = {
      storeType: "file",
      storeName: file.name,
      file: file
    };
    try {
      const id = localStorage.getItem('authToken');
      const result = await uploadFile(uploadData,id);
      if (result.success) {
        console.log("✅ Upload successfully!");
        setFile(null);
        setUploadhook(false);
        setRefresh(prev => !prev);
        onClose?.();
      }
    } catch (error) {
      console.log(error.message)

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
        {file
          ? file.name
          : dragActive
          ? "Drop your file here..."
          : "Drag & drop file here or click to upload"}
      </p>

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />

      {file && (
        <button
          onClick={handleUpload}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-500"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      )}
    </div>
  );
};

export default DragDropUpload;
