import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const authService = {
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      return null;
    }
  },

  requestPasswordReset: async (email) => {
    const response = await axios.post(`${API_URL}/request-password-reset`, { email });
    return response.data;
  },

  resetPassword: async (token, newPassword) => {
    const response = await axios.post(`${API_URL}/reset-password`, {
      token,
      newPassword
    });
    return response.data;
  }
};

export default authService; 