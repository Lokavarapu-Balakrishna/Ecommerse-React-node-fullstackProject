import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  CircularProgress
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../context/NotificationContext';
import categoryService from '../services/categoryService';
import CustomPagination from './Pagination';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const fetchCategories = async (page) => {
    try {
      setLoading(true);
      const response = await categoryService.getCategories(page);
      setCategories(response.categories);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalCategories);
    } catch (error) {
      showNotification(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.deleteCategory(id);
        showNotification('Category deleted successfully');
        fetchCategories(currentPage);
      } catch (error) {
        showNotification(error.message, 'error');
      }
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5">Categories</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/categories/new')}
        >
          Add New Category
        </Button>
      </Box>

      <Grid container spacing={3}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} md={4} key={category._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={category.image}
                alt={category.name}
              />
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{category.name}</Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => navigate(`/categories/edit/${category._id}`)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(category._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {category.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={1}>
                  Items: {category.itemCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4}>
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={totalItems}
        />
      </Box>
    </Box>
  );
};

export default CategoryList; 