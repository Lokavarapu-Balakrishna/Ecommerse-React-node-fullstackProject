import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Divider
} from '@mui/material';
import {
  Category as CategoryIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const StatCard = ({ title, value, icon, color, onClick }) => (
  <Card
    sx={{
      height: '100%',
      cursor: 'pointer',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'scale(1.02)'
      }
    }}
    onClick={onClick}
  >
    <CardHeader
      avatar={
        <IconButton sx={{ bgcolor: `${color}.light`, color: `${color}.dark` }}>
          {icon}
        </IconButton>
      }
      title={title}
      subheader={value}
    />
  </Card>
);

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Categories"
            value="12"
            icon={<CategoryIcon />}
            color="primary"
            onClick={() => navigate('/categories')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Products"
            value="156"
            icon={<ShoppingCartIcon />}
            color="secondary"
            onClick={() => navigate('/products')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value="89"
            icon={<PeopleIcon />}
            color="success"
            onClick={() => navigate('/users')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Orders"
            value="45"
            icon={<TrendingUpIcon />}
            color="warning"
            onClick={() => navigate('/orders')}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Categories
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* Add recent categories list here */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <Divider sx={{ mb: 2 }} />
            {/* Add recent orders list here */}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 