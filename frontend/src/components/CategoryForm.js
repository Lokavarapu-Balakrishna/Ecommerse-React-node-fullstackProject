import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import categoryService from '../services/categoryService';

const CategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if (id) {
      fetchCategory();
    }
  }, [id]);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const category = await categoryService.getCategory(id);
      setFormData({
        name: category.name,
        description: category.description || '',
        image: null
      });
      setPreviewImage(category.image);
    } catch (error) {
      showNotification(error.message, 'error');
      navigate('/categories');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (id) {
        await categoryService.updateCategory(id, formData);
        showNotification('Category updated successfully');
      } else {
        await categoryService.createCategory(formData);
        showNotification('Category created successfully');
      }
      navigate('/categories');
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading && id) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>
        {id ? 'Edit Category' : 'Add New Category'}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          margin="normal"
        />

        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          margin="normal"
        />

        <Box mt={2}>
          <input
            accept="image/*"
            type="file"
            id="image-upload"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="image-upload">
            <Button
              variant="outlined"
              component="span"
              fullWidth
            >
              Upload Image
            </Button>
          </label>
        </Box>

        {previewImage && (
          <Box mt={2}>
            <img
              src={previewImage}
              alt="Preview"
              style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'cover' }}
            />
          </Box>
        )}

        <Box mt={3} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => navigate('/categories')}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : (id ? 'Update' : 'Create')}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CategoryForm; 