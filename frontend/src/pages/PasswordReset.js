import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const PasswordReset = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { resetPassword, requestPasswordReset } = useAuth();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await requestPasswordReset(formData.email);
      showNotification('Password reset link sent to your email', 'success');
      navigate('/login');
    } catch (error) {
      showNotification(error.message || 'Failed to send reset link', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }

    try {
      setLoading(true);
      await resetPassword(token, formData.newPassword);
      showNotification('Password reset successful', 'success');
      navigate('/login');
    } catch (error) {
      showNotification(error.message || 'Failed to reset password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {token ? 'Reset Password' : 'Request Password Reset'}
        </Typography>
        <form onSubmit={token ? handleResetPassword : handleRequestReset}>
          {!token && (
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
          )}
          {token && (
            <>
              <TextField
                fullWidth
                label="New Password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                margin="normal"
                required
              />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? <CircularProgress size={24} /> : token ? 'Reset Password' : 'Send Reset Link'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default PasswordReset; 