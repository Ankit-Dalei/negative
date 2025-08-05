import { base_url } from "../Apis/ApiKeys";

// src/services/loginService/GetUser.js
export const GetUser = async (loginData) => {
  try {
    const response = await fetch(base_url+`Logindata`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};