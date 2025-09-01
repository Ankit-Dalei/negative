import React from "react";

const DeleteFile = async (keys, id) => {
  try {
    // keys is an array of file keys
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE}DeleteFile/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(keys),
      }
    );

    if (!response.ok) {
      throw new Error("Network error during file delete");
    }

    const result = await response.json();

    if (result.success === true) {
      return result;
    } else {
      throw new Error(result.message || "File Delete failed");
    }
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};

export default DeleteFile;
