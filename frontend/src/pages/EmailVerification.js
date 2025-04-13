import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const EmailVerification = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const { verifyEmail } = useAuth();
  const { showNotification } = useNotification();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(token);
        setVerified(true);
        showNotification('Email verified successfully', 'success');
      } catch (error) {
        showNotification(error.message || 'Email verification failed', 'error');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token, verifyEmail, showNotification]);

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
          maxWidth: 400,
          textAlign: 'center'
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={60} sx={{ mb: 3 }} />
            <Typography variant="h6" gutterBottom>
              Verifying your email...
            </Typography>
          </>
        ) : verified ? (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Email Verified!
            </Typography>
            <Typography variant="body1" paragraph>
              Your email has been successfully verified. You can now log in to your account.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/login')}
              sx={{ mt: 2 }}
            >
              Go to Login
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Verification Failed
            </Typography>
            <Typography variant="body1" paragraph>
              The verification link is invalid or has expired. Please try registering again.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/register')}
              sx={{ mt: 2 }}
            >
              Register Again
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default EmailVerification; 