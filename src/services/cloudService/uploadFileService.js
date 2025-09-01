export const uploadFile = async (data, id) => {
  try {
    const formData = new FormData();
    
    // Assuming data contains { file: FileObject, fileName: string }
    if (data.file) {
      formData.append('file', data.file);
    }
    if (data.fileName) {
      formData.append('fileName', data.fileName);
    }
    const response = await fetch(`${import.meta.env.VITE_API_BASE}uploadFiles/${id}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network error during file upload");
    }

    const result = await response.json();

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