import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button
} from '@mui/material';
import axios from 'axios';
import { useNotification } from '../../context/NotificationContext';

const EmailVerification = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { showNotification } = useNotification();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`/api/auth/verify-email/${token}`);
        showNotification('Email verified successfully');
        navigate('/login');
      } catch (error) {
        setError(error.response?.data?.message || 'Verification failed');
        showNotification('Email verification failed', 'error');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token, navigate, showNotification]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center'
        }}
      >
        {loading ? (
          <>
            <CircularProgress />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Verifying your email...
            </Typography>
          </>
        ) : error ? (
          <>
            <Typography color="error" variant="h6" gutterBottom>
              {error}
            </Typography>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </>
        ) : (
          <Typography variant="h6">
            Email verified successfully! Redirecting to login...
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default EmailVerification; 