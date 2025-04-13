const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/request-password-reset', authController.requestPasswordReset);
router.post('/reset-password/:token', authController.resetPassword);

// Protected routes
router.get('/me', auth, authController.getProfile);
router.post('/logout', auth, authController.logout);
router.post('/logoutAll', auth, authController.logoutAll);
router.patch('/me', auth, authController.updateProfile);
router.delete('/me', auth, authController.deleteAccount);

module.exports = router; 