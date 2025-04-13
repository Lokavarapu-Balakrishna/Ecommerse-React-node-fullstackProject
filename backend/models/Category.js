const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    itemCount: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});

// Update the updatedAt field before saving
categorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category; 