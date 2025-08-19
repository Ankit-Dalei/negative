// services/uploadService.js
export const uploadFile = async (data,id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE}uploadFiles/${id}`, {
      method: "POST",
      body: data,
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
