export const downloadZip = async (keys, id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE}DownloadFile/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(keys),
    });

    if (!response.ok) {
      throw new Error("❌ Failed to download");
    }
    // Convert response to Blob
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create hidden download link
    const a = document.createElement("a");
    a.href = url;
    a.download = "files.zip"; // filename for the zip
    document.body.appendChild(a);
    a.click();

    // Cleanup
    a.remove();
    window.URL.revokeObjectURL(url);
    return response
  } catch (error) {
    console.error("Download failed:", error);
  }
};
