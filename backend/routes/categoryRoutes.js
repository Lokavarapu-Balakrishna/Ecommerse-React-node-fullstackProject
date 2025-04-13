const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Get all categories
router.get('/', categoryController.getCategories);

// Get a single category
router.get('/:id', categoryController.getCategory);

// Protected routes (require authentication)
router.post(
  '/',
  authenticateToken,
  upload.single('image'),
  categoryController.createCategory
);

router.put(
  '/:id',
  authenticateToken,
  upload.single('image'),
  categoryController.updateCategory
);

router.delete(
  '/:id',
  authenticateToken,
  categoryController.deleteCategory
);

module.exports = router; 