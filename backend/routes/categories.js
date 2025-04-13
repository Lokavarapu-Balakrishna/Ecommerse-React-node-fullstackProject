const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Category = require('../models/Category');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Get all categories
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const categories = await Category.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Category.countDocuments();

        res.json({
            categories,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalCategories: total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single category
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create category (protected route)
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file ? req.file.path : null;

        const category = new Category({
            name,
            description,
            image
        });

        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update category (protected route)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file ? req.file.path : null;

        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        category.name = name || category.name;
        category.description = description || category.description;
        if (image) {
            category.image = image;
        }

        await category.save();
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete category (protected route)
router.delete('/:id', auth, async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        await category.remove();
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 