import axios from 'axios';

axios.defaults.withCredentials = true; // Enable cookies for authentication

// Use localhost for development
const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL

// Signup API
export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login API
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
      withCredentials: true, // Important for handling cookies
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout API
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/logout`, {}, {
      withCredentials: true, // Important for handling cookies
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Fetch user profile API
export const fetchProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/profile`, {
      withCredentials: true, // Important for handling cookies
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Verify email OTP API
export const verifyOTP = async ({ otp, token }) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/verify-email-otp`,
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the header
        },
        withCredentials: true, // Important for handling cookies
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Forgot Password API
export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Reset Password API
export const resetPassword = async ({ token, newPassword }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { newPassword });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Save Measurements API
export const saveMeasurements = async (measurements) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/save-measurements`,
      measurements,
      {
        withCredentials: true, // Important for handling cookies
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Select Event API
export const selectEvent = async (eventType) => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/select-event`,
      { eventType },
      {
        withCredentials: true, // Important for handling cookies
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Recommendations API
export const getRecommendations = async () => {
  try {
    const response = await axios.get(`${API_URL}/auth/recommendations`, {
      withCredentials: true, // Important for handling cookies
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};