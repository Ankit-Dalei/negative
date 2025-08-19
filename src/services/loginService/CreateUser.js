export const CreateUserData = async (data) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE}Signdata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer YOUR_API_KEY_HERE'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create user');
    }

    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};