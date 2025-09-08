export const uploadFolder = async (data, id) => {
  try {
    const formData = new FormData();
    if (data.storeType) {
      formData.append('storeType', data.storeType);
    }
    if (data.file) {
      formData.append('file', data.file);
    }
    if (data.fileName) {
      formData.append('fileName', data.storeName);
    }
    if (data.path) {
      formData.append('path', data.path);
    }
    if (data.rootFolder) {
      formData.append('rootFolder', data.rootFolder);
    }
    const response = await fetch(`${import.meta.env.VITE_API_BASE}uploadFolders/${id}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network error during file upload");
    }

    const result = await response.json();
    console.log(result)
    if (result.success === true) {
      return result;
    } else {
      throw new Error(result.message || "File upload failed");
    }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};