export const CloudDataFetch = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE}getMainCloudTable/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('CloudDataFetch error:', error);
    return null;
  }
};
