import axios from 'axios';

const API_URL = 'http://localhost:5000/api/categories';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const categoryService = {
  getAllCategories: async (page = 1, limit = 10, search = '') => {
    const response = await axios.get(`${API_URL}`, {
      params: { page, limit, search },
      headers: getAuthHeader()
    });
    return response.data;
  },

  getCategory: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  createCategory: async (categoryData) => {
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('description', categoryData.description);
    if (categoryData.image) {
      formData.append('image', categoryData.image);
    }

    const response = await axios.post(API_URL, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  updateCategory: async (id, categoryData) => {
    const formData = new FormData();
    formData.append('name', categoryData.name);
    formData.append('description', categoryData.description);
    if (categoryData.image) {
      formData.append('image', categoryData.image);
    }

    const response = await axios.put(`${API_URL}/${id}`, formData, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};

export default categoryService; 